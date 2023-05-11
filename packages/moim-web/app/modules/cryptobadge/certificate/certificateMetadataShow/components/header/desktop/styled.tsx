import styled, { css, keyframes } from "styled-components";
import { px2rem } from "common/helpers/rem";
// icons
import BlackMoreIconBase from "@icon/24-more-b.svg";
import RetryIconBase from "@icon/18-retry-b.svg";

interface IStyleProps {
  backgroundColor?: string;
  textColor?: string;
}

const loadingAnimationKeyframe = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div<IStyleProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${px2rem(12)};
  padding: ${px2rem(24)} ${px2rem(120)} 0 ${px2rem(120)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
`;

export const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 100%;
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
`;

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
