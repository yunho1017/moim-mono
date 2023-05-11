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

  padding: ${px2rem(24)} ${px2rem(16)} ${px2rem(40)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-width: 0;
  }
`;

export const ShareItemList = styled.div`
  display: flex;
  justify-content: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    & > * + * {
      margin-left: ${px2rem(32)};
    }
  }

  margin-bottom: ${px2rem(24)};
`;
