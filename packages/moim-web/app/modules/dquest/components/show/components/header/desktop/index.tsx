import * as React from "react";
import { ModalShowHeader, RightWrapper, CloseButton } from "./styled";

export interface IProps {
  onClose(): void;
}

const DesktopHeader: React.FC<IProps> = ({ onClose }) => {
  return (
    <ModalShowHeader>
      <RightWrapper>
        <CloseButton onClick={onClose} />
      </RightWrapper>
    </ModalShowHeader>
  );
};

export default React.memo(DesktopHeader);
