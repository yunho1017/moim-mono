/* eslint-disable no-underscore-dangle */
import axios, { CancelToken, AxiosError } from "axios";
import { push } from "connected-react-router";
import { ThunkPromiseResult } from "../store";
import { GroupTypes } from "./types";
import GroupAPI from "common/api/group";
import MeAPI from "common/api/me";
import { ActionCreators as AppActionCreators } from "./app";
import {
  ActionCreators as AuthActionCreators,
  getCurrentUserWithParentFallback,
} from "common/helpers/authentication/actions";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import {
  ActionCreators as EntityActionCreators,
  loadEntitiesDirect,
} from "app/actions/entity";
import { ActionCreators as PromoteActionCreators } from "app/actions/promote";

// models
import { loadEntities } from "./entity";
import { groupSingleItemNormalizer, userNormalizer } from "app/models";
import { moimListNormalizer } from "../models/moim";
import { groupListNormalizer, groupNormalizer } from "../models/group";
// helpers
import { ActionUnion } from "./helpers";
import { errorParseData } from "common/helpers/APIErrorParser";
import {
  getCommerceBasicInfo,
  getSellerCategories,
} from "app/actions/commerce";
import { recommendGroupSectionListNormalizer } from "app/models/recommendGroupSection/normalizer";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import { getAllCampaign } from "app/actions/campaign";

import { MoimURL } from "common/helpers/url";
import MoimAPI from "common/api";
import {
  getCanTokenFromMoimToken,
  getMoimTokenToCookie,
} from "common/helpers/authentication";

