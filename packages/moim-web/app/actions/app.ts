import * as History from "history";

import { CancelToken } from "axios";
import memoize from "lodash/memoize";
import { AppTypes } from "./types";
import { loadEntities } from "./entity";
import { ThunkPromiseResult, ThunkResult } from "../store";
import { groupSingleItemNormalizer } from "../models";
// helper
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { ActionCreators as AuthActionCreators } from "common/helpers/authentication/actions";
import { ActionUnion } from "./helpers";

import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import SessionHandler from "common/helpers/sessionHandler";
import {
  CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP,
  CURRENT_USER_KEY,
} from "common/constants/keys";

import { IGroupAppState } from "app/rootReducer";

import selectHubMoimId from "app/common/helpers/selectHubMoimId";
import { removeMoimTokenCookie } from "common/helpers/authentication";

function createAction<T extends { type: AppTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  parentGroupChanged: (payload: { group: string | null }) =>
    createAction({ type: AppTypes.PARENT_GROUP_CHANGED, payload }),
  currentGroupChanged: (payload: {
    group: string | null;
    parent?: string | null;
  }) => createAction({ type: AppTypes.CURRENT_GROUP_CHANGED, payload }),

  changeLocale: (locale: string) =>
    createAction({
      type: AppTypes.CHANGE_LOCALE,
      payload: {
        locale,
      },
    }),
  initializeHistory: (size: number) =>
    createAction({
      type: AppTypes.INITIALIZE_HISTORY,
      payload: {
        size,
      },
    }),
  pushHistory: (location: History.Location, action: History.Action) =>
    createAction({
      type: AppTypes.PUSH_HISTORY,
      payload: {
        location,
        action,
      },
    }),

  userMuteGlobalNotification: () =>
    createAction({
      type: AppTypes.USER_GLOBAL_MUTE_NOTIFICATION,
    }),

  setProviders: (
    providers: Record<string, { web: boolean; android: boolean; ios: boolean }>,
  ) =>
    createAction({
      type: AppTypes.SET_PROVIDERS,
      payload: {
        providers,
      },
    }),

  succeedUserBlock: (userId: Moim.Id) =>
    createAction({
      type: AppTypes.SUCCEED_USER_BLOCK,
      payload: { userId },
    }),
  succeedUserUnblock: (userId: Moim.Id) =>
    createAction({
      type: AppTypes.SUCCEED_USER_UNBLOCK,
      payload: { userId },
    }),
  setAppConfig: (appConfig?: Moim.Group.IAppConfig) =>
    createAction({ type: AppTypes.SET_APP_CONFIG, payload: { appConfig } }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function fetchCurrentGroup(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const result = await apiSelector(
      getState(),
      dispatch,
    ).group.getCurrentGroup();
    const group = groupSingleItemNormalizer(result);
    dispatch(loadEntities(group.entities));
    dispatch(
      ActionCreators.currentGroupChanged({
        group: group.result.data,
        parent:
          result.data.parent ?? (result.data.is_hub ? result.data.id : null),
      }),
    );
  };
}

export function signOut(message?: string): ThunkResult {
  return async (dispatch, getState) => {
    try {
      if (SessionHandler.get("INITIAL_TOAST_MESSAGE")) {
        return;
      }

      const hubGroupId = selectHubMoimId(getState());
      localStorage.removeItem(CURRENT_USER_KEY);
      ExpiredInMemoryHelper.remove(CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP);
      if (hubGroupId) {
        removeMoimTokenCookie(hubGroupId);
      }
      if (message) {
        SessionHandler.set("INITIAL_TOAST_MESSAGE", message);
      }
      dispatch(AuthActionCreators.signOut());
      setTimeout(() => {
        location.reload();
      }, 500);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };
}

function setStateIndexFromLocation({
  location,
  action,
  history,
  locations,
  currentLocationKey,
}: {
  location: History.Location<Moim.IHistoryState>;
  history: History.History<Moim.IHistoryState>;
  action: History.Action;
  locations: (History.Location<Moim.IHistoryState> | undefined)[];
  currentLocationKey?: string;
}): History.Location<Moim.IHistoryState> {
  // Set location's index from history length
  if (!location.state || location.state.index === undefined) {
    const index =
      action === "REPLACE"
        ? locations.findIndex(loc => loc && loc.key === currentLocationKey)
        : history.length - 1;
    return {
      ...location,
      state: {
        ...(location.state || {}),
        index,
      },
    };
  }
  return location;
}

function handleLocationChangeGenerator(
  dispatch: any,
  history: History.History<Moim.IHistoryState>,
  getState: () => IGroupAppState,
) {
  return (location: History.Location<any>, action: History.Action) => {
    const {
      app: {
        history: { currentLocationKey, locations },
      },
    } = getState();
    const replaceLocation = setStateIndexFromLocation({
      // location: setDemoBranchFromLocation(location),
      location,
      history,
      action,
      locations,
      currentLocationKey,
    });
    if (replaceLocation !== location) {
      history.replace(replaceLocation);
    } else {
      dispatch(ActionCreators.pushHistory(location, action));
    }
  };
}

const memoLocationChangeGenerator = memoize(handleLocationChangeGenerator);

export function initializeHistory(
  history: History.History<Moim.IHistoryState>,
): ThunkResult {
  return (dispatch, getState) => {
    dispatch(ActionCreators.initializeHistory(history.length));
    const handleLocationChange = memoLocationChangeGenerator(
      dispatch,
      history,
      getState,
    );
    history.listen(handleLocationChange);
    handleLocationChange(history.location, history.action);
  };
}

export function userBlock(
  userId: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      await apiSelector(getState(), dispatch).user.userBlock(
        userId,
        cancelToken,
      );
      dispatch(ActionCreators.succeedUserBlock(userId));
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: intl => intl("snack_bar_message_block_user_success"),
        }),
      );
    } catch {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: intl => intl("snack_bar_message_block_user_fail"),
        }),
      );
    }
  };
}

export function userUnblock(
  userId: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      await apiSelector(getState(), dispatch).user.userUnblock(
        userId,
        cancelToken,
      );
      dispatch(ActionCreators.succeedUserUnblock(userId));
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: intl => intl("snack_bar_message_unblock_user_success"),
        }),
      );
    } catch {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: intl => intl("snack_bar_message_unblock_user_fail"),
        }),
      );
    }
  };
}
