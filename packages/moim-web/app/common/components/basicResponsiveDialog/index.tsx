import * as React from "react";
import { DialogProps } from "@material-ui/core/Dialog";
import { Dialog, FixedHeightDialog, WithOutMinHeightDialog } from "./styled";

type IProps = DialogProps;

function BasicResponsiveDialog(props: IProps) {
  const { open, onClose, children, ...rest } = props;

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" {...rest}>
      {children}
    </Dialog>
  );
}
export function WithoutMinHeightResponsiveDialog(props: IProps) {
  const { open, onClose, children, ...rest } = props;

  return (
    <WithOutMinHeightDialog
      open={open}
      onClose={onClose}
      scroll="paper"
      {...rest}
    >
      {children}
    </WithOutMinHeightDialog>
  );
}

export function FixedHeightBasicDialog(props: IProps) {
  const { open, onClose, children, ...rest } = props;

  return (
    <FixedHeightDialog open={open} onClose={onClose} scroll="paper" {...rest}>
      {children}
    </FixedHeightDialog>
  );
}

export default BasicResponsiveDialog;