function createAction<T extends { type: GroupTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  succeededGetInitialGroupId: () =>
    createAction({ type: GroupTypes.SUCCEEDED_GET_INITIAL_GROUP_ID }),

  startBootstrap: () =>
    createAction({
      type: GroupTypes.START_BOOT_STRAP,
    }),
  successBootstrap: (payload: {
    currentUserId?: string;
    bannedUsers?: string[];
    group?: Moim.Group.INormalizedGroup;
  }) =>
    createAction({
      type: GroupTypes.SUCCESS_BOOT_STRAP,
      payload,
    }),
  failedBootstrap: () =>
    createAction({
      type: GroupTypes.FAILED_BOOT_STRAP,
    }),

  startFetchingListGroup: () =>
    createAction({ type: GroupTypes.START_FETCHING_LIST_GROUP }),
  succeedFetchingListGroup: (payload: {
    groups: Moim.IPaginatedListResponse<string>;
  }) => createAction({ type: GroupTypes.FETCHED_LIST_GROUP, payload }),
  failedFetchingListGroup: () =>
    createAction({ type: GroupTypes.FAILED_FETCHING_LIST_GROUP }),

  startUpdateGroupIcon: (payload: { id: Moim.Id }) =>
    createAction({ payload, type: GroupTypes.START_UPDATE_GROUP_ICON }),
  succeedUpdateGroupIcon: () =>
    createAction({ type: GroupTypes.SUCCEED_UPDATE_GROUP_ICON }),
  failedUpdateGroupIcon: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ payload, type: GroupTypes.FAILED_UPDATE_GROUP_ICON }),

  startUpdateGroupBanner: (payload: { id: Moim.Id }) =>
    createAction({ payload, type: GroupTypes.START_UPDATE_GROUP_BANNER }),
  succeedUpdateGroupBanner: () =>
    createAction({ type: GroupTypes.SUCCEEDED_UPDATE_GROUP_BANNER }),
  failedUpdateGroupBanner: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ payload, type: GroupTypes.FAILED_UPDATE_GROUP_BANNER }),

  startCropGroupIcon: () =>
    createAction({ type: GroupTypes.START_CROP_GROUP_ICON }),
  succeedCropGroupIcon: () =>
    createAction({ type: GroupTypes.SUCCEEDED_CROP_GROUP_ICON }),
  failedCropGroupIcon: () =>
    createAction({ type: GroupTypes.FAILED_CROP_GROUP_ICON }),

  startCropGroupBanner: () =>
    createAction({ type: GroupTypes.START_CROP_GROUP_BANNER }),
  succeedCropGroupBanner: () =>
    createAction({ type: GroupTypes.SUCCEEDED_CROP_GROUP_BANNER }),
  failedCropGroupBanner: () =>
    createAction({ type: GroupTypes.FAILED_CROP_GROUP_BANNER }),

  startValidateGroupDomain: () =>
    createAction({ type: GroupTypes.START_VALIDATE_GROUP_DOMAIN }),
  validateGroupDomain: () =>
    createAction({ type: GroupTypes.VALIDATE_GROUP_DOMAIN }),

  startCreateGroup: () => createAction({ type: GroupTypes.START_CREATE_GROUP }),
  succeedCreateGroup: () =>
    createAction({ type: GroupTypes.SUCCEEDED_CREATE_GROUP }),
  failedCreateGroup: () =>
    createAction({ type: GroupTypes.FAILED_CREATE_GROUP }),

  startCreateSubGroup: () =>
    createAction({ type: GroupTypes.START_CREATE_SUB_GROUP }),
  succeedCreateSubGroup: () =>
    createAction({ type: GroupTypes.SUCCEEDED_CREATE_SUB_GROUP }),
  failedCreateSubGroup: () =>
    createAction({ type: GroupTypes.FAILED_CREATE_SUB_GROUP }),

  startFetchingGroupStatus: () =>
    createAction({ type: GroupTypes.START_FETCHING_GROUP_STATUS }),
  succeedFetchingGroupStatus: (payload: { status: Moim.Group.IGroupStatus }) =>
    createAction({ type: GroupTypes.FETCHED_GROUP_STATUS, payload }),
  failedFetchingGroupStatus: () =>
    createAction({ type: GroupTypes.FAILED_FETCHING_GROUP_STATUS }),

  startFetchingSubMoims: () =>
    createAction({ type: GroupTypes.START_FETCHING_SUB_MOIMS }),
  succeedFetchingSubMoims: (payload: {
    subMoims: Moim.IPaginatedListResponse<Moim.Id>;
  }) => createAction({ type: GroupTypes.FETCHED_SUB_MOIMS, payload }),
  failedFetchingSubMoims: () =>
    createAction({ type: GroupTypes.FAILED_FETCHING_SUB_MOIMS }),

  startGetJoinedSubMoims: () =>
    createAction({ type: GroupTypes.START_GET_JOINED_SUB_MOIMS }),
  succeedGetJoinedSubMoims: (payload: {
    subMoims: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({ type: GroupTypes.SUCCEED_GET_JOINED_SUB_MOIMS, payload }),
  failedGetJoinedSubMoims: () =>
    createAction({ type: GroupTypes.FAILED_GET_JOINED_SUB_MOIMS }),

  openJoinGroupDialog: (
    type: Moim.Group.JoinGroupDialogType,
    initialStep?: Moim.Group.JoinGroupDialogStepType,
    options?: {
      token?: string;
      refreshToken?: string;
    },
  ) =>
    createAction({
      type: GroupTypes.OPEN_JOIN_GROUP_DIALOG,
      payload: { type, initialStep, options },
    }),
  closeJoinGroupDialog: () =>
    createAction({
      type: GroupTypes.CLOSE_JOIN_GROUP_DIALOG,
    }),

  clearMoimIcon: () => createAction({ type: GroupTypes.CLEAR_MOIM_ICON }),

  startRenameMoim: (payload: { id: Moim.Id }) =>
    createAction({
      payload,
      type: GroupTypes.START_RENAME_MOIM,
    }),
  succeedRenameMoim: (payload: { id: Moim.Id }) =>
    createAction({
      payload,
      type: GroupTypes.SUCCEED_RENAME_MOIM,
    }),
  failedRenameMoim: (payload: { id: Moim.Id; error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_RENAME_MOIM,
    }),

  startSetDescriptionMoim: (payload: { id: Moim.Id }) =>
    createAction({
      payload,
      type: GroupTypes.START_SET_DESCRIPTION_MOIM,
    }),
  succeedSetDescriptionMoim: (payload: { id: Moim.Id }) =>
    createAction({
      payload,
      type: GroupTypes.SUCCEED_SET_DESCRIPTION_MOIM,
    }),
  failedSetDescriptionMoim: (payload: {
    id: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_SET_DESCRIPTION_MOIM,
    }),

  startGetGroupData: () =>
    createAction({
      type: GroupTypes.START_GET_GROUP_DATA,
    }),
  succeededGetGroupData: () =>
    createAction({
      type: GroupTypes.SUCCEEDED_GET_GROUP_DATA,
    }),
  failedGetGroupData: () =>
    createAction({
      type: GroupTypes.FAILED_GET_GROUP_DATA,
    }),

  startGetMoimTheme: () =>
    createAction({
      type: GroupTypes.START_GET_MOIM_THEME,
    }),
  succeedGetMoimTheme: (payload: Moim.ISingleItemResponse<Moim.Group.ITheme>) =>
    createAction({
      payload,
      type: GroupTypes.SUCCEED_GET_MOIM_THEME,
    }),
  failedGetMoimTheme: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_GET_MOIM_THEME,
    }),

  startGetParentMoimTheme: () =>
    createAction({
      type: GroupTypes.START_GET_PARENT_THEME,
    }),
  succeedGetParentMoimTheme: (
    payload: Moim.ISingleItemResponse<Moim.Group.ITheme>,
  ) =>
    createAction({
      payload,
      type: GroupTypes.SUCCEED_GET_PARENT_THEME,
    }),
  failedGetParentMoimTheme: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_GET_PARENT_THEME,
    }),

  startGetMoimCover: () =>
    createAction({
      type: GroupTypes.START_GET_MOIM_COVER,
    }),
  succeedGetMoimCover: (
    payload: Moim.ISingleItemResponse<Moim.Group.IMoimCover>,
  ) =>
    createAction({
      payload,
      type: GroupTypes.SUCCEED_GET_MOIM_COVER,
    }),
  failedGetMoimCover: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_GET_MOIM_COVER,
    }),

  startUpdateHomeChannel: () =>
    createAction({
      type: GroupTypes.START_UPDATE_HOME_CHANNEL,
    }),
  succeedUpdateHomeChannel: () =>
    createAction({
      type: GroupTypes.SUCCEED_UPDATE_HOME_CHANNEL,
    }),
  failedUpdateHomeChannel: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: GroupTypes.FAILED_UPDATE_HOME_CHANNEL,
    }),

  startSearchMoims: () => createAction({ type: GroupTypes.START_SEARCH_MOIMS }),
  succeedSearchMoims: (
    result: Moim.IPlainPagingListResponse<Moim.Group.ISearchedMoimBody>,
  ) =>
    createAction({
      type: GroupTypes.SUCCEED_SEARCH_MOIMS,
      payload: { result },
    }),
  failedSearchMoims: () =>
    createAction({ type: GroupTypes.FAILED_SEARCH_MOIMS }),
  clearSearchMoims: () => createAction({ type: GroupTypes.CLEAR_SEARCH_MOIMS }),

  startGetRecommendMoims: () =>
    createAction({ type: GroupTypes.START_GET_RECOMMEND_MOIMS }),
  succeedGetRecommendMoims: (
    moims: Moim.IPaginatedListResponse<Moim.Id>,
    isLoadMore: boolean,
  ) =>
    createAction({
      type: GroupTypes.SUCCEED_GET_RECOMMEND_MOIMS,
      payload: { moims, isLoadMore },
    }),
  failedGetRecommendMoims: () =>
    createAction({ type: GroupTypes.FAILED_GET_RECOMMEND_MOIMS }),

  startGetInstalledPlugins: () =>
    createAction({ type: GroupTypes.START_GET_INSTALLED_PLUGINS }),
  succeedGetInstalledPlugins: (payload: {
    list: Moim.IPaginatedListResponse<Moim.Plugin.IPlugin>;
    isLoadMore: boolean;
  }) =>
    createAction({ type: GroupTypes.SUCCEED_GET_INSTALLED_PLUGINS, payload }),
  failedGetInstalledPlugins: () =>
    createAction({ type: GroupTypes.FAILED_GET_INSTALLED_PLUGINS }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getListGroup(
  ...params: Parameters<typeof MeAPI.prototype.getJoinedGroups>
): ThunkPromiseResult {
  return async (dispatch, _getState, { defaultApi }) => {
    dispatch(ActionCreators.startFetchingListGroup());
    try {
      const groups = moimListNormalizer(
        await defaultApi.me.getJoinedGroups(...params),
      );
      dispatch(loadEntities(groups.entities));
      dispatch(
        ActionCreators.succeedFetchingListGroup({
          groups: groups.result,
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchingListGroup());
    }
  };
}

export function getGroupData(groupId: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetGroupData());
    try {
      const data = groupNormalizer(
        (await apiSelector(getState(), dispatch).group.getGroupData(groupId))
          .data,
      );
      dispatch(EntityActionCreators.addEntity(data.entities));
      dispatch(ActionCreators.succeededGetGroupData());
    } catch (err) {
      dispatch(ActionCreators.failedGetGroupData());
    }
  };
}

export function validateGroupDomain(
  ...params: Parameters<typeof GroupAPI.prototype.validateGroup>
): ThunkPromiseResult {
  return async (dispatch, _getState, { defaultApi }) => {
    dispatch(ActionCreators.startValidateGroupDomain());
    try {
      await defaultApi.group.validateGroup(...params);
      dispatch(ActionCreators.validateGroupDomain());
    } catch (err) {
      if (!axios.isCancel(err)) {
        throw err;
      }
    }
  };
}

export function cropGroupIcon(
  ...params: Parameters<typeof GroupAPI.prototype.changeIconSize>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCropGroupIcon());

    try {
      const api = apiSelector(getState(), dispatch);
      await api.group.changeIconSize(...params);
      dispatch(ActionCreators.succeedCropGroupIcon());
    } catch (err) {
      dispatch(ActionCreators.failedCropGroupIcon());
    }
  };
}

