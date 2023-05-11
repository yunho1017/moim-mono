import { AllActions } from "app/actions";
import { EntityTypes } from "../../actions/types";
import produce from "immer";

export const INITIAL_STATE: Moim.Forum.INormalizedForumData = {};

export function reducer(
  state: Moim.Forum.INormalizedForumData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.forums) {
          Object.entries(action.payload.forums).forEach(([key, value]) => {
            draft[key] = value;
          });
          return draft;
        }
        break;
      }
    }
  });
}
