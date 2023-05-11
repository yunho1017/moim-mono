import * as React from "react";
import { css } from "styled-components";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import RemitResult from "../../components/remitResult";
import { DialogContent } from "./styled";

interface IProps {}

const RemitResultContainer: React.FC<IProps> = ({}) => {
  const isMobile = useIsMobile();
  const { isOpen, resultType } = useStoreState(state => ({
    isOpen: state.campaignPage.openRemitResultDialog.isOpen,
    resultType: state.campaignPage.openRemitResultDialog.type,
  }));
  const { closeDialog } = useActions({
    closeDialog: CampaignActionCreators.closeRemitResultDialog,
  });

  const handleClose = React.useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  return (
    <FixedHeightBasicDialog open={isOpen} onClose={handleClose}>
      <CustomAppBarModalLayout
        hasAppBarBorder={false}
        appBar={<></>}
        contentStyle={DialogContent}
        disableScrollLock={true}
        wrapperStyle={
          isMobile
            ? css`
                margin-top: 0;
              `
            : undefined
        }
      >
        <RemitResult type={resultType} onClose={handleClose} />
      </CustomAppBarModalLayout>
    </FixedHeightBasicDialog>
  );
};

export default RemitResultContainer;