export function cropGroupBanner(
  ...params: Parameters<typeof GroupAPI.prototype.changeBannerSize>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCropGroupBanner());

    try {
      const api = apiSelector(getState(), dispatch);
      await api.group.changeBannerSize(...params);
      dispatch(ActionCreators.succeedCropGroupBanner());
    } catch (err) {
      dispatch(ActionCreators.failedCropGroupBanner());
    }
  };
}

export function createGroup(
  group: Moim.Group.ICreateGroupRequestBody,
  cancelToken?: CancelToken,
  errorCallback?: (err: AxiosError) => void,
): ThunkPromiseResult {
  return async (dispatch, _getState, { defaultApi }) => {
    dispatch(ActionCreators.startCreateGroup());
    try {
      await defaultApi.group.createGroup(group, cancelToken);
      dispatch(ActionCreators.succeedCreateGroup());
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 422
      ) {
        errorCallback?.(err);
      }
      dispatch(ActionCreators.failedCreateGroup());
      if (axios.isAxiosError(err) && !axios.isCancel(err)) {
        throw err;
      }
    }
  };
}

export function createSubGroup(
  ...params: Parameters<typeof GroupAPI.prototype.createSubGroup>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateSubGroup());
    try {
      await apiSelector(getState(), dispatch).group.createSubGroup(...params);
      dispatch(ActionCreators.succeedCreateSubGroup());
    } catch (err) {
      dispatch(ActionCreators.failedCreateSubGroup());
      if (axios.isAxiosError(err) && !axios.isCancel(err)) {
        throw err;
      }
    }
  };
}

