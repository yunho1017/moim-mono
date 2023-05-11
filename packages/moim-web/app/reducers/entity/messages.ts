import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Conversations.INormalizedData = {};

export function reducer(
  state: Moim.Conversations.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        Object.entries(action.payload.messages || {}).forEach(
          ([key, value]) => {
            if (
              action.payload.forceUpdate ||
              value.updated_at > (draft[key]?.updated_at || 0)
            ) {
              draft[key] = value;
            }
          },
        );
        break;
      }

      default: {
        break;
      }
    }
  });
}
