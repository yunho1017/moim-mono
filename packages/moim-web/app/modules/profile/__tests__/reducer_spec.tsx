import { AllActions } from "app/actions";
import { ActionCreators } from "app/actions/profile";
import { reducer, INITIAL_STATE } from "../reducer";

function reduceState(action: AllActions, state = INITIAL_STATE) {
  return reducer(state, action);
}

describe("Profile page reducer", () => {
  describe("when dispatch START_FETCHING_PROFILE", () => {
    it("should change isLoading to true, isFailed to false", () => {
      const state = reduceState(ActionCreators.startFetchingProfile());
      expect(state.isLoading).toBeTruthy();
      expect(state.isFailed).toBeFalsy();
    });
  });

  describe("when dispatch SUCCEED_FETCHING_PROFILE", () => {
    it("should change isLoading to false", () => {
      const state = reduceState(ActionCreators.succeedFetchingProfile("U1234"));
      expect(state.isLoading).toBeFalsy();
      expect(state.isFailed).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_FETCHING_PROFILE", () => {
    it("should change isLoading to false, isFailed to true", () => {
      const state = reduceState(ActionCreators.failedFetchingProfile());
      expect(state.isLoading).toBeFalsy();
      expect(state.isFailed).toBeTruthy();
    });
  });
});
