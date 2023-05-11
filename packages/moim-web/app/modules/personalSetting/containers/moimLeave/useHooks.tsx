import * as React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
// hooks
import { useActions, useStoreState } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useOpenState from "app/common/hooks/useOpenState";
import useTheme from "app/theme/hooks/useTheme";
import useGroupTexts from "common/hooks/useGroupTexts";
import useSuperPermission from "common/hooks/useSuperPermission";
// actions
import {
  ActionCreators as MeActionCreators,
  leaveMoim as leaveMoimAction,
} from "app/actions/me";

export type IProps = RouteComponentProps;

export function useProps(props: IProps) {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const currentMoim = useCurrentGroup();
  const storeState = useStoreState(state => ({
    ...state.moimLeavePage,
  }));
  const actions = useActions({
    leaveMoim: leaveMoimAction,
    openFailedLeaveMoimAlert: MeActionCreators.openFailedLeaveMoimAlert,
    closeFailedLeaveMoimAlert: MeActionCreators.closeFailedLeaveMoimAlert,
  });
  const themeContext = useTheme();
  const moimAliasName = useGroupTexts("child_moim");
  const [username, setUsername] = React.useState("");
  const [usernameValidation, setUsernameValidation] = React.useState<
    boolean | undefined
  >(undefined);
  const [confirmed, setConfirmStatus] = React.useState(false);
  const {
    isOpen: isOpenConfirmAlert,
    open: openConfirmAlert,
    close: closeConfirmAlert,
  } = useOpenState();
  const { hasPermission: hasSuperPermission } = useSuperPermission();

  return {
    ...props,
    ...storeState,
    ...actions,
    intl,
    themeContext,
    username,
    setUsername,
    currentUser,
    currentMoim,
    moimAliasName,
    usernameValidation,
    setUsernameValidation,
    isOpenConfirmAlert,
    openConfirmAlert,
    closeConfirmAlert,
    confirmed,
    setConfirmStatus,
    isChildMoim: Boolean(currentMoim?.parent),
    hasSuperPermission,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    intl,
    isChildMoim,
    leaveMoim,
    currentMoim,
    currentUser,
    username,
    setUsername,
    openConfirmAlert,
    closeConfirmAlert,
    setUsernameValidation,
    openFailedLeaveMoimAlert,
    hasSuperPermission,
  } = props;

  const handleUsernameChange = React.useCallback(
    (value: string) => {
      setUsername(value);
      setUsernameValidation(currentUser?.name === value);
    },
    [currentUser?.name],
  );

  const handleLeaveClick = React.useCallback(() => {
    if (hasSuperPermission) {
      openFailedLeaveMoimAlert();
      return;
    }
    const validation = username === currentUser?.name;
    setUsernameValidation(validation);
    if (validation) {
      openConfirmAlert();
    }
  }, [
    hasSuperPermission,
    username,
    currentUser,
    setUsernameValidation,
    openFailedLeaveMoimAlert,
    openConfirmAlert,
  ]);

  const doLeave = React.useCallback(() => {
    leaveMoim(
      intl.formatMessage(
        {
          id: "moim_settings/leave_child_moim/leave_success_toast_message",
        },
        { moim_name: currentMoim?.name },
      ),
      isChildMoim,
    );
    closeConfirmAlert();
  }, [leaveMoim, isChildMoim, intl, currentMoim, closeConfirmAlert]);

  return {
    ...props,
    handleUsernameChange,
    handleLeaveClick,
    doLeave,
  };
}
