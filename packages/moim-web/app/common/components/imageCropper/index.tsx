import * as React from "react";
import ReactCropper, { ReactCropperProps } from "react-cropper";
import { CropperGlobalStyle } from "./styledComponents";

interface IProps extends ReactCropperProps {
  src: string;
}

export interface IImageCropperRef {
  toBlob(): Promise<Blob>;
  toCropData(): {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

const ImageCropper = React.forwardRef<IImageCropperRef, IProps>(
  (props, ref) => {
    const { src, ...rest } = props;
    const cropperRef = React.useRef<ReactCropper>(null);
    React.useImperativeHandle(
      ref,
      (): IImageCropperRef => ({
        async toBlob() {
          return new Promise((resolve, reject) => {
            cropperRef.current!.getCroppedCanvas().toBlob(blob => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("<ImageCropper /> cropperRef toBlob error"));
              }
            });
          });
        },
        toCropData() {
          const { x, y, width, height } = cropperRef.current!.getData();
          return {
            left: x,
            top: y,
            width,
            height,
          };
        },
      }),
      [cropperRef],
    );

    return (
      <>
        <CropperGlobalStyle />
        <ReactCropper
          ref={cropperRef as any}
          src={props.src}
          guides={false}
          movable={false}
          highlight={false}
          rotatable={false}
          scalable={false}
          zoomable={false}
          aspectRatio={1}
          viewMode={2}
          dragMode="move"
          {...rest}
        />
      </>
    );
  },
);

export default ImageCropper;
