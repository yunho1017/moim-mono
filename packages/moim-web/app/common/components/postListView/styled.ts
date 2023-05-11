import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{ column: number }>`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;

  column-gap: ${px2rem(12)};
  grid-template-columns: repeat(
    ${props => (props.column < 2 ? props.column : 2)},
    1fr
  );
  will-change: max-width, grid-template-columns;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-template-columns: repeat(${props => props.column}, 1fr);

    ${props => {
      switch (props.column) {
        case 1:
          return css`
            max-width: ${px2rem(600)};
          `;
        case 2:
          return css`
            max-width: ${px2rem(1000)};
          `;
        case 3:
          return css`
            max-width: ${px2rem(1200)};
          `;
        case 4:
          return css`
            max-width: ${px2rem(1400)};
          `;
        case 5:
          return css`
            max-width: ${px2rem(1600)};
          `;
      }
    }};
  }

  grid-auto-rows: max-content;

  grid-auto-flow: row;
  justify-content: center;

  padding: 0 ${px2rem(16)};
  & > * {
    min-width: 0;
  }
`;
