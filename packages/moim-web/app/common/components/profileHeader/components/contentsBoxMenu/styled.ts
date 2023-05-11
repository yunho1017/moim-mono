// vendor
import styled from "styled-components";
// component
import { B1Regular } from "common/components/designSystem/typos";
// icons
import BookmarkIconBase from "@icon/18-bookmark-1.svg";
import DraftIcon from "@icon/24-forum-g.svg";
// helper
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MenuWrapper = styled.ul`
  width: 100%;
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    max-width: ${px2rem(300)};
  }
`;

export const MenuText = styled(B1Regular)`
  margin-left: ${px2rem(12)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const BookmarkIcon = styled(BookmarkIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const DraftMenuIcon = styled(DraftIcon).attrs({
  size: "xs",
})``;
