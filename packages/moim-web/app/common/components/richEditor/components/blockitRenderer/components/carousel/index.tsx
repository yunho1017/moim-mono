import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useIsMobile from "app/common/hooks/useIsMobile";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import { Link } from "react-router-dom";

import {
  Wrapper,
  ArrowButton,
  NextArrow,
  PrevArrow,
  IndicatorItem,
} from "./styled";
import { withPlacement } from "../../hoc/withPlacement";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps extends Omit<Moim.Blockit.ICarouselBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const WithCarouselLink: React.FC<{ to?: string }> = ({ to, children }) => {
  if (to) {
    const nl = new URL(to);
    if (nl.hostname === location.hostname) {
      return (
        <Link
          to={{
            pathname: nl.pathname,
            search: location.search,
          }}
          onClick={() => {
            AnalyticsClass.getInstance().blockCarouselSelect({
              link: to,
            });
          }}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={to}
        target="_blank"
        onClick={() => {
          AnalyticsClass.getInstance().blockCarouselSelect({
            link: to,
          });
        }}
      >
        {children}
      </a>
    );
  }
  return <>{children}</>;
};

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
  const targetImageUrls = React.useMemo(
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

  const imageElements = React.useMemo(
    () =>
      targetImageUrls.map(img => {
        return (
          <WithCarouselLink to={img.href}>
            <LazyBlurHashImage
              key={img.src ?? img.imageSrc}
              src={img.src ?? img.imageSrc}
              srcSet={img.srcSet}
              blurHash={img.blurHash ?? img.blur_hash}
              fallBackSrc={img.fallbackSrc ?? img.src ?? img.imageSrc}
              width={width}
              height={height}
            />
          </WithCarouselLink>
        );
      }),
    [targetImageUrls, width, height],
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
        showIndicators={imageElements.length > 1 ? showBottomIndicate : false}
        showThumbs={false}
        showStatus={false}
        interval={targetInterval}
        renderArrowPrev={isMobile ? undefined : renderPrevArrow}
        renderArrowNext={isMobile ? undefined : renderNextArrow}
        renderIndicator={renderIndicator}
      >
        {imageElements}
      </Carousel>
    </Wrapper>
  );
};

export default withPlacement(React.memo(CarouselBlock));
