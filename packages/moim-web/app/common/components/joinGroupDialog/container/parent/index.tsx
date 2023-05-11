import * as React from "react";
// components
import AppBar from "common/components/appBar";
import { CloseButton } from "common/components/responsiveDialog/styled";
import ParentJoinDialogComponent from "./component";
import {
  Wrapper,
  Contents,
  CloseButtonWrapper,
  AppBarWrapper,
} from "../../styled";
import AlertDialog from "common/components/alertDialog";

import { useActions, useStoreState } from "app/store";
import { useIntlShort } from "common/hooks/useIntlShort";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
import useOpenState from "common/hooks/useOpenState";

import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { signOut } from "app/actions/app";
import { getParentGroup } from "app/actions/group";
import { currentGroupSelector } from "app/selectors/app";
import { getHasRequiredSignUpConfig } from "../../helpers";

interface IProps {
  authentication: Moim.IAuthentication | null;
}

export default function ParentJoinDialog({ authentication }: IProps) {
  const intl = useIntlShort();
  const parentGroup = useCurrentHubGroup();
  const hasRequiredSignUpConfig = getHasRequiredSignUpConfig(parentGroup);
  const [step, setStep] = React.useState<
    Moim.Group.JoinGroupDialogStepType | undefined
  >(undefined);
  const {
    isOpen: isLeaveAlertDialog,
    open: openLeaveAlertDialog,
    close: closeLeaveAlertDialog,
  } = useOpenState();
  const { open, initialStep, currentGroup } = useStoreState(state => ({
    open: state.joinGroupDialog.open,
    initialStep: state.joinGroupDialog.initialStep,
    currentGroup: currentGroupSelector(state),
  }));
  const {
    dispatchCloseDialog,
    dispatchSignOut,
    dispatchGetParentGroup,
  } = useActions({
    dispatchCloseDialog: GroupActionCreators.closeJoinGroupDialog,
    dispatchSignOut: signOut,
    dispatchGetParentGroup: getParentGroup,
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
    if (open) {
      if (!parentGroup && currentGroup) {
        dispatchGetParentGroup(currentGroup.parent ?? "");
      }
      if (initialStep) {
        setStep(initialStep);
        return;
      }

      setStep("username");
    } else {
      setStep("username");
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
          <ParentJoinDialogComponent
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
