import { CancelToken } from "axios";
import { push } from "connected-react-router";
import uniq from "lodash/uniq";

import { ActionUnion } from "./helpers";
import { ThunkPromiseResult, ThunkResult } from "app/store";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { threadListNormalizer, threadSingleItemNormalizer } from "app/models";
import MoimDefaultAPI from "common/api";
import { MoimURL } from "common/helpers/url";
import { errorParseData } from "common/helpers/APIErrorParser";

import { ForumEditorTypes, ForumTypes } from "./types";
import {
  loadEntities,
  loadEntitiesDirect,
  ActionCreators as EntityActionCreators,
  AddEntities,
} from "./entity";
import { preFetchFromThreadList } from "./referenceBlock";
import { linkMeeting } from "./meeting";
import { batchUsers } from "app/actions/user";

function createAction<T extends { type: ForumTypes | ForumEditorTypes }>(
  d: T,
): T {
  return d;
}

export const ActionCreators = {
  changeForumId: (forumId: Moim.Id) =>
    createAction({
      type: ForumTypes.CHANGE_FORUM_ID,
      payload: { forumId },
    }),

  changeThreadId: (threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.CHANGE_THREAD_ID,
      payload: { threadId },
    }),

  startGetThreadList: (
    forumId: string,
    paging: Moim.IPaging,
    sort?: Moim.Forum.ForumSortingOptionSort,
  ) =>
    createAction({
      type: ForumTypes.START_GET_THREAD_LIST,
      payload: {
        forumId,
        sort,
        paging,
      },
    }),

  succeedGetThreadList: (
    forumId: Moim.Id,
    threadIds: Moim.Id[],
    paging: Moim.IPaging,
    pagingKey?: keyof Moim.IPaging,
  ) =>
    createAction({
      type: ForumTypes.SUCCEED_GET_THREAD_LIST,
      payload: {
        forumId,
        threadIds,
        pagingKey,
        paging,
      },
    }),

  failedGetThreadList: (forumId: Moim.Id) =>
    createAction({
      type: ForumTypes.FAILED_GET_THREAD_LIST,
      payload: {
        forumId,
      },
    }),

  clearThreadList: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.CLEAR_THREAD_LIST, payload }),

  clearCommentList: (payload: { threadId: Moim.Id }) =>
    createAction({ type: ForumTypes.CLEAR_COMMENT_LIST, payload }),

  startPostComment: () => createAction({ type: ForumTypes.START_POST_COMMENT }),
  succeedPostComment: (payload: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    commentId: Moim.Id;
  }) => createAction({ type: ForumTypes.SUCCEED_POST_COMMENT, payload }),
  failedPostComment: () =>
    createAction({ type: ForumTypes.FAILED_POST_COMMENT }),

  startEditComment: () => createAction({ type: ForumTypes.START_EDIT_COMMENT }),
  succeedEditComment: () =>
    createAction({ type: ForumTypes.SUCCEED_EDIT_COMMENT }),
  failedEditComment: () =>
    createAction({ type: ForumTypes.FAILED_EDIT_COMMENT }),

  startGetCommentList: (forumId: Moim.Id) =>
    createAction({
      type: ForumTypes.START_GET_COMMENT_LIST,
      payload: { forumId },
    }),

  succeedGetCommentList: (
    threadId: Moim.Id,
    data: Moim.IPaginatedListResponse<Moim.Id>,
    mergeType?: keyof Moim.IPaging | "replace",
  ) =>
    createAction({
      type: ForumTypes.SUCCEED_GET_COMMENT_LIST,
      payload: {
        threadId,
        data,
        mergeType: mergeType ?? "after",
      },
    }),

  failedGetCommentList: () =>
    createAction({ type: ForumTypes.FAILED_GET_COMMENT_LIST }),

  startGetThread: (threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.START_GET_THREAD,
      payload: { threadId },
    }),
  succeededGetThread: (threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.SUCCEEDED_GET_THREAD,
      payload: {
        threadId,
      },
    }),
  failedGetThread: (threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.FAILED_GET_THREAD,
      payload: { threadId },
    }),
  clearCurrentThread: () =>
    createAction({ type: ForumTypes.CLEAR_CURRENT_THREAD }),

  startPostingThread: () =>
    createAction({
      type: ForumEditorTypes.START_POSTING_THREAD,
    }),
  succeededPostingThread: (forumId: Moim.Id, threadId: Moim.Id) =>
    createAction({
      type: ForumEditorTypes.SUCCEEDED_POSTING_THREAD,
      payload: {
        threadId,
        forumId,
      },
    }),
  failedPostingThread: () =>
    createAction({
      type: ForumEditorTypes.FAILED_POSTING_THREAD,
    }),

  startUpdateThread: () =>
    createAction({
      type: ForumEditorTypes.START_UPDATE_THREAD,
    }),
  succeededUpdateThread: (
    forumId: Moim.Id,
    threadId: Moim.Id,
    normalizedData: Moim.Forum.IThread,
  ) =>
    createAction({
      type: ForumEditorTypes.SUCCEEDED_UPDATE_THREAD,
      payload: {
        forumId,
        threadId,
        normalizedData,
      },
    }),
  failedUpdateThread: () =>
    createAction({
      type: ForumEditorTypes.FAILED_UPDATE_THREAD,
    }),

  clearPostingThread: () =>
    createAction({
      type: ForumEditorTypes.CLEAR_POSTING_THREAD,
    }),

  addThread: (forumId: Moim.Id, threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.ADD_THREAD,
      payload: { forumId, threadId },
    }),

  startVoteThread: () =>
    createAction({
      type: ForumTypes.START_VOTE_THREAD,
    }),
  succeededVoteThread: () =>
    createAction({
      type: ForumTypes.SUCCEEDED_VOTE_THREAD,
    }),
  failedVoteThread: () =>
    createAction({
      type: ForumTypes.FAILED_VOTE_THREAD,
    }),

  startGetThreadVotes: (payload: { threadId: Moim.Id }) =>
    createAction({
      type: ForumTypes.START_GET_THREAD_VOTES,
      payload,
    }),
  succeededGetThreadVotes: (payload: {
    threadId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    votes: Moim.Forum.IVotesResponseBody;
  }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_GET_THREAD_VOTES,
      payload,
    }),
  failedGetThreadVotes: (payload: { threadId: Moim.Id }) =>
    createAction({
      type: ForumTypes.FAILED_GET_THREAD_VOTES,
      payload,
    }),

  openVotedUserListDialog: (payload: {
    threadId: Moim.Id;
    channelId?: Moim.Id;
    replyId?: Moim.Id;
    useTab?: boolean;
    defaultTab?: Moim.Forum.VotedUserListDialogTabType;
  }) =>
    createAction({
      type: ForumTypes.OPEN_VOTED_DIALOG,
      payload,
    }),
  closeVotedUserListDialog: (threadId: Moim.Id) =>
    createAction({
      type: ForumTypes.CLOSE_VOTED_DIALOG,
      payload: { threadId },
    }),
  clearVotedUserListDialog: () =>
    createAction({
      type: ForumTypes.CLEAR_VOTED_DIALOG_DATA,
    }),

  startVoteReply: (replyId: Moim.Id, type: Moim.Enums.VoteStatus) =>
    createAction({
      type: ForumTypes.START_VOTE_REPLY,
      payload: { replyId, type },
    }),
  succeededVoteReply: () =>
    createAction({
      type: ForumTypes.SUCCEEDED_VOTE_REPLY,
    }),
  failedVoteReply: (replyId: Moim.Id, type: Moim.Enums.VoteStatus) =>
    createAction({
      type: ForumTypes.FAILED_VOTE_REPLY,
      payload: { replyId, type },
    }),

  startGetReplyVotes: (payload: { replyId: Moim.Id }) =>
    createAction({
      type: ForumTypes.START_GET_REPLY_VOTES,
      payload,
    }),
  succeededGetReplyVotes: (payload: {
    replyId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    votes: Moim.Forum.IVotesResponseBody;
  }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_GET_REPLY_VOTES,
      payload,
    }),
  failedGetReplyVotes: (payload: { replyId: Moim.Id }) =>
    createAction({
      type: ForumTypes.FAILED_GET_REPLY_VOTES,
      payload,
    }),

  startDeleteThread: () =>
    createAction({ type: ForumTypes.START_DELETE_THREAD }),
  succeedDeleteThread: (payload: { forumId: Moim.Id; threadId: Moim.Id }) =>
    createAction({ type: ForumTypes.SUCCEED_DELETE_THREAD, payload }),
  failedDeleteThread: () =>
    createAction({ type: ForumTypes.FAILED_DELETE_THREAD }),

  startDeleteReply: () => createAction({ type: ForumTypes.START_DELETE_REPLY }),
  succeedDeleteReply: (payload: {
    forumId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
  }) => createAction({ type: ForumTypes.SUCCEED_DELETE_REPLY, payload }),
  failedDeleteReply: () =>
    createAction({ type: ForumTypes.FAILED_DELETE_REPLY }),

  changeFilterOption: (
    targetForumId: Moim.Id,
    params: {
      sorting?: Moim.Forum.ForumSortingOptionSort;
      filterOption?: Moim.Forum.IThreadListFilterOption;
    },
  ) =>
    createAction({
      type: ForumTypes.CHANGE_FILTER_OPTION,
      payload: {
        targetForumId,
        ...params,
      },
    }),

  openNewItemSnackbar: (payload: { type: "comment" | "post"; id: Moim.Id }) =>
    createAction({ type: ForumTypes.OPEN_NEW_ITEM_SNACKBAR, payload }),

  closeNewItemSnackbar: (payload: { type: "comment" | "post" }) =>
    createAction({ type: ForumTypes.CLOSE_NEW_ITEM_SNACKBAR, payload }),

  setNewItemSnackbarDirection: (payload: {
    type: "comment" | "post";
    direction: "top" | "bottom";
  }) =>
    createAction({ type: ForumTypes.SET_NEW_ITEM_SNACKBAR_DIRECTION, payload }),

  changeCommentEditState: (
    payload:
      | {
          commentId: Moim.Id;
          channelId: Moim.Id;
          threadId: Moim.Id;
          groupId?: Moim.Id;
        }
      | undefined,
  ) =>
    createAction({
      type: ForumTypes.CHANGE_COMMENT_EDIT_STATE,
      payload,
    }),
  clearCommentEditState: () =>
    createAction({ type: ForumTypes.CLEAR_COMMENT_EDIT_STATE }),

  startPinPost: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.START_PIN_POST, payload }),
  succeedPinPost: (payload: { pins: Moim.Id[]; channelId: Moim.Id }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_PIN_POST,
      payload,
    }),
  failedPinPost: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.FAILED_PIN_POST, payload }),

  startGetPinnedPostList: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.START_GET_PINNED_POST_LIST, payload }),
  succeedGetPinnedPostList: (payload: {
    pinnedPosts: Moim.Id[];
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_GET_PINNED_POST_LIST,
      payload,
    }),
  failedGetPinnedPostList: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.FAILED_GET_PINNED_POST_LIST, payload }),

  startDeletePinnedPost: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.START_DELETE_PINNED_POST, payload }),
  succeedDeletePinnedPost: (payload: { pinId: Moim.Id; channelId: Moim.Id }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_DELETE_PINNED_POST,
      payload,
    }),
  failedDeletePinnedPost: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.FAILED_DELETE_PINNED_POST, payload }),

  startArrangePinnedPostList: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.START_ARRANGE_PINNED_POST_LIST, payload }),
  succeedArrangePinnedPostList: (payload: {
    pinnedPosts: Moim.Id[];
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ForumTypes.SUCCEEDED_ARRANGE_PINNED_POST_LIST,
      payload,
    }),
  failedArrangePinnedPostList: (payload: { channelId: Moim.Id }) =>
    createAction({ type: ForumTypes.FAILED_ARRANGE_PINNED_POST_LIST, payload }),

  openEditPinnedPostListDialog: () =>
    createAction({
      type: ForumTypes.OPEN_EDIT_PINNED_POST_LIST_DIALOG,
    }),
  closeEditPinnedPostListDialog: () =>
    createAction({
      type: ForumTypes.CLOSE_EDIT_PINNED_POST_LIST_DIALOG,
    }),

  updateHighlightThreadId: (id: Moim.Id) =>
    createAction({
      type: ForumTypes.UPDATE_HIGHLIGHT_THREAD_ID,
      payload: { id },
    }),

  clearHighlightThreadId: () =>
    createAction({
      type: ForumTypes.CLEAR_HIGHLIGHT_THREAD_ID,
    }),

  startSearchThreads: () =>
    createAction({
      type: ForumTypes.START_SEARCH_THREADS,
    }),
  succeedSearchThreads: (
    result: Moim.IPaginatedListResponse<Moim.Forum.ISearchedThreadBody>,
  ) =>
    createAction({
      type: ForumTypes.SUCCEED_SEARCH_THREADS,
      payload: {
        result,
      },
    }),
  failedSearchThreads: () =>
    createAction({
      type: ForumTypes.FAILED_SEARCH_THREADS,
    }),
  clearSearchThreads: () =>
    createAction({
      type: ForumTypes.CLEAR_SEARCH_THREADS,
    }),

  startFetchScrap: () => createAction({ type: ForumTypes.START_FETCH_SCRAP }),
  succeedFetchScrap: () =>
    createAction({ type: ForumTypes.SUCCEED_FETCH_SCRAP }),
  failedFetchScrap: () => createAction({ type: ForumTypes.FAILED_FETCH_SCRAP }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getThreadList(
  params: Moim.Forum.IGetThreadsRequest,
  cancelToken?: CancelToken,
  pagingKey?: keyof Moim.IPaging,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId, sort, before, after } = params;
    dispatch(
      ActionCreators.startGetThreadList(channelId, { before, after }, sort),
    );
    try {
      const data = await apiSelector(getState(), dispatch).forum.getThreadList(
        params,
        cancelToken,
      );
      dispatch(preFetchFromThreadList(data.data));

      const normalizedThreadList = threadListNormalizer(data);
      dispatch(AddEntities(normalizedThreadList.entities));
      const userIds = uniq(
        data.data.reduce<Moim.Id[]>((acc, current) => {
          acc.push(current.author);
          return acc;
        }, []),
      );
      dispatch(batchUsers(userIds));

      dispatch(
        ActionCreators.succeedGetThreadList(
          channelId,
          normalizedThreadList.result.data,
          normalizedThreadList.result.paging,
          pagingKey,
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetThreadList(channelId));
    }
  };
}

