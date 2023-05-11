import * as React from "react";
import { IHookProps } from "./useProps";
import popupWindow from "common/helpers/popupWindow";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import { getOAuthTokenForGroup } from "common/helpers/cryptoBadgeHandlerWithInMemory";
import {
  getCanTokenFromMoimToken,
  getMoimTokenToCookie,
} from "common/helpers/authentication";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    hubGroupId,
    currentGroup,
    joinDialogType,
    storeSecondaryViewHandler,
    dispatchGetAuthentication,
    openJoinGroupDialog,
  } = hookProps;

  const handleClickButton = React.useCallback(() => {
    const token = hubGroupId
      ? getMoimTokenToCookie(hubGroupId)?.access_token
      : undefined;
    const canToken = getCanTokenFromMoimToken(token);

    const authentication: Moim.IAuthentication | null =
      hubGroupId && canToken
        ? { provider: "cryptobadge", token: canToken, group: hubGroupId }
        : getOAuthTokenForGroup();

    if (authentication) {
      openJoinGroupDialog(joinDialogType);
    } else {
      storeSecondaryViewHandler();
      dispatchGetAuthentication({
        provider: "cryptobadge",
        authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
        openJoinGroupDialogAfterGetParentUser: true,
      });
    }
  }, [
    storeSecondaryViewHandler,
    hubGroupId,
    currentGroup,
    dispatchGetAuthentication,
    joinDialogType,
    openJoinGroupDialog,
  ]);

  return {
    handleClickButton,
  };
}
