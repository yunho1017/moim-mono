import axios, { CancelToken } from "axios";

import { ThunkPromiseResult, ThunkResult } from "../store";
import { UserTypes } from "./types";
import { ActionUnion } from "./helpers";
import { AddEntities, loadEntities } from "./entity";
import { ActionCreators as AuthActionCreators } from "common/helpers/authentication/actions";
import { userListNormalizer, userSingleItemNormalizer } from "app/models";
import UserAPI from "app/common/api/user";
import { isBrowser } from "common/helpers/envChecker";
import { batchUserData } from "common/helpers/batchService";
import { searchedUsersSelector } from "app/selectors/search";
import { errorParseData } from "common/helpers/APIErrorParser";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { storeMoimTokenToCookie } from "common/helpers/authentication";
import { updateActionsForRefresh } from "./boot";

function createAction<T extends { type: UserTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startSearchByKeyword: () =>
    createAction({
      type: UserTypes.START_SEARCH_BY_KEYWORD,
    }),

  succeedSearchByKeyword: (userList: number[]) =>
    createAction({
      userList,
      type: UserTypes.SUCCEED_SEARCH_BY_KEYWORD,
    }),

  failedSearchByKeyword: (keyword: string) =>
    createAction({
      keyword,
      type: UserTypes.FAILED_SEARCH_BY_KEYWORD,
    }),

  startGetUsers: () =>
    createAction({
      type: UserTypes.START_GET_USERS,
    }),

  succeedGetUsers: (payload: { users: Moim.IPaginatedListResponse<string> }) =>
    createAction({
      type: UserTypes.SUCCEED_GET_USERS,
      payload,
    }),

  failedGetUsers: () =>
    createAction({
      type: UserTypes.FAILED_GET_USERS,
    }),

  startPostUser: () =>
    createAction({
      type: UserTypes.START_POST_USER,
    }),

  succeedPostUser: (payload: {
    groupId: Moim.Id;
    user: Moim.ISingleItemResponse<string>;
  }) =>
    createAction({
      type: UserTypes.SUCCEED_POST_USER,
      payload,
    }),

  failedPostUser: () =>
    createAction({
      type: UserTypes.FAILED_POST_USER,
    }),

  startGetBatchUsers: () =>
    createAction({
      type: UserTypes.START_GET_BATCH_USERS,
    }),
  succeedGetBatchUsers: (payload: Moim.Id[]) =>
    createAction({
      payload,
      type: UserTypes.SUCCEED_GET_BATCH_USERS,
    }),
  failedGetBatchUsers: () =>
    createAction({
      type: UserTypes.FAILED_GET_BATCH_USERS,
    }),

  startGetParentMoimUserData: () =>
    createAction({
      type: UserTypes.START_GET_PARENT_MOIM_USER_DATA,
    }),
  succeededGetParentMoimUserData: () =>
    createAction({
      type: UserTypes.SUCCEEDED_GET_PARENT_MOIM_USER_DATA,
    }),
  failedGetParentMoimUserData: () =>
    createAction({
      type: UserTypes.FAILED_GET_PARENT_MOIM_USER_DATA,
    }),

  startGetSearchUsers: () =>
    createAction({
      type: UserTypes.START_GET_SEARCH_USERS,
    }),

  succeedGetSearchUsers: (payload: {
    users: Moim.IPaginatedListResponse<string>;
    isLoadMore: boolean;
  }) =>
    createAction({
      type: UserTypes.SUCCEED_GET_SEARCH_USERS,
      payload,
    }),

  failedGetSearchUsers: () =>
    createAction({
      type: UserTypes.FAILED_GET_SEARCH_USERS,
    }),

  clearSearchedUsers: () =>
    createAction({
      type: UserTypes.CLEAR_SEARCHED_USERS,
    }),

  startGetProfileBlocks: (
    userId: Moim.Id,
    viewType: Moim.User.IProfileViewType,
  ) =>
    createAction({
      type: UserTypes.START_GET_PROFILE_BLOCKS,
      payload: { userId, viewType },
    }),
  succeededGetProfileBlocks: (
    userId: Moim.Id,
    viewType: Moim.User.IProfileViewType,
    blocks: Moim.Blockit.Blocks[],
  ) =>
    createAction({
      type: UserTypes.SUCCEEDED_GET_PROFILE_BLOCKS,
      payload: {
        userId,
        viewType,
        blocks,
      },
    }),
  failedGetProfileBlocks: (
    userId: Moim.Id,
    viewType: Moim.User.IProfileViewType,
  ) =>
    createAction({
      type: UserTypes.FAILED_GET_PROFILE_BLOCKS,
      payload: { userId, viewType },
    }),

  startSearchPageSearchUsers: () =>
    createAction({ type: UserTypes.START_SEARCH_PAGE_SEARCH_USERS }),
  succeedSearchPageSearchUsers: (
    result: Moim.IPlainPagingListResponse<Moim.User.ISearchedUserBody>,
  ) =>
    createAction({
      type: UserTypes.SUCCEED_SEARCH_PAGE_SEARCH_USERS,
      payload: { result },
    }),
  failedSearchPageSearchUsers: () =>
    createAction({ type: UserTypes.FAILED_SEARCH_PAGE_SEARCH_USERS }),
  clearSearchPageSearchUsers: () =>
    createAction({ type: UserTypes.CLEAR_SEARCH_PAGE_SEARCH_USERS }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getUsers(
  request: Moim.User.IGetSearchUsersRequest,
  cancelToken?: CancelToken,
): ThunkResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetUsers());
    try {
      const users = userListNormalizer(
        await apiSelector(getState(), dispatch).user.getSearchUsers(
          request,
          cancelToken,
        ),
      );

      dispatch(loadEntities(users.entities));
      dispatch(
        ActionCreators.succeedGetUsers({
          users: users.result,
        }),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetUsers());
    }
  };
}

