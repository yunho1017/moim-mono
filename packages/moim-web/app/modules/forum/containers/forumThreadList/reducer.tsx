import produce from "immer";
import { AllActions } from "app/actions";
import { ForumTypes } from "app/actions/types";

export interface IForumListPageData {
  isLoading: Record<Moim.Id, boolean>;
  sorting?: Moim.Forum.ForumSortingOptionSort;
  filterOption: Moim.Forum.IThreadListFilterOption;
  error: string | null;
  updated: boolean;
  highlightThreadId: Moim.Id | null;
  editPinnedPostListDialogOpen: boolean;
  isLoadingDeletePinnedPost: Record<Moim.Id, boolean>;
  isLoadingPostPinnedPost: Record<Moim.Id, boolean>;
  isLoadingGetPinnedPostList: Record<Moim.Id, boolean>;
  isLoadingArrangePinnedPostList: Record<Moim.Id, boolean>;
}

export const INITIAL_STATE: IForumListPageData = {
  isLoading: {},
  sorting: undefined,
  filterOption: {},
  error: null,
  updated: false,
  highlightThreadId: null,
  editPinnedPostListDialogOpen: false,
  isLoadingDeletePinnedPost: {},
  isLoadingPostPinnedPost: {},
  isLoadingGetPinnedPostList: {},
  isLoadingArrangePinnedPostList: {},
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumTypes.START_GET_THREAD_LIST: {
        draft.sorting = action.payload.sort;
        draft.isLoading[action.payload.forumId] = true;
        break;
      }

      case ForumTypes.SUCCEED_GET_THREAD_LIST: {
        draft.isLoading[action.payload.forumId] = false;
        break;
      }

      case ForumTypes.FAILED_GET_THREAD_LIST: {
        draft.isLoading[action.payload.forumId] = false;
        break;
      }

      case ForumTypes.UPDATE_HIGHLIGHT_THREAD_ID: {
        draft.highlightThreadId = action.payload.id;
        break;
      }

      case ForumTypes.CLEAR_HIGHLIGHT_THREAD_ID: {
        draft.highlightThreadId = null;
        break;
      }

      case ForumTypes.CHANGE_FORUM_ID: {
        draft.error = null;
        draft.updated = false;
        draft.highlightThreadId = null;
        draft.filterOption = INITIAL_STATE.filterOption;
        break;
      }

      case ForumTypes.CLEAR_THREAD_LIST: {
        delete draft.isLoading[action.payload.channelId];
        draft.error = null;
        draft.updated = false;
        draft.highlightThreadId = null;
        break;
      }

      case ForumTypes.CHANGE_FILTER_OPTION: {
        if (action.payload.sorting) {
          draft.sorting = action.payload.sorting;
        }
        if (action.payload.filterOption) {
          draft.filterOption = {
            ...draft.filterOption,
            ...action.payload.filterOption,
          };
        }
        break;
      }

      case ForumTypes.START_GET_PINNED_POST_LIST: {
        draft.isLoadingGetPinnedPostList[action.payload.channelId] = true;
        break;
      }

      case ForumTypes.SUCCEEDED_GET_PINNED_POST_LIST:
      case ForumTypes.FAILED_GET_PINNED_POST_LIST: {
        draft.isLoadingGetPinnedPostList[action.payload.channelId] = false;
        break;
      }
      case ForumTypes.START_PIN_POST: {
        draft.isLoadingPostPinnedPost[action.payload.channelId] = true;
        break;
      }

      case ForumTypes.SUCCEEDED_PIN_POST:
      case ForumTypes.FAILED_PIN_POST: {
        draft.isLoadingPostPinnedPost[action.payload.channelId] = false;
        break;
      }

      case ForumTypes.START_DELETE_PINNED_POST: {
        draft.isLoadingDeletePinnedPost[action.payload.channelId] = true;
        break;
      }

      case ForumTypes.SUCCEEDED_DELETE_PINNED_POST:
      case ForumTypes.FAILED_DELETE_PINNED_POST: {
        draft.isLoadingDeletePinnedPost[action.payload.channelId] = false;
        break;
      }

      case ForumTypes.START_ARRANGE_PINNED_POST_LIST: {
        draft.isLoadingArrangePinnedPostList[action.payload.channelId] = true;
        break;
      }

      case ForumTypes.SUCCEEDED_ARRANGE_PINNED_POST_LIST:
      case ForumTypes.FAILED_ARRANGE_PINNED_POST_LIST: {
        draft.isLoadingArrangePinnedPostList[action.payload.channelId] = false;
        break;
      }

      case ForumTypes.OPEN_EDIT_PINNED_POST_LIST_DIALOG: {
        draft.editPinnedPostListDialogOpen = true;
        break;
      }

      case ForumTypes.CLOSE_EDIT_PINNED_POST_LIST_DIALOG: {
        draft.editPinnedPostListDialogOpen = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
}
