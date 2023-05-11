import { AllActions } from "app/actions";
import { ConversationTypes } from "app/actions/types";

export interface IConversationPageData {
  messageEditState:
    | {
        channelId: Moim.Id;
        messageId: Moim.Id;
      }
    | undefined;
}

export const INITIAL_STATE: IConversationPageData = {
  messageEditState: undefined,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  switch (action.type) {
    case ConversationTypes.CHANGE_MESSAGE_EDIT_STATE: {
      return {
        ...state,
        messageEditState: action.payload,
      };
    }

    case ConversationTypes.CLEAR_MESSAGE_EDIT_STATE: {
      return {
        ...state,
        messageEditState: undefined,
      };
    }

    default: {
      return state;
    }
  }
}
