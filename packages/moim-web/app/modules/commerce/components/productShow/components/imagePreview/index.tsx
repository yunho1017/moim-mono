import * as React from "react";
import { css } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useIsMobile from "common/hooks/useIsMobile";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import { Wrapper, IndicatorItem } from "./styled";
import { px2rem } from "common/helpers/rem";

const imageOverrideStyle = css`
  object-fit: cover;
`;
const getImageWrapperOverrideStyle = (width: number, height: number) => css`
  width: ${px2rem(width)} !important;
  height: ${px2rem(height)} !important;
`;

interface IProps {
  imageUrls: Moim.Commerce.IImage[];
  imageUrls_web: Moim.Commerce.IImage[];
  ratio?: string;
  radius?: number;
}

const ImagePreview: React.FC<IProps> = ({ imageUrls, imageUrls_web }) => {
  const isMobile = useIsMobile();
  const [adjustSize, setAdjustSize] = React.useState<{
    width?: number;
    height?: number;
  }>({ width: undefined, height: undefined });

  const targetImageUrls = React.useMemo(
    () =>
      isMobile
        ? imageUrls
        : imageUrls_web && imageUrls_web.length > 0
        ? imageUrls_web
        : imageUrls,
    [imageUrls, imageUrls_web, isMobile],
  );

  const imageElements = React.useMemo(
    () =>
      targetImageUrls.map(img => {
        const width = adjustSize.width ?? (isMobile ? innerWidth : 500);
        const height = adjustSize.height ?? (isMobile ? innerWidth : 500);
        return (
          <LazyBlurHashImage
            key={img.url ?? img.src}
            src={img.url ?? img.src}
            srcSet={img.srcSet}
            sizes={!isMobile ? "500px" : undefined}
            blurHash={img.blurHash ?? img.blur_hash}
            fallBackSrc={img.fallbackSrc ?? img.url ?? img.src}
            overrideWrapperStyle={getImageWrapperOverrideStyle(width, height)}
            overrideIMGStyle={imageOverrideStyle}
            width={width}
            height={height}
          />
        );
      }),
    [adjustSize.height, adjustSize.width, isMobile, targetImageUrls],
  );

  const renderIndicator = React.useCallback(
    (
      clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
      isSelected: boolean,
      index: number,
      label: string,
    ) => (
      <IndicatorItem
        aria-label={label}
        role="button"
        value={index}
        tabIndex={0}
        selected={isSelected}
        onClick={clickHandler}
      />
    ),
    [],
  );

  const renderThumbs = React.useCallback(
    (children: React.ReactChild[]) => children,
    [],
  );

  const handleResize = React.useCallback(width => {
    setAdjustSize({
      width,
      height: width,
    });
  }, []);

  return (
    <ReactResizeDetector handleWidth={true} onResize={handleResize}>
      <Wrapper>
        <Carousel
          axis="horizontal"
          autoPlay={false}
          infiniteLoop={true}
          showArrows={false}
          showIndicators={isMobile && targetImageUrls.length > 1}
          showThumbs={!isMobile}
          showStatus={false}
          renderIndicator={
            targetImageUrls.length > 1 ? renderIndicator : undefined
          }
          renderThumbs={renderThumbs}
          thumbWidth={52}
          swipeScrollTolerance={50}
          preventMovementUntilSwipeScrollTolerance={true}
        >
          {imageElements}
        </Carousel>
      </Wrapper>
    </ReactResizeDetector>
  );
};

export default ImagePreview;
