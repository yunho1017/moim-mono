// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
// component
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import AppBar from "common/components/appBar";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import PositionApplyDialogContainer from "./";
import { CloseButton, ModalTitle } from "./styled";

import usePositionApplyDialog from "./hooks/usePositionApplyDialog";

export default function PositionApplyDialog() {
  const { open, initialPosition, closeDialog } = usePositionApplyDialog();
  return (
    <BasicResponsiveDialog open={open} onClose={closeDialog}>
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            titleElement={
              <ModalTitle>
                <FormattedMessage id="claim_position/page_title" />
              </ModalTitle>
            }
            titleAlignment="Center"
            leftButton={<CloseButton onClick={closeDialog} />}
          />
        }
        hasAppBarBorder={false}
      >
        <PositionApplyDialogContainer
          initialPosition={initialPosition}
          onApplyButtonClick={closeDialog}
        />
      </CustomAppBarModalLayout>
    </BasicResponsiveDialog>
  );
}
