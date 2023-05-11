import styled from "styled-components";
// icons
import NotiOffIconBase from "@icon/24-notioff-g.svg";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "common/components/designSystem/BGLevel";

export const POST_TITLE_APPBAR_HEIGHT = 45;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const NotiOffIcon = styled(NotiOffIconBase).attrs({
  size: "s",
  role: "button",
  touch: 44,
})``;

export const ContentWrapper = styled.div``;

export const StickyWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  position: sticky;
  bottom: 0;
  z-index: ${props => props.theme.zIndexes.default};
`;
