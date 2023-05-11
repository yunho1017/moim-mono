"use strict";

/* eslint-disable no-console */
const gulp = require("gulp");
const s3 = require("s3");
const git = require("gulp-git");
const notify = require("gulp-notify");
const fs = require("fs-extra");
const shell = require("gulp-shell");
const exec = require("child_process").exec;
const path = require("path");

let NEW_TAG;

const LIMIT_OF_LATEST_RELEASE = 12;
// S3 info
const STAGING_BUCKET = "moim-stage-web"; // vingle.network
const PRODUCTION_BUCKET = "moim-prod-web"; // moim.co
const VINGLE_GROUP_WEB_PREFIX = "web";
const VINGLE_GROUP_WEB_APP_PREFIX = `${VINGLE_GROUP_WEB_PREFIX}/app`;
const APP_DEST = "./dist/";
const S3_CLIENT_OPTIONS = {
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    region: "us-east-1",
  },
};

// Preset Constants
const VERSION_FILE_NAME = "production_version";
const VERSION_FILE_PATH = `./tmp/${VERSION_FILE_NAME}`;

const PHASE_SET = {
  STAGING: "STAGING",
  PRODUCTION: "PRODUCTION",
};
// comes from jenkins
const DEPLOY_VERSION = process.env.DEPLOY_VERSION;
const PHASE = process.env.PHASE;
const BUCKET =
  PHASE === PHASE_SET.PRODUCTION ? PRODUCTION_BUCKET : STAGING_BUCKET;
const BRANCH_TITLE = process.env.BRANCH_TITLE;

// poeditor script
const poeditor = require("./scripts/poeditor");

const errorHandler = err => {
  notify.onError({
    message: "Error: <%= error.message %>",
    title: "Encountered error. Exiting with exit code 1",
  })(err);
  process.exit(1);
};

gulp.task("poeditor-pull", async callback => {
  const languages = await poeditor.getListLanguages();
  await Promise.all(
    languages.map(async lang => {
      console.log(`Start downloading ${lang}.json`);
      const resultData = await poeditor.getExportData(lang);
      fs.writeJSONSync(
        path.join(poeditor.config.targetDir, `${lang}.json`),
        resultData,
        {
          spaces: 2,
        },
      );
      console.log(`Finish downloading ${lang}.json`);
    }),
  );
  callback();
});

gulp.task("add-stage-tag", callback => {
  new Promise((resolve, reject) => {
    if (!process.env.BRANCH_NAME) {
      git.exec(
        {
          args: "describe --tags `git rev-list --tags --max-count=1`",
        },
        (err, stdout) => {
          if (err) reject(err);
          resolve(stdout);
        },
      );
    } else {
      resolve(process.env.BRANCH_NAME);
    }
  })
    .then(result => {
      NEW_TAG = result.trim();
      console.log("[+] Gulpfile.js logger> NEW_TAG: ", NEW_TAG);
      callback();
    })
    .catch(() => {
      errorHandler(new Error("add-stage-tag cant be run without NEW_TAG"));
      callback();
    });
});

gulp.task("add-tag", callback => {
  NEW_TAG = new Date().toISOString().replace(/:/g, "-");
  git.tag(NEW_TAG, "Deploying to S3", err => {
    if (err) {
      errorHandler(err);
    }
    callback();
  });
});

gulp.task("add-production-tag", callback => {
  new Promise((resolve, reject) => {
    git.exec(
      {
        args: "tag -d production",
      },
      err => {
        if (err) reject(err);
        else resolve();
      },
    );
  })
    .then(
      () =>
        new Promise((resolve, reject) => {
          git.tag("production", "Deploying to S3", err => {
            if (err) reject(err);
            else resolve();
          });
        }),
    )
    .then(callback);
});

gulp.task("push-tag", callback => {
  git.exec(
    {
      args: `push https://${process.env.GH_TOKEN}@github.com/balmbees/moim-web --tags -f`,
    },
    callback,
  );
});

gulp.task("check-cleanness", callback => {
  git.status(
    {
      args: " --porcelain",
    },
    (err, stdout) => {
      if (!!stdout) {
        git.exec(
          {
            args: "diff package-lock.json",
          },
          (err, stdout) => {
            console.log(stdout);
            errorHandler(new Error("Found unsynced changes"));
          },
        );
        return;
      }
      callback();
    },
  );
});

gulp.task("clean-dist", callback => {
  fs.remove("dist", err => {
    if (err) {
      errorHandler(err);
    }
    callback();
  });
});

gulp.task(
  "package-production",
  shell.task(`webpack --config ./webpack.prod.config.js`),
);

gulp.task(
  "package-stage",
  shell.task(
    "env NODE_OPTIONS=--max_old_space_size=4096 webpack --config ./webpack.demo.config.js",
  ),
);

gulp.task("package-main", cb => {
  exec(
    `env NODE_OPTIONS=--max_old_space_size=4096 webpack --env.deployVersion="${NEW_TAG}" --env.PHASE="${process.env.PHASE}" --config ./webpack.browser.config.js`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    },
  );
});

