import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  height: 100%;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }

  ${useScrollStyle}
`;

export const DialogContent = css`
  width: 100%;
  overflow: hidden;
`;

export const BackButtonWrapper = styled.div`
  padding-top: ${px2rem(8)};
  padding-right: ${px2rem(8)};
`;
