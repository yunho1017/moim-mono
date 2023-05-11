import produce from "immer";
import { AllActions } from "app/actions";
import { SnackbarTypes } from "../actions/types";

export interface ISnackBar
  extends Moim.Snackbar.IPresetProps,
    Moim.Snackbar.ISnackbarLeftIconProps,
    Moim.Snackbar.ISnackbarRightIconProps,
    Moim.Snackbar.ISnackbarRightSecondIconProps {
  id: Moim.Id;
  textKey?: string;
  timeout?: number;
  type?: Moim.Snackbar.GLOBAL_ALERT_SNACKBAR_TYPE;
}

export interface ISnackbarState {
  snackbarList: ISnackBar[];
}

export const INITIAL_STATE: ISnackbarState = {
  snackbarList: [],
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case SnackbarTypes.OPEN_SNACKBAR: {
        draft.snackbarList.push(action.payload);
        break;
      }

      case SnackbarTypes.CLOSE_SNACKBAR: {
        draft.snackbarList = draft.snackbarList.filter(
          snackbar => !action.payload.ids.includes(snackbar.id),
        );
        break;
      }

      default: {
        return draft;
      }
    }
  });
}
