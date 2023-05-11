import styled, { css } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
  }
`;

export const tagListSectionStyle = css`
  max-width: ${px2rem(1200)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: 0 auto ${px2rem(24)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: 0 auto ${px2rem(16)};
  }
`;
