import styled, { css, FlattenInterpolation } from "styled-components";
import { TransitionGroup } from "react-transition-group";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import CloseIcon from "@icon/24-close-b.svg";
import BackIconBase from "@icon/24-back-b";
import { useScrollStyle } from "common/components/designSystem/styles";
import { H4BoldStyle } from "common/components/designSystem/typos";

export const TRANSITION_DURATION = 300;
export const SECONDARY_VIEW_MIN_WIDTH = 375;
export const SECONDARY_VIEW_MAX_WIDTH = 440;

export const SecondaryView = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  max-width: ${px2rem(SECONDARY_VIEW_MAX_WIDTH)};
  width: ${px2rem(SECONDARY_VIEW_MIN_WIDTH)};
  height: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-left: ${props =>
    `${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
  z-index: ${props =>
    props.theme.zIndexes.wrapper + props.theme.zIndexes.default};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    max-width: none;
    min-width: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${props =>
      props.theme.zIndexes.gnbSticky + props.theme.zIndexes.default};
    border-left: none;
  }

  ${props => props.overrideStyle};
`;

export const ScrollSection = styled.div`
  width: 100%;
  height: 100%;
  ${useScrollStyle};
`;

export const getAppBarStickyStyle = (
  top: number,
  overrideStyle?: FlattenInterpolation<any>,
) => css`
  top: ${px2rem(top)} !important;
  ${overrideStyle};
`;

export const AppBarWrapperStyle = css`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const BackIcon = styled(BackIconBase).attrs({ size: "s", touch: 24 })``;

export const CloseButton = styled(CloseIcon).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const Body = styled.div<{ overrideStyle?: FlattenInterpolation<any> }>`
  width: 100%;
  ${props => props.overrideStyle}
`;

export const ResizeHandler = styled.div.attrs({
  "aria-hidden": true,
})`
  width: ${px2rem(10)};
  height: 100%;
  position: absolute;
  z-index: ${props => props.theme.zIndexes.default};
  left: ${px2rem(-5)};
  cursor: col-resize;
`;

export const SlideTransitionGroup = styled(TransitionGroup)`
  position: relative;
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    z-index: 1300; // NOTE: same value with MUI: dialog
  }

  .slide-enter {
    position: absolute;
    opacity: 0;
    left: 100%;
  }

  .slide-enter-active {
    transition: opacity, left ${TRANSITION_DURATION}ms ease-in-out;
    opacity: 1;
    left: 0;
  }

  .slide-exit {
    position: absolute;
    opacity: 1;
    left: 0;
  }

  .slide-exit-active {
    transition: opacity, left ${TRANSITION_DURATION}ms ease-in-out;
    opacity: 0;
    left: 100%;
  }

  .slide-enter-done,
  .slide-exit-done {
    /* Clear transition style */
  }
`;

export const AppBarButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AppBarLeftButtonWrapper = styled(AppBarButtonWrapper)`
  padding: 0 ${px2rem(12)} 0 ${px2rem(13)};
`;

export const AppBarRightButtonWrapper = styled(AppBarButtonWrapper)`
  padding: 0 ${px2rem(13)} 0 ${px2rem(12)};

  & > * + * {
    margin-left: ${px2rem(18)};
  }
`;

export const ParallaxTitle = styled.div`
  margin: ${px2rem(16)} 0;
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H4BoldStyle}
`;

export const AppBarTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AppBarStickyWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Container = styled.div``;
export const LeftButtonWrapper = styled.div``;

export const BackIconButton = styled(BackIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const BackIconWhiteButton = styled(BackIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;
