import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

const STATIC_HEIGHT = 58;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  height: ${px2rem(STATIC_HEIGHT)};
  padding: ${px2rem(16)};
  background-color: ${props =>
    props.theme.getTopAreaElementPalette("background").color};
  ${props =>
    props.theme.getTopAreaElementPalette("background").color ===
      "rgba(255,255,255,1.00)" &&
    css`
      border-right: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
    `}
`;

export const LogoImage = styled.img`
  max-width: ${px2rem(160)};
  max-height: ${px2rem(34)};
  object-fit: contain;
`;
