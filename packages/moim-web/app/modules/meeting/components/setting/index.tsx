import * as React from "react";
import { Dialog } from "app/common/components/basicResponsiveDialog/styled";
import useOpenState from "common/hooks/useOpenState";
import Content, { IProps } from "./deviceControl";

export interface IRef {
  open(): void;
  close(): void;
}

const Setting = React.forwardRef<IRef, IProps>(({ onSave }, ref) => {
  const { isOpen, open, close } = useOpenState(false);

  React.useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Dialog open={isOpen} disableEscapeKeyDown={true}>
      <Content onSave={onSave} />
    </Dialog>
  );
});

export default Setting;
