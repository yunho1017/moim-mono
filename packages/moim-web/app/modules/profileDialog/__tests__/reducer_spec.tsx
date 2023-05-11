import { AllActions } from "app/actions";
import { INITIAL_STATE, reducer } from "../reducer";
import { ProfileTypes } from "app/actions/types";

function reduceState(action: AllActions, state = INITIAL_STATE) {
  return reducer(state, action);
}

describe("Profile dialog reducer", () => {
  describe("when receive OPEN_PROFILE_DIALOG", () => {
    it("should isOpen to true, set targetUserId", () => {
      const state = reduceState({
        type: ProfileTypes.OPEN_PROFILE_DIALOG,
        payload: {
          userId: "U1234",
          anchorElement: null,
        },
      });
      expect(state.isOpen).toBeTruthy();
      expect(state.targetUserId).toBe("U1234");
    });
  });

  describe("when receive CLOSE_PROFILE_DIALOG", () => {
    it("should isOpen to false, set targetUserId to empty", () => {
      const state = reduceState(
        {
          type: ProfileTypes.CLOSE_PROFILE_DIALOG,
        },
        {
          ...INITIAL_STATE,
          isOpen: true,
          targetUserId: "U1234",
        },
      );
      expect(state.isOpen).toBeFalsy();
      expect(state.targetUserId).toBe("");
    });
  });

  describe("when receive START_FETCHING_PROFILE", () => {
    it("should isLoading to true, isFailed to false", () => {
      const state = reduceState({
        type: ProfileTypes.START_FETCHING_PROFILE,
      });
      expect(state.isLoading).toBeTruthy();
      expect(state.isFailed).toBeFalsy();
    });
  });

  describe("when receive FAILED_FETCHING_PROFILE", () => {
    it("should isLoading to true, isFailed to false", () => {
      const state = reduceState({
        type: ProfileTypes.FAILED_FETCHING_PROFILE,
      });
      expect(state.isLoading).toBeFalsy();
      expect(state.isFailed).toBeTruthy();
    });
  });

  describe("when receive SUCCEED_FETCHING_PROFILE", () => {
    it("should isLoading to true, isFailed to false", () => {
      const state = reduceState({
        type: ProfileTypes.SUCCEED_FETCHING_PROFILE,
        payload: {
          userId: "U1234",
        },
      });
      expect(state.isLoading).toBeFalsy();
      expect(state.isFailed).toBeFalsy();
    });
  });
});
