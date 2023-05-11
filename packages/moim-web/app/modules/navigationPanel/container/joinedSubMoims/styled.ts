// vendor
import styled, { css, keyframes } from "styled-components";
// helper
import { px2rem } from "common/helpers/rem";
import {
  useScrollStyle,
  useHoverStyle,
} from "common/components/designSystem/styles";
import CollapseIconBase from "@icon/36-collapse-half-o";
import ExpandIconBase from "@icon/18-left-menu";
import EditIconBase from "@icon/18-more-g";
import { JoinedSubMoimStatusType } from ".";
import { rgba } from "polished";
import { DefaultDivider } from "common/components/divider";

const FIXED_SIDE_BAR_WIDTH = 230;
const FIXED_JOINED_SUB_MOIMS_WIDTH = 68;
const BORDER_WIDTH = 1;

const FadeInAnimation = keyframes`
  0% {
    opacity:0
  }
  100% {
    opacity:1
  }
`;

export const Container = styled.div<{ status: JoinedSubMoimStatusType }>`
  width: ${FIXED_JOINED_SUB_MOIMS_WIDTH}px;
  height: 100%;

  position: relative;

  z-index: ${props => props.theme.zIndexes.gnbSticky};
  transition: width 200ms ease-in-out;

  ${props =>
    props.status === "Disabled" &&
    css`
      width: 0;
    `};
`;

export const Wrapper = styled.div<{ status: JoinedSubMoimStatusType }>`
  position: relative;
  width: ${FIXED_JOINED_SUB_MOIMS_WIDTH}px;
  height: 100%;
  transition: width 200ms ease-in-out, transform 200ms ease-in-out;
  z-index: ${props => props.theme.zIndexes.default};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  display: flex;
  flex-direction: column;

  ${props => {
    switch (props.status) {
      case "Disabled":
        return css`
          transform: translateX(-${FIXED_JOINED_SUB_MOIMS_WIDTH}px);
        `;
      case "Expanded":
        return css`
          width: ${FIXED_SIDE_BAR_WIDTH + FIXED_JOINED_SUB_MOIMS_WIDTH}px;
        `;

      case "Open":
        return css`
          border-right: ${px2rem(1)} solid
            ${props.theme.colorV2.colorSet.grey50};
        `;
    }
  }}
`;

export const ExpandIcon = styled(ExpandIconBase).attrs(props => {
  const palette = props.theme.getTopAreaElementPalette("others");
  return {
    size: "xs",
    touch: 18,
    iconColor: palette.color ?? palette.fog800,
  };
})``;

export const EditIcon = styled(EditIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const CollapseIcon = styled(CollapseIconBase).attrs({
  role: "button",
  size: "m",
})``;

export const ButtonWrapper = styled.div<{
  status: JoinedSubMoimStatusType;
}>`
  position: absolute;

  &:hover {
    opacity: 0.4;
  }

  ${props => {
    switch (props.status) {
      case "Open":
      case "Expanded": {
        return css`
          top: ${px2rem(16)};
          right: -${px2rem(36 + BORDER_WIDTH)};
        `;
      }

      case "Disabled": {
        return css`
          top: ${px2rem(24)};
          right: -${px2rem(18)};
        `;
      }
    }
  }}
`;

export const Header = styled.header<{ isSimple: boolean }>`
  height: ${px2rem(68)};
  overflow: hidden;
  display: flex;
  align-items: center;

  ${props => !props.isSimple && useHoverStyle}
`;

export const ScrollWrapper = styled.div<{ status: JoinedSubMoimStatusType }>`
  flex: 1;
  min-height: 0;
  ${props =>
    props.status === "Expanded"
      ? css`
          background-color: ${props.theme.colorV2.colorSet.white1000};
        `
      : css`
          background-color: ${props.theme.colorV2.colorSet.grey10};
        `};

  ${props =>
    props.status === "Open" &&
    css`
      margin-bottom: ${px2rem(44)};
    `};
  ${useScrollStyle};
`;

export const Footer = styled.footer`
  width: 100%;
  height: ${px2rem(44)};
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.9)};
`;

export const Divider = styled(DefaultDivider)`
  margin-bottom: 2px;
`;

export const ChangeStatusButton = styled.div`
  animation-name: ${FadeInAnimation};
  animation-duration: 200ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;