export function getThreadListWithRedirect(
  params: Moim.Forum.IGetThreadsRequest,
  cancelToken?: CancelToken,
  pagingKey?: keyof Moim.IPaging,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId, sort, before, after } = params;
    dispatch(
      ActionCreators.startGetThreadList(channelId, { before, after }, sort),
    );
    try {
      const data = await apiSelector(getState(), dispatch).forum.getThreadList(
        params,
        cancelToken,
      );

      dispatch(preFetchFromThreadList(data.data));

      const normalizedThreadList = threadListNormalizer(data);
      dispatch(AddEntities(normalizedThreadList.entities));

      const userIds = uniq(
        data.data.reduce<Moim.Id[]>((acc, current) => {
          acc.push(current.author);
          return acc;
        }, []),
      );
      dispatch(batchUsers(userIds));
      dispatch(
        ActionCreators.succeedGetThreadList(
          channelId,
          normalizedThreadList.result.data,
          normalizedThreadList.result.paging,
          pagingKey,
        ),
      );

      if (normalizedThreadList.result.data.length) {
        let threadId = normalizedThreadList.result.data[0];

        if (
          (pagingKey === undefined || pagingKey === "before") &&
          (normalizedThreadList.result.paging.before === null ||
            normalizedThreadList.result.paging.before === undefined)
        ) {
          const pinnedPostListResponse = await apiSelector(
            getState(),
            dispatch,
          ).channel.getPinList<Moim.Forum.IThread>(
            { channelId: params.channelId },
            cancelToken,
          );
          const pinnedPostData = threadListNormalizer(pinnedPostListResponse);

          dispatch(AddEntities(pinnedPostData.entities));
          const userIds2 = uniq(
            pinnedPostListResponse.data.reduce<Moim.Id[]>((acc, current) => {
              acc.push(current.author);
              return acc;
            }, []),
          );
          dispatch(batchUsers(userIds2));
          dispatch(
            ActionCreators.succeedGetPinnedPostList({
              channelId,
              pinnedPosts: pinnedPostData.result.data,
            }),
          );

          threadId =
            pinnedPostData.result.data[0] ??
            normalizedThreadList.result.data[0];
        }

        if (Boolean(normalizedThreadList.result.data.length)) {
          dispatch(ActionCreators.changeThreadId(threadId));
          dispatch(
            push(
              new MoimURL.ShowForumThread({
                forumId: channelId,
                threadId,
              }).toString(),
            ),
          );
        }
      }
    } catch (e) {
      dispatch(ActionCreators.failedGetThreadList(channelId));
    }
  };
}

