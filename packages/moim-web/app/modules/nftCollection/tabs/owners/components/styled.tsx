import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import LoadingIconBase from "common/components/loading/icon";

export const RootWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContentWrapper = styled.div`
  width: ${px2rem(862)};
  height: 100%;
  max-width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const InnerWrapper = styled.div`
  width: 100%;
`;
