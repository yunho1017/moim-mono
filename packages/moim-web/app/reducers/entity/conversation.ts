import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "../../actions/types";

export const INITIAL_STATE: Moim.Conversations.INormalizedConversationData = {};
export function reducer(
  state: Moim.Conversations.INormalizedConversationData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.conversations) {
          Object.entries(action.payload.conversations).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }
    }
  });
}