export function getThreadListWithOne(
  params: Moim.Forum.IGetThreadsRequest,
  cancelToken: CancelToken,
  focusedId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId, sort, before, after } = params;

    dispatch(
      ActionCreators.startGetThreadList(channelId, { before, after }, sort),
    );

    try {
      dispatch(ActionCreators.clearThreadList({ channelId }));
      const forumAPI = apiSelector(getState(), dispatch).forum;

      const [beforeData, afterData] = await Promise.all([
        forumAPI.getThreadList(
          {
            ...params,
            before: focusedId,
            inclusive: true,
          },
          cancelToken,
        ),
        forumAPI.getThreadList(
          {
            ...params,
            after: focusedId,
          },
          cancelToken,
        ),
      ]);

      const threads = [...beforeData.data, ...afterData.data];
      dispatch(preFetchFromThreadList(threads));

      const normalizedThreadList = threadListNormalizer({
        data: threads,
        paging: {
          before: beforeData.paging.before,
          after: afterData.paging.after,
        },
      });

      dispatch(AddEntities(normalizedThreadList.entities));

      const userIds = uniq(
        threads.reduce<Moim.Id[]>((acc, current) => {
          acc.push(current.author);
          return acc;
        }, []),
      );
      dispatch(batchUsers(userIds));

      dispatch(
        ActionCreators.succeedGetThreadList(
          channelId,
          normalizedThreadList.result.data,
          normalizedThreadList.result.paging,
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetThreadList(channelId));
    }
  };
}

