import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import VideoCallIconBase from "@icon/48-video-chat.svg";
import VideoCallGreyIconBase from "@icon/48-video-chat-g.svg";
import { marginToPadding } from "../helper/blockitStyleHelpers";
import {
  H9Bold,
  B4Regular,
  H10BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const AvatarSize = 36;

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(8)} ${px2rem(4)};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Inner = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
  padding: ${px2rem(8)} 0;

  .customTooltipTheme {
    color: ${props => props.theme.colorV2.colorSet.white1000} !important;
    background-color: ${props =>
      props.theme.colorV2.colorSet.grey700} !important;
    ${B4RegularStyle};
    &.place-bottom {
      margin-top: ${px2rem(4)};
      &::after {
        border-bottom-width: 0 !important;
      }
    }

    &.place-top {
      margin-bottom: ${px2rem(4)};
      &::after {
        border-top-width: 0 !important;
      }
    }

    &.place-left {
      margin-right: ${px2rem(4)};
      &::after {
        border-left-width: 0 !important;
      }
    }

    &.place-right {
      margin-left: ${px2rem(4)};
      &::after {
        border-right-width: 0 !important;
      }
    }
  }
`;

export const VideoCallIcon = styled(VideoCallIconBase).attrs(props => ({
  size: "l",
  touch: 48,
  iconColor: props.theme.colorV2.accent,
}))`
  cursor: default;
`;
export const VideoCallGreyIcon = styled(VideoCallGreyIconBase).attrs({
  size: "l",
  touch: 48,
})`
  cursor: default;
  opacity: 0.4;
`;

export const Header = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  padding: ${px2rem(12)} ${px2rem(16)};
`;

export const Left = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  margin-right: ${px2rem(12)};
`;

export const Body = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const SubTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-top: ${px2rem(2)};
`;

export const AvatarChip = styled.div<{
  isLast?: boolean;
  remainCount?: number;
  isEnded?: boolean;
}>`
  position: relative;
  width: ${px2rem(AvatarSize)};
  height: ${px2rem(AvatarSize)};
  border-radius: 100%;

  img {
    width: ${px2rem(AvatarSize)};
    height: ${px2rem(AvatarSize)};
    max-width: inherit;
    border-radius: 100%;
    ${props =>
      props.isEnded &&
      css`
        filter: grayscale(100%);
      `}
  }

  & + & {
    margin-left: ${px2rem(8)};
  }

  ${props =>
    props.isLast && (props.remainCount || 0) > 0
      ? css`
          &::after {
            position: absolute;
            content: "+${props.remainCount}";
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: ${props.theme.colorV2.colorSet.grey50};
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${props.theme.colorV2.colorSet.white1000};
            top: 0;
            left:0;
            right:0;
            bottom:0;

            ${H10BoldStyle}
          }
        `
      : null}
`;

export const AttendeesContainer = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
  display: flex;
  align-items: center;
`;
