import styled, { css } from "styled-components";
import { H4BoldStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import AutoHeightInput from "common/components/autoHeightInput";
import ChipBase from "common/components/chips";
import { isiOS } from "common/helpers/browserDetect";
import { MOBILE_HEADER_HEIGHT } from "./components/headerBar/styledComponents";

// icons
import FileAttachmentIconBase from "@icon/24-file-g.svg";
import ImageFileAttachmentIconBase from "@icon/24-image-g.svg";
import MentionIconBase from "@icon/24-mention-g.svg";
import EmojiIconBase from "@icon/24-reaction-g.svg";
import TagSetIconBase from "@icon/24-label.svg";
import ProductEmbedIconBase from "@icon/24-productbox.svg";

const THREAD_CONTENT_WIDTH = 632;
const LEFT_TOOL_BAR_CONTENT_WIDTH = 50;
const TOOLBAR_MOBILE_HEIGHT = 40;
const TOOLBAR_BORDER_HEIGHT = 1;

export const FileAttachmentIcon = styled(FileAttachmentIconBase).attrs(
  props => ({
    size: "s",
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;
export const ImageFileAttachmentIcon = styled(
  ImageFileAttachmentIconBase,
).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const MentionIcon = styled(MentionIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const EmojiIcon = styled(EmojiIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const TagSetIcon = styled(TagSetIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const ProductEmbedIcon = styled(ProductEmbedIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${px2rem(8)};
  position: relative;
  overflow: hidden;
`;

export const ResponsiveWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${px2rem(THREAD_CONTENT_WIDTH + LEFT_TOOL_BAR_CONTENT_WIDTH)};
  overflow: hidden;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: flex;
    &::after {
      content: "";
      width: ${px2rem(LEFT_TOOL_BAR_CONTENT_WIDTH)};
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-width: none;
  }
`;

export const Container = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: relative;
  }
`;

export const HandleButton = styled.button.attrs({
  role: "button",
  tabIndex: -1,
})`
  & + & {
    margin-top: ${px2rem(16)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    & + & {
      margin-top: 0;
      margin-left: ${px2rem(16)};
    }
  }
`;

export const ToolBoxContainer = styled.div<{
  scrollTop: number;
  scrollDirection: "up" | "down" | null;
}>`
  z-index: ${props => props.theme.zIndexes.popover};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: absolute;
    top: ${px2rem(74)};
    right: -${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: ${isiOS() ? "fixed" : "sticky"};
    top: calc(${px2rem(MOBILE_HEADER_HEIGHT)} + env(safe-area-inset-top));
    left: 0;
    right: 0;
    width: 100%;
    opacity: ${props => (props.scrollDirection === "up" ? 0 : 1)};
  }
`;

export const ToolBox = styled.div<{
  visible: boolean;
}>`
  position: fixed;
  width: ${px2rem(42)};
  padding: ${px2rem(9)};

  transition: opacity 130ms ease;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition-delay: ${props => (props.visible ? 0 : "130ms")};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${px2rem(TOOLBAR_MOBILE_HEIGHT)};
    padding: ${px2rem(8)} ${px2rem(9)};
    border-top: ${px2rem(TOOLBAR_BORDER_HEIGHT)} solid
      ${props => props.theme.colorV2.colorSet.grey50};
    border-bottom: ${px2rem(TOOLBAR_BORDER_HEIGHT)} solid
      ${props => props.theme.colorV2.colorSet.grey50};
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    z-index: ${props => props.theme.zIndexes.gnbSticky};
  }
`;

export const EditorContainer = styled.div<{ isModal?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  margin-top: ${px2rem(24)};
  padding: ${px2rem(8)} ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(24 + TOOLBAR_MOBILE_HEIGHT)};
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;
export const TitleInput = styled(AutoHeightInput)`
  ${H4BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  height: ${px2rem(42)};
`;

export const EditorWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};

  ::placeholder {
    opacity: 0.4;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(16)};
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;

export const EditorInnerBottomSpacer = styled.div`
  display: flex;
  flex-direction: column;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: ${px2rem(160)};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      height: ${px2rem(180)};
    }
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
