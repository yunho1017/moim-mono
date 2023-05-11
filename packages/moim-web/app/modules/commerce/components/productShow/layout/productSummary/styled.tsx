import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

import { B3RegularStyle } from "common/components/designSystem/typos";

export const Left = styled.div`
  position: relative;
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-height: 0;
  }
`;

export const Right = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-height: 0;
  }
`;

export const HeaderWrapper = styled.div<{ ratio?: string }>`
  width: 100%;
  display: flex;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    flex-direction: row;
    ${props => {
      if (!props.ratio) {
        return;
      }
      const rLeft = parseInt(props.ratio.split(":")[0], 10);
      const rRight = parseInt(props.ratio.split(":")[1], 10);

      return css`
        ${Left} {
          flex: ${rLeft};
          min-width: 0;
        }
        ${Right} {
          flex: ${rRight};
          min-width: 0;
        }
      `;
    }}
  }
`;

export const DividerWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const SellerImage = styled.img`
  display: inline-block;
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;
