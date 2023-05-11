// vendor
import * as React from "react";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
// component
import AlertModalLayout, {
  IProps as IAlertModalLayout,
} from "app/common/components/modalLayout/alert";

const Dialog = withStyles({
  root: {
    zIndex: "1400 !important" as any,
  },
  paper: {
    overflowY: "hidden",
  },
})(DialogBase);

interface IProps extends IAlertModalLayout {
  open: boolean;
  onClose: () => void;
}

export default React.memo(({ open, onClose, ...props }: IProps) => (
  <Dialog open={open} onClose={onClose}>
    <AlertModalLayout {...props} />
  </Dialog>
));
