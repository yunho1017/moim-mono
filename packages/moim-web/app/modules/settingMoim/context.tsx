// javascript
import React from "react";
import useUploadImagePreview from "common/hooks/useUploadImagePreview";
import getRandomColorOfLetter from "common/helpers/getRandomColorOfLetter";

interface IBannerContextValue {
  banner: Moim.IBanner;
  isLoading: boolean;
  bannerPreview?: Moim.Group.IGroupImagePreview;
  handleSuccessBannerUpload(params: {
    preview: Moim.Group.IGroupImagePreview;
  }): void;
  handleStartBannerUpload(): void;
  handleEndBannerUpload(): void;
}
const initialValue: IBannerContextValue = {
  banner: { type: "color", data: { color: "#FFF" } },
  isLoading: false,
  bannerPreview: undefined,
  handleSuccessBannerUpload: () => {},
  handleStartBannerUpload: () => {},
  handleEndBannerUpload: () => {},
};

const BannerContext = React.createContext<IBannerContextValue>(initialValue);

export default BannerContext;

export function useBannerContext(
  moimName?: string,
  defaultValue?: Moim.IBanner,
): IBannerContextValue {
  const {
    cropImageSrc,
    imagePreview,
    isImageUploadLoading: isLoading,
    handleSuccessImageUpload: handleSuccessBannerUpload,
    handleStartImageLoading: handleStartBannerUpload,
    handleEndImageLoading: handleEndBannerUpload,
  } = useUploadImagePreview();

  const defaultBanner: Moim.IBanner = defaultValue || {
    type: "color",
    data: { color: getRandomColorOfLetter(moimName || "") },
  };
  const banner: Moim.IBanner = cropImageSrc
    ? {
        type: "image",
        data: {
          url: cropImageSrc,
        },
      }
    : imagePreview
    ? {
        type: "image",
        data: {
          url: imagePreview.url,
        },
      }
    : defaultBanner;

  return {
    banner,
    isLoading,
    handleSuccessBannerUpload,
    handleStartBannerUpload,
    handleEndBannerUpload,

    bannerPreview: imagePreview,
  };
}
