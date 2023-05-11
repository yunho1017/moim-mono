import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B2Regular,
  H8Regular,
  H4Bold,
} from "common/components/designSystem/typos";
import { IScrollParallaxContainer } from "common/components/appBar";
import CloseIcon from "@icon/24-close-b.svg";
import BackIconBase from "@icon/24-back-b";
import { enWordKeepAllStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  padding-bottom: ${px2rem(32)};
`;

export const ParallaxWrapper = styled.div<IScrollParallaxContainer>`
  opacity: ${props => props.opacity};
  transition: opacity 200ms ease-in-out;
`;
export const AppBarTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const AppBarTitleUsername = styled(H8Regular)`
  color: ${props => props.theme.colorV2.colorSet.fog800};
  margin-left: ${px2rem(8)};
`;

export const ParallaxUsernameWrapper = styled.div`
  flex: 1;
  min-width: 0;
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const ParallaxUsername = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const AppBarStickyWrapperStyle = css`
  background-color: var(--external-main-color);
`;

export const CloseButton = styled(CloseIcon).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;

export const BackIconButton = styled(BackIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const BioWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const UserBio = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  ${enWordKeepAllStyle}
`;

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
