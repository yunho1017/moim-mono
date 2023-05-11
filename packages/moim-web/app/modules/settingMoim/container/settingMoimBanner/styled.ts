import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
export const HEADER_HEIGHT = 45;

export const fixedBannerStyle = css`
  top: ${px2rem(HEADER_HEIGHT)};
`;
