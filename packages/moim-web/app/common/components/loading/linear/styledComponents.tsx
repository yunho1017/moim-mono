import styled, { keyframes, css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 54.6%;
  background-color: ${props => props.theme.colorV2.accent};
  transition: width 300ms;
`;

const barAnimationKeyframe = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    left: 0;
  }
  to {
    left: 100%;
    transform: translate3d(0%, 0, 0);
  }
`;

export const Wrapper = styled.div<{ animation: boolean }>`
  position: relative;
  overflow: hidden;
  height: ${px2rem(2)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  ${props =>
    props.animation &&
    css`
      ${Bar} {
        animation: ${barAnimationKeyframe} 1.5s infinite linear;
      }
    `}
`;
