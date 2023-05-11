import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import DownSmallIconBase from "@icon/18-downvote-c.svg";
import DownSmallSelectedIconBase from "@icon/18-downvote-fill-c.svg";
import DownLargeIconBase from "@icon/24-downvote-fill.svg";
import DownLargeUnSelectedIconBase from "@icon/24-downvote-1.svg";
import UpSmallIconBase from "@icon/18-upvote-c.svg";
import UpSmallSelectedIconBase from "@icon/18-upvote-fill-c.svg";
import UpLargeIconBase from "@icon/24-upvote-fill.svg";
import UpLargeUnSelectedIconBase from "@icon/24-upvote-1.svg";
import { MEDIA_QUERY } from "common/constants/responsive";

interface IIconProps {
  isActive: boolean;
  isHovered: boolean;
  disabled?: boolean;
}

const useIconHoverScaleUpTransition = css<IIconProps>`
  transition: transform 200ms ease-in;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    ${props =>
      !props.disabled &&
      props.isHovered &&
      css`
        transform: scale(1.2);
      `}
  }
`;

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  ${props => props.disabled && `pointer-events: none;`}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: ${px2rem(8)};
  }
`;

export const LargeButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: ${px2rem(8)};
  }
`;

export const SmallUp = styled(UpSmallIconBase).attrs(props => ({
  size: "xs",
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const SmallUpSelectedUp = styled(UpSmallSelectedIconBase).attrs(
  props => ({
    size: "xs",
    role: "button",
    iconColor: props.theme.getReactionButtonElementPalette("like").color,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const MiddleUp = styled(UpLargeIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  role: "button",
  iconColor: props.isActive
    ? props.theme.getReactionButtonElementPalette("like").color
    : props.theme.colorV2.colorSet.grey300,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const MiddleUnSelectedUp = styled(UpLargeUnSelectedIconBase).attrs(
  props => ({
    size: "xs",
    touch: 30,
    role: "button",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const LargeUp = styled(UpLargeIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.isActive
    ? props.theme.getReactionButtonElementPalette("like").color
    : props.theme.colorV2.colorSet.grey800,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const LargeUnSelectedUp = styled(UpLargeUnSelectedIconBase).attrs(
  props => ({
    size: "s",
    touch: 24,
    role: "button",
    iconColor: props.theme.colorV2.colorSet.grey800,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const SmallDown = styled(DownSmallIconBase).attrs(props => ({
  size: "xs",
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;
export const SmallDownSelectedDown = styled(DownSmallSelectedIconBase).attrs(
  props => ({
    size: "xs",
    role: "button",
    iconColor: props.theme.getReactionButtonElementPalette("dislike").color,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const MiddleDown = styled(DownLargeIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  role: "button",
  iconColor: props.isActive
    ? props.theme.getReactionButtonElementPalette("dislike").color
    : props.theme.colorV2.colorSet.grey300,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const MiddleUnSelectedDown = styled(DownLargeUnSelectedIconBase).attrs(
  props => ({
    size: "xs",
    touch: 30,
    role: "button",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const LargeDown = styled(DownLargeIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.isActive
    ? props.theme.getReactionButtonElementPalette("dislike").color
    : props.theme.colorV2.colorSet.grey800,
}))<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

export const LargeUnSelectedDown = styled(DownLargeUnSelectedIconBase).attrs(
  props => ({
    size: "s",
    touch: 24,
    role: "button",
    iconColor: props.theme.colorV2.colorSet.grey800,
  }),
)<IIconProps>`
  ${useIconHoverScaleUpTransition}
`;

interface ICountProps {
  isLiked: boolean;
}
export const Count = styled.div.attrs({ role: "button" })<ICountProps>`
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }

  color: ${props =>
    props.isLiked
      ? props.theme.colorV2.colorSet.grey800
      : props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
  line-height: 1;
`;

export const LargeCount = styled.div.attrs({ role: "button" })<ICountProps>`
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }

  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-left: ${px2rem(4)};
  ${B3RegularStyle};
  line-height: 1;
`;
