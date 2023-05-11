import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, MeTypes } from "../../actions/types";

export const INITIAL_STATE: Moim.Bookmark.INormalizedData = {};
export function reducer(
  state: Moim.Bookmark.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.bookmarks) {
          Object.entries(action.payload.bookmarks).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }

      case MeTypes.SUCCEEDED_DELETE_BOOKMARK: {
        const { bookmarkId } = action.payload;

        delete draft[bookmarkId];
        break;
      }
    }
  });
}
