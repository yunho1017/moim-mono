import LoadingIconBase from "common/components/loading/icon";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 100%;
  margin-top: ${px2rem(32)};
  margin-bottom: ${px2rem(20)};
  padding: 0 ${px2rem(136)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
    margin-top: ${px2rem(20)};
    margin-bottom: ${px2rem(8)};
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
    width: 100%;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
`;

export const Loading = styled(LoadingIconBase)``;

export const InnerWrapper = styled.div<{
  columnCount?: number;
}>`
  width: 100%;
  display: grid;
  place-content: center;
  gap: ${px2rem(8)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};

  img {
    height: 100%;
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  img {
    height: 100%;
  }

  > div {
    height: 100%;
  }
`;
