import { produce } from "immer";

import { AllActions } from "app/actions";
import { ForumEditorTypes, ForumTypes } from "app/actions/types";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";

export interface IReduxState {
  // 하위 관계에 있는 thread 들
  threadIds: Record<Moim.Id, Moim.IPaginatedListResponse<Moim.Id>>;
}

export const INITIAL_STATE: IReduxState = {
  threadIds: {},
};

export function reducers(
  state: IReduxState = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumTypes.SUCCEED_GET_THREAD_LIST: {
        const { threadIds, forumId, paging, pagingKey } = action.payload;
        const baseThreadIds = draft.threadIds[forumId]?.data || [];
        const basePaging = draft.threadIds[forumId]?.paging || {};

        if (pagingKey) {
          draft.threadIds[forumId] = {
            data:
              (pagingKey === "before"
                ? mergeArrayUniq(threadIds, baseThreadIds)
                : mergeArrayUniq(baseThreadIds, threadIds)) ?? [],
            paging: {
              before:
                pagingKey === "before"
                  ? paging.before ?? undefined
                  : basePaging.before,
              after:
                pagingKey === "after"
                  ? paging.after ?? undefined
                  : basePaging.after,
            },
          };
        } else {
          draft.threadIds[forumId] = {
            data: threadIds,
            paging,
          };
        }

        break;
      }

      case ForumTypes.SUCCEED_DELETE_THREAD: {
        const { forumId, threadId } = action.payload;
        const currentThreadIds = draft.threadIds[forumId] || {
          data: [],
          paging: {},
        };
        draft.threadIds[forumId].data = currentThreadIds.data.filter(
          item => item !== threadId,
        );

        break;
      }

      case ForumEditorTypes.SUCCEEDED_POSTING_THREAD: {
        const { forumId, threadId } = action.payload;
        if (draft.threadIds[forumId]) {
          draft.threadIds[forumId].data.unshift(threadId);
        }

        break;
      }

      case ForumEditorTypes.SUCCEEDED_UPDATE_THREAD: {
        const { forumId, threadId } = action.payload;

        if (!draft.threadIds[forumId]?.data.includes(threadId)) {
          draft.threadIds[forumId]?.data.unshift(threadId);
        }

        break;
      }

      case ForumTypes.CLEAR_THREAD_LIST: {
        delete draft.threadIds[action.payload.channelId];

        break;
      }

      case ForumTypes.ADD_THREAD: {
        const { threadId, forumId } = action.payload;

        if (draft.threadIds[forumId]) {
          draft.threadIds[forumId].data =
            mergeArrayUniq(draft.threadIds[forumId]?.data ?? [], [threadId]) ??
            [];
        } else {
          draft.threadIds[forumId] = {
            data: [threadId],
            paging: {},
          };
        }

        break;
      }

      case ForumTypes.SUCCEED_GET_COMMENT_LIST: {
        const { threadId, data, mergeType } = action.payload;
        const baseThreadIds = draft.threadIds[threadId]?.data || [];
        const basePaging = draft.threadIds[threadId]?.paging || {};

        switch (mergeType) {
          case "before":
            draft.threadIds[threadId] = {
              data: mergeArrayUniq(data.data, baseThreadIds) ?? [],
              paging: {
                before: data.paging.before,
                after: basePaging.after,
              },
            };
            break;
          case "after":
            draft.threadIds[threadId] = {
              data: mergeArrayUniq(baseThreadIds, data.data) ?? [],
              paging: {
                before: basePaging.before,
                after: data.paging.after,
              },
            };
            break;
          case "replace":
            draft.threadIds[threadId] = data;
            break;
        }
        break;
      }

      case ForumTypes.SUCCEED_DELETE_REPLY: {
        const { threadId, replyId } = action.payload;
        if (draft.threadIds[threadId]) {
          draft.threadIds[threadId].data = draft.threadIds[
            threadId
          ].data.filter(id => id !== replyId);
        }
        break;
      }

      case ForumTypes.CLEAR_COMMENT_LIST: {
        delete draft.threadIds[action.payload.threadId];
        break;
      }

      default: {
        break;
      }
    }
  });
}
