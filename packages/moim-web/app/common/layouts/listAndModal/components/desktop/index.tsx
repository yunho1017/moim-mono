import * as React from "react";
import ModalView from "./modal";
import { Wrapper, List } from "./styled";

export interface IProps {
  isShowMainPanel: boolean;
  detailElement: React.ReactNode;
  listElement?: React.ReactNode;
  modalAppBar?: React.ReactNode;
  onClose?(): void;
}

const DesktopLayout: React.FC<IProps> = ({
  isShowMainPanel,
  detailElement,
  listElement,
  onClose,
  modalAppBar,
}) => (
  <Wrapper>
    {listElement && <List>{listElement}</List>}

    <ModalView open={isShowMainPanel} onClose={onClose} appBar={modalAppBar}>
      {detailElement}
    </ModalView>
  </Wrapper>
);

export default React.memo(DesktopLayout);
