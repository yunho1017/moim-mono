import { produce } from "immer";

import { AllActions } from "app/actions";
import { ForumTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";

export const INITIAL_VOTED_DIALOG_STATE: Moim.Forum.IVotedUserListDialogState = {
  open: false,
  threadId: "",
  replyId: undefined,
};

export const INITIAL_STATE: Moim.Forum.IForumData = {
  currentForumId: "",
  isLoadingForumList: true,
  isLoadingForumShow: {},
  isLoadingToLike: false,
  postedCommentIds: {},
  currentThreadId: "",
  threadVotes: {},
  threadVotesLoading: {},
  votedUserListDialog: INITIAL_VOTED_DIALOG_STATE,
  newPostSnackbar: { open: false },
  newCommentSnackbar: { open: false },
  pinnedPostList: {},
};

export function reducers(
  state: Moim.Forum.IForumData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumTypes.CHANGE_FORUM_ID: {
        draft.currentForumId = action.payload.forumId;

        break;
      }

      case ForumTypes.CHANGE_THREAD_ID: {
        draft.currentThreadId = action.payload.threadId;
        break;
      }

      case ForumTypes.START_GET_THREAD: {
        const { threadId } = action.payload;
        draft.isLoadingForumShow[threadId] = true;
        if (draft.currentThreadId !== threadId) {
          draft.currentThreadId = threadId;
        }
        break;
      }

      case ForumTypes.SUCCEEDED_GET_THREAD:
      case ForumTypes.FAILED_GET_THREAD: {
        const { threadId } = action.payload;
        draft.isLoadingForumShow[threadId] = false;
        if (draft.currentThreadId !== threadId) {
          draft.currentThreadId = threadId;
        }
        break;
      }

      case ForumTypes.CLEAR_CURRENT_THREAD: {
        delete draft.isLoadingForumShow[draft.currentThreadId];
        draft.currentThreadId = "";
        draft.threadVotes = {};
        break;
      }

      case ForumTypes.START_GET_THREAD_LIST: {
        draft.currentForumId = action.payload.forumId;
        break;
      }

      case ForumTypes.SUCCEED_GET_THREAD_LIST: {
        const { threadIds, forumId } = action.payload;
        if (threadIds.length === 0) {
          draft.isLoadingForumShow[forumId] = false;
        }

        break;
      }

      case ForumTypes.SUCCEED_DELETE_THREAD: {
        const { forumId, threadId } = action.payload;

        const pinnedPostList = draft.pinnedPostList[forumId];

        if (pinnedPostList) {
          draft.pinnedPostList[forumId] = pinnedPostList.filter(
            id => id !== threadId,
          );
        }
        break;
      }

      case ForumTypes.SUCCEED_GET_COMMENT_LIST: {
        const { threadId } = action.payload;
        const currentPostedCommentIds = draft.postedCommentIds[threadId] ?? [];
        draft.postedCommentIds[threadId] = currentPostedCommentIds.filter(
          x => !action.payload.data.data.includes(x),
        );
        break;
      }

      case ForumTypes.SUCCEED_POST_COMMENT: {
        const { threadId, commentId } = action.payload;

        draft.postedCommentIds[threadId] = (
          draft.postedCommentIds[threadId] ?? []
        ).concat(commentId);
        break;
      }

      case ForumTypes.START_GET_THREAD_VOTES: {
        draft.threadVotesLoading[action.payload.threadId] = true;
        break;
      }
      case ForumTypes.FAILED_GET_THREAD_VOTES: {
        draft.threadVotesLoading[action.payload.threadId] = false;
        break;
      }

      case ForumTypes.SUCCEEDED_GET_THREAD_VOTES: {
        const { threadId, type, votes } = action.payload;
        const currentVotes = state.threadVotes[threadId];
        if (type === null) return;
        if (currentVotes) {
          const draftList = currentVotes[type]
            ? currentVotes[type].data.map(item => item.user_id)
            : [];
          const uniqData = votes.data.filter(
            item => !draftList.includes(item.user_id),
          );

          draft.threadVotes[threadId][type] = mergePaginatedResponse(
            currentVotes[type],
            {
              ...votes,
              data: uniqData,
            },
          );
        } else {
          draft.threadVotes[threadId] = { [type]: votes } as Record<
            Moim.Enums.VoteStatus.POSITIVE | Moim.Enums.VoteStatus.NEGATIVE,
            Moim.Forum.IVotesResponseBody
          >;
        }

        draft.threadVotesLoading[action.payload.threadId] = false;
        break;
      }

      case ForumTypes.START_GET_REPLY_VOTES: {
        draft.threadVotesLoading[action.payload.replyId] = true;
        break;
      }
      case ForumTypes.FAILED_GET_REPLY_VOTES: {
        draft.threadVotesLoading[action.payload.replyId] = false;
        break;
      }

      case ForumTypes.SUCCEEDED_GET_REPLY_VOTES: {
        const { replyId, type, votes } = action.payload;
        const currentVotes = state.threadVotes[replyId];
        if (type === null) return;
        if (currentVotes) {
          const draftList = currentVotes[type]
            ? currentVotes[type].data.map(item => item.user_id)
            : [];
          const uniqData = votes.data.filter(
            item => !draftList.includes(item.user_id),
          );

          draft.threadVotes[replyId][type] = mergePaginatedResponse(
            currentVotes[type],
            {
              ...votes,
              data: uniqData,
            },
          );
        } else {
          draft.threadVotes[replyId] = { [type]: votes } as Record<
            Moim.Enums.VoteStatus.POSITIVE | Moim.Enums.VoteStatus.NEGATIVE,
            Moim.Forum.IVotesResponseBody
          >;
        }

        draft.threadVotesLoading[action.payload.replyId] = false;
        break;
      }

      case ForumTypes.CLEAR_COMMENT_LIST: {
        delete draft.postedCommentIds[action.payload.threadId];

        break;
      }

      case ForumTypes.OPEN_VOTED_DIALOG: {
        draft.votedUserListDialog.open = true;
        draft.votedUserListDialog.threadId = action.payload.threadId;
        draft.votedUserListDialog.channelId = action.payload.channelId;
        draft.votedUserListDialog.replyId = action.payload.replyId;
        draft.votedUserListDialog.defaultTab = action.payload.defaultTab;
        draft.votedUserListDialog.useTab = action.payload.useTab;
        break;
      }

      case ForumTypes.CLOSE_VOTED_DIALOG: {
        draft.votedUserListDialog.open = false;

        break;
      }

      case ForumTypes.CLEAR_VOTED_DIALOG_DATA: {
        draft.votedUserListDialog = INITIAL_VOTED_DIALOG_STATE;
        break;
      }

      case ForumTypes.START_VOTE_THREAD: {
        draft.isLoadingToLike = true;
        break;
      }
      case ForumTypes.SUCCEEDED_VOTE_THREAD:
      case ForumTypes.FAILED_VOTE_THREAD: {
        draft.isLoadingToLike = false;
        break;
      }

      case ForumTypes.OPEN_NEW_ITEM_SNACKBAR: {
        if (action.payload.type === "comment") {
          draft.newCommentSnackbar = {
            open: true,
            newCommentId: action.payload.id,
          };
        } else {
          draft.newPostSnackbar = {
            open: true,
            newPostId: action.payload.id,
          };
        }
        break;
      }

      case ForumTypes.CLOSE_NEW_ITEM_SNACKBAR: {
        if (action.payload.type === "comment") {
          draft.newCommentSnackbar = INITIAL_STATE.newCommentSnackbar;
        } else {
          draft.newPostSnackbar = INITIAL_STATE.newPostSnackbar;
        }
        break;
      }

      case ForumTypes.SET_NEW_ITEM_SNACKBAR_DIRECTION: {
        if (action.payload.type === "comment") {
          draft.newCommentSnackbar.direction = action.payload.direction;
        }
        break;
      }

      case ForumTypes.SUCCEEDED_GET_PINNED_POST_LIST: {
        const { channelId, pinnedPosts } = action.payload;
        const newPinnedPostList = mergeArrayUniq(
          [...(draft.pinnedPostList[channelId] ?? [])],
          pinnedPosts,
        );

        if (newPinnedPostList) {
          draft.pinnedPostList[channelId] = newPinnedPostList;
        }

        break;
      }

      case ForumTypes.SUCCEEDED_PIN_POST: {
        const { channelId, pins } = action.payload;
        const newPinnedPostList = mergeArrayUniq(pins, [
          ...(draft.pinnedPostList[channelId] ?? []),
        ]);

        if (newPinnedPostList) {
          draft.pinnedPostList[channelId] = newPinnedPostList;
        }

        break;
      }

      case ForumTypes.SUCCEEDED_ARRANGE_PINNED_POST_LIST: {
        const { channelId, pinnedPosts } = action.payload;

        draft.pinnedPostList[channelId] = pinnedPosts;

        break;
      }

      case ForumTypes.SUCCEEDED_DELETE_PINNED_POST: {
        const { channelId, pinId: deletedPinId } = action.payload;
        const newPinnedPostList = draft.pinnedPostList[channelId]?.filter(
          id => id !== deletedPinId,
        );

        draft.pinnedPostList[channelId] = newPinnedPostList;
        break;
      }

      default: {
        break;
      }
    }
  });
}
