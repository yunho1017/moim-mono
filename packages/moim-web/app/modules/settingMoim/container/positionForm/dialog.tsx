// vendor
import * as React from "react";
import { useIntl } from "react-intl";
// component
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import AppBar from "common/components/appBar";
import { CloseButton, ModalContainer, ModalTitle } from "./styled";
import PositionFormContainer from "./";
import usePositionFormDialog from "common/hooks/usePositionFormDialog";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";

function PositionFormDialog() {
  const intl = useIntl();
  const { isOpen, close, mode } = usePositionFormDialog();
  const title = intl.formatMessage({
    id:
      mode === "create"
        ? "position_settings/create_position/page_title"
        : "position_settings/configuration_position/page_title",
  });

  return (
    <BasicResponsiveDialog open={isOpen} onClose={close}>
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            titleElement={<ModalTitle>{title}</ModalTitle>}
            titleAlignment="Center"
            leftButton={<CloseButton onClick={close} />}
          />
        }
      >
        <ModalContainer>
          <PositionFormContainer />
        </ModalContainer>
      </CustomAppBarModalLayout>
    </BasicResponsiveDialog>
  );
}

export default PositionFormDialog;
