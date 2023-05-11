import { INITIAL_STATE, reducer } from "../";
import { ActionCreators } from "app/actions/sideNavigation";

describe("SideNavigation Reducer", () => {
  describe("when dispatch EXPAND_SIDE_NAVIGATION action", () => {
    it("should isExpand state is true", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.expandSideNavigation(),
      );

      expect(state.isExpand).toBeTruthy();
    });
  });

  describe("when dispatch COLLAPSE_SIDE_NAVIGATION action", () => {
    it("should isExpand state is false", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.collapseSideNavigation(),
      );

      expect(state.isExpand).toBeFalsy();
    });
  });
});
