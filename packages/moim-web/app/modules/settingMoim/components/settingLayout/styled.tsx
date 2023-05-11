import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopWrapper = styled.div``;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(24)};
  }
`;

export const LeftWrapper = styled.div``;

export const RightWrapper = styled.div`
  flex: 1;
  min-width: 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(455)};
  }
`;
