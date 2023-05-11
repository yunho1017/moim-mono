import styled from "styled-components";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";
import ViewMoreIconBase from "@icon/24-arrow-g.svg";
import LoadingIconBase from "common/components/loading/icon";
import { px2rem } from "common/helpers/rem";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const Wrapper = styled.div`
  width: 100%;
  ${SectionMarginTopBottom}
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;

  .react-horizontal-scrolling-menu--scroll-container {
    padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(6)}; // NOTE: MoimCard의 transform, box-shadow 표현을 위해서 추가 공간을 확장했습니다.
  }
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const ItemContainer = styled.div`
  img {
    height: 100%;
  }

  > a > div {
    height: 100%;
    max-width: inherit;
    min-width: inherit;
  }
`;

export const MoreButtonIcon = styled(MoreButtonIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const ViewMoreIcon = styled(ViewMoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const Loading = styled(LoadingIconBase)``;
