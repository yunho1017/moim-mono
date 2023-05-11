import styled, { css } from "styled-components";
import { rgba } from "polished";
import {
  H8Bold,
  B3Regular,
  H2Bold,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
// iconsg.svg";
import PinIconBase from "@icon/18-pinsolid.svg";
import CloseIconBase from "@icon/24-close-b.svg";
import { IScrollParallaxContainer } from "common/components/appBar";
import { enWordKeepAllStyle } from "common/components/designSystem/styles";
import { MAX_CONTENT_WIDTH } from "../constants";

export const PinnedPostWrapper = styled.div`
  display: flex;
`;

export const PinnedPostText = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
`;

export const getAppBarWrapperStyle = (top: number) => css`
  width: 100%;
  position: fixed !important;
  top: ${top}px !important;
`;

export const AppBarWrapperStickedStyle = css`
  width: 100%;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.95)};
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MoreMenuWrapper = styled.div`
  display: inline-block;
`;

export const ParallaxTitle = styled(H2Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  white-space: pre-line;
  word-break: break-all;
  ${enWordKeepAllStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Title = styled(H8Bold)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  & > * + * {
    margin-left: ${px2rem(4)};
  }
`;

export const CenterAlignmentWrapper = styled.div<IScrollParallaxContainer>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${props => props.opacity};
`;

export const MaxWidthPaper = styled.div<{ enableDesktopPadding?: boolean }>`
  max-width: ${px2rem(MAX_CONTENT_WIDTH)};
  width: 100%;

  ${props => props.enableDesktopPadding && `padding: 0 ${px2rem(16)};`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-width: none;
  }
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 44,
  role: "button",
})``;

export const BlackPinIcon = styled(PinIconBase).attrs(props => ({
  size: "xs",
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const PinIcon = styled(PinIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
