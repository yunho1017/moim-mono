import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Category.INormalizedCategoryData = {};

export function reducer(
  state: Moim.Category.INormalizedCategoryData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.categories) {
          Object.entries(action.payload.categories).forEach(([key, value]) => {
            draft[key] = value;
          });
          return draft;
        }
        break;
      }
    }
  });
}