gulp.task("delete-old-release", cb => {
  const s3Client = s3.createClient(S3_CLIENT_OPTIONS);
  const removableReleasePromise = [];
  s3Client
    .listObjects({
      s3Params: {
        Bucket: BUCKET,
        Delimiter: "/",
        Prefix: `${VINGLE_GROUP_WEB_APP_PREFIX}/`,
      },
    })
    .on("error", err => {
      console.log("err", err);
      cb();
    })
    .on("data", data => {
      const commonPrefixes = data.CommonPrefixes.sort((a, b) =>
        a.Prefix > b.Prefix ? -1 : a.Prefix < b.Prefix ? 1 : 0,
      );

      if (commonPrefixes.length > LIMIT_OF_LATEST_RELEASE) {
        const deleteDirectory = commonPrefixes.slice(
          LIMIT_OF_LATEST_RELEASE,
          commonPrefixes.length,
        );
        for (const prefix of deleteDirectory) {
          const dirName = prefix.Prefix; // it's already container VINGLE_GROUP_WEB_PREFIX
          console.log(`Start delete: ${dirName}`);
          const deleteRunner = new Promise((resolve, reject) => {
            s3Client
              .deleteDir({
                Bucket: BUCKET,
                Prefix: dirName,
              })
              .on("err", err => {
                console.error(
                  `Failed to delete old release assets <Prefix: ${dirName}>`,
                  err.stack,
                );
                errorHandler(err);
                reject(err);
              })
              .on("end", () => {
                console.log(`Successfully delete: ${dirName}`);
                resolve();
              });
          });
          removableReleasePromise.push(deleteRunner);
        }

        Promise.all(removableReleasePromise)
          .then(() => {
            cb();
          })
          .catch(errorHandler);
      } else {
        cb();
      }
    });
});

gulp.task("push-to-s3", callback => {
  if (!NEW_TAG || !fs.existsSync(APP_DEST)) {
    return Promise.reject(new Error("push-to-s3 cant be run by itself"));
  }

  const s3Client = s3.createClient(S3_CLIENT_OPTIONS);
  const uploadPromises = [];
  const files = fs.readdirSync(APP_DEST);
  const isStaging = process.env.PHASE === "STAGING";

  const createUploaderPromise = (option, file) =>
    new Promise(resolve => {
      s3Client
        .uploadFile(option)
        .on("error", err => {
          console.error(`FILE: ${file} : unable to sync`, err.stack);
          errorHandler(err);
          reject(err);
        })
        .on("end", () => {
          console.log(`${file} upload done`);
          resolve();
        });
    });

  if (isStaging) {
    files.forEach(file => {
      const uploadOption = {
        localFile: APP_DEST + file,
        s3Params: {
          Bucket: STAGING_BUCKET,
          Key: `${VINGLE_GROUP_WEB_APP_PREFIX}/${NEW_TAG}/${file}`,
        },
      };

      uploadPromises.push(createUploaderPromise(uploadOption, file));

      if (
        file.endsWith(".html") &&
        BRANCH_TITLE.toLowerCase().startsWith("stage")
      ) {
        const indexUploadOption = {
          localFile: APP_DEST + file,
          s3Params: {
            Bucket: STAGING_BUCKET,
            Key: `${VINGLE_GROUP_WEB_PREFIX}/${file}`,
          },
        };

        uploadPromises.push(createUploaderPromise(indexUploadOption, file));
      }
    });
  } else {
    files.forEach(file => {
      const uploadOptions = {
        localFile: APP_DEST + file,
        s3Params: {
          Bucket: PRODUCTION_BUCKET,
          Key: !file.endsWith(".html")
            ? `${VINGLE_GROUP_WEB_APP_PREFIX}/${NEW_TAG}/${file}`
            : `${VINGLE_GROUP_WEB_PREFIX}/${file}`,
          CacheControl: `public, max-age=600`,
        },
      };
      uploadPromises.push(createUploaderPromise(uploadOptions, file));
    });
  }

  console.log("before start");
  Promise.all(uploadPromises)
    .then(() => {
      callback();
    })
    .catch(errorHandler);
});

gulp.task("record-tag", callback => {
  if (!NEW_TAG) {
    return Promise.reject(new Error("record-tag cant be run by itself")).catch(
      errorHandler,
    );
  }

  return new Promise(() => {
    fs.outputFile("tmp/version", NEW_TAG, err => {
      if (err) {
        errorHandler(err);
      }
      callback(err);
    });
  });
});

gulp.task(
  "package",
  gulp.parallel("clean-dist", "package-main", callback => callback()),
);

// build demo branch
gulp.task(
  "deploy-to-stage",
  gulp.series(
    "clean-dist",
    "add-stage-tag",
    "poeditor-pull",
    "package",
    "push-to-s3",
    callback => callback(),
  ),
);

// build master branch
gulp.task(
  "upload-production-bucket",
  gulp.series(
    "clean-dist",
    "add-tag",
    "poeditor-pull",
    "package",
    "push-to-s3",
    "push-tag",
    "record-tag",
    callback => callback(),
  ),
);

// not build, just change target version file and upload to production deploy
gulp.task(
  "change-new-production-version",
  gulp.series(
    "add-production-tag",
    "push-tag",
    "delete-old-release",
    callback => callback(),
  ),
);

gulp.task(
  "deploy-to-production",
  gulp.series("upload-production-bucket", "change-new-production-version", cb =>
    cb(),
  ),
);

// for local file serve
gulp.task(
  "servo-build",
  gulp.series(cb => {
    NEW_TAG = "v1";
    cb();
  }, "package"),
);
