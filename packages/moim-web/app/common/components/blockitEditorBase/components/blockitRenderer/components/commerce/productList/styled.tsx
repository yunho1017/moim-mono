import { px2rem } from "common/helpers/rem";
import styled from "styled-components";
import LoadingIconBase from "common/components/loading/icon";
import { MEDIA_QUERY } from "common/constants/responsive";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  column-gap: ${px2rem(12)};
  row-gap: ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;
