// vendor
import styled from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
// component
import CloseIconBase from "@icon/24-close-b.svg";
// helper
import { px2rem } from "common/helpers/rem";

export const Dialog = withStyles({
  paper: {
    borderRadius: px2rem(8),
  },
})(DialogBase);

export const FixedWidthDialog = withStyles({
  paper: {
    width: px2rem(455),
    borderRadius: px2rem(8),
  },
})(DialogBase);

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;

export const EmptyHolder = styled.div`
  width: ${px2rem(64)};
  height: ${px2rem(45)};
`;
