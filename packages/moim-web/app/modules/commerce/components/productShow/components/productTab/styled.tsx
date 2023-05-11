import styled, { css } from "styled-components";
import {
  B3RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";
import { TOP_BANNER_HEIGHT as NOTIFICATION_REQUEST_BANNER_HEIGHT } from "common/components/topBanner/constants";

export const TAB_HEIGHT = 42;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Tab = styled.div<{ isTopBannerOpen?: boolean }>`
  position: sticky;
  width: 100%;
  height: ${px2rem(TAB_HEIGHT)};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.wrapper};
  display: flex;
  align-items: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    top: ${props =>
      props.isTopBannerOpen
        ? px2rem(TOP_NAVIGATION_HEIGHT + NOTIFICATION_REQUEST_BANNER_HEIGHT)
        : px2rem(TOP_NAVIGATION_HEIGHT)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    top: 0;
  }
`;

const BorderInit = css`
  transition: border 200ms ease-in-out;
  border-bottom: 0 solid ${props => props.theme.colorV2.accent};
`;

export const TabItem = styled.div<{ selected?: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props =>
    props.selected
      ? props.theme.colorV2.colorSet.grey800
      : props.theme.colorV2.colorSet.grey300};
  ${props => (props.selected ? H10BoldStyle : B3RegularStyle)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-bottom: -${px2rem(2)};
    ${BorderInit}
    ${props =>
      props.selected &&
      css`
        border-bottom: ${px2rem(2)} solid ${props.theme.colorV2.accent};
      `}
  }

  > span {
    display: inline-flex;
    align-items: center;
    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      height: 100%;
      padding: 0 ${px2rem(4)};
      margin-bottom: -${px2rem(2)};
      ${BorderInit}
      ${props =>
        props.selected &&
        css`
          border-bottom: 2px solid ${props.theme.colorV2.accent};
        `}
    }
  }

  a {
    text-decoration: none;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
`;
