import { CancelToken } from "axios";
import { MeTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { loadEntities } from "app/actions/entity";
import { ActionCreators as SnackbarActionCreators } from "../snackbar";
import {
  bookmarkListNormalizer,
  bookmarkSingleItemNormalizer,
} from "app/models/bookmark";

function createAction<T extends { type: MeTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetBookmarks: (userId: Moim.Id) =>
    createAction({
      type: MeTypes.START_GET_BOOKMARKS,
      payload: {
        userId,
      },
    }),
  succeededGetBookmarks: (
    userId: Moim.Id,
    bookmarks: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: MeTypes.SUCCEEDED_GET_BOOKMARKS,
      payload: {
        userId,
        bookmarks,
      },
    }),
  failedGetBookmarks: (userId: Moim.Id) =>
    createAction({
      type: MeTypes.FAILED_GET_BOOKMARKS,
      payload: {
        userId,
      },
    }),

  startPostBookmark: (threadId: Moim.Id) =>
    createAction({
      type: MeTypes.START_POST_BOOKMARK,
      payload: { threadId },
    }),
  succeededPostBookmark: (
    userId: Moim.Id,
    threadId: Moim.Id,
    currentGroupId: Moim.Id,
  ) =>
    createAction({
      type: MeTypes.SUCCEEDED_POST_BOOKMARK,
      payload: {
        userId,
        threadId,
        currentGroupId,
        bookmarkId: `${userId}_${threadId}`,
      },
    }),
  failedPostBookmark: (threadId: Moim.Id) =>
    createAction({
      type: MeTypes.FAILED_POST_BOOKMARK,
      payload: { threadId },
    }),

  startDeleteBookmark: (threadId: Moim.Id) =>
    createAction({
      type: MeTypes.START_DELETE_BOOKMARK,
      payload: { threadId },
    }),
  succeededDeleteBookmark: (userId: Moim.Id, threadId: Moim.Id) =>
    createAction({
      type: MeTypes.SUCCEEDED_DELETE_BOOKMARK,
      payload: {
        userId,
        threadId,
        bookmarkId: `${userId}_${threadId}`,
      },
    }),
  failedDeleteBookmark: (threadId: Moim.Id) =>
    createAction({
      type: MeTypes.FAILED_DELETE_BOOKMARK,
      payload: { threadId },
    }),

  startGetAllMoimResources: () =>
    createAction({
      type: MeTypes.START_ALL_MOIM_RESOURCES,
    }),
  succeededGetAllMoimResources: (resources: Moim.Group.INormalizedGroup[]) =>
    createAction({
      type: MeTypes.SUCCEEDED_ALL_MOIM_RESOURCES,
      payload: {
        resources,
      },
    }),
  failedGetAllMoimResources: () =>
    createAction({
      type: MeTypes.FAILED_ALL_MOIM_RESOURCES,
    }),

  changeCurrentMoimResource: (groupId: Moim.Id | "all") =>
    createAction({
      type: MeTypes.CHANGE_BOOKMAKR_CURRENT_MOIM_RESOURCE,
      payload: {
        groupId,
      },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getBookmarks(
  params: Moim.Bookmark.IGetBookmarksRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetBookmarks(params.userId));
    try {
      const data = await apiSelector(getState(), dispatch).me.getBookmarks(
        params,
        cancelToken,
      );

      const normalized = bookmarkListNormalizer(data);
      dispatch(loadEntities(normalized.entities));
      dispatch(
        ActionCreators.succeededGetBookmarks(params.userId, normalized.result),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetBookmarks(params.userId));
    }
  };
}

export function deleteBookmark(
  params: Moim.Bookmark.IDeleteBookmarkRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
  groupId?: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;
    dispatch(ActionCreators.startDeleteBookmark(params.threadId));
    try {
      const data = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).me.deleteBookmark(params, cancelToken);

      dispatch(
        ActionCreators.succeededDeleteBookmark(
          data.data.userId,
          data.data.resourceId,
        ),
      );
    } catch (e) {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedDeleteBookmark(params.threadId));
    } finally {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: snackbarMessage,
        }),
      );
    }
  };
}

export function postBookmark(
  params: Moim.Bookmark.IPostBookmarkRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
  groupId?: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;

    dispatch(ActionCreators.startPostBookmark(params.threadId));
    try {
      const api = apiSelector(getState(), dispatch, groupId);
      const data = await api.me.postBookmark(params, cancelToken);

      const normalized = bookmarkSingleItemNormalizer(data);
      dispatch(loadEntities(normalized.entities));

      dispatch(
        ActionCreators.succeededPostBookmark(
          data.data.userId,
          data.data.resourceId,
          api.getCurrentGroupId(),
        ),
      );
    } catch (e) {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedPostBookmark(params.threadId));
    } finally {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: snackbarMessage,
        }),
      );
    }
  };
}

export function getFamilyMoim(cancelToken?: CancelToken): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetAllMoimResources());
    try {
      const data = await apiSelector(getState(), dispatch).group.getFamilyMoim(
        cancelToken,
      );

      dispatch(ActionCreators.succeededGetAllMoimResources(data.data));
    } catch (e) {
      dispatch(ActionCreators.failedGetAllMoimResources());
    }
  };
}