export function postUser(
  request: Moim.User.IPostUserRequestBody,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.User.IOriginalUserDatum | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startPostUser());
    try {
      const currentGroupId = getState().app.currentGroupId;
      const hubGroupId = getState().app.currentHubGroupId;

      if (!currentGroupId) {
        throw new Error("not exist currentGroupId in post user Action");
      }

      const { data: user, token } = await apiSelector(
        getState(),
        dispatch,
      ).user.postUser(request, cancelToken);

      const normalized = userSingleItemNormalizer({ data: user });

      dispatch(
        ActionCreators.succeedPostUser({
          groupId: request.groupId ?? currentGroupId,
          user: normalized.result,
        }),
      );

      if (hubGroupId === request.groupId) {
        storeMoimTokenToCookie(hubGroupId, token);
      }

      if (request.groupId === currentGroupId) {
        dispatch(loadEntities(normalized.entities));
        dispatch(
          AuthActionCreators.currentUserChanged({
            user: normalized.result.data,
          }),
        );
      } else {
        dispatch(AddEntities(normalized.entities));
        dispatch(
          AuthActionCreators.parentMoimUserChanged({
            user,
          }),
        );
      }

      dispatch(updateActionsForRefresh());

      if (hubGroupId === request.groupId) {
        AnalyticsClass.getInstance().signUpUser(user.id);
      }

      AnalyticsClass.getInstance().joinGroup(request.groupId ?? "", user.id);

      return user;
    } catch (error) {
      dispatch(ActionCreators.failedPostUser());
      if (isBrowser()) {
        if (!axios.isCancel(error)) {
          throw error;
        }
      }
    }
  };
}

export function getBatchUsers(
  users: Moim.Id[],
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startGetBatchUsers());

    try {
      const entities = await batchUserData(users, cancelToken);
      dispatch(loadEntities(entities));

      dispatch(ActionCreators.succeedGetBatchUsers(users));
    } catch (e) {
      dispatch(ActionCreators.failedGetBatchUsers());
    }
  };
}

export function batchUsers(ids: Moim.Id[]): ThunkResult {
  return dispatch => {
    batchUserData(ids).then(entities => {
      dispatch(AddEntities(entities));
    });
  };
}

const bufferUserBatch: Record<string, Promise<Record<Moim.Id, Moim.Id>>> = {};

export function buffedBatchUsersWithDirect(
  userId?: Moim.Id,
  canId?: Moim.Id,
  canUsername?: string,
): ThunkPromiseResult<Record<Moim.Id, Moim.Id> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const key = userId || canId || canUsername;
    const request: Moim.User.IUserBatchRequest = {};

    if (userId) {
      request.users = [userId];
    } else if (canId) {
      request.canIds = [canId];
    } else if (canUsername) {
      request.canUsernames = [canUsername];
    }

    if (key) {
      if (!bufferUserBatch[key]) {
        bufferUserBatch[key] = (async () => {
          const response = await apiSelector(
            getState(),
            dispatch,
          ).user.batchUsers(request);

          const { entities, result } = userListNormalizer(response);
          dispatch(loadEntities(entities));
          dispatch(ActionCreators.succeedGetBatchUsers(result.data));
          return response.data.reduce<Record<Moim.Id, Moim.Id>>(
            (accValue, currentValue) => {
              const matchKey = userId
                ? currentValue.id
                : canId
                ? currentValue.canId
                : canUsername
                ? currentValue.canUsername
                : currentValue.id;

              accValue[matchKey ?? currentValue.id] = currentValue.id;
              return accValue;
            },
            {},
          );
        })();

        return bufferUserBatch[key];
      } else {
        return bufferUserBatch[key];
      }
    }
  };
}

