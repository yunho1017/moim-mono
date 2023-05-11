import styled, { FlattenInterpolation, keyframes } from "styled-components";
import { px2rem } from "common/helpers/rem";

const bubblingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(${px2rem(-5)});
  }
`;

const sizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["l", 14],
  ["s", 6],
]);

export const BubblingItem = styled.span`
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  animation: ${bubblingAnimation} 0.275s cubic-bezier(0.55, 0.055, 0.675, 0.19)
    infinite alternate;

  & ~ & {
    margin-left: ${px2rem(5)};
  }

  &:nth-of-type(2) {
    animation-delay: 0.075s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.15s;
  }
`;

export const BubblingG = styled.div<{
  size: Moim.DesignSystem.Size;
  color?: string;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: calc(50% - ${px2rem(6)});
  ${BubblingItem} {
    width: ${props => px2rem(sizeMap.get(props.size)!)};
    height: ${props => px2rem(sizeMap.get(props.size)!)};
    background: ${props => props.color || props.theme.colorV2.accent};
  }

  ${props => props.overrideStyle}
`;
