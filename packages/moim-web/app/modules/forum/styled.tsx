import styled, { css } from "styled-components";
import { useScrollStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SUB_LIST_WIDTH = 320;

export const Wrapper = styled.div<{ column?: number; isModalShow: boolean }>`
  width: 100%;

  height: 100%;

  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${props => {
      switch (props.isModalShow ? props.column : undefined) {
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

        default:
          return css`
            max-width: ${px2rem(1200)};
          `;
      }
    }};
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle};
  }
`;

export const ListAndModalLayoutWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;
