import produce from "immer";
import { AllActions } from "app/actions";
import { ActionTypes } from "./actions";

export interface IUserGlobalReportDialogState {
  open: boolean;
  threadId: string | null;
  parentId: string | null;
}

export const INITIAL_STATE: IUserGlobalReportDialogState = {
  open: false,
  threadId: null,
  parentId: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.OPEN: {
        draft.open = true;
        draft.threadId = action.payload.threadId;
        draft.parentId = action.payload.parentId;
        break;
      }

      case ActionTypes.CLOSE: {
        draft.open = false;
        draft.threadId = null;
        draft.parentId = null;
        break;
      }
    }
  });
}
