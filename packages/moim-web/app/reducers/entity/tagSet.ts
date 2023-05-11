import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE:
  | Moim.TagSet.INormalizedTagSet
  | Moim.TagSet.INormalizedTagItem = {};

export function reducer(
  state:
    | Moim.TagSet.INormalizedTagSet
    | Moim.TagSet.INormalizedTagItem = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.tagset) {
          Object.entries(action.payload.tagset).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }
    }
  });
}
