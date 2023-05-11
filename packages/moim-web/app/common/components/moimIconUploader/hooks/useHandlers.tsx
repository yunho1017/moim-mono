import * as React from "react";
import { IHookProps } from "./useProps";
import { fileUploaderForHub } from "common/helpers/fileUploader";
import { getImageCropData } from "common/components/moimIconUploader/helper";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    openCropper,
    closeCropper,
    setOriginalIcon,
    iconInputRef,
    originalIcon,
    setIsLoading,
    imageCropperRef,
    setCropIcon,
    dispatchCropIcon,
    cancelToken,
    onSucceed,
    onFailed,
    onStartLoading,
  } = hookProps;

  const handleIconChange = React.useCallback(
    (uploadedFile: File) => {
      openCropper();
      setOriginalIcon(uploadedFile);
    },
    [openCropper, setOriginalIcon],
  );

  const handleCrop = React.useCallback(
    async (
      id: string,
      blob: Blob | null,
      cropData: Cropper.CropBoxData | null,
    ) => {
      setCropIcon(blob);

      if (cropData) {
        dispatchCropIcon(
          {
            id,
            extract: {
              top: Math.round(cropData.top),
              left: Math.round(cropData.left),
              size: Math.round(cropData.height),
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [cancelToken, setCropIcon, dispatchCropIcon],
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
      await handleCrop(preview.id, blob, cropData);

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
