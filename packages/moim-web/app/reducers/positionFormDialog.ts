import produce from "immer";
import { FORM_MODE } from "common/constants/form";
import { AllActions } from "../actions";
import { PositionFormDialogTypes } from "../actions/types";

export interface IPositionFormState {
  mode: FORM_MODE | undefined;
  positionId: Moim.Id | undefined;
  isOpen: boolean;
}

export const INITIAL_STATE: IPositionFormState = {
  mode: undefined,
  positionId: undefined,
  isOpen: false,
};

export function reducer(
  state: IPositionFormState = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case PositionFormDialogTypes.OPEN_FOR_CREATE: {
        draft.mode = FORM_MODE.CREATE;
        draft.isOpen = true;
        break;
      }

      case PositionFormDialogTypes.OPEN_FOR_EDIT: {
        draft.mode = FORM_MODE.EDIT;
        draft.positionId = action.positionId;
        draft.isOpen = true;
        break;
      }

      case PositionFormDialogTypes.CLOSE: {
        draft.mode = undefined;
        draft.positionId = undefined;
        draft.isOpen = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
}
