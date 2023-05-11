import * as React from "react";

import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

import LargeLikedIconBase from "@icon/24-like-fill.svg";
import LargeUnLikedIconBase from "@icon/24-like-1.svg";
import SmallLikedIconBase from "@icon/18-like-s-blue.svg";
import SmallUnLikedIconBase from "@icon/18-like-c.svg";
import MiddleLikedIconBase from "@icon/18-like-fill.svg";
import MiddleUnLikedIconBase from "@icon/18-like-1.svg";

import { MEDIA_QUERY } from "common/constants/responsive";

const LargeLikedIcon = styled(LargeLikedIconBase).attrs(props => {
  const iconColor = props.theme.getReactionButtonElementPalette("like").color;

  return {
    size: "s",
    touch: 24,
    role: "button",
    iconColor,
  };
})`
  transition: transform 200ms ease-in;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    &:hover {
      transform: scale(1.2);
    }
  }
`;
const LargeUnLikedIcon = styled(LargeUnLikedIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const SmallLikedIcon = styled(SmallLikedIconBase).attrs(props => {
  const iconColor = props.theme.getReactionButtonElementPalette("like").color;
  return {
    size: "xs",
    touch: 18,
    role: "button",
    iconColor,
  };
})``;

const SmallUnLikedIcon = styled(SmallUnLikedIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const MiddleLikedIcon = styled(MiddleLikedIconBase).attrs(props => {
  const iconColor = props.theme.getReactionButtonElementPalette("like").color;
  return {
    size: "xs",
    touch: 30,
    role: "button",
    iconColor,
  };
})``;

const MiddleUnLikedIcon = styled(MiddleUnLikedIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface ITriangleProps {
  liked: boolean;
  onClick(): void;
}

export const LargeLikeButton = ({ liked, onClick }: ITriangleProps) =>
  liked ? (
    <LargeLikedIcon onClick={onClick} />
  ) : (
    <LargeUnLikedIcon onClick={onClick} />
  );

export const MiddleLikeButton = ({ liked, onClick }: ITriangleProps) =>
  liked ? (
    <MiddleLikedIcon onClick={onClick} />
  ) : (
    <MiddleUnLikedIcon onClick={onClick} />
  );

export const SmallLikeButton = ({ liked, onClick }: ITriangleProps) =>
  liked ? (
    <SmallLikedIcon onClick={onClick} />
  ) : (
    <SmallUnLikedIcon onClick={onClick} />
  );

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  height: ${px2rem(18)};

  ${props => props.disabled && `pointer-events: none;`}
`;

const largeCountStyle = css<{
  isLiked: boolean;
  normalColor?: string;
  likedColor?: string;
}>`
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
  ${B3RegularStyle};
  line-height: 1;
  margin-left: ${px2rem(4)};
  color: ${props =>
    props.isLiked
      ? props.likedColor ?? props.theme.colorV2.colorSet.grey600
      : props.normalColor ?? props.theme.colorV2.colorSet.grey600};
`;

const smallCountStyle = css<{
  isLiked: boolean;
  normalColor?: string;
  likedColor?: string;
}>`
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
  color: ${props =>
    props.isLiked
      ? props.likedColor ?? props.theme.colorV2.colorSet.grey800
      : props.normalColor ?? props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
  line-height: 1;
`;

export const LargeCount = styled.div<{
  isLiked: boolean;
  normalColor?: string;
  likedColor?: string;
}>`
  ${largeCountStyle}
`;

export const SmallCount = styled.div<{
  isLiked: boolean;
  normalColor?: string;
  likedColor?: string;
}>`
  ${smallCountStyle}
`;

export const MiddleCount = styled.div<{
  isLiked: boolean;
  normalColor?: string;
  likedColor?: string;
}>`
  ${smallCountStyle}
`;
