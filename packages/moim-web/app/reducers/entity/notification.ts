import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Notification.INormalizedData = {};

export function reducer(
  state: Moim.Notification.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.notifications) {
          Object.entries(action.payload.notifications).forEach(
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
