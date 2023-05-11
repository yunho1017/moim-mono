export async function videoLoad(src: string) {
  return new Promise<void>(resolve => {
    const video = document.createElement("video");
    const source = document.createElement("source");
    video.addEventListener("error", () => {
      resolve();
    });
    video.addEventListener("canplay", () => {
      resolve();
    });
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
  });
}

export async function imageLoad(src: string, srcset?: string, sizes?: string) {
  return new Promise<void>(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      if (image.complete && image.naturalWidth) {
        resolve();
      }
    });
    image.addEventListener("error", () => {
      resolve();
    });
    if (srcset && typeof image.srcset !== "undefined") {
      image.srcset = srcset;
      image.sizes = sizes ?? "";
    } else {
      image.src = src;
    }
  });
}
