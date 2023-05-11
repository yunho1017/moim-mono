import { produce } from "immer";
import { AllActions } from "app/actions";
import {
  EntityTypes,
  ForumTypes,
  ForumEditorTypes,
  ForumDraftTypes,
  MeTypes,
  CommerceTypes,
} from "app/actions/types";
import { VoteStatus, ItemIdTypes } from "app/enums";

export const INITIAL_STATE: Moim.Forum.INormalizedData = {};

export function reducer(
  state: Moim.Forum.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        Object.entries(action.payload.threads || {}).forEach(([key, value]) => {
          if (
            action.payload.forceUpdate ||
            !value.hasOwnProperty("updated_at") ||
            value.updated_at >= (draft[key]?.updated_at || 0)
          ) {
            draft[key] = value;
            if (value.is_bookmarked === undefined) {
              draft[key].is_bookmarked = false;
            }
          }
        });

        break;
      }

      case ForumEditorTypes.SUCCEEDED_UPDATE_THREAD: {
        const { threadId, normalizedData } = action.payload;
        draft[threadId] = normalizedData;
        break;
      }

      case ForumTypes.START_VOTE_REPLY: {
        const { replyId, type } = action.payload;
        const selectedThread = draft[replyId];
        if (selectedThread) {
          selectedThread.vote = {
            ...selectedThread.vote,
            updated_at: Date.now(),
            type,
          } as Moim.Forum.IVote;
          selectedThread.vote_score += type === VoteStatus.POSITIVE ? 1 : -1;
        }
        break;
      }

      case ForumTypes.FAILED_VOTE_REPLY: {
        const { replyId, type } = action.payload;
        const selectedThread = draft[replyId];

        if (selectedThread && selectedThread.vote) {
          selectedThread.vote = {
            ...selectedThread.vote,
            type: type === "upvote" ? "downvote" : "upvote",
          };

          selectedThread.vote_score -= type === VoteStatus.POSITIVE ? 1 : -1;
        }
        break;
      }

      case ForumTypes.SUCCEED_DELETE_THREAD: {
        delete draft[action.payload.threadId];
        break;
      }

      case ForumDraftTypes.SUCCEEDED_DELETE_DRAFT:
      case ForumDraftTypes.SOFT_DELETE_DRAFT: {
        const { draftId } = action.payload;
        delete draft[draftId];
        break;
      }

      case ForumDraftTypes.SUCCEEDED_DELETE_ALL_DRAFT: {
        Object.keys(draft)
          .filter(id => id.toUpperCase().startsWith(ItemIdTypes.DRAFT))
          .forEach(id => {
            delete draft[id];
          });
        break;
      }

      case MeTypes.START_POST_BOOKMARK:
      case MeTypes.SUCCEEDED_POST_BOOKMARK: {
        const { threadId } = action.payload;
        if (draft[threadId]) {
          draft[threadId].is_bookmarked = true;
        }
        break;
      }
      case MeTypes.FAILED_POST_BOOKMARK: {
        const { threadId } = action.payload;
        if (draft[threadId]) {
          draft[threadId].is_bookmarked = false;
        }
        break;
      }

      case MeTypes.START_DELETE_BOOKMARK:
      case MeTypes.SUCCEEDED_DELETE_BOOKMARK: {
        const { threadId } = action.payload;
        if (draft[threadId]) {
          draft[threadId].is_bookmarked = false;
        }
        break;
      }
      case MeTypes.FAILED_DELETE_BOOKMARK: {
        const { threadId } = action.payload;
        if (draft[threadId]) {
          draft[threadId].is_bookmarked = true;
        }
        break;
      }

      case ForumTypes.SUCCEED_POST_COMMENT: {
        const targetThread = draft[action.payload.threadId];
        if (targetThread) {
          targetThread.replies_count++;
        }
        break;
      }

      case CommerceTypes.SUCCEED_DELETE_PRODUCT_REVIEW: {
        if (draft[action.payload.reviewId]) {
          draft[action.payload.reviewId].deleted = true;
          if (draft[action.payload.parentId]) {
            draft[action.payload.parentId].replies_count--;
          }
        }
        break;
      }
      case CommerceTypes.SUCCEED_DELETE_PRODUCT_QUESTION: {
        if (draft[action.payload.questionId]) {
          draft[action.payload.questionId].deleted = true;
          if (draft[action.payload.parentId]) {
            draft[action.payload.parentId].replies_count--;
          }
        }
        break;
      }

      case ForumTypes.SUCCEED_DELETE_REPLY: {
        if (draft[action.payload.replyId]) {
          draft[action.payload.replyId].deleted = true;
          if (draft[action.payload.threadId]) {
            draft[action.payload.threadId].replies_count--;
          }
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}
