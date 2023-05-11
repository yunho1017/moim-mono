import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import Divider from "common/components/divider";
import { MEDIA_QUERY } from "common/constants/responsive";
import ChipBase from "common/components/chips";
import { B3RegularStyle } from "common/components/designSystem/typos";
// icons
import FileAttachmentIconBase from "@icon/18-file-g.svg";
import ImageFileAttachmentIconBase from "@icon/18-image-g.svg";
import MentionIconBase from "@icon/18-mention-g.svg";
import EmojiIconBase from "@icon/18-emoji-g.svg";
import TagSetIconBase from "@icon/18-tag-g.svg";
import ProductEmbedIconBase from "@icon/18-productbox-1.svg";
import InlineCodeIconBase from "@icon/18-codeblock-g.svg";
import DownloadableCouponIconBase from "@icon/18-coupon-1.svg";

export const Wrapper = styled.div<{ inactive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(44)};
  padding: 0 ${px2rem(8)};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  pointer-events: ${props => (props.inactive ? "none" : "inherit")};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow-y: auto;
  }
`;

export const FontSizeWrapper = css`
  min-width: inherit;
`;

export const FontSizeInnerWrapperStyle = css`
  min-width: ${px2rem(32)};
`;

export const Sep = styled(Divider).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(22),
}))`
  width: 1px;
  margin: 0 ${px2rem(6)};
`;

export const ToolBoxStyle = css<{ isActive?: boolean; inactive?: boolean }>`
  position: relative;
  pointer-events: ${props => (props.inactive ? "none" : "inherit")};

  & + & {
    margin-left: ${px2rem(6)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    & + & {
      margin-left: ${px2rem(16)};
    }
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${px2rem(3)};
    transition: background-color 200ms ease-in-out;
    z-index: 0;

    background-color: ${props =>
      props.isActive ? rgba(props.theme.colorV2.accent, 0.06) : "transparent"};
  }

  :hover {
    ::before {
      background-color: ${props =>
        props.inactive ? "inherit" : props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const HandleButton = styled.button.attrs({
  role: "button",
  tabIndex: -1,
})<{ isActive?: boolean; inactive?: boolean }>`
  ${ToolBoxStyle}
`;

export const SelectFontStyleOptionContainer = styled.button`
  > * {
    color: ${props => props.theme.colorV2.colorSet.grey800} !important;
  }
`;

export const SelectedTagsCountBadge = styled(ChipBase).attrs({
  shape: "round",
  size: "small",
  overrideStyle: css`
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
    color: ${props => props.theme.colorV2.colorSet.grey600};
    margin-left: ${px2rem(4)};
  `,
})``;

export const FontSizeOption = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;

export const SelectOptionContainer = styled.button.attrs({ tabIndex: -1 })`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${px2rem(7)} ${px2rem(16)} ${px2rem(8)};

  transition: background-color 300ms ease-in-out;

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const FileAttachmentIcon = styled(FileAttachmentIconBase).attrs<{
  inactive?: boolean;
}>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))``;
export const ImageFileAttachmentIcon = styled(
  ImageFileAttachmentIconBase,
).attrs<{ inactive?: boolean }>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))``;
export const MentionIcon = styled(MentionIconBase).attrs<{
  inactive?: boolean;
}>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))``;
export const EmojiIcon = styled(EmojiIconBase).attrs<{ inactive?: boolean }>(
  props => ({
    size: "xs",
    touch: 30,
    iconColor: props.inactive
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800,
  }),
)``;
export const TagSetIcon = styled(TagSetIconBase).attrs<{ inactive?: boolean }>(
  props => ({
    size: "xs",
    touch: 30,
    iconColor: props.inactive
      ? props.theme.colorV2.colorSet.grey300
      : props.theme.colorV2.colorSet.grey800,
  }),
)``;
export const ProductEmbedIcon = styled(ProductEmbedIconBase).attrs<{
  inactive?: boolean;
}>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))``;
export const DownloadableCouponIcon = styled(DownloadableCouponIconBase).attrs<{
  inactive?: boolean;
}>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))``;

export const InlineCodeIcon = styled(InlineCodeIconBase).attrs<{
  inactive?: boolean;
  isActive?: boolean;
}>(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.inactive
    ? props.theme.colorV2.colorSet.grey300
    : props.isActive
    ? props.theme.colorV2.accent
    : props.theme.colorV2.colorSet.grey800,
}))``;
