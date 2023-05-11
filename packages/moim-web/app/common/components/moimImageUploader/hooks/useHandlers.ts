import * as React from "react";
import { IHookProps } from "./useProps";
import { fileUploaderForHub } from "common/helpers/fileUploader";
import { getImageCropData } from "common/components/moimImageUploader/helper";
import MediaUploadInput from "app/modules/mediaUpload/input";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(
  hookProps: IHookProps,
  iconInputRef: React.MutableRefObject<MediaUploadInput | null>,
) {
  const {
    openCropper,
    closeCropper,
    setOriginalIcon,
    originalIcon,
    setIsLoading,
    imageCropperRef,
    onSucceed,
    onFailed,
    onStartLoading,
    onCrop,
  } = hookProps;

  const handleIconChange = React.useCallback(
    (uploadedFile: File) => {
      openCropper();
      setOriginalIcon(uploadedFile);
    },
    [openCropper, setOriginalIcon],
  );

  const handleCrop = React.useCallback(
    async (id: string, cropData: Cropper.CropBoxData | null) => {
      if (cropData) {
        onCrop?.(id, cropData);
      }
    },
    [onCrop],
  );

  const handleStartLoading = React.useCallback(() => {
    onStartLoading?.();
    setIsLoading(true);
  }, [onStartLoading, setIsLoading]);

  const handleEndLoading = React.useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const handleCloseCropper = React.useCallback(() => {
    closeCropper();
    iconInputRef.current?.clear();
  }, [closeCropper, iconInputRef]);

  const handleSuccessCrop = React.useCallback(async () => {
    if (!originalIcon) {
      return;
    }

    try {
      handleStartLoading();

      const { blob, cropData } = await getImageCropData(imageCropperRef);
      handleCloseCropper();

      const preview = await fileUploaderForHub(originalIcon);
      await handleCrop(preview.id, cropData);

      onSucceed({ blob, preview });
    } catch {
      onFailed();
    } finally {
      handleEndLoading();
    }
  }, [
    originalIcon,
    handleStartLoading,
    imageCropperRef,
    handleCloseCropper,
    handleCrop,
    onSucceed,
    onFailed,
    handleEndLoading,
  ]);

  return {
    handleIconChange,
    handleSuccessCrop,
    handleCloseCropper,
  };
}
