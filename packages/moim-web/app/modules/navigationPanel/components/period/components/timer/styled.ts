import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";

export const Wrapper = styled(H8Bold)`
  width: 100%;
  height: ${px2rem(40)};
  padding: ${px2rem(8)} 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => {
    const palette = props.theme.getSideAreaElementPalette("menuText");
    return css`
      background-color: ${palette.color ?? palette.fog50};
      color: ${palette.fog800};
    `;
  }}


  border-radius: ${px2rem(4)};
`;
