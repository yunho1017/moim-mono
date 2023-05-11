import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { bookmarkListDenormalizer } from "app/models/bookmark";
import { entitiesSelector } from ".";

export const selectPreviewProfileBlocks = (state: IAppState) =>
  state.profileData.previewBlocks[state.profileDialog.targetUserId];

export const selectShowProfileBlocks = (state: IAppState) =>
  state.profileData.showBlocks[state.profileData.targetUserId];

export const selectGetBookmarksLoading = createSelector(
  (state: IAppState) => state.profileData.bookmark.getBookmarksLoading,
  (_: IAppState, userId: Moim.Id) => userId,
  (loading, userId) => loading[userId],
);

export const selectMoimResources = (state: IAppState) =>
  state.profileData.bookmark.moimResources;

export const selectUserBookmarks = createSelector(
  (state: IAppState, userId: Moim.Id) =>
    state.profileData.bookmark.bookmarks[userId],
  entitiesSelector,
  (bookmarks, entities) => {
    if (bookmarks) {
      return bookmarkListDenormalizer(bookmarks, entities);
    }

    return {
      data: [],
      paging: {},
    };
  },
);
