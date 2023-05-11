import styled, {
  css,
  keyframes,
  FlattenInterpolation,
} from "styled-components";
import { px2rem } from "common/helpers/rem";
import { TransitionDirection } from "common/components/snackbar/types";
import { MEDIA_QUERY } from "common/constants/responsive";
import { bgLevel4Style } from "../designSystem/BGLevel";

interface ILayerStyleProps<T = any> {
  bgColor?: string;
  styles?: FlattenInterpolation<T>;
}

interface ILayerProps extends ILayerStyleProps {
  isOpen: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  transitionDirection: TransitionDirection;
}

const topAppearAnimation = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`;

const bottomAppearAnimation = keyframes`
  0% {
    transform: translateY(50%);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`;

export const Layer = styled.div.attrs({ role: "button" })<ILayerProps>`
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  margin: 0 ${px2rem(16)};

  position: absolute;
  left: 0;
  z-index: ${props => props.theme.zIndexes.toast};
  width: calc(100% - ${px2rem(32)});
  min-width: ${px2rem(168)};

  animation: ${props =>
      props.transitionDirection === "top"
        ? topAppearAnimation
        : bottomAppearAnimation}
    100ms ease-in-out 0s 1;

  will-change: animation;

  ${props =>
    props.transitionDirection === "top"
      ? css`
          top: 0;
          margin-top: ${px2rem(8)};
        `
      : css`
          bottom: 0;
          margin-bottom: ${px2rem(8)};
        `};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props =>
      props.transitionDirection === "bottom" &&
      css`
        position: fixed;
        z-index: ${props.theme.zIndexes.toast};
      `}
  }

  ${props => props.wrapperStyle}
`;

export const BGWrapper = styled.div<ILayerStyleProps>`
  ${bgLevel4Style}
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 ${px2rem(16)};
  background-color: ${props =>
    props.bgColor ?? props.theme.colorV2.colorSet.grey600};
  border-radius: ${px2rem(2)};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    z-index: ${props => props.theme.zIndexes.below};
    border-radius: ${px2rem(2)};
  }
  ${props => props.styles}
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
`;

export const RightAction = styled.div.attrs({ role: "button" })`
  display: flex;
  align-items: center;
`;
