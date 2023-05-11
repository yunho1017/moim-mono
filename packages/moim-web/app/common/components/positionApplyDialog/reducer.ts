import { AllActions } from "app/actions";
import { PositionApplyDialogTypes } from "app/actions/types";
import produce from "immer";

export interface IPositionApplyState {
  isOpen: boolean;
  position: Moim.Id | undefined;
}

export const INITIAL_STATE: IPositionApplyState = {
  isOpen: false,
  position: undefined,
};

export function reducer(
  state: IPositionApplyState = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case PositionApplyDialogTypes.OPEN: {
        draft.isOpen = true;
        draft.position = action.payload.position;
        break;
      }

      case PositionApplyDialogTypes.CLOSE: {
        draft.isOpen = false;
        draft.position = undefined;
        break;
      }
    }
  });
}
