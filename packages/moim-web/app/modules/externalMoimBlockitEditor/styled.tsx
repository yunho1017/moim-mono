import styled from "styled-components";
import { isiOS } from "common/helpers/browserDetect";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
// icons
import FileAttachmentIconBase from "@icon/24-file-g.svg";
import ImageFileAttachmentIconBase from "@icon/24-image-g.svg";
import MentionIconBase from "@icon/24-mention-g.svg";
import EmojiIconBase from "@icon/24-reaction-g.svg";

const THREAD_CONTENT_WIDTH = 632;
const LEFT_TOOL_BAR_CONTENT_WIDTH = 50;
const TOOLBAR_MOBILE_HEIGHT = 40;
const TOOLBAR_BORDER_HEIGHT = 1;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  position: sticky;
  z-index: ${props => props.theme.zIndexes.gnbSticky};

  > div {
    width: ${px2rem(682)};
    height: ${px2rem(40)};
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const RootWrapper = styled.div`
  width: 100%;
  height: ${`calc(100% - ${px2rem(44)})`};
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
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

export const EditorContainer = styled.div<{ isModal?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${props => !props.isModal && useScrollStyle};
  }
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
    top: ${px2rem(8)};
    right: -${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: ${isiOS() ? "fixed" : "sticky"};
    top: calc(0px + env(safe-area-inset-top));
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

export const SendButton = styled(FlatGeneralButton).attrs({
  size: "s",
})``;

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
