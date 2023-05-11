import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  H8BoldStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import LoadingIconBase from "common/components/loading/icon";

export const DEFAULT_GAP = 12;

export const RootWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InnerContentWrapper = styled.div`
  width: ${px2rem(968)};
  height: 100%;
  max-width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  margin: ${px2rem(40)} 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} 0 ${px2rem(16)};
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
`;

export const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};
`;

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle}
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
