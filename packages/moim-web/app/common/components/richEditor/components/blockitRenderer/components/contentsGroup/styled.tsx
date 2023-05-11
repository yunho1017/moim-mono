import styled from "styled-components";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";
import ViewMoreIconBase from "@icon/24-arrow-g.svg";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  B3RegularStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import LoadingIconBase from "common/components/loading/icon";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-bottom: ${px2rem(24)};
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

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle};
`;

export const ViewMoreContainer = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: ${px2rem(16)};
`;

export const Header = styled.div`
  width: 100%;
  margin: ${px2rem(40)} 0 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(8)} 0;
  }
`;

export const DividerWrapper = styled.div`
  padding-bottom: ${px2rem(4)};
`;

export const MoreButton = styled(TextGeneralButton).attrs({ size: "s" })`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  column-gap: ${px2rem(8)};
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${px2rem(8)};

  > div > div {
    margin-left: ${px2rem(8)};
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};

  ${Header} + ${ArrowContainer} {
    margin-top: ${px2rem(8)};
  }
  ${Header} + ${ListWrapper} {
    margin-top: ${px2rem(24)};
  }
`;

export const ItemContainer = styled.div`
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