export function clearCommentList(payload: { threadId: Moim.Id }): ThunkResult {
  return async dispatch => {
    dispatch(ActionCreators.clearCommentList(payload));
  };
}

export function getCommentList(
  params: Moim.Forum.IGetThreadRepliesRequest,
  cancelToken?: CancelToken,
  pagingKey?: keyof Moim.IPaging,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { threadId } = params;
    dispatch(ActionCreators.startGetCommentList(threadId));

    try {
      const data = await apiSelector(getState(), dispatch).forum.getCommentList(
        params,
        cancelToken,
      );
      const normalizedThreadList = threadListNormalizer(data);

      dispatch(loadEntities(normalizedThreadList.entities));
      dispatch(
        ActionCreators.succeedGetCommentList(
          threadId,
          normalizedThreadList.result,
          pagingKey,
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetCommentList());
    }
  };
}

export function getCommentListWithUpdateCommentCount(
  params: Moim.Forum.IGetThreadRepliesRequest,
  cancelToken?: CancelToken,
  pagingKey?: keyof Moim.IPaging,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { threadId, channelId } = params;
    dispatch(ActionCreators.startGetCommentList(threadId));

    try {
      const data = await apiSelector(getState(), dispatch).forum.getCommentList(
        params,
        cancelToken,
      );
      const threadData = await apiSelector(
        getState(),
        dispatch,
      ).forum.getThread({ threadId, parentId: channelId }, cancelToken);
      const normalizedCommentList = threadListNormalizer(data);
      const normalizedThreadData = threadSingleItemNormalizer(threadData);

      dispatch(EntityActionCreators.addEntity(normalizedThreadData.entities));
      dispatch(loadEntities(normalizedCommentList.entities));
      dispatch(
        ActionCreators.succeedGetCommentList(
          threadId,
          normalizedCommentList.result,
          pagingKey,
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetCommentList());
    }
  };
}

