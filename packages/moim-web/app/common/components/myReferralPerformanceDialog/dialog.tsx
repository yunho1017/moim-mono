import * as React from "react";

import { FormattedMessage } from "react-intl";
import AppBar from "common/components/appBar";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import {
  CloseButton,
  AppBarWrapper,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import Inner from ".";
import { Wrapper } from "./styled";

import { useStoreState } from "app/store";
import { useCloseMyReferralPerformanceDialog } from "./hooks";

export default function MyReferralPerformanceDialog() {
  const close = useCloseMyReferralPerformanceDialog();
  const { open, referralPromotion, referralStat } = useStoreState(state => ({
    open: state.myReferralPerformanceDialog.open,
    referralPromotion: state.myReferralDialog.promotion,
    referralStat: state.myReferralDialog.referralStat,
  }));

  const useTab = React.useMemo(
    () =>
      referralPromotion ? referralPromotion?.reward?.type === "credit" : true,
    [referralPromotion],
  );

  return (
    <BasicResponsiveDialog open={open} onClose={close}>
      <Wrapper>
        <AppBarWrapper>
          <AppBar
            titleAlignment="Center"
            leftButton={
              <CloseButtonWrapper>
                <CloseButton onClick={close} />
              </CloseButtonWrapper>
            }
            titleElement={
              useTab ? (
                <FormattedMessage id="my_referral_my_performance_dialog_title" />
              ) : (
                <FormattedMessage
                  id="my_referral_my_performance_dialog_tab_invitees"
                  values={{ n: referralStat?.actionsCount ?? 0 }}
                />
              )
            }
          />
        </AppBarWrapper>
        <Inner useTab={useTab} />
      </Wrapper>
    </BasicResponsiveDialog>
  );
}
