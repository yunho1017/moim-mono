import styled, { css } from "styled-components";
import MenuIconBase from "@icon/24-menu-b.svg";
import ForumIconBase from "@icon/18-forum-g.svg";
import SearchIconBase from "@icon/24-search-b.svg";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    justify-content: flex-start;
  }
`;

export const Title = styled(H8Bold)<{
  isApplyFlex: boolean;
}>`
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${props =>
    props.isApplyFlex &&
    css`
      @media ${MEDIA_QUERY.TABLET} {
        flex: 1;
      }
    `};
`;

export const LeftButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const RightButtonWrapper = styled.div`
  display: flex;
  height: 100%;

  button + button {
    margin-left: ${px2rem(18)};
  }
`;

export const MenuIcon = styled(MenuIconBase).attrs(props => ({
  size: "s",
  touch: 44,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
export const SearchIcon = styled(SearchIconBase).attrs({
  size: "s",
  touch: 24,
})``;

export const ForumIcon = styled(ForumIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const appbarWrapperStyle = css`
  border-bottom: ${px2rem(1)} solid
    ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;