export function getCommentListWithOne(
  params: Moim.Forum.IGetThreadRepliesRequest,
  cancelToken: CancelToken,
  focusedId: Moim.Id,
  groupId?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetCommentList(params.threadId));

    try {
      dispatch(clearCommentList({ threadId: params.threadId }));
      const beforeData = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).forum.getCommentList(
        {
          ...params,
          before: focusedId,
        },
        cancelToken,
      );
      const afterData = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).forum.getCommentList(
        {
          ...params,
          after: focusedId,
        },
        cancelToken,
      );

      const normalizedThreadList = threadListNormalizer({
        data: [...beforeData.data, ...afterData.data],
        paging: {
          before: beforeData.paging.before,
          after: afterData.paging.after,
        },
      });

      dispatch(loadEntities(normalizedThreadList.entities));
      dispatch(
        ActionCreators.succeedGetCommentList(
          params.threadId,
          normalizedThreadList.result,
        ),
      );
    } catch (e) {
      dispatch(ActionCreators.failedGetThreadList(params.channelId));
    }
  };
}

export function getThread(
  params: Moim.Forum.IGetThreadRequest,
  cancelToken: CancelToken,
  onSuccess?: () => void,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetThread(params.threadId));

    try {
      if (!params.parentId || !params.threadId) {
        dispatch(ActionCreators.failedGetThread(params.threadId));
        return;
      }

      const response = await apiSelector(getState(), dispatch).forum.getThread(
        params,
        cancelToken,
      );

      const normalizedData = threadSingleItemNormalizer(response);
      dispatch(AddEntities(normalizedData.entities));
      dispatch(ActionCreators.succeededGetThread(normalizedData.result.data));

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      dispatch(ActionCreators.failedGetThread(params.threadId));
    }
  };
}

