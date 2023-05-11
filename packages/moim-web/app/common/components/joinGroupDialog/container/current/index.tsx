import React from "react";
// components
import AppBar from "common/components/appBar";
import { CloseButton } from "common/components/responsiveDialog/styled";

import CurrentJoinDialogComponent from "./component";
import AlertDialog from "common/components/alertDialog";

import {
  Wrapper,
  Contents,
  CloseButtonWrapper,
  AppBarWrapper,
} from "../../styled";

import { useStoreState, useActions } from "app/store";
import { useIntlShort } from "common/hooks/useIntlShort";
import useOpenState from "common/hooks/useOpenState";

import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { getParentMoimUserData } from "app/actions/user";
import { currentGroupSelector } from "app/selectors/app";
import { getHasRequiredSignUpConfig } from "../../helpers";
import { signOut } from "app/actions/app";

export interface IProps {
  authentication: Moim.IAuthentication | null;
}

export default function CurrentJoinDialog({ authentication }: IProps) {
  const intl = useIntlShort();
  const [step, setStep] = React.useState<
    Moim.Group.JoinGroupDialogStepType | undefined
  >(undefined);
  const {
    isOpen: isLeaveAlertDialog,
    open: openLeaveAlertDialog,
    close: closeLeaveAlertDialog,
  } = useOpenState();
  const {
    open,
    initialStep,
    currentGroup,
    parentMoimUser,
    hasRequiredSignUpConfig,
    isGetParentMoimUserLoading,
  } = useStoreState(state => ({
    open: state.joinGroupDialog.open,
    initialStep: state.joinGroupDialog.initialStep,
    currentGroup: currentGroupSelector(state),
    hasRequiredSignUpConfig: getHasRequiredSignUpConfig(
      currentGroupSelector(state),
    ),
    parentMoimUser: state.app.parentMoimUser,
    isGetParentMoimUserLoading:
      state.joinGroupDialog.isGetParentMoimUserLoading,
  }));
  const {
    dispatchCloseDialog,
    dispatchGetParentMoimUserData,
    dispatchSignOut,
  } = useActions({
    dispatchCloseDialog: GroupActionCreators.closeJoinGroupDialog,
    dispatchGetParentMoimUserData: getParentMoimUserData,
    dispatchSignOut: signOut,
  });

  const handleSignOut = React.useCallback(() => {
    dispatchSignOut(intl("log_out_moim_success_toast_message"));
  }, [dispatchSignOut, intl]);

  const handleCloseDialog = React.useCallback(() => {
    if (step === "phone" && hasRequiredSignUpConfig) {
      openLeaveAlertDialog();
    } else {
      dispatchCloseDialog();
    }
  }, [
    step,
    openLeaveAlertDialog,
    dispatchCloseDialog,
    hasRequiredSignUpConfig,
  ]);

  React.useEffect(() => {
    const isChildGroup = !currentGroup?.is_hub;
    if (open) {
      if (
        isChildGroup &&
        !isGetParentMoimUserLoading &&
        !parentMoimUser?.id &&
        authentication
      ) {
        dispatchGetParentMoimUserData({
          provider: "cryptobadge",
          token: authentication.token,
        });
      }

      if (initialStep) {
        setStep(initialStep);
        return;
      }

      if (isChildGroup) {
        setStep("main");
      } else {
        setStep("username");
      }
    } else {
      setStep(undefined);
    }
  }, [open]);

  const alertButtons = React.useMemo(
    () => [
      {
        text: intl("cancel_button"),
        onClick: closeLeaveAlertDialog,
      },
      {
        text: intl("ok_button"),
        onClick: handleSignOut,
      },
    ],
    [closeLeaveAlertDialog, intl, handleSignOut],
  );

  return (
    <>
      <AppBarWrapper>
        <AppBar
          leftButton={
            <CloseButtonWrapper>
              <CloseButton onClick={handleCloseDialog} />
            </CloseButtonWrapper>
          }
          titleElement=""
        />
      </AppBarWrapper>

      <Wrapper>
        <Contents>
          <CurrentJoinDialogComponent
            authentication={authentication}
            step={step}
            setStep={setStep}
          />
        </Contents>
      </Wrapper>
      <AlertDialog
        open={isLeaveAlertDialog}
        content={intl("dialog_mobile_phone_number_verification_next_body")}
        rightButtons={alertButtons}
        onClose={closeLeaveAlertDialog}
      />
    </>
  );
}
