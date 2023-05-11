import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{}>`
  width: 100%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(32)} 0;
  }
`;
