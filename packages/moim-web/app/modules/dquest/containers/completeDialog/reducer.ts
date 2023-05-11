import produce from "immer";
import { AllActions } from "app/actions";
import { DQuestCompleteDialogTypes } from "app/actions/types";

export interface IDQuestCompleteDialogState {
  messages: Moim.DQuest.IDQuestCompleteDialogMessage[];
}

export const INITIAL_STATE: IDQuestCompleteDialogState = {
  messages: [],
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case DQuestCompleteDialogTypes.OPEN_DQUEST_COMPLETE_DIALOG: {
        if (!draft.messages.find(msg => msg.id === action.payload.id)) {
          draft.messages.push(action.payload);
        }
        break;
      }
      case DQuestCompleteDialogTypes.CLOSE_DQUEST_COMPLETE_DIALOG: {
        draft.messages = draft.messages.filter(
          msg => msg.id !== action.payload.messageId,
        );
        break;
      }
    }
  });
}
