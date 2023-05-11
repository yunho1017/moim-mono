import * as History from "history";
import produce from "immer";
import { AppTypes, AuthTypes, GroupTypes } from "../actions/types";
import { AllActions } from "../actions";
import { CURRENT_USER_KEY } from "common/constants/keys";

export type IAppGlobalState = Readonly<{
  currentGroupId: Moim.Id | null;
  currentHubGroupId: Moim.Id | null;
  currentUserId: Moim.Id | null | undefined;
  blockedUsers: Moim.Id[];
  parentMoimUser: Moim.User.IOriginalUserDatum | null;

  authenticationLoading: Partial<Record<Moim.AuthenticationProvider, boolean>>;
  authenticationError: Partial<
    Record<Moim.AuthenticationProvider, Moim.IErrorResponse>
  >;
  appConfig: Moim.Group.IAppConfig | undefined;
  loggingIn: boolean;
  locale: string | null;
  history: {
    currentLocationKey?: string;
    locations: (History.Location<Moim.IHistoryState> | undefined)[];
  };
  providers: Record<string, { web: boolean; android: boolean; ios: boolean }>;
}>;

export const APP_INITIAL_STATE: IAppGlobalState = {
  currentUserId: undefined,
  currentGroupId: window.__bootData?.data?.group?.id ?? null,
  currentHubGroupId: window.__bootData?.data?.group
    ? window.__bootData.data.group.isHub
      ? window.__bootData.data.group.id
      : window.__bootData.data.group.parent
    : null,
  blockedUsers: [],
  parentMoimUser: null,
  authenticationLoading: {},
  authenticationError: {},
  appConfig: undefined,
  loggingIn: false,
  locale: null,
  providers: {
    kakao: { web: false, android: false, ios: false },
  },
  history: {
    currentLocationKey: undefined,
    locations: [],
  },
};

export const reducer = (state = APP_INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case AppTypes.INITIALIZE_HISTORY: {
        draft.history.locations = Array.from({ length: action.payload.size });
        break;
      }

      case AppTypes.PUSH_HISTORY: {
        const locationIndex = Number(
          (action.payload.location.state as any).index,
        );
        (draft.history.locations[
          locationIndex
        ] as any) = action.payload.location;
        draft.history.currentLocationKey = action.payload.location.key;
        break;
      }

      case AppTypes.CHANGE_LOCALE: {
        draft.locale = action.payload.locale;
        break;
      }

      case AppTypes.CURRENT_GROUP_CHANGED: {
        draft.currentGroupId = action.payload.group;
        draft.currentHubGroupId = action.payload.parent
          ? action.payload.parent
          : null;
        break;
      }

      case AuthTypes.CURRENT_USER_CHANGED: {
        const userId = action.payload.user;
        draft.loggingIn = false;
        draft.currentUserId = userId;
        draft.blockedUsers = [];
        if (userId) {
          localStorage.setItem(CURRENT_USER_KEY, userId);
        } else {
          localStorage.removeItem(CURRENT_USER_KEY);
        }

        break;
      }

      case AuthTypes.PARENT_MOIM_USER_CHANGED: {
        draft.loggingIn = false;
        draft.parentMoimUser = action.payload.user;
        break;
      }

      case AppTypes.PARENT_GROUP_CHANGED: {
        draft.currentHubGroupId = action.payload.group ?? null;
        break;
      }

      case AuthTypes.START_GET_AUTHENTICATION: {
        draft.authenticationLoading[action.payload.provider] = true;
        draft.authenticationError[action.payload.provider] = undefined;
        break;
      }

      case AuthTypes.FAILED_GET_AUTHENTICATION: {
        draft.authenticationLoading[action.payload.provider] = false;
        draft.authenticationError[action.payload.provider] =
          action.payload.error;
        break;
      }

      case AuthTypes.SUCCEED_GET_AUTHENTICATION: {
        draft.authenticationLoading.cryptobadge = false;
        break;
      }

      case AuthTypes.START_LOGGING_IN: {
        draft.loggingIn = true;
        break;
      }

      case AuthTypes.END_LOGGING_IN: {
        draft.loggingIn = false;
        break;
      }

      case AuthTypes.SIGN_OUT: {
        draft.currentUserId = null;
        draft.loggingIn = false;
        draft.authenticationLoading = {};
        draft.authenticationError = {};
        draft.parentMoimUser = null;
        draft.blockedUsers = [];
        break;
      }

      case AppTypes.SET_PROVIDERS: {
        Object.entries(action.payload.providers).forEach(([key, value]) => {
          draft.providers[key] = value;
        });
        break;
      }

      case GroupTypes.SUCCESS_BOOT_STRAP: {
        const { group, bannedUsers } = action.payload;

        if (bannedUsers) {
          draft.blockedUsers = bannedUsers;
        }

        if (group) {
          draft.currentGroupId = group.id;
        }
        break;
      }

      case AppTypes.SUCCEED_USER_BLOCK: {
        const { userId } = action.payload;

        draft.blockedUsers.push(userId);
        break;
      }

      case AppTypes.SUCCEED_USER_UNBLOCK: {
        const { userId } = action.payload;

        draft.blockedUsers = draft.blockedUsers.filter(id => id !== userId);
        break;
      }

      case AppTypes.SET_APP_CONFIG: {
        draft.appConfig = action.payload.appConfig;
        break;
      }
    }
  });
