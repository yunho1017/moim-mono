import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useIsMobile from "common/hooks/useIsMobile";

import {
  Wrapper,
  ArrowButton,
  NextArrow,
  PrevArrow,
  IndicatorItem,
} from "./styled";
import CarouselItemElement from "./item";
import { withPlacement } from "../../hoc/withPlacement";

interface IProps extends Omit<Moim.Blockit.ICarouselBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const CarouselBlock: React.FC<IProps> = ({
  images,
  images_web,
  style,
  interval,
  style_web,
  interval_web,
}) => {
  const isMobile = useIsMobile();
  const targetInterval = (isMobile ? interval : interval_web) ?? 5000;
  const targetMediaUrls = React.useMemo(
    () =>
      isMobile
        ? images
        : images_web && images_web.length > 0
        ? images_web
        : images,
    [images, images_web, isMobile],
  );

  const {
    width,
    height,
    showBottomIndicate,
    showSideArrowButton,
  } = React.useMemo(
    () =>
      (isMobile ? style : style_web) ?? {
        width: "1920",
        height: "680",
        showBottomIndicate: true,
        showSideArrowButton: true,
      },
    [isMobile, style, style_web],
  );

  const mediaElements = React.useMemo(
    () =>
      targetMediaUrls.map(media => {
        return (
          <CarouselItemElement
            key={media.src}
            media={media}
            width={width}
            height={height}
          />
        );
      }),
    [height, targetMediaUrls, width],
  );

  const renderNextArrow = React.useCallback(
    (clickHandler: () => void, _hasPrev: boolean, _label: string) =>
      showSideArrowButton && (
        <ArrowButton direction="right" onClick={clickHandler}>
          <NextArrow />
        </ArrowButton>
      ),
    [showSideArrowButton],
  );
  const renderPrevArrow = React.useCallback(
    (clickHandler: () => void, _hasPrev: boolean, _label: string) =>
      showSideArrowButton && (
        <ArrowButton direction="left" onClick={clickHandler}>
          <PrevArrow />
        </ArrowButton>
      ),
    [showSideArrowButton],
  );
  const renderIndicator = React.useCallback(
    (
      clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
      isSelected: boolean,
      index: number,
      label: string,
    ) =>
      showBottomIndicate && (
        <IndicatorItem
          aria-label={label}
          role="button"
          value={index}
          tabIndex={0}
          selected={isSelected}
          onClick={clickHandler}
        />
      ),
    [showBottomIndicate],
  );

  return (
    <Wrapper>
      <Carousel
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
        showArrows={isMobile ? false : showSideArrowButton}
        showIndicators={mediaElements.length > 1 ? showBottomIndicate : false}
        showThumbs={false}
        showStatus={false}
        interval={targetInterval}
        renderArrowPrev={isMobile ? undefined : renderPrevArrow}
        renderArrowNext={isMobile ? undefined : renderNextArrow}
        renderIndicator={renderIndicator}
      >
        {mediaElements}
      </Carousel>
    </Wrapper>
  );
};

export default withPlacement(React.memo(CarouselBlock));
