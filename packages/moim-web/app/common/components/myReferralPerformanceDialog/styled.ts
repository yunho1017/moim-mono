import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 ${px2rem(16)} ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-width: 0;
  }
`;

export const TabContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;
