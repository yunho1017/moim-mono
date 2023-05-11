import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "../../actions/types";

export const INITIAL_STATE: Moim.Channel.Link.INormalizedData = {};

export function reducer(
  state: Moim.Channel.Link.INormalizedData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.links) {
          Object.entries(action.payload.links).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }
    }
  });
}
