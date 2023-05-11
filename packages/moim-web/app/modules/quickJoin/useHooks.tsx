import * as React from "react";
import debounce from "lodash/debounce";
import moment from "moment-timezone";
// helpers
import popupWindow from "common/helpers/popupWindow";
import getUserLocale from "common/helpers/getUserLocale";
// constants
import { WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX } from "common/constants/hosts";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import {
  QUICK_JOIN_MESSAGE_TYPE,
  QUICK_JOIN_MESSAGE_DATA_STATUS,
} from "app/common/constants/postMessage";
// actions
import { postUser } from "app/actions/user";
import { useActions, useStoreState } from "app/store";
// hooks
import useCancelToken from "common/hooks/useCancelToken";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import { getAuthentication } from "common/helpers/authentication/actions";

import { getOAuthTokenForGroup } from "common/helpers/cryptoBadgeHandlerWithInMemory";
import {
  getCanTokenFromMoimToken,
  getMoimTokenToCookie,
} from "common/helpers/authentication";

const provider: Moim.AuthenticationProvider = "cryptobadge";

export const REQUIRED_USERNAME_MESSAGE = JSON.stringify({
  source: "vingle_moim_co_IPC",
  payload: {
    type: QUICK_JOIN_MESSAGE_TYPE,
    data: {
      status: QUICK_JOIN_MESSAGE_DATA_STATUS.REQUIRED_USERNAME,
      message: "required username",
    },
  },
});

export const QUICK_JOIN_SUCCESS_MESSAGE = JSON.stringify({
  source: "vingle_moim_co_IPC",
  payload: {
    type: QUICK_JOIN_MESSAGE_TYPE,
    data: {
      status: QUICK_JOIN_MESSAGE_DATA_STATUS.SUCCESS,
      message: "",
    },
  },
});

export const ALREADY_JOINED_MESSAGE = JSON.stringify({
  source: "vingle_moim_co_IPC",
  payload: {
    type: QUICK_JOIN_MESSAGE_TYPE,
    data: {
      status: QUICK_JOIN_MESSAGE_DATA_STATUS.ALREADY_JOINED,
      message: "already joined",
    },
  },
});

export const WRONG_REFERRER_MESSAGE = JSON.stringify({
  source: "vingle_moim_co_IPC",
  payload: {
    type: QUICK_JOIN_MESSAGE_TYPE,
    data: {
      status: QUICK_JOIN_MESSAGE_DATA_STATUS.WRONG_REFERRER,
      message: "Wrong access",
    },
  },
});

export function useProps(props: { username?: string }) {
  const state = useStoreState(storeState => ({
    hubGroupId: storeState.app.currentHubGroupId,
    authenticationLoading: Boolean(
      storeState.app.authenticationLoading[provider],
    ),
  }));

  const actions = useActions({
    dispatchGetAuthentication: getAuthentication,
    dispatchJoinGroup: postUser,
  });

  const cancelToken = useCancelToken();

  return {
    ...props,
    ...actions,
    ...state,
    cancelToken,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    username,
    hubGroupId,
    dispatchGetAuthentication,
    dispatchJoinGroup,
    cancelToken,
  } = props;

  const storeSecondaryViewHandler = useStoreSecondaryView();

  const handleGetAuthError = React.useCallback(
    async (error: Moim.IErrorResponse) => {
      if (error?.code === "LINKED_ACCOUNT_NOT_FOUND") {
        const token = hubGroupId
          ? getMoimTokenToCookie(hubGroupId)?.access_token
          : undefined;
        const canToken = getCanTokenFromMoimToken(token);

        const authentication: Moim.IAuthentication | null =
          hubGroupId && canToken
            ? { provider: "cryptobadge", token: canToken, group: hubGroupId }
            : getOAuthTokenForGroup();
        if (authentication && username) {
          await dispatchJoinGroup(
            {
              user: {
                name: username,
                tz: moment.tz.guess(),
                locale: getUserLocale(),
                authentication,
              },
            },
            cancelToken.current.token,
          );
          window.opener.postMessage(QUICK_JOIN_SUCCESS_MESSAGE, "*");
        }
      } else {
        window.opener.postMessage(ALREADY_JOINED_MESSAGE, "*");
      }
    },
    [cancelToken, dispatchJoinGroup, hubGroupId, username],
  );

  const fetchAuthenticate = React.useCallback(
    debounce(async (iframeName: string) => {
      storeSecondaryViewHandler();
      await dispatchGetAuthentication({
        provider,
        authClient: popupWindow({
          ...CRYPTOBADGE_WINDOW_SIZE,
          id: iframeName,
        }),
        errorHandler: handleGetAuthError,
      });
    }, 1000),
    [dispatchGetAuthentication, handleGetAuthError],
  );

  const isCameFromMoim = React.useMemo(
    () =>
      WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX.test(document.referrer) ||
      document.referrer === location.origin,
    [],
  );

  return { ...props, fetchAuthenticate, isCameFromMoim };
}
