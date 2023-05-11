import { css } from "styled-components";

export const SIZE = {
  MOBILE: "320px",
  TABLET: "600px",
  DESKTOP: "1024px",
};

export const MEDIA_QUERY = {
  EXCEPT_DESKTOP: `(min-width: ${SIZE.MOBILE}) and (max-width: ${SIZE.DESKTOP})`,
  EXCEPT_MOBILE: `(min-width: ${SIZE.TABLET})`,
  ONLY_MOBILE: `(min-width: 0) and (max-width: ${SIZE.TABLET})`,
  TABLET: `(min-width: ${SIZE.TABLET})`,
  ONLY_TABLET: `(min-width: ${SIZE.TABLET}) and (max-width: ${SIZE.DESKTOP})`,
  ONLY_DESKTOP: `(min-width: ${SIZE.DESKTOP})`,
};

// NOTE: from cryptobadge.xyz
export const mediaSize = {
  mobileSmall: 320, // 5S SE
  mobileWide: 360, // samsung
  mobileGiant: 415, // iphone 6/7/8 plus
  popUp: 640,
  tablet: 768,
  tabletWide: 1024,
  desktop: 1170,
  desktopWide: 1220,
  desktopGiant: 1400,
  giant: 1600,
  giantWide: 1800,
};

export const media = Object.keys(mediaSize).reduce(
  (accumulator: any, label: string) => {
    const pxSize = mediaSize[label];

    accumulator[label] = (args: any) => css`
      @media (min-width: ${pxSize}px) {
        ${css(args)};
      }
    `;
    return accumulator;
  },
  {},
);