export function getGroupStatus(): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startFetchingGroupStatus());

    try {
      dispatch(
        ActionCreators.succeedFetchingGroupStatus({
          status: {
            codeInForce: 79,
            member: 2789,
            coin: 24922,
          },
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchingGroupStatus());
    }
  };
}
export function getSubMoims(
  ...params: Parameters<typeof GroupAPI.prototype.getSubMoims>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchingSubMoims());
    try {
      const moims = groupListNormalizer(
        await apiSelector(getState(), dispatch).group.getSubMoims(...params),
      );
      dispatch(loadEntities(moims.entities));

      dispatch(
        ActionCreators.succeedFetchingSubMoims({ subMoims: moims.result }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchingSubMoims());
    }
  };
}

export function getJoinedSubMoims(
  paging?: Moim.IPaging,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetJoinedSubMoims());
    try {
      const hubGroupId = selectHubMoimId(getState());
      const canToken = getCanTokenFromMoimToken(
        hubGroupId ? getMoimTokenToCookie(hubGroupId)?.access_token : undefined,
      );
      const state = getState();
      const groupAPI = apiSelector(state, dispatch).group;
      const authentication: Moim.IAuthentication | undefined = canToken
        ? {
            token: canToken,
            group: state.app.currentGroupId ?? "",
          }
        : undefined;

      const moims = groupListNormalizer(
        authentication
          ? await groupAPI.getJoinedSubMoimsWithCanToken(
              authentication,
              paging,
              cancelToken,
            )
          : await groupAPI.getJoinedSubMoims(paging, cancelToken),
      );
      dispatch(loadEntities(moims.entities));

      dispatch(
        ActionCreators.succeedGetJoinedSubMoims({ subMoims: moims.result }),
      );
    } catch {
      dispatch(ActionCreators.failedGetJoinedSubMoims());
    }
  };
}

