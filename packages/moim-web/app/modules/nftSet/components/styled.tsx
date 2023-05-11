import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import LoadingIconBase from "common/components/loading/icon";

export const DEFAULT_GAP = 12;

export const RootWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InnerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InnerContentWrapper = styled.div`
  width: ${px2rem(1200)};
  max-width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const Body = styled.div`
  width: 100%;
  min-height: 0;
  flex: 1;
  padding: 0 ${px2rem(16)};
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const InnerWrapper = styled.div<{
  columnCount?: number;
}>`
  width: 100%;
  display: grid;
  place-content: center;
  gap: ${px2rem(24)} ${px2rem(12)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};

  img {
    height: 100%;
  }
`;