export function getBatchUsersWithDirectAPI(
  request: Moim.User.IUserBatchRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetBatchUsers());

    try {
      const data = await apiSelector(getState(), dispatch).user.batchUsers(
        request,
        cancelToken,
      );

      const { entities, result } = userListNormalizer(data);
      dispatch(loadEntities(entities));

      dispatch(ActionCreators.succeedGetBatchUsers(result.data));

      return result;
    } catch (e) {
      dispatch(ActionCreators.failedGetBatchUsers());
    }
  };
}

export function getParentMoimUserData(
  ...params: Parameters<typeof UserAPI.prototype.getParentMoimUserData>
): ThunkPromiseResult<Moim.User.IOriginalUserDatum | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch).user;
    dispatch(ActionCreators.startGetParentMoimUserData());
    try {
      const result = (await api.getParentMoimUserData(...params)).data;
      dispatch(AuthActionCreators.parentMoimUserChanged({ user: result }));
      dispatch(ActionCreators.succeededGetParentMoimUserData());
      return result;
    } catch (err) {
      dispatch(ActionCreators.failedGetParentMoimUserData());
      return undefined;
    }
  };
}

export function getSearchUsers(
  request: Moim.User.IGetSearchUsersRequest,
  cancelToken?: CancelToken,
  groupId?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetSearchUsers());
    try {
      const users = userListNormalizer(
        await apiSelector(getState(), dispatch, groupId).user.getSearchUsers(
          request,
          cancelToken,
        ),
      );

      dispatch(loadEntities(users.entities));
      dispatch(
        ActionCreators.succeedGetSearchUsers({
          users: users.result,
          isLoadMore: Boolean(request.after) || Boolean(request.before),
        }),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetSearchUsers());
    }
  };
}

export function getSearchUsersHasResult(
  request: Moim.User.IGetSearchUsersRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<
  Moim.IPaginatedListResponse<Moim.User.IUser> | undefined
> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const users = userListNormalizer(
        await apiSelector(getState(), dispatch).user.getSearchUsers(
          request,
          cancelToken,
        ),
      );
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await dispatch(loadEntities(users.entities));
      dispatch(
        ActionCreators.succeedGetSearchUsers({
          users: users.result,
          isLoadMore: Boolean(request.after) || Boolean(request.before),
        }),
      );
      return {
        data: searchedUsersSelector(getState()).data,
        paging: {},
      };
      // eslint-disable-next-line no-empty
    } catch {}
  };
}

export function getProfileBlocks(
  ...params: Parameters<typeof UserAPI.prototype.getProfileBlockit>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const userId = params[0];
    const viewType = params[1];
    dispatch(ActionCreators.startGetProfileBlocks(userId, viewType));
    try {
      const blocks = await apiSelector(
        getState(),
        dispatch,
      ).user.getProfileBlockit(...params);
      dispatch(
        ActionCreators.succeededGetProfileBlocks(userId, viewType, blocks.data),
      );
    } catch (err) {
      dispatch(ActionCreators.failedGetProfileBlocks(userId, viewType));
    }
  };
}

export function searchPageSearchUsers(
  params: Moim.User.IGetSearchPageSearchUsersRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchPageSearchUsers());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).user.getSearchPageSearchUsers(params, cancelToken);
      dispatch(ActionCreators.succeedSearchPageSearchUsers(result));
    } catch {
      dispatch(ActionCreators.failedSearchPageSearchUsers());
    }
  };
}

export function postPhoneNumber(
  params: Moim.User.IPostPhoneNumberRequest,
  cancelToken?: CancelToken,
  groupId?: string,
): ThunkPromiseResult<{ success: boolean; error?: Moim.IErrorResponse }> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).user.postPhoneNumber(params, cancelToken);
      return { success: result.data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const parsedError = errorParseData(err);
        return {
          success: false,
          error: parsedError ?? err.response?.data.error,
        };
      }

      return { success: false };
    }
  };
}

export function verifyPhoneNumber(
  params: Moim.User.IVerifyPhoneNumberRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<{
  success: boolean;
  error?: Moim.IErrorResponse;
}> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).user.verifyPhoneNumber(params, cancelToken);
      return {
        success: result.data.success,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const parsedError = errorParseData(err);
        return {
          success: false,
          error: parsedError ?? err.response?.data.error,
        };
      }

      return { success: false };
    }
  };
}
