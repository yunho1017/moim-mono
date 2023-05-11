import * as React from "react";
// Actions
import { useActions } from "app/store";
import { updateCropAvatar } from "app/actions/me";
// helpers
import useOpenState from "common/hooks/useOpenState";
import useFileURL from "common/hooks/useFileURL";
import useCancelToken from "common/hooks/useCancelToken";
import { getImageCropData } from "common/components/moimIconUploader/helper";
import { fileUploaderForUserProfile } from "common/helpers/fileUploader";
// components
import MediaUploadInput, {
  MediaUploadTypes,
} from "app/modules/mediaUpload/input";
import { DEFAULT_DENY_TYPE } from "common/components/moimIconUploader/constants";
import { IImageCropperRef } from "common/components/imageCropper";

export interface IRefImageUploader {
  openImageCropper(): void;
}

export interface IProps {
  onSucceed: (data: {
    blob: Blob | null;
    preview: Moim.Group.IGroupImagePreview;
  }) => void;
  onFailed: () => void;
  onStartLoading?: () => void;
  denyTypes?: MediaUploadTypes[];
}

export function useProps(props: IProps) {
  const { denyTypes: propDenyType } = props;
  const denyTypes = propDenyType ?? DEFAULT_DENY_TYPE;

  const [cropBlob, setCropBlob] = React.useState<Blob | null>(null);
  const {
    file: originalIcon,
    setFile: setOriginalIcon,
    imageSrc: originalIconSrc,
  } = useFileURL();
  const { setFile: setCropIcon, imageSrc: cropIconSrc } = useFileURL();
  const [isLoading, setIsLoading] = React.useState(false);
  const iconInputRef: React.RefObject<MediaUploadInput> = React.useRef(null);
  const imageCropperRef: React.RefObject<IImageCropperRef> = React.useRef(null);

  const {
    isOpen: isOpenCropper,
    open: openCropper,
    close: closeCropper,
  } = useOpenState();
  const actions = useActions({
    dispatchCropIcon: updateCropAvatar,
  });
  const cancelToken = useCancelToken();

  return {
    ...props,
    ...actions,
    cancelToken,
    iconInputRef,
    imageCropperRef,
    denyTypes,
    isOpenCropper,
    openCropper,
    closeCropper,
    cropBlob,
    setCropBlob,
    originalIcon,
    setOriginalIcon,
    originalIconSrc,
    setCropIcon,
    cropIconSrc,
    isLoading,
    setIsLoading,
  };
}

export function useHandlers(hookProps: ReturnType<typeof useProps>) {
  const {
    imageCropperRef,
    cancelToken,
    openCropper,
    closeCropper,
    setOriginalIcon,
    iconInputRef,
    originalIcon,
    setIsLoading,
    setCropIcon,
    dispatchCropIcon,
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
              top: Math.floor(cropData.top),
              left: Math.floor(cropData.left),
              size: Math.floor(cropData.height),
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

      const preview = await fileUploaderForUserProfile(originalIcon);
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

  const openFileSelector = React.useCallback(() => {
    const target = iconInputRef.current;
    if (target) {
      target.trigger();
    }
  }, [iconInputRef]);

  return {
    openFileSelector,
    handleIconChange,
    handleSuccessCrop,
    handleCloseCropper,
  };
}
