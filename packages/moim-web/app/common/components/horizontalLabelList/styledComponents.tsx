import styled, { css, FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "app/common/helpers/rem";
import { useScrollStyle, noScrollBarStyle } from "../designSystem/styles";
import ArrowButton from "./components/arrowButton";
import { AlertBadge } from "common/components/alertBadge";
// icons
import CloseIconResource from "@icon/18-close-g.svg";
import MoreIconResource from "@icon/18-more-g.svg";
import { LABEL_LIST_MIN_HEIGHT } from "./constants";

export const LABEL_ITEM_HEIGHT = 30;

const visibilityAnimStyle = css`
  transition-property: opacity;
  transition-duration: 200ms;
  transition-delay: 10ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Section = styled.div<{
  expanded?: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  min-height: ${px2rem(LABEL_LIST_MIN_HEIGHT)};
  ${props => props.overrideStyle};
`;

export const LabelList = styled.div`
  display: inline-flex;
  height: 100%;
  flex: 1;
  ${useScrollStyle};
  ${noScrollBarStyle};
  overflow-x: scroll;
`;

export const LabelListGradient = styled.div<{
  disable: boolean;
  position: "left" | "right";
}>`
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

export const Dim = styled.div<{ enable: boolean }>`
  position: absolute;
  display: block;
  width: 100%;
  height: 100vh;
  left: 0;
  visibility: hidden;
  opacity: 0;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.7)};
  z-index: ${props => props.theme.zIndexes.default + 1};
  ${visibilityAnimStyle};

  ${props => props.enable && `visibility: visible; opacity: 1;`};
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
})<{ disable: boolean }>`
  ${PositionButtonStyle};
  left: ${px2rem(10)};
  ${props => props.disable && `visibility: hidden; opacity: 0;`};
`;

export const RightArrowButton = styled(ArrowButton).attrs({
  arrowType: "right",
})<{ disable: boolean; hasMoreButton: boolean; labelType?: "moim" | "tagSet" }>`
  ${PositionButtonStyle};
  right: ${props => {
    if (props.hasMoreButton) {
      return props.labelType === "moim" ? px2rem(54) : px2rem(50);
    }
    return px2rem(10);
  }};
  ${props => props.disable && `visibility: hidden; opacity: 0;`};
`;

export const ExpandButton = styled.button<{ isExpanded: boolean }>`
  position: absolute;
  right: ${px2rem(16)};
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 50%;
  z-index: ${props => props.theme.zIndexes.default};

  ${props => {
    if (props.isExpanded) {
      return {
        position: "absolute",
        top: px2rem(14),
        right: px2rem(8),
      };
    } else {
      return `
        &::before,
        &::after {
          content: "";
          display:block;
          position: absolute;
          top: 0;
          right: 0;
          width: ${px2rem(30)};
          height: ${px2rem(30)};
          border-radius: 50%;
          z-index: ${props.theme.zIndexes.below} ;
        }

        &::before {
          background-color: ${props.theme.colorV2.colorSet.white1000};
        }
        &::after {
          background-color: ${props.theme.colorV2.colorSet.grey50};
        }
      `;
    }
  }}
`;

export const MoreIcon = styled(MoreIconResource).attrs({
  role: "button",
  size: "xs",
  touch: 30,
})``;

export const SelectAlertBadge = styled(AlertBadge)`
  position: absolute;
  top: -${px2rem(8)};
  right: -${px2rem(8)};

  background-color: ${props => props.theme.colorV2.colorSet.grey600};
  color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const CloseIcon = styled(CloseIconResource).attrs({
  role: "button",
  size: "xs",
  touch: 30,
})``;

export const Wrapper = styled.div<{
  expanded: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${props =>
    props.expanded &&
    `
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0 ${rgba(
      props.theme.colorV2.colorSet.grey800,
      0.2,
    )};
    background-color: ${props.theme.colorV2.colorSet.white1000};
    height: auto;
    overflow: hidden;
    padding-left: ${px2rem(11)};
    z-index: ${props.theme.zIndexes.modal};

    ${LabelList} {
      min-height: ${px2rem(105)};
      max-height: ${px2rem(236)};
      overflow: scroll;
      flex-wrap: wrap;
    }
  `};

  &:hover {
    ${LeftArrowButton},
    ${RightArrowButton} {
      display: block;
    }
  }

  ${props => props.overrideStyle};
`;
