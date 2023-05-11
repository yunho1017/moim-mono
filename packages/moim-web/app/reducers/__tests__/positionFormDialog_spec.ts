import { INITIAL_STATE, reducer } from "../positionFormDialog";
import { ActionCreators as PositionFormDialogActionCreators } from "app/actions/positionFormDialog";
import { FORM_MODE } from "app/common/constants/form";

describe("positionFormDialog Reducer", () => {
  describe("when dispatch OPEN_FOR_CREATE Action", () => {
    it("should change mode to create type and isOpen is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        PositionFormDialogActionCreators.openForCreate(),
      );

      expect(state.mode).toEqual(FORM_MODE.CREATE);
      expect(state.isOpen).toBeTruthy();
    });
  });

  describe("when dispatch OPEN_FOR_EDIT Action", () => {
    it("should change mode to Channel form mode type and isOpen is truthy", () => {
      const channelId = "A1234";
      const state = reducer(
        INITIAL_STATE,
        PositionFormDialogActionCreators.openForEdit(channelId),
      );

      expect(state.mode).toEqual(FORM_MODE.EDIT);
      expect(state.positionId).toEqual(channelId);
      expect(state.isOpen).toBeTruthy();
    });
  });

  describe("when dispatch CLOSE_CHANNEL_FORM_DIALOG Action", () => {
    it("should change mode to undefined and isOpen is falsy", () => {
      const state = reducer(
        {
          ...INITIAL_STATE,
          mode: FORM_MODE.CREATE,
          positionId: "P1234",
          isOpen: true,
        },
        PositionFormDialogActionCreators.close(),
      );

      expect(state.positionId).toBeUndefined();
      expect(state.mode).toBeUndefined();
      expect(state.isOpen).toBeFalsy();
    });
  });
});
