import styled from "styled-components";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";
import ViewMoreIconBase from "@icon/24-arrow-g.svg";
import { H4BoldStyle } from "common/components/designSystem/typos";
import LoadingIconBase from "common/components/loading/icon";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  margin-top: ${px2rem(32)};
  margin-bottom: ${px2rem(20)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(20)};
    margin-bottom: ${px2rem(8)};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  margin: 0;
  border: none;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H4BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const DividerWrapper = styled.div`
  padding-bottom: ${px2rem(4)};
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
`;

export const Inner = styled.div`
  width: 100%;
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

export const MoreButtonIcon = styled(MoreButtonIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const ViewMoreIcon = styled(ViewMoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const Loading = styled(LoadingIconBase)``;
