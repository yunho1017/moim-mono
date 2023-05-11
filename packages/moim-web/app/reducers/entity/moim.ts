import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export function reducer(
  state: Moim.Group.INormalizedData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.moims) {
          Object.entries(action.payload.moims).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }
    }
  });
}
