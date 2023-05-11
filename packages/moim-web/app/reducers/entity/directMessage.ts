import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, TagTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.DirectMessage.INormalizedData = {};

export function reducer(
  state: Moim.DirectMessage.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.directMessages) {
          Object.entries(action.payload.directMessages).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      case TagTypes.SUCCEEDED_UPDATE_TAG: {
        break;
      }
    }
  });
}
