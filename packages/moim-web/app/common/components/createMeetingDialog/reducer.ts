import produce from "immer";
import { AllActions } from "app/actions";
import { CreateMeetingDialogTypes } from "app/actions/types";

export interface IReduxState {
  open: boolean;
}

export const INITIAL_STATE: IReduxState = {
  open: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CreateMeetingDialogTypes.OPEN_CREATE_MEETING_DIALOG: {
        draft.open = true;
        break;
      }

      case CreateMeetingDialogTypes.CLOSE_CREATE_MEETING_DIALOG: {
        draft.open = false;
        break;
      }
    }
  });
}
