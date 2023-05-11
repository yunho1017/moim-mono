import * as React from "react";
import { FormattedMessage } from "react-intl";

import AppBar from "common/components/appBar";
import { GroupInputDialog as Dialog } from "common/components/basicResponsiveDialog/styled";
import FreezeView from "common/components/freezeView";
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import { CloseButton } from "../styled";

import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  isOpenDialog: boolean;
  onClose: () => void;
}

const AddressCreateDialogWrapper: React.FC<IProps> = ({
  isOpenDialog,
  onClose,
  children,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Dialog open={isOpenDialog} fullScreen={isMobile} onClose={onClose}>
        <CustomAppBarModalLayout
          appBar={
            <AppBar
              ignoreMobileTitleAlignment={true}
              leftButton={<CloseButton onClick={onClose} />}
              titleElement={<FormattedMessage id="add_address_page_title" />}
              titleAlignment="Center"
            />
          }
          hasAppBarBorder={false}
        >
          <FreezeView isFreeze={isOpenDialog} delayedFreeze={50}>
            {children}
          </FreezeView>
        </CustomAppBarModalLayout>
      </Dialog>
    </>
  );
};

export default AddressCreateDialogWrapper;
