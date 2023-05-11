import * as React from "react";
import { IImageCropperRef } from "common/components/imageCropper";

export async function getImageCropData(ref: React.RefObject<IImageCropperRef>) {
  let blob: Blob | null = null;
  let cropData: {
    left: number;
    top: number;
    width: number;
    height: number;
  } | null = null;

  if (ref.current) {
    blob = await ref.current.toBlob();
    cropData = ref.current.toCropData();
  }

  return {
    blob,
    cropData,
  };
}
