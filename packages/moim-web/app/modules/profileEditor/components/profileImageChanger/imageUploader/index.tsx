// vendor
import * as React from "react";
// hooks
import { IProps, IRefImageUploader, useProps, useHandlers } from "./useHooks";
// component
import MediaUploadInput from "app/modules/mediaUpload/input";
import ImageCropperDialog from "common/components/imageCropper/dialog";

const ImageUploader = React.forwardRef<IRefImageUploader, IProps>(
  (props: IProps, ref) => {
    const hookProps = useProps(props);
    const hookHandlers = useHandlers(hookProps);

    const {
      imageCropperRef,
      iconInputRef,
      denyTypes,
      isOpenCropper,
      originalIconSrc,
    } = hookProps;
    const {
      openFileSelector,
      handleIconChange,
      handleSuccessCrop,
      handleCloseCropper,
    } = hookHandlers;

    React.useImperativeHandle(ref, () => ({
      openImageCropper: openFileSelector,
    }));

    return (
      <>
        <MediaUploadInput
          ref={iconInputRef}
          denyTypes={denyTypes}
          onChange={handleIconChange}
        />

        <ImageCropperDialog
          open={isOpenCropper}
          onClose={handleCloseCropper}
          onSuccess={handleSuccessCrop}
          src={originalIconSrc}
          ref={imageCropperRef}
        />
      </>
    );
  },
);

export default ImageUploader;
export { IRefImageUploader };
