import * as React from "react";

import { useActions, useStoreState } from "app/store";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";

import popupWindow from "common/helpers/popupWindow";
import { ActionCreators as GroupActionCreators } from "app/actions/group";
import { currentGroupSelector } from "app/selectors/app";
import useCancelToken from "common/hooks/useCancelToken";

import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import { getAuthentication } from "common/helpers/authentication/actions";
import { getMoimTokenToCookie } from "common/helpers/authentication";

export function useHandleSignIn(
  openJoinGroupDialogAfterGetParentUser?: boolean,
) {
  const { currentGroup, parentUser, hubGroupId } = useStoreState(
    storeState => ({
      currentGroup: currentGroupSelector(storeState),
      parentUser: storeState.app.parentMoimUser,
      hubGroupId: storeState.app.currentHubGroupId,
    }),
  );

  const { dispatchGetAuthentication, openJoinGroupDialog } = useActions({
    dispatchGetAuthentication: getAuthentication,
    openJoinGroupDialog: GroupActionCreators.openJoinGroupDialog,
  });
  const storeSecondaryViewHandler = useStoreSecondaryView();

  return React.useCallback(() => {
    const canToken = hubGroupId
      ? getMoimTokenToCookie(hubGroupId)?.access_token
      : undefined;
    if (currentGroup && !currentGroup.is_hub && parentUser && canToken) {
      openJoinGroupDialog("current");
    } else {
      storeSecondaryViewHandler();
      dispatchGetAuthentication({
        provider: "cryptobadge",
        authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
        openJoinGroupDialogAfterGetParentUser,
      });
    }
  }, [
    storeSecondaryViewHandler,
    hubGroupId,
    currentGroup,
    dispatchGetAuthentication,
    openJoinGroupDialog,
    parentUser,
  ]);
}

export function useHandleSignUp() {
  const cancelToken = useCancelToken();
  const storeSecondaryViewHandler = useStoreSecondaryView();
  const { dispatchGetAuthentication } = useActions({
    dispatchGetAuthentication: getAuthentication,
  });

  return React.useCallback(() => {
    storeSecondaryViewHandler();
    dispatchGetAuthentication({
      provider: "cryptobadge",
      authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
      isSignUp: true,
    });
  }, [storeSecondaryViewHandler, cancelToken, dispatchGetAuthentication]);
}
