const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const webpack = require("webpack");
const optimization = require("./webpack.optimization.config");
const LoadablePlugin = require("@loadable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const assetPath = `/app/${env.deployVersion}/`;

  return merge(common, optimization, {
    mode: "production",
    stats: "errors-only",
    entry: {
      bundleBrowser: [
        "babel-polyfill",
        "proto-polyfill",
        "./app/bootstrap.js",
        "whatwg-fetch",
        "url-polyfill",
        "intersection-observer",
        "smoothscroll-polyfill",
        "./app/client/index.tsx",
      ],
      vendor: ["react", "react-dom", "react-intl"],
      serviceWorker: "./app/serviceWorker.tsx",
    },
    output: {
      filename: "./[name].js",
      chunkFilename: "./[name].[chunkhash].js",
      publicPath: assetPath,
    },
    devtool: "cheap-module-source-map",
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].js.map",
        publicPath: assetPath,
      }),
      new webpack.DefinePlugin({
        "process.env.DEPLOY_VERSION": JSON.stringify(env.deployVersion),
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.PHASE": JSON.stringify(env.PHASE),
        "process.env.PROJECT_NAME": JSON.stringify("moim-web"),
        "process.env.DQUEST_SERVICE_ID_STAGE": JSON.stringify(
          "yoO3V786TIjZpVr4kpJf67RwrEl4gy3y",
        ),
        "process.env.DQUEST_SERVICE_ID_PROD": JSON.stringify(
          "bVNr9THd3NAnAqllTkbDJUUUD60JmiKb",
        ),
      }),
      new HtmlWebpackPlugin({
        env: {
          deployVersion: env.deployVersion,
        },
        template: "app/index.ejs",
        inject: false,
        NODE_ENV: "production",
      }),
      new LoadablePlugin({
        filename: "vendor.json",
        writeToDisk: true,
      }),
    ],
  });
};
