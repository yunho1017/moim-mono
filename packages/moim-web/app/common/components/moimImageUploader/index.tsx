// vendor
import * as React from "react";
// hook
import { useProps, useHandlers, useBannerUpload } from "./hooks";
// component
import MediaUploadInput, {
  MediaUploadTypes,
} from "app/modules/mediaUpload/input";
import ImageCropperDialog from "common/components/imageCropper/dialog";

export interface IProps
  extends Omit<
    React.ComponentProps<typeof ImageCropperDialog>,
    "open" | "src" | "onClose" | "onSuccess"
  > {
  denyTypes?: MediaUploadTypes[];
  onSucceed: (data: {
    blob: Blob | null;
    preview: Moim.Group.IGroupImagePreview;
  }) => void;
  onFailed: () => void;
  onStartLoading?: () => void;
  onCrop?(id: string, cropData: Cropper.CropBoxData): void;
}

const MoimImageUploader = React.forwardRef<MediaUploadInput, IProps>(function(
  props: IProps,
  forwardRef: React.MutableRefObject<MediaUploadInput | null>,
) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps, forwardRef);
  const {
    imageCropperRef,
    denyTypes,
    isOpenCropper,
    originalIconSrc,
    ...rest
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
        ref={forwardRef}
        denyTypes={denyTypes}
      />

      <ImageCropperDialog
        open={isOpenCropper}
        onClose={handleCloseCropper}
        onSuccess={handleSuccessCrop}
        src={originalIconSrc}
        ref={imageCropperRef}
        {...rest}
      />
    </>
  );
});

export const MoimBannerUploader = React.forwardRef<MediaUploadInput, IProps>(
  function(
    props: Omit<IProps, "onCrop" | "ref">,
    forwardRef: React.MutableRefObject<MediaUploadInput | null>,
  ) {
    const { handleCrop } = useBannerUpload();
    return (
      <MoimImageUploader ref={forwardRef} {...props} onCrop={handleCrop} />
    );
  },
);

export default MoimImageUploader;
