import styled, { css, FlattenInterpolation } from "styled-components";

import { px2rem } from "common/helpers/rem";

const FIXED_BANNER_HEIGHT = 45;
export const CoverFixedSensor = styled.div.attrs({ "aria-hidden": true })<{
  bannerHeight: number;
}>`
  pointer-events: none;
  position: absolute;
  top: ${props =>
    `calc(100vh + ${props.bannerHeight}px - ${px2rem(FIXED_BANNER_HEIGHT)})`};
  left: 0;
  height: 100vh;
`;

export const BannerWrapper = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndexes.default};
`;

export interface IBannerProps {
  isFixed: boolean;
  bannerHeight: number;
  bannerFixedStyle?: FlattenInterpolation<any>;
}

export const bannerStyle = css<IBannerProps>`
  position: ${props => (props.isFixed ? "fixed" : "absolute")};
  transform: translate3d(0, 0, 0);
  left: 0;
  top: 0;
  width: 100%;
  height: ${props =>
    `${
      props.isFixed ? px2rem(FIXED_BANNER_HEIGHT) : `${props.bannerHeight}px`
    }`};

  ${props => props.isFixed && props.bannerFixedStyle};
`;
