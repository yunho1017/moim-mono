// vendor
import styled, { css } from "styled-components";
// helper
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { TOP_NAVIGATION_HEIGHT } from "../topNavigation/constant";

export const TRANSITION_TIME = "300ms";

export const CollapseButtonWrapper = styled.div`
  position: absolute;
  top: ${px2rem(10)};
  right: 0;
  z-index: ${props => props.theme.zIndexes.popover};
  display: none;
  justify-content: center;
  align-items: center;
  transform: translateX(50%);
`;

interface IWrapperProps {
  isExpanded: boolean;
  visibleTopNavigation: boolean;
  visibleSideNavigation: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  position: fixed;
  top: ${props =>
    props.visibleTopNavigation ? px2rem(TOP_NAVIGATION_HEIGHT) : 0};
  left: 0;
  z-index: ${props => props.theme.zIndexes.fullscreen};
  ${props =>
    props.visibleTopNavigation
      ? css`
          height: calc(100% - ${px2rem(TOP_NAVIGATION_HEIGHT)});
        `
      : css`
          height: 100%;
        `};

  ${props =>
    props.visibleSideNavigation &&
    css`
      background-color: ${props =>
        props.theme.getSideAreaElementPalette("background").color};
    `};

  transform: translate3d(-100vw, 0, 0);
  transition: transform ${TRANSITION_TIME};
  will-change: transform;

  ${props =>
    props.isExpanded &&
    css`
      transform: ${props.isExpanded ? `translate3d(0, 0, 0)` : ""};
    `}

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: relative;
    top: 0;
    ${props =>
      !props.isExpanded &&
      css`
        width: ${px2rem(16)};
      `};
    height: 100%;
    transform: none;
    transition: width ${TRANSITION_TIME} ease-in-out;
    cursor: ${props => (props.isExpanded ? "default" : "pointer")};

    &:hover ${CollapseButtonWrapper} {
      display: flex;
    }
  }
`;

export const InnerWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${MEDIA_QUERY.TABLET} {
    ${props =>
      !props.isExpanded &&
      css`
        display: none;
      `}
  }
`;

export const DesktopDim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const Dim = styled.div<{
  isShow: boolean;
  visibleTopNavigation: boolean;
}>`
  position: fixed;
  top: ${props =>
    props.visibleTopNavigation ? px2rem(TOP_NAVIGATION_HEIGHT) : 0};
  right: 0;
  z-index: ${props => props.theme.zIndexes.fullscreen - 1};
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: background-color ${TRANSITION_TIME};
  pointer-events: none;

  ${props =>
    props.isShow &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey50};
      pointer-events: auto;
    `}
`;
