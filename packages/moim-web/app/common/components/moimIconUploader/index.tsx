// vendor
import * as React from "react";
// hook
import { useProps, useHandlers } from "./hooks";
// component
import MediaUploadInput, {
  MediaUploadTypes,
} from "app/modules/mediaUpload/input";
import ImageCropperDialog from "common/components/imageCropper/dialog";

export interface IProps {
  onSucceed: (data: {
    blob: Blob | null;
    preview: Moim.Group.IGroupImagePreview;
  }) => void;
  onFailed: () => void;
  onStartLoading?: () => void;
  denyTypes?: MediaUploadTypes[];
}

export default function MoimIconUploader(props: IProps) {
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
    handleIconChange,
    handleSuccessCrop,
    handleCloseCropper,
  } = hookHandlers;

  return (
    <>
      <MediaUploadInput
        onChange={handleIconChange}
        ref={iconInputRef}
        denyTypes={denyTypes}
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
}
