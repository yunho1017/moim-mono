import styled, { css } from "styled-components";
// constants
import { MEDIA_QUERY } from "common/constants/responsive";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";
import { TOP_BANNER_HEIGHT as NOTIFICATION_REQUEST_BANNER_HEIGHT } from "common/components/topBanner/constants";
// helper
import { px2rem } from "common/helpers/rem";
// style
import { H10BoldStyle } from "common/components/designSystem/typos";
import { useXScrollStyle } from "common/components/designSystem/styles";

export const TAB_HEIGHT = 60;

export const Tab = styled.div<{ isTopBannerOpen?: boolean }>`
  position: sticky;
  height: ${px2rem(TAB_HEIGHT)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  display: flex;
  align-items: center;
  gap: 0 ${px2rem(2)};
  padding: 0 ${px2rem(16)};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  white-space: nowrap;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-width: 100%;
    top: ${props =>
      props.isTopBannerOpen
        ? px2rem(TOP_NAVIGATION_HEIGHT + NOTIFICATION_REQUEST_BANNER_HEIGHT)
        : px2rem(TOP_NAVIGATION_HEIGHT)};
    ${useXScrollStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    top: 0;
  }
`;

export const TabItem = styled.div<{ selected?: boolean }>`
  flex-shrink: 0;
  min-width: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle};

  padding: ${px2rem(6)} ${px2rem(14)};
  border-radius: ${px2rem(16)};

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey800};
      color: ${props.theme.colorV2.colorSet.white1000};
    `}
`;

export const ContentContainer = styled.div`
  width: 100%;

  &[aria-hidden="true"] {
    display: none;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(28)} ${px2rem(16)} 0;
    min-height: ${px2rem(400)};
    &[data-id="items"] {
      padding-top: 0;
    }
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
    min-height: 50vh;
  }
`;
