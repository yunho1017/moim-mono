import { px2rem } from "common/helpers/rem";
import styled, { css } from "styled-components";

export const blockWrapStyle = css`
  padding: ${px2rem(8)} ${px2rem(16)};
  background-color: ${props =>
    props.theme.getSideAreaElementPalette("background").color};
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} 0;
  white-space: pre-line;

  border-top: ${props =>
    `${px2rem(1)} solid ${
      props.theme.getSideAreaElementPalette("menuText").fog50
    }`};
  background-color: ${props =>
    props.theme.getSideAreaElementPalette("background").color};
`;
