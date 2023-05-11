import styled, { css, FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "app/common/helpers/rem";
import ArrowButton from "./components/arrowButton";
import { MEDIA_QUERY } from "common/constants/responsive";
import { noScrollBarStyle, useXScrollStyle } from "../designSystem/styles";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";
import { TOP_BANNER_HEIGHT as NOTIFICATION_REQUEST_BANNER_HEIGHT } from "common/components/topBanner/constants";

export const LABEL_ITEM_DESKTOP_HEIGHT = 62;
export const LABEL_ITEM_MOBILE_HEIGHT = 48;

const visibilityAnimStyle = css`
  transition-property: opacity;
  transition-duration: 200ms;
  transition-delay: 10ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Section = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  isTopBannerOpen?: boolean;
}>`
  position: sticky;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(LABEL_ITEM_MOBILE_HEIGHT)};
    min-width: 100%;
    top: ${props =>
      props.isTopBannerOpen
        ? px2rem(TOP_NAVIGATION_HEIGHT + NOTIFICATION_REQUEST_BANNER_HEIGHT)
        : px2rem(TOP_NAVIGATION_HEIGHT)};
    ${useXScrollStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    height: ${px2rem(LABEL_ITEM_DESKTOP_HEIGHT)};
    top: 0;
  }

  ${props => props.overrideStyle};
`;

export const LabelList = styled.div<{ isOverflowVisible?: boolean }>`
  display: inline-flex;
  flex: 1;
  ${noScrollBarStyle};
  padding-right: ${px2rem(38)};
  ${props =>
    props.isOverflowVisible
      ? css`
          overflow: visible;
        `
      : css`
          overflow-x: scroll;
        `}
`;

export const LabelListGradient = styled.div<{
  disable: boolean;
  position: "left" | "right";
}>`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${px2rem(91)};
  height: ${px2rem(62)};
  ${visibilityAnimStyle};
  ${props => props.disable && `visibility: hidden; opacity: 0;`};
  ${props =>
    props.position === "right"
      ? css`
          right: 0;
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            ${props.theme.colorV2.colorSet.white1000} 65%
          );
        `
      : css`
          left: 0;
          background-image: linear-gradient(
            to left,
            rgba(255, 255, 255, 0) 0%,
            ${props.theme.colorV2.colorSet.white1000} 65%
          );
          z-index: ${props.theme.zIndexes.default};
        `};
`;

const PositionButtonStyle = css`
  position: absolute;
  top: ${px2rem(19)};
  bottom: 0;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: none;
  z-index: ${props => props.theme.zIndexes.default};

  ${visibilityAnimStyle};
`;

export const LeftArrowButton = styled(ArrowButton).attrs({
  arrowType: "left",
})`
  ${PositionButtonStyle};
  left: ${px2rem(10)};
  ${props => props.disabled && `visibility: hidden; opacity: 0;`};
`;

export const RightArrowButton = styled(ArrowButton).attrs({
  arrowType: "right",
})<{ hasMoreButton: boolean; labelType?: "moim" | "tagSet" }>`
  ${PositionButtonStyle};
  right: ${props => {
    if (props.hasMoreButton) {
      return props.labelType === "moim" ? px2rem(54) : px2rem(50);
    }
    return px2rem(10);
  }};
  ${props => props.disabled && `visibility: hidden; opacity: 0;`};
`;

export const ExpandButtonWrapper = styled.button`
  position: absolute;
  right: ${px2rem(16)};
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 50%;
  z-index: ${props => props.theme.zIndexes.default};
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: ${px2rem(30)};
    height: ${px2rem(30)};
    border-radius: 50%;
    z-index: ${props => props.theme.zIndexes.below};
  }

  &::before {
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
  }
`;

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: ${px2rem(15)} ${px2rem(16)};
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.95)};
  overflow: hidden;

  &:hover {
    ${LeftArrowButton},
    ${RightArrowButton} {
      display: block;
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)};
  }

  ${props => props.overrideStyle};
`;
