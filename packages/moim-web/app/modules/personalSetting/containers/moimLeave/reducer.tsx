import produce from "immer";
import { AllActions } from "app/actions";
import { MeTypes } from "app/actions/types";

export interface IState {
  isLoading: boolean;
  isFailed: boolean;
  isSucceedToLeave: boolean;
  isOpenFailedAlert: boolean;
  failedMessage?: string;
}

export const INITIAL_STATE: IState = {
  isLoading: false,
  isFailed: false,
  isSucceedToLeave: false,
  isOpenFailedAlert: false,
  failedMessage: undefined,
};

export function reducer(state: IState = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case MeTypes.START_LEAVE_MOIM: {
        draft.isSucceedToLeave = false;
        draft.isLoading = true;
        draft.isFailed = false;
        break;
      }

      case MeTypes.FAILED_LEAVE_MOIM: {
        draft.isLoading = false;
        draft.isFailed = true;
        if (action.payload.showAlertDialog) {
          draft.isOpenFailedAlert = true;
          draft.failedMessage = action.payload.failedMessage;
        }
        break;
      }

      case MeTypes.SUCCEED_LEAVE_MOIM: {
        draft.isSucceedToLeave = true;
        draft.isLoading = false;
        draft.failedMessage = undefined;
        break;
      }

      case MeTypes.OPEN_FAILED_LEAVE_MOIM_ALERT: {
        draft.isOpenFailedAlert = true;
        draft.failedMessage = action.payload.failedMessage;
        break;
      }

      case MeTypes.CLOSE_FAILED_LEAVE_MOIM_ALERT: {
        draft.isOpenFailedAlert = false;
        draft.failedMessage = undefined;
        break;
      }
    }
  });
}
