import React from "react";
import { DefaultLoader } from "common/components/loading";
import { CustomBackdrop, Dialog, MetamaskIcon, Title } from "./styled";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components";

interface IProps {
  isOpenClaimDialog: boolean;
  closeClaimDialog: () => void;
}

const ClaimBadgeRedirectLoadingDialog: React.FC<IProps> = ({
  isOpenClaimDialog,
  closeClaimDialog,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={isOpenClaimDialog}
      BackdropComponent={CustomBackdrop}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      onClose={closeClaimDialog}
    >
      <Title>
        <MetamaskIcon />
        <FormattedMessage id="badge_user_mint_redirect_dialog_body" />
      </Title>
      <DefaultLoader color={theme.colorV2.colorSet.grey800} />
    </Dialog>
  );
};

export default ClaimBadgeRedirectLoadingDialog;