export function getThreadShow(
  threadId: Moim.Id,
  cancelToken: CancelToken,
  onSuccess?: () => void,
  groupId?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetThread(threadId));

    try {
      if (!threadId) {
        dispatch(ActionCreators.failedGetThread(threadId));
        return;
      }

      const normalizedData = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch, groupId).forum.getThreadShow(
          threadId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(normalizedData.entities));
      dispatch(ActionCreators.succeededGetThread(normalizedData.result.data));

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      dispatch(ActionCreators.failedGetThread(threadId));
    }
  };
}

export function postThread(
  preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
  ...params: Parameters<typeof MoimDefaultAPI.forum.postThread>
): ThunkPromiseResult<Moim.Id | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startPostingThread());

    try {
      const result = await apiSelector(getState(), dispatch).forum.postThread(
        ...params,
      );
      if (result.data) {
        const forumId = result.data.parent_id;
        const threadId = result.data.id;
        const normalizedData = threadSingleItemNormalizer(result);
        dispatch(loadEntities(normalizedData.entities));

        dispatch(
          ActionCreators.succeededPostingThread(
            params[0].channelId,
            result.data.id,
          ),
        );
        dispatch(ActionCreators.clearPostingThread());

        if (preLinkMeeting) {
          dispatch(linkMeeting(preLinkMeeting.id, forumId, threadId));
        }

        return threadId;
      } else {
        dispatch(ActionCreators.failedPostingThread());
      }
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedPostingThread());
      throw err;
    }
  };
}

export function updateThread(
  ...params: Parameters<typeof MoimDefaultAPI.forum.updateThread>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateThread());

    try {
      const result = await apiSelector(getState(), dispatch).forum.updateThread(
        ...params,
      );
      if (result.data) {
        const forumId = params[0].channelId;
        const threadId = params[0].threadId;
        const normalizedData = threadSingleItemNormalizer(result);
        dispatch(loadEntities(normalizedData.entities));

        dispatch(
          ActionCreators.succeededUpdateThread(
            forumId,
            result.data.id,
            normalizedData.entities.threads[params[0].threadId],
          ),
        );
        dispatch(ActionCreators.clearPostingThread());

        let redirectUrl = new MoimURL.Forum({
          forumId: forumId || "",
        }).toString();

        if (forumId && threadId) {
          redirectUrl = new MoimURL.ShowForumThread({
            forumId,
            threadId,
          }).toString();
        }

        setTimeout(() => {
          dispatch(push(redirectUrl));
        }, 100);
      } else {
        dispatch(ActionCreators.failedUpdateThread());
      }
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedUpdateThread());
      throw err;
    }
  };
}

export function postComment(
  params: Moim.Forum.IPostCommentRequest,
  cancelToken?: CancelToken,
  groupId?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startPostComment());

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).forum.postReply(params, cancelToken);
      if (result.data) {
        dispatch(
          ActionCreators.succeedPostComment({
            channelId: params.channelId,
            threadId: params.threadId,
            commentId: result.data.id,
          }),
        );
        const normalizedData = threadSingleItemNormalizer(result);
        dispatch(loadEntities(normalizedData.entities));
      } else {
        dispatch(ActionCreators.failedPostComment());
      }
    } catch (err) {
      dispatch(ActionCreators.failedPostComment());
    }
  };
}

export function editComment(
  request: Moim.Forum.IEditCommentRequest,
  cancelToken?: CancelToken,
  groupId?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startEditComment());

    try {
      const normalizedData = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch, groupId).forum.editComment(
          request,
          cancelToken,
        ),
      );
      dispatch(loadEntities(normalizedData.entities));
      dispatch(ActionCreators.succeedEditComment());
    } catch (err) {
      dispatch(ActionCreators.failedEditComment());
    }
  };
}

