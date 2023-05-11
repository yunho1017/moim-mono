import styled, { keyframes, css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { circleCanvasPropsSizeMap } from "./size";

const loadingAnimationKeyframe = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div<{
  size: Moim.DesignSystem.Size;
  grayscale: boolean;
  animation?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => px2rem(circleCanvasPropsSizeMap.get(props.size)!.size)};
  height: ${props => px2rem(circleCanvasPropsSizeMap.get(props.size)!.size)};
  background-color: ${props =>
    props.grayscale && props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(2)};
  canvas {
    width: 100%;
    height: 100%;
  }
  ${props =>
    props.animation &&
    css`
      canvas {
        animation: ${loadingAnimationKeyframe} 1s infinite linear;
      }
    `}
`;
