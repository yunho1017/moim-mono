import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    padding: ${px2rem(16)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-bottom: ${px2rem(8)};
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  margin: ${px2rem(8)} 0;
`;