export function postReply(
  ...params: Parameters<typeof MoimDefaultAPI.forum.postReply>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startPostComment());

    try {
      const result = await apiSelector(getState(), dispatch).forum.postReply({
        ...params[0],
      });
      if (result.data) {
        const normalizedData = threadSingleItemNormalizer(result);
        dispatch(loadEntities(normalizedData.entities));

        dispatch(
          ActionCreators.succeedPostComment({
            channelId: params[0].channelId,
            threadId: params[0].threadId,
            commentId: result.data.id,
          }),
        );
      } else {
        dispatch(ActionCreators.failedPostComment());
      }
    } catch (err) {
      dispatch(ActionCreators.failedPostComment());
    }
  };
}

export function voteThread({
  channelId,
  threadId,
  type,
  groupId,
  cancelToken,
}: {
  channelId: Moim.Id;
  threadId: Moim.Id;
  type: Moim.Enums.VoteStatus;
  cancelToken: CancelToken;
  groupId?: Moim.Id;
}): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startVoteThread());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).forum.voteThread({
        channelId,
        threadId,
        type,
        cancelToken,
      });
      const normalizedData = threadSingleItemNormalizer(result);
      dispatch(EntityActionCreators.addEntity(normalizedData.entities));
      dispatch(ActionCreators.succeededVoteThread());
    } catch (e) {
      dispatch(ActionCreators.failedVoteThread());
    }
  };
}

export function getThreadVotes(
  request: Moim.Forum.IVotesRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(
      ActionCreators.startGetThreadVotes({ threadId: request.threadId }),
    );
    try {
      const votes = await apiSelector(
        getState(),
        dispatch,
      ).forum.getThreadVotes(request, cancelToken);

      await dispatch(
        loadEntitiesDirect({ users: votes.data.map(vote => vote.user_id) }),
      );
      dispatch(
        ActionCreators.succeededGetThreadVotes({
          votes,
          threadId: request.threadId,
          type: request.type,
        }),
      );
    } catch (e) {
      dispatch(
        ActionCreators.failedGetThreadVotes({ threadId: request.threadId }),
      );
    }
  };
}

export function voteReply(
  {
    channelId,
    threadId,
    replyId,
    type,
    cancelToken,
  }: {
    channelId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
    type: Moim.Enums.VoteStatus;
    cancelToken: CancelToken;
  },
  groupId?: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startVoteReply(replyId, type));
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
        groupId,
      ).forum.voteReply({
        channelId,
        threadId,
        replyId,
        type,
        cancelToken,
      });
      const normalizedData = threadSingleItemNormalizer(result);
      dispatch(EntityActionCreators.addEntity(normalizedData.entities));
      dispatch(ActionCreators.succeededVoteReply());
    } catch (e) {
      dispatch(ActionCreators.failedVoteReply(replyId, type));
    }
  };
}

export function getReplyVotes(
  request: Moim.Forum.IVotesRequest & { replyId: Moim.Id },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetReplyVotes({ replyId: request.replyId }));
    try {
      const votes = await apiSelector(getState(), dispatch).forum.getReplyVotes(
        request,
        cancelToken,
      );

      await dispatch(
        loadEntitiesDirect({ users: votes.data.map(vote => vote.user_id) }),
      );
      dispatch(
        ActionCreators.succeededGetReplyVotes({
          votes,
          replyId: request.replyId,
          type: request.type,
        }),
      );
    } catch (e) {
      dispatch(
        ActionCreators.failedGetReplyVotes({ replyId: request.replyId }),
      );
    }
  };
}

export function deleteThread(
  params: {
    forumId: Moim.Id;
    threadId: Moim.Id;
  },
  groupId?: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteThread());
    try {
      const initThreadId = getState().thread.threadIds[
        params.forumId
      ]?.data.find(item => item !== params.threadId);
      const data = (
        await apiSelector(getState(), dispatch, groupId).forum.deleteThread(
          params,
        )
      ).data;
      if (data.success) {
        dispatch(ActionCreators.succeedDeleteThread(params));
        if (initThreadId) {
          dispatch(
            push(
              new MoimURL.ShowForumThread({
                forumId: params.forumId,
                threadId: initThreadId,
              }).toString(),
            ),
          );
        } else {
          dispatch(
            push(
              new MoimURL.Forum({
                forumId: params.forumId,
              }).toString(),
            ),
          );
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(ActionCreators.failedDeleteThread());
    }
  };
}

