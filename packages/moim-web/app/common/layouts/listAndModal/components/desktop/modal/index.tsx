import * as React from "react";
import { ModalContents, Dialog, ChildrenWrapper } from "./styled";

interface IProps {
  open: boolean;
  appBar: React.ReactNode;
  fullScreen?: boolean;
  onClose?(): void;
}
export default function ModalView({
  open,
  children,
  fullScreen,
  onClose,
}: React.PropsWithChildren<IProps>) {
  const handleModalContentsClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
    },
    [],
  );
  return (
    <Dialog open={open} fullScreen={fullScreen} onClose={onClose}>
      <ModalContents onClick={handleModalContentsClick}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </ModalContents>
    </Dialog>
  );
}
