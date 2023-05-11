import { createSelector } from "reselect";
import { IAppState } from "../rootReducer";

export const snackbarStateSelector = (state: IAppState) => state.snackbar;

export const findSnackbarSelector = createSelector(
  snackbarStateSelector,
  (_: IAppState, id: string) => id,
  (snackbarState, id) =>
    snackbarState.snackbarList
      .filter(snackbar => snackbar.id === id)
      .reverse()[0],
);