export function deleteReply(
  params: {
    forumId: Moim.Id;
    threadId: Moim.Id;
    replyId: Moim.Id;
  },
  groupId?: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteReply());
    try {
      const data = (
        await apiSelector(getState(), dispatch, groupId).forum.deleteReply(
          params,
        )
      ).data;
      if (data.success) {
        dispatch(ActionCreators.succeedDeleteReply(params));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(ActionCreators.failedDeleteReply());
    }
  };
}

export function openNewItemSnackbar(
  type: "post" | "comment",
  newId: Moim.Id,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.openNewItemSnackbar({ type, id: newId }));
  };
}

export function closeNewItemSnackbar(
  type: "post" | "comment",
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.closeNewItemSnackbar({ type }));
  };
}

export function pinPost(
  request: Moim.Channel.IPostPinRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.ISuccessResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId } = request;
    try {
      dispatch(ActionCreators.startPinPost({ channelId }));
      const { data } = await apiSelector(getState(), dispatch).channel.postPin(
        request,
        cancelToken,
      );

      if (data.success) {
        dispatch(
          ActionCreators.succeedPinPost({ pins: request.pinIds, channelId }),
        );

        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(ActionCreators.failedPinPost({ channelId }));
    }
  };
}

export function deletePinnedPost(
  request: Moim.Channel.IDeletePinRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.ISuccessResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId } = request;
    try {
      dispatch(ActionCreators.startDeletePinnedPost({ channelId }));
      const { data } = await apiSelector(
        getState(),
        dispatch,
      ).channel.deletePin(request, cancelToken);

      if (data.success) {
        dispatch(
          ActionCreators.succeedDeletePinnedPost({
            channelId,
            pinId: request.pinId,
          }),
        );
        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(ActionCreators.failedPinPost({ channelId }));
    }
  };
}

export function arrangePinnedPostList(
  request: Moim.Channel.IArrangePinRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.ISuccessResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId } = request;
    try {
      dispatch(ActionCreators.startArrangePinnedPostList({ channelId }));
      const { data } = await apiSelector(
        getState(),
        dispatch,
      ).channel.arrangePinList(request, cancelToken);

      if (data.success) {
        dispatch(
          ActionCreators.succeedArrangePinnedPostList({
            channelId,
            pinnedPosts: request.pinIds,
          }),
        );
        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(ActionCreators.failedArrangePinnedPostList({ channelId }));
    }
  };
}

export function getPinnedPostList(
  request: Moim.Channel.IGetPinnedListRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId } = request;
    try {
      dispatch(ActionCreators.startGetPinnedPostList({ channelId }));
      const normalized = threadListNormalizer(
        await apiSelector(getState(), dispatch).channel.getPinList<
          Moim.Forum.IThread
        >(request, cancelToken),
      );

      dispatch(loadEntities(normalized.entities));
      dispatch(
        ActionCreators.succeedGetPinnedPostList({
          channelId,
          pinnedPosts: normalized.result.data,
        }),
      );
    } catch (err) {
      dispatch(ActionCreators.failedGetPinnedPostList({ channelId }));
    }
  };
}

export function searchThreads(
  params: Moim.Forum.IGetSearchThreadsRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchThreads());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).forum.getSearchThread(params, cancelToken);
      dispatch(ActionCreators.succeedSearchThreads(result));
    } catch {
      dispatch(ActionCreators.failedSearchThreads());
    }
  };
}

export function getScrap(
  url: string,
  cancelToken: CancelToken,
): ThunkPromiseResult<
  | Moim.ISingleItemResponse<{
      content: Omit<Moim.Blockit.ILinkPreviewBlock, "type">;
      metadata: { cache: string; ttl: number; scraped_at: number };
    }>
  | undefined
  | null
> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchScrap());
    try {
      const result = await apiSelector(getState(), dispatch).forum.getScrap(
        url,
        cancelToken,
      );
      dispatch(ActionCreators.succeedFetchScrap());
      return result;
    } catch {
      dispatch(ActionCreators.failedFetchScrap());
      return null;
    }
  };
}
