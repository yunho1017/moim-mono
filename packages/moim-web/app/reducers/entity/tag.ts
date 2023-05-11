import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, TagTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Tag.INormalizedTag = {};

export function reducer(
  state: Moim.Tag.INormalizedTag = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.tags) {
          Object.entries(action.payload.tags).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }

      case TagTypes.SUCCEEDED_UPDATE_TAG: {
        break;
      }
    }
  });
}
