import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE_HISTORY: Record<Moim.Id, Moim.DQuest.IHistory> = {};
export const INITIAL_STATE_QUEST: Record<
  Moim.Id,
  Moim.DQuest.INormalizedQuest
> = {};

export function historyReducer(
  state = INITIAL_STATE_HISTORY,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.dquest_histories) {
          Object.entries(action.payload.dquest_histories).forEach(
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

export function questReducer(state = INITIAL_STATE_QUEST, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.dquest_quests) {
          Object.entries(action.payload.dquest_quests).forEach(
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
