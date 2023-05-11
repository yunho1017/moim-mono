import produce from "immer";
import { AllActions } from "app/actions";
import { SNSShareDialogTypes } from "app/actions/types";

export interface ISNSShareDialogDialogState {
  open: boolean;
  shareUrl: string | null;
}

export const INITIAL_STATE: ISNSShareDialogDialogState = {
  open: false,
  shareUrl: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case SNSShareDialogTypes.OPEN: {
        draft.open = true;
        draft.shareUrl = action.payload.shareUrl;
        break;
      }

      case SNSShareDialogTypes.CLOSE: {
        draft.open = false;
        draft.shareUrl = null;
        break;
      }
    }
  });
}
