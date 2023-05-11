import styled from "styled-components";
import BackIconBase from "@icon/24-back-b.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";

export const Wrapper = styled.div`
  position: relative;
`;

export const LoaderWrapper = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: 50%;
  }
`;

export const NonClickWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const BackIconWrapper = styled.div<{ visibleTopNavigation: boolean }>`
  position: fixed;
  top: ${props =>
    props.visibleTopNavigation ? px2rem(TOP_NAVIGATION_HEIGHT) : 0};
  left: 0;
`;

export const BackIcon = styled(BackIconBase).attrs({ size: "s", touch: 44 })``;
