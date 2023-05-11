import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import {
  Left,
  ImageContainer,
  FallbackImageWrapper,
  ImageFallback,
  ProductPrimaryImageStyle,
} from "./styled";

interface IProps {
  images?: {
    web: Moim.Commerce.IImage[];
    mobile: Moim.Commerce.IImage[];
  };
}

const ProductThumbnailImage: React.FC<IProps> = ({ images }) => {
  const isMobile = useIsMobile();
  const previewImageSource = React.useMemo(() => {
    if (!images) {
      return undefined;
    }
    if (isMobile) {
      return images.mobile;
    } else {
      return images.web.length > 0 ? images.web : images.mobile;
    }
  }, [images, isMobile]);

  return (
    <Left>
      <ImageContainer>
        {!previewImageSource || previewImageSource.length === 0 ? (
          <FallbackImageWrapper>
            <ImageFallback />
          </FallbackImageWrapper>
        ) : (
          <LazyBlurHashImage
            src={
              previewImageSource[0].url ??
              previewImageSource[0].src ??
              previewImageSource[0].fallbackSrc
            }
            srcSet={previewImageSource[0].srcSet}
            blurHash={
              previewImageSource[0].blurHash ?? previewImageSource[0].blur_hash
            }
            overrideIMGStyle={ProductPrimaryImageStyle}
            width={36}
            height={36}
          />
        )}
        <FallbackImageWrapper></FallbackImageWrapper>
      </ImageContainer>
    </Left>
  );
};

export default React.memo(ProductThumbnailImage);
