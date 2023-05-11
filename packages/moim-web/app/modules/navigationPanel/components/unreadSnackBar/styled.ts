// vendor
import styled, { css } from "styled-components";

import { B3Regular } from "common/components/designSystem/typos";

import TopMentionIconBase from "@icon/18-doublearrow-g-3.svg";
import BottomMentionIconBase from "@icon/18-doublearrow-g-2.svg";
import TopUnreadIconBase from "@icon/18-doublearrow-t.svg";
import BottomUnreadIconBase from "@icon/18-doublearrow-b.svg";

// helper
import { px2rem } from "common/helpers/rem";

const SNACKBAR_MARGIN = 8;

export const UnreadSnackBarContent = styled(B3Regular)`
  padding: ${px2rem(7)} 0 ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-left: ${px2rem(9)};
  white-space: nowrap;
`;

export const SnackBarWrapper = styled.div<{
  transitionDirection: "top" | "bottom";
  position?: number;
}>`
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  z-index: ${props => props.theme.zIndexes.gnbSticky};
  transform: translateZ(0);
  will-change: transform;

  ${props => {
    switch (props.transitionDirection) {
      case "top":
        return css`
          top: ${px2rem((props.position ?? 0) + SNACKBAR_MARGIN)};
        `;

      case "bottom":
        return css`
          bottom: ${px2rem((props.position ?? 0) + SNACKBAR_MARGIN)};
        `;
    }
  }};
`;

export const TopUnreadIcon = styled(TopUnreadIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const BottomUnreadIcon = styled(BottomUnreadIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const TopMentionIcon = styled(TopMentionIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const BottomMentionIcon = styled(BottomMentionIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const snackbarStyle = css`
  position: relative !important;
`;
