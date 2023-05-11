import produce from "immer";
import { AllActions } from "app/actions";
import { ForumTypes, ForumCommentPageTypes } from "app/actions/types";

export interface ICommentPageData {
  isLoading: boolean;
  newCommentId: string;
  isLoadingToCommentLike: boolean;
  commentEditState:
    | {
        commentId: Moim.Id;
        channelId: Moim.Id;
        threadId: Moim.Id;
        groupId?: Moim.Id;
      }
    | undefined;
}

export const INITIAL_STATE: ICommentPageData = {
  isLoading: true,
  newCommentId: "",
  isLoadingToCommentLike: false,
  commentEditState: undefined,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumTypes.START_GET_COMMENT_LIST: {
        draft.isLoading = true;
        break;
      }

      case ForumTypes.FAILED_GET_COMMENT_LIST:
      case ForumTypes.SUCCEED_GET_COMMENT_LIST: {
        draft.isLoading = false;
        break;
      }

      case ForumTypes.CLEAR_COMMENT_LIST: {
        draft.isLoading = true;
        draft.newCommentId = "";

        break;
      }

      case ForumTypes.SUCCEED_POST_COMMENT: {
        draft.newCommentId = action.payload.commentId;
        break;
      }

      case ForumCommentPageTypes.RESET_JUST_ADDED: {
        draft.newCommentId = "";

        break;
      }

      case ForumTypes.START_VOTE_REPLY: {
        draft.isLoadingToCommentLike = true;

        break;
      }
      case ForumTypes.SUCCEEDED_VOTE_REPLY:
      case ForumTypes.FAILED_VOTE_REPLY: {
        draft.isLoadingToCommentLike = false;

        break;
      }
      case ForumTypes.CHANGE_COMMENT_EDIT_STATE: {
        draft.commentEditState = action.payload;

        break;
      }

      case ForumTypes.CLEAR_COMMENT_EDIT_STATE: {
        draft.commentEditState = undefined;

        break;
      }
    }
  });
}
