import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE: Record<Moim.Id, Moim.Community.ICommunity> = {};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.community_communities) {
          Object.entries(action.payload.community_communities).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}
