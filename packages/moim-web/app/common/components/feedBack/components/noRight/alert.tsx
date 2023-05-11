/**
 * Component Spec. https://sites.google.com/a/vingle.net/group/channel/common-function/Feedback#TOC-Case1.-Alert-Dialog
 */

import * as React from "react";
import NoRightAlertComponent from "./component/alert";

export interface IRefHandler {
  openHandler(): void;
  closeHandler(): void;
}

interface IProps {
  message?: React.ReactNode;
  onClose?(): void;
}

const NoRightAlert: React.RefForwardingComponent<IRefHandler, IProps> = (
  { message, onClose },
  ref,
) => {
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

  return (
    <NoRightAlertComponent
      open={open}
      message={message}
      onClose={handleClose}
    />
  );
};

export default React.forwardRef(NoRightAlert);
