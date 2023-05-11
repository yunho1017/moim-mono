// helper
import { AllActions } from "app/actions";
import produce from "immer";
import { DirectMessageTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.DirectMessage.IDirectMessageDialogState = {
  open: false,
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case DirectMessageTypes.OPEN_NEW_DIRECT_MESSAGE_DIALOG: {
        draft.open = true;
        break;
      }

      case DirectMessageTypes.CLOSE_NEW_DIRECT_MESSAGE_DIALOG: {
        draft.open = false;
        break;
      }
    }
  });
