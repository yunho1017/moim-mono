import axios from "axios";
import * as Sentry from "@sentry/browser";
import { storeMoimTokenToCookie } from ".";
import { updateActionsForRefresh } from "app/actions/boot";
import { loadEntities } from "app/actions/entity";
import { ActionCreators as GroupActionCreator } from "app/actions/group";
import { ActionUnion } from "app/actions/helpers";
import { AuthTypes } from "app/actions/types";
import selectHubMoimId from "app/common/helpers/selectHubMoimId";
import { userNormalizer } from "app/models";
import { currentGroupSelector } from "app/selectors/app";
import { ThunkPromiseResult } from "app/store";

import { errorParseData } from "common/helpers/APIErrorParser";
import getMoimAuthentication from "common/helpers/authentication/handlers/moim";
import { makeCryptobadgeRedirectUri } from "common/helpers/authentication/handlers/moim/helpers";
import { setOAuthTokenForGroup } from "common/helpers/cryptoBadgeHandlerWithInMemory";
import PopupWindowClass from "common/helpers/popupWindowClass";

import { AnalyticsClass } from "../analytics/analytics";
import { isBrowser } from "../envChecker";

function createAction<T extends { type: AuthTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startLoggingIn: () => createAction({ type: AuthTypes.START_LOGGING_IN }),
  endLoggingIn: () => createAction({ type: AuthTypes.END_LOGGING_IN }),
  signOut: () => createAction({ type: AuthTypes.SIGN_OUT }),

  currentUserChanged: (payload: { user: Moim.Id | null }) =>
    createAction({ type: AuthTypes.CURRENT_USER_CHANGED, payload }),
  parentMoimUserChanged: (payload: {
    user: Moim.User.IOriginalUserDatum | null;
  }) => createAction({ type: AuthTypes.PARENT_MOIM_USER_CHANGED, payload }),

  startGetAuthentication: (payload: {
    provider: Moim.AuthenticationProvider;
  }) => createAction({ type: AuthTypes.START_GET_AUTHENTICATION, payload }),
  failedGetAuthentication: (payload: {
    provider: Moim.AuthenticationProvider;
    error?: Moim.IErrorResponse;
  }) => createAction({ type: AuthTypes.FAILED_GET_AUTHENTICATION, payload }),
  succeedGetAuthentication: () =>
    createAction({ type: AuthTypes.SUCCEED_GET_AUTHENTICATION }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getCurrentUserWithParentFallback(
  hubGroupId?: string,
  fallbackWithParent?: boolean,
): ThunkPromiseResult<Moim.User.IOriginalUserDatum | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const user = (await apiSelector(getState(), dispatch).me.getProfile())
        .data;

      if (isBrowser()) {
        if (user) {
          Sentry.setUser({
            id: user.id,
            username: user.name,
          });

          AnalyticsClass.getInstance().setUser(user.id);
        } else {
          Sentry.setUser(null);
        }
      }

      const normalizedUser = userNormalizer(user);
      dispatch(loadEntities(normalizedUser.entities));
      dispatch(
        ActionCreators.currentUserChanged({ user: normalizedUser.result }),
      );
      return user;
    } catch (err) {
      dispatch(ActionCreators.currentUserChanged({ user: null }));
      if (
        axios.isAxiosError(err) &&
        err.response &&
        (err.response.status === 401 || err.response.status === 404) &&
        hubGroupId &&
        fallbackWithParent !== false
      ) {
        const user = (
          await apiSelector(getState(), dispatch, hubGroupId).me.getProfile()
        ).data;

        dispatch(ActionCreators.parentMoimUserChanged({ user }));
      }
    }
  };
}

export function fetchCurrentUser({
  errorHandler,
  fallbackWithParent,
}: {
  errorHandler?: (error?: Moim.IErrorResponse) => void;
  fallbackWithParent?: boolean;
}): ThunkPromiseResult {
  return async (dispatch, getState) => {
    dispatch(ActionCreators.startLoggingIn());
    const hubMoimId = getState().app.currentHubGroupId;
    try {
      if (!hubMoimId) {
        throw new Error("hubMoimId is not exist in fetchCurrentUser func");
      }
      await dispatch(
        getCurrentUserWithParentFallback(
          hubMoimId,
          Boolean(fallbackWithParent),
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse = errorParseData(error);

        errorHandler?.(errorResponse);
      }
    } finally {
      dispatch(ActionCreators.endLoggingIn());
      dispatch(updateActionsForRefresh());
    }
  };
}

export function getAuthentication({
  provider,
  authClient,
  errorHandler,
  isSignUp,
  afterWorkHandler,
  openJoinGroupDialogAfterGetParentUser,
}: {
  provider: Moim.AuthenticationProvider;
  authClient: PopupWindowClass;
  isSignUp?: boolean;
  errorHandler?: (error?: Moim.IErrorResponse) => void;
  afterWorkHandler?: () => void;
  openJoinGroupDialogAfterGetParentUser?: boolean;
}): ThunkPromiseResult {
  return async (dispatch, getState) => {
    try {
      const isHubGroup = currentGroupSelector(getState())?.is_hub;
      const hubGroupId = selectHubMoimId(getState());
      if (!hubGroupId) {
        return;
      }

      dispatch(ActionCreators.startGetAuthentication({ provider }));

      const handleError = (error?: Moim.IErrorResponse) => {
        if (errorHandler) {
          errorHandler();
        } else {
          // Note: getAuthentication를 호출하는 대부분의 곳에선 errorHandler를 안주고 잇음.
          // app/modules/quickJoin/useHooks.tsx에서 덮어쓴 경우를 사용중
          switch (error?.code) {
            case "LINKED_ACCOUNT_NOT_FOUND":
              if (isHubGroup !== undefined) {
                dispatch(
                  GroupActionCreator.openJoinGroupDialog(
                    isHubGroup ? "current" : "parent",
                  ),
                );
              }
              break;
            default:
              break;
          }
        }
        authClient.forceClose();
        dispatch(
          ActionCreators.failedGetAuthentication({
            provider,
            error,
          }),
        );
      };

      const handleAfterWork = (data: Moim.IMoimOAuthResponseData) => {
        const authentication = {
          group: getState().app.currentHubGroupId || "",
          token: data.access_token,
        };

        storeMoimTokenToCookie(hubGroupId, data);
        setOAuthTokenForGroup(authentication);

        dispatch(
          fetchCurrentUser({
            errorHandler: handleError,
          }),
        );

        afterWorkHandler?.();
      };

      const doCanPassOAuth = async () => {
        const groupId = getState().app.currentHubGroupId;
        if (!groupId) {
          throw new Error("hubMoimId is not exist in doCanPassOAut");
        }

        getMoimAuthentication(
          {
            groupId,
            redirectUrl: makeCryptobadgeRedirectUri(),
            isSignUp,
            providers: {
              kakao: getState().app.providers.kakao.web,
            },
            openJoinGroupDialogAfterGetParentUser,
          },
          authClient,
          handleAfterWork,
          handleError,
        );
      };

      switch (provider) {
        case "cryptobadge": {
          await doCanPassOAuth();
          break;
        }
        default: {
          throw new Error(`Provider(${provider}) is not exists in this system`);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(
          ActionCreators.failedGetAuthentication({
            provider,
            error: errorParseData(err),
          }),
        );
      }
    }
  };
}
