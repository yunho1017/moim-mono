import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import LoadingIconBase from "common/components/loading/icon";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8BoldStyle } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
    border-radius: ${px2rem(8)};
    padding: ${px2rem(12)} 0 0;
  }
`;

export const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
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

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
`;
