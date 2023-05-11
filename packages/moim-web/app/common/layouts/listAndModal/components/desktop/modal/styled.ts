import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import { MODAL_WIDTH, MODAL_GAP } from "common/layouts/listAndModal/constants";
import { MEDIA_QUERY } from "common/constants/responsive";
import { getBGLevel2DialogStyle } from "common/components/designSystem/BGLevel/components/BGLevel2";

export const ModalContents = styled.div`
  width: 100%;
  position: relative;
  border-radius: ${px2rem(8)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-height: calc(100vh - ${px2rem(MODAL_GAP * 2)});
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    border-radius: 0;
  }
`;

export const ChildrenWrapper = styled.div`
  min-height: inherit;
`;

export const Dialog = styled(
  withStyles({
    paper: {
      margin: 0,
      borderRadius: px2rem(8),
      zIndex: 1001,
      width: "100%",
      maxWidth: px2rem(MODAL_WIDTH),
      [`@media ${MEDIA_QUERY.EXCEPT_DESKTOP}`]: {
        height: "fit-content !important",
        minHeight: "100%",
        borderRadius: "0 !important",
      },
    },
    paperScrollPaper: {
      height: "fit-content",
      maxHeight: "initial",
      margin: `${px2rem(MODAL_GAP)} 0 `,
      borderRadius: px2rem(8),
      overflow: "initial",
      [`@media ${MEDIA_QUERY.EXCEPT_DESKTOP}`]: {
        height: "100%",
        margin: 0,
        borderRadius: 0,
      },
    },
    container: {
      maxHeight: "initial",
      alignItems: "initial",
      overflow: "scroll",
    },
  })(DialogBase),
)`
  .MuiPaper-root {
    height: fit-content;

    @media ${MEDIA_QUERY.ONLY_DESKTOP} {
      border-radius: ${px2rem(8)};
      ${getBGLevel2DialogStyle({ borderRadius: 8 })};
    }

    @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
      border-radius: 0;
      ${getBGLevel2DialogStyle({ borderRadius: 0 })};
    }
  }
`;