export function getInitialGroupId(
  cachedMoimClientId: Moim.Id | null,
): ThunkPromiseResult {
  return async dispatch => {
    try {
      const result =
        window.__bootData?.data.group ??
        (await MoimAPI.group.getGroupId()).data;

      const normalizedGroup = groupNormalizer(result);
      dispatch(loadEntities(normalizedGroup.entities));
      dispatch(
        AppActionCreators.currentGroupChanged({
          group: cachedMoimClientId
            ? cachedMoimClientId
            : normalizedGroup.result,
          parent: result.is_hub ? result.id : result.parent,
        }),
      );

      dispatch(ActionCreators.succeededGetInitialGroupId());
    } catch {}
  };
}

export function bootstrap(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startBootstrap());

      const {
        group,
        client,
        preference,
        banned_users,
        appConfig,
        appPromotions,
        self,
        popupBanner,
      } = (await apiSelector(getState(), dispatch).group.boot()).data;

      if (self) {
        const normalizedUser = userNormalizer(self);
        dispatch(loadEntities(normalizedUser.entities));
        dispatch(
          AuthActionCreators.currentUserChanged({
            user: self.id,
          }),
        );
      } else {
        dispatch(getCurrentUserWithParentFallback(group.parent));
      }

      if (group) {
        if (group.seller_id) {
          dispatch(getSellerCategories(group.seller_id));
          dispatch(
            loadEntitiesDirect({
              commerce_seller: [group.seller_id],
            }),
          );
          dispatch(getCommerceBasicInfo());
          dispatch(getAllCampaign());
        }
      }

      if (preference) {
        dispatch(AppActionCreators.changeLocale(preference.locale));
      }

      if (client) {
        if (client.providers) {
          dispatch(AppActionCreators.setProviders(client.providers));
        }
      }

      if (appPromotions) {
        dispatch(PromoteActionCreators.setAppDownloadPromotions(appPromotions));
      }
      if (popupBanner) {
        dispatch(PromoteActionCreators.setActivePopupBanner(popupBanner));
      }

      if (appConfig) {
        dispatch(AppActionCreators.setAppConfig(appConfig));
      }

      dispatch(
        ActionCreators.successBootstrap({
          group,
          bannedUsers: banned_users,
        }),
      );
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 422
      ) {
        const db = indexedDB.deleteDatabase("localforage");
        db.onsuccess = () => {
          dispatch(push(new MoimURL.ConnectionError().toString()));
        };
      }
      dispatch(ActionCreators.failedBootstrap());
    }
  };
}

export function renameMoim(
  payload: {
    id: Moim.Id;
    name: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { id, name } = payload;

    dispatch(ActionCreators.startRenameMoim({ id }));

    try {
      const normalizedRenamedGroup = groupNormalizer(
        (
          await apiSelector(getState(), dispatch).group.renameMoim(
            { id, name },
            cancelToken,
          )
        ).data,
      );

      dispatch(loadEntities(normalizedRenamedGroup.entities));
      dispatch(ActionCreators.succeedRenameMoim({ id }));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedRenameMoim({ id, error }));
    }
  };
}

export function setMoimDescription(
  payload: {
    id: Moim.Id;
    description: string | null;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { id, description } = payload;

    dispatch(ActionCreators.startSetDescriptionMoim({ id }));

    try {
      const normalizedRenamedGroup = groupNormalizer(
        (
          await apiSelector(getState(), dispatch).group.setMoimDescription(
            { id, description },
            cancelToken,
          )
        ).data,
      );

      dispatch(loadEntities(normalizedRenamedGroup.entities));
      dispatch(ActionCreators.succeedSetDescriptionMoim({ id }));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedSetDescriptionMoim({ id, error }));
    }
  };
}

export function updateMoimIcon(
  payload: {
    id: Moim.Id;
    iconId: Moim.Id;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async function(dispatch, getState, { apiSelector }) {
    const { id, iconId } = payload;

    dispatch(ActionCreators.startUpdateGroupIcon({ id }));

    try {
      const api = apiSelector(getState(), dispatch);

      const normalizedGroupData = groupSingleItemNormalizer(
        await api.group.putGroupIcon(
          {
            groupId: id,
            group: {
              icon: {
                type: "image",
                data: {
                  id: iconId,
                },
              },
            },
          },
          cancelToken,
        ),
      );

      dispatch(loadEntities(normalizedGroupData.entities));
      dispatch(ActionCreators.succeedUpdateGroupIcon());
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedUpdateGroupIcon({ error }));
    }
  };
}

