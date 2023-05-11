/**
 * Component Spec. https://sites.google.com/a/vingle.net/group/channel/common-function/Feedback#TOC-Case3.-Common-Full-Page-Dialog
 */

import * as React from "react";
import NoRightDialogComponent from "./component/dialog";

export interface IRefHandler {
  openHandler(): void;
  closeHandler(): void;
}

interface IProps {
  onClose?(): void;
}

const NoRightDialog = React.forwardRef<IRefHandler, IProps>(
  ({ onClose }, ref) => {
    const [open, setOpenStatus] = React.useState(false);

    const handleOpen = React.useCallback(() => {
      setOpenStatus(true);
    }, []);

    const handleClose = React.useCallback(() => {
      onClose?.();
      setOpenStatus(false);
    }, [onClose]);

    React.useImperativeHandle(ref, () => ({
      openHandler: handleOpen,
      closeHandler: handleClose,
    }));

    return <NoRightDialogComponent open={open} onClose={handleClose} />;
  },
);

export default NoRightDialog;
