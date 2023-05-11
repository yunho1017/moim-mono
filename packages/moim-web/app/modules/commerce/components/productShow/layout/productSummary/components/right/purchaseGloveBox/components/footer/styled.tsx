import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import ShareIconBase from "@icon/24-shareios-b.svg";
import LikeEmptyIconBase from "@icon/24-like-2.svg";
import LikeFillIconBase from "@icon/24-like-fill.svg";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

const GLOVE_BOX_HEIGHT_DESKTOP = 62; // top/bottom : 7px + button 48
export const GLOVE_BOX_HEIGHT_MOBILE = 68; // top: 10px + bottom: 10px + button 38

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    box-shadow: ${props => props.theme.shadow.whiteElevated};
    z-index: ${props => props.theme.zIndexes.wrapper + 1};
  }
`;
export const BlackWishIcon = styled(LikeEmptyIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
export const WhiteStarIcon = styled(LikeEmptyIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const LikeEmptyIcon = styled(LikeEmptyIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))`
  margin-top: ${px2rem(4)};
`;

export const LikeFillIcon = styled(LikeFillIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.color.red700,
}))`
  margin-top: ${px2rem(4)};
`;

export const FavoriteButton = styled(GhostGeneralButton)<{
  isFavorite?: boolean;
}>`
  min-width: inherit;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isFavorite &&
    css`
      background-color: ${props.theme.color.red700};
      border-color: ${props.theme.color.red700};
    `};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    border: none;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(48)};
  }
`;

export const LikeButton = styled(GhostGeneralButton)`
  min-width: inherit;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    border: none;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(48)};
  }
`;

export const ShareButton = styled(GhostGeneralButton)`
  min-width: inherit;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    border: none;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(48)};
  }
`;

export const Inner = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    align-items: center;
    height: ${px2rem(GLOVE_BOX_HEIGHT_MOBILE)};
    padding: ${px2rem(10)} ${px2rem(16)};

    button + button {
      margin-left: ${px2rem(12)};
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(GLOVE_BOX_HEIGHT_DESKTOP)};
    padding: ${px2rem(7)} 0;

    button + button {
      margin-left: ${px2rem(12)};
    }
  }
`;