export function updateMoimBanner(
  payload: {
    id: Moim.Id;
    bannerId: Moim.Id;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async function(dispatch, getState, { apiSelector }) {
    const { id, bannerId } = payload;

    dispatch(ActionCreators.startUpdateGroupBanner({ id }));

    try {
      const api = apiSelector(getState(), dispatch);

      const normalizedGroupData = groupSingleItemNormalizer(
        await api.group.putGroupBanner(
          {
            groupId: id,
            group: {
              banner: {
                type: "image",
                data: {
                  id: bannerId,
                },
              },
            },
          },
          cancelToken,
        ),
      );

      dispatch(loadEntities(normalizedGroupData.entities));
      dispatch(ActionCreators.succeedUpdateGroupBanner());
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedUpdateGroupBanner({ error }));
    }
  };
}

export function getMoimTheme(
  ...args: Parameters<typeof GroupAPI.prototype.getGroupTheme>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetMoimTheme());

    try {
      const theme = (
        await apiSelector(getState(), dispatch).group.getGroupTheme(...args)
      ).data;
      dispatch(ActionCreators.succeedGetMoimTheme({ data: theme }));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;
      dispatch(ActionCreators.failedGetMoimTheme({ error }));
    }
  };
}

export function getParentGroup(
  ...args: Parameters<typeof GroupAPI.prototype.getGroupData>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const group = groupNormalizer(
        (await apiSelector(getState(), dispatch).group.getGroupData(...args))
          .data,
      );
      dispatch(EntityActionCreators.addEntity(group.entities));
      dispatch(AppActionCreators.parentGroupChanged({ group: group.result }));
    } catch {}
  };
}

export function getParentMoimTheme(
  ...args: Parameters<typeof GroupAPI.prototype.getGroupTheme>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetParentMoimTheme());
    try {
      const theme = (
        await apiSelector(getState(), dispatch).group.getGroupTheme(...args)
      ).data;
      dispatch(ActionCreators.succeedGetParentMoimTheme({ data: theme }));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedGetParentMoimTheme({ error }));
    }
  };
}

export function getMoimCover(
  ...args: Parameters<typeof GroupAPI.prototype.getMoimCover>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetMoimCover());

    try {
      const cover = (
        await apiSelector(getState(), dispatch).group.getMoimCover(...args)
      ).data;
      dispatch(ActionCreators.succeedGetMoimCover({ data: cover }));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedGetMoimCover({ error }));
    }
  };
}

export function updateHomeChannel(
  ...args: Parameters<typeof GroupAPI.prototype.updateHomeChannel>
): ThunkPromiseResult<{ success: boolean; error?: Moim.IErrorResponse }> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateHomeChannel());

    try {
      const normalized = groupNormalizer(
        (
          await apiSelector(getState(), dispatch).group.updateHomeChannel(
            ...args,
          )
        ).data,
      );
      dispatch(loadEntities(normalized.entities));
      dispatch(ActionCreators.succeedUpdateHomeChannel());
      return { success: true };
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;

      dispatch(ActionCreators.failedUpdateHomeChannel({ error }));
      return { success: false, error };
    }
  };
}

export function getSearchMoims(
  params: Moim.Group.IGetSearchMoimsRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchMoims());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).group.getSearchMoims(params, cancelToken);
      dispatch(ActionCreators.succeedSearchMoims(result));
    } catch {
      dispatch(ActionCreators.failedSearchMoims());
    }
  };
}

export function getRecommendMoims(
  paging?: Moim.IPaging,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetRecommendMoims());

    try {
      const result = recommendGroupSectionListNormalizer(
        await apiSelector(getState(), dispatch).group.getRecommendMoims(
          paging,
          cancelToken,
        ),
      );

      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedGetRecommendMoims(result.result, Boolean(paging)),
      );
    } catch {
      dispatch(ActionCreators.failedGetRecommendMoims());
    }
  };
}

export function getInstalledPlugins(paging?: Moim.IPaging): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetInstalledPlugins());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).group.getInstalledPlugins(paging);
      dispatch(
        ActionCreators.succeedGetInstalledPlugins({
          list: response,
          isLoadMore: Boolean(paging),
        }),
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = errorParseData(err);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
      dispatch(ActionCreators.failedGetInstalledPlugins());
      throw err;
    }
  };
}
