import shortid from "shortid";
import { SnackbarTypes } from "./types";
import { ActionUnion } from "./helpers";
import { ThunkPromiseResult } from "app/store";

function createAction<T extends { type: SnackbarTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openSnackbar: (
    payload: Moim.Snackbar.IPresetProps &
      Moim.Snackbar.ISnackbarLeftIconProps &
      Moim.Snackbar.ISnackbarRightIconProps &
      Moim.Snackbar.ISnackbarRightSecondIconProps & {
        timeout?: number;
        textKey?: string;
        type?: Moim.Snackbar.GLOBAL_ALERT_SNACKBAR_TYPE;
      },
  ) =>
    createAction({
      type: SnackbarTypes.OPEN_SNACKBAR,
      payload: {
        ...payload,
        id: shortid(),
      },
    }),

  clearSnackbar: (ids: Moim.Id[]) =>
    createAction({
      type: SnackbarTypes.CLOSE_SNACKBAR,
      payload: { ids },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function openSnackbar(
  payload: Moim.Snackbar.IPresetProps &
    Moim.Snackbar.ISnackbarLeftIconProps &
    Moim.Snackbar.ISnackbarRightIconProps &
    Moim.Snackbar.ISnackbarRightSecondIconProps & {
      timeout?: number;
      textKey?: string;
      type?: Moim.Snackbar.GLOBAL_ALERT_SNACKBAR_TYPE;
    },
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.openSnackbar(payload));
  };
}
