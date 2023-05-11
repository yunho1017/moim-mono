import produce from "immer";
import { AllActions } from "app/actions";
import { MeTypes, ProfileTypes, UserTypes } from "app/actions/types";

export interface IProfileState {
  targetUserId: Moim.Id;
  previewBlocks: Record<Moim.Id, Moim.Blockit.Blocks[]>;
  showBlocks: Record<Moim.Id, Moim.Blockit.Blocks[]>;
  bookmark: {
    getBookmarksLoading: Record<Moim.Id, boolean>;
    getMoimResourcesLoading: boolean;
    bookmarks: Record<Moim.Id, Moim.IPaginatedListResponse<Moim.Id>>;
    moimResources: Moim.Group.INormalizedGroup[];
    currentMoimResource: Moim.Id | "all" | undefined;
  };
}

export const INITIAL_STATE: IProfileState = {
  targetUserId: "",
  previewBlocks: {},
  showBlocks: {},
  bookmark: {
    getBookmarksLoading: {},
    bookmarks: {},
    getMoimResourcesLoading: false,
    moimResources: [],
    currentMoimResource: undefined,
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ProfileTypes.SUCCEED_FETCHING_PROFILE: {
        draft.targetUserId = action.payload.userId;
        break;
      }

      case UserTypes.START_GET_PROFILE_BLOCKS: {
        const { userId, viewType } = action.payload;
        const loadingBlock: Moim.Blockit.ILoadingBlock = {
          type: "loading",
        };
        if (viewType === "show") {
          if (!draft.showBlocks[userId]) {
            draft.showBlocks[userId] = [loadingBlock];
          }
        } else {
          if (!draft.previewBlocks[userId]) {
            draft.previewBlocks[userId] = [loadingBlock];
          }
        }
        break;
      }

      case UserTypes.SUCCEEDED_GET_PROFILE_BLOCKS: {
        const { userId, viewType, blocks } = action.payload;
        if (viewType === "show") {
          draft.showBlocks[userId] = blocks;
        } else {
          draft.previewBlocks[userId] = blocks;
        }
        break;
      }

      case UserTypes.FAILED_GET_PROFILE_BLOCKS: {
        const { userId, viewType } = action.payload;
        if (viewType === "show") {
          draft.showBlocks[userId] = draft.showBlocks[userId].filter(
            block => block.type !== "loading",
          );
        } else {
          draft.previewBlocks[userId] = draft.previewBlocks[userId].filter(
            block => block.type !== "loading",
          );
        }
        break;
      }

      case MeTypes.START_GET_BOOKMARKS: {
        draft.bookmark.getBookmarksLoading[action.payload.userId] = true;
        break;
      }
      case MeTypes.SUCCEEDED_GET_BOOKMARKS: {
        draft.bookmark.getBookmarksLoading[action.payload.userId] = false;
        draft.bookmark.bookmarks[action.payload.userId] =
          action.payload.bookmarks;
        break;
      }
      case MeTypes.FAILED_GET_BOOKMARKS: {
        draft.bookmark.getBookmarksLoading[action.payload.userId] = false;
        break;
      }
      case MeTypes.SUCCEEDED_POST_BOOKMARK: {
        const { bookmarkId, userId, currentGroupId } = action.payload;
        if (
          (draft.bookmark.currentMoimResource === "all" ||
            currentGroupId === draft.bookmark.currentMoimResource) &&
          userId &&
          draft.bookmark.bookmarks[userId]
        ) {
          draft.bookmark.bookmarks[userId].data = [
            bookmarkId,
            ...draft.bookmark.bookmarks[userId].data,
          ];
        }
        break;
      }
      case MeTypes.SUCCEEDED_DELETE_BOOKMARK: {
        const { bookmarkId, userId } = action.payload;
        if (userId && draft.bookmark.bookmarks[userId]) {
          draft.bookmark.bookmarks[userId].data = draft.bookmark.bookmarks[
            userId
          ].data.filter(bookmark => bookmark !== bookmarkId);
        }
        break;
      }
      case MeTypes.START_ALL_MOIM_RESOURCES: {
        draft.bookmark.getMoimResourcesLoading = true;
        break;
      }
      case MeTypes.SUCCEEDED_ALL_MOIM_RESOURCES: {
        draft.bookmark.getMoimResourcesLoading = false;
        draft.bookmark.moimResources = action.payload.resources;
        break;
      }
      case MeTypes.FAILED_ALL_MOIM_RESOURCES: {
        draft.bookmark.getMoimResourcesLoading = false;
        break;
      }

      case MeTypes.CHANGE_BOOKMAKR_CURRENT_MOIM_RESOURCE: {
        draft.bookmark.currentMoimResource = action.payload.groupId;
        break;
      }
    }
  });
}
