import styled, { css } from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

import CloseIconBase from "@icon/24-close-b.svg";
import BackIconBase from "@icon/24-back-b.svg";
import {
  BG_LEVEL_BACKGROUND_CLASS_NAME,
  getBGLevel3DialogStyle,
} from "../designSystem/BGLevel";

const defaultCSS = css`
  .MuiPaper-root {
    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      border-radius: ${px2rem(8)};
      ${getBGLevel3DialogStyle({ borderRadius: 8 })}
    }
    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      border-radius: 0;
      ${getBGLevel3DialogStyle()}
    }
  }
`;

export const defaultStyle = {
  paper: {
    margin: 0,
    borderRadius: 0,
    zIndex: 1001,
    [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: { borderRadius: px2rem(8) },
  },
  paperScrollPaper: {
    [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
      width: "100%",
      height: "100%",
      maxHeight: "initial",
    },
  },
};

export const Dialog = styled(
  withStyles({
    ...defaultStyle,
    paper: {
      ...defaultStyle.paper,
      width: px2rem(455),
      maxHeight: px2rem(678),
      minHeight: px2rem(220),
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const WithOutMinHeightDialog = styled(
  withStyles({
    ...defaultStyle,
    paper: {
      ...defaultStyle.paper,
      width: px2rem(455),
      maxHeight: px2rem(678),
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const WithOutMaxHeightDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        margin: px2rem(40),
      },
      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        maxHeight: "100%",
        height: "100%",
      },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const FixedHeightDialog = styled(
  withStyles({
    ...defaultStyle,
    paper: {
      ...defaultStyle.paper,
      width: px2rem(455),
      height: px2rem(678),
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const GroupInputDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        minHeight: px2rem(210),
        maxHeight: px2rem(678),
      },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const TagSetDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        height: px2rem(520),
      },
      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        width: "100%",
      },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const PopupBannerDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        minHeight: px2rem(455),
      },
      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        width: px2rem(295),
        minHeight: px2rem(295),
      },
    },
  })(DialogBase),
)`
  .MuiPaper-root {
    border-radius: ${px2rem(8)};
    ${getBGLevel3DialogStyle({ borderRadius: 8 })}
  }
`;

export const CoinGuideDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        maxHeight: px2rem(545),
        minHeight: px2rem(180),
      },
      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        width: "100%",
      },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const CoinTransferDialog = styled(
  withStyles({
    ...defaultStyle,
    paperScrollPaper: {
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
        width: px2rem(455),
        minHeight: px2rem(544),
        maxHeight: px2rem(648),
      },
      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        width: "100vw",
        height: "100vh",
        maxWeight: "none",
        maxHeight: "none",
      },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const VideoCallDisclaimerDialog = styled(
  withStyles({
    ...defaultStyle,
    paper: {
      ...defaultStyle.paper,
      width: "100vw",
      height: "100vh",
      [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: { borderRadius: "none" },
    },
  })(DialogBase),
)`
  ${defaultCSS}
`;

export const AppBarWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndexes.default};
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(0)};
`;

export const CloseButtonWrapper = styled.div`
  margin-left: ${px2rem(13)};
  display: flex;
  align-items: center;
`;

export const CloseButton = styled(CloseIconBase).attrs(props => ({
  size: "s",
  touch: props.touch ?? 24,
  role: "button",
}))``;

export const BackButton = styled(BackIconBase).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;
