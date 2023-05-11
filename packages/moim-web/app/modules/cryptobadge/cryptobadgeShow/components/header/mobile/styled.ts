import RetryIconBase from "@icon/18-retry-b.svg";
import BackIconBase from "@icon/24-back-b.svg";
import BlackMoreIconBase from "@icon/24-more-b.svg";
import { IScrollParallaxContainer } from "common/components/appBar";
import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";

const loadingAnimationKeyframe = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
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

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export const BackIcon = styled(BackIconBase).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.color ?? props.theme.colorV2.colorSet.grey800,
}))``;

export const MoreIcon = styled(BlackMoreIconBase).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.color ?? props.theme.colorV2.colorSet.grey800,
}))``;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.color ?? props.theme.colorV2.colorSet.grey800,
}))<{ refreshing: boolean }>`
  ${props =>
    props.refreshing &&
    css`
      animation: ${loadingAnimationKeyframe} 1s 1 ease-out;
    `}
`;
