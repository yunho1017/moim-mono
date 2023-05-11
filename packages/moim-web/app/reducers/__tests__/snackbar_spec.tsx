import { INITIAL_STATE, reducer } from "../snackbar";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { ISnackBar } from "app/reducers/snackbar";

describe("snackbar reducer", () => {
  const snackbar: ISnackBar = {
    id: "Mock_id",
    text: "Connection not found",
    type: "normal",
  };

  describe("when dispatch OPEN_SNACKBAR action", () => {
    describe("when not exist snackbar id", () => {
      it("should add snackbar data", () => {
        const state = reducer(
          INITIAL_STATE,
          SnackbarActionCreators.openSnackbar(snackbar),
        );

        expect(state.snackbarList.length).toEqual(1);
      });
    });

    describe("when exist snackbar id", () => {
      const state = reducer(
        { ...INITIAL_STATE, snackbarList: [{ ...snackbar }] },
        SnackbarActionCreators.openSnackbar(snackbar),
      );

      expect(state.snackbarList.length).toEqual(2);
    });
  });
});
