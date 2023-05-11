import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B2RegularStyle,
  H9BoldStyle,
} from "common/components/designSystem/typos";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";
import { TOP_BANNER_HEIGHT as NOTIFICATION_REQUEST_BANNER_HEIGHT } from "common/components/topBanner/constants";

const TAB_HEIGHT = 60;

export const OwnersTitle = styled.div<{ isTopBannerOpen?: boolean }>`
  display: flex;
  align-items: center;
  height: ${px2rem(44)};
  font-weight: ${props => props.theme.font.bold} !important;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(832)};
    max-width: 100%;
    padding: 0 ${px2rem(16)};
    margin: 0 auto;
    ${H9BoldStyle}
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: ${props =>
      props.isTopBannerOpen
        ? px2rem(
            TOP_NAVIGATION_HEIGHT +
              NOTIFICATION_REQUEST_BANNER_HEIGHT +
              TAB_HEIGHT,
          )
        : px2rem(TOP_NAVIGATION_HEIGHT + TAB_HEIGHT)};
    ${B2RegularStyle}
  }
`;
