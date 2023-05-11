import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  ArrowButton,
  PrevArrow,
  NextArrow,
  IndicatorItem,
} from "common/components/blockitEditorBase/components/blockitRenderer/components/carousel/styled";
import { WithCarouselLink } from "common/components/blockitEditorBase/components/blockitRenderer/components/carousel/item";
import LazyBlurHashImage from "common/components/lazyBlurHashImage";

import { px2rem } from "common/helpers/rem";
import { ActionCreators, clickPopupBanner } from "../../actions";
import useIsMobile from "common/hooks/useIsMobile";
import { useActions } from "app/store";
import { MEDIA_QUERY } from "common/constants/responsive";
import { DESKTOP_IMAGE_WIDTH, MOBILE_IMAGE_WIDTH } from "../../constants";

const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(DESKTOP_IMAGE_WIDTH)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(MOBILE_IMAGE_WIDTH)};
  }

  & img {
    object-fit: cover;
    user-select: none;
  }
`;

interface IProps {
  bannerId: string;
  contents: Moim.Promote.IPopupBannerContent[];
}
const PopupBannerCarousel: React.FC<IProps> = ({ bannerId, contents }) => {
  const isMobile = useIsMobile();
  const [clickedContents, setClickedContents] = React.useState<
    Record<string, boolean>
  >({});
  const contentsLength = contents.length;
  const { dispatchClickPopupBanner, close } = useActions({
    dispatchClickPopupBanner: clickPopupBanner,
    close: ActionCreators.close,
  });
  const handleClickBanner = React.useCallback(
    (index: number) => {
      const contentId = contents[index]?.id;

      if (contents[index]?.url) {
        close();
      }

      if (contentId && !clickedContents[contentId]) {
        dispatchClickPopupBanner(bannerId, contentId);
        setClickedContents({ ...clickedContents, [contentId]: true });
      }
    },
    [clickedContents, bannerId, contents, close],
  );

  const renderNextArrow = React.useCallback(
    (clickHandler: () => void, _hasPrev: boolean, _label: string) =>
      contentsLength > 1 && (
        <ArrowButton direction="right" onClick={clickHandler}>
          <NextArrow />
        </ArrowButton>
      ),
    [contentsLength],
  );
  const renderPrevArrow = React.useCallback(
    (clickHandler: () => void, _hasPrev: boolean, _label: string) =>
      contentsLength > 1 && (
        <ArrowButton direction="left" onClick={clickHandler}>
          <PrevArrow />
        </ArrowButton>
      ),
    [contentsLength],
  );

  const imageElements = React.useMemo(
    () =>
      contents.map(({ image, url }) => {
        return (
          <WithCarouselLink to={url} key={image.url}>
            <LazyBlurHashImage
              key={image.url}
              src={image.url}
              width={isMobile ? MOBILE_IMAGE_WIDTH : DESKTOP_IMAGE_WIDTH}
              height={isMobile ? MOBILE_IMAGE_WIDTH : DESKTOP_IMAGE_WIDTH}
            />
          </WithCarouselLink>
        );
      }),
    [isMobile, contents],
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

  return (
    <Wrapper>
      <Carousel
        axis="horizontal"
        showArrows={!isMobile}
        showIndicators={imageElements.length > 1}
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={isMobile ? undefined : renderPrevArrow}
        renderArrowNext={isMobile ? undefined : renderNextArrow}
        renderIndicator={renderIndicator}
        onClickItem={handleClickBanner}
        infiniteLoop={contentsLength > 1}
      >
        {imageElements}
      </Carousel>
    </Wrapper>
  );
};

export default PopupBannerCarousel;
