import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { TOP_BANNER_HEIGHT as NOTIFICATION_REQUEST_BANNER_HEIGHT } from "common/components/topBanner/constants";
import { TOP_NAVIGATION_HEIGHT } from "../topNavigation/constant";

export const JOIN_GROUP_BANNER_HEIGHT = 44;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TopNavigationWrapper = styled.div<{
  isBannerOpened: boolean;
  isExpandSideNavigation: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  display: ${props => (props.disabled ? "none" : "block")};
  z-index: ${props =>
    props.theme.zIndexes.fullscreen + props.theme.zIndexes.default};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props => {
      if (props.isExpandSideNavigation) {
        return css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: ${props.theme.zIndexes.fullscreen +
            props.theme.zIndexes.default};
        `;
      }

      return css`
        position: sticky;
        top: ${props.isBannerOpened
          ? px2rem(NOTIFICATION_REQUEST_BANNER_HEIGHT)
          : 0};
        left: 0;
        right: 0;
        z-index: ${props.theme.zIndexes.gnbSticky +
          props.theme.zIndexes.default};
      `;
    }}
  }
`;

export const TopNavigationSiblingWrapper = styled.div<{
  top: number;
  isBannerOpened: boolean;
  isExpandSideNavigation: boolean;
}>`
  width: 100%;
  z-index: ${props =>
    props.theme.zIndexes.fullscreen - props.theme.zIndexes.default};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props => css`
      position: sticky;
      top: ${props.isBannerOpened
        ? px2rem(NOTIFICATION_REQUEST_BANNER_HEIGHT + props.top)
        : px2rem(props.top)};
      left: 0;
      right: 0;
      z-index: ${props.theme.zIndexes.gnbSticky - props.theme.zIndexes.default};
    `}
  }
`;

export const MainWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  min-height: 0;

  display: flex;
  position: relative;
`;

export const joinChildMoimBannerStickyStyle = css<{
  isBannerOpened: boolean;
  isTopNaviDisabled: boolean;
}>`
  z-index: ${props => props.theme.zIndexes.fullscreen};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: ${props => {
      const topNaviHeight = props.isTopNaviDisabled ? 0 : TOP_NAVIGATION_HEIGHT;
      return props.isBannerOpened
        ? px2rem(NOTIFICATION_REQUEST_BANNER_HEIGHT + topNaviHeight)
        : px2rem(topNaviHeight);
    }};
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky};
  }
`;

export const TopSubNavigationWrapper = styled.div<{
  isBannerOpened: boolean;
}>`
  ${joinChildMoimBannerStickyStyle}
`;

export const BottomFooterWrapper = styled.footer`
  z-index: ${props =>
    props.theme.zIndexes.fullscreen + props.theme.zIndexes.default};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;
