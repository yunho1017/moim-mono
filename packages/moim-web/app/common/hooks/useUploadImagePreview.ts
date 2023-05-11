import * as React from "react";
import useFileURL from "common/hooks/useFileURL";

export default function useUploadImagePreview() {
  const [imagePreview, setImagePreview] = React.useState<
    Moim.Group.IGroupImagePreview | undefined
  >(undefined);
  const { setFile: setCropImage, imageSrc: cropImageSrc } = useFileURL();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleSuccessImageUpload = React.useCallback(
    async ({
      blob,
      preview,
    }: {
      blob: Blob | null;
      preview: Moim.Group.IGroupImagePreview;
    }) => {
      setCropImage(blob);
      setImagePreview(preview);
      setIsLoading(false);
    },
    [setCropImage],
  );

  const handleStartImageLoading = React.useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const handleEndImageLoading = React.useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return {
    cropImageSrc,
    imagePreview,
    isImageUploadLoading: isLoading,

    handleSuccessImageUpload,
    handleStartImageLoading,
    handleEndImageLoading,
  };
}
