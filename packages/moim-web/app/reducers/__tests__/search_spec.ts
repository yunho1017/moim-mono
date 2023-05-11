import { INITIAL_STATE, reducer } from "../search";
import { ActionCreators } from "app/actions/user";

describe("Search Reducer", () => {
  describe("when dispatch START_GET_SEARCH_USERS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.startGetSearchUsers(),
      );

      expect(state.searchUsersLoading).toBeTruthy();
    });
  });

  describe("when loadmore, dispatch Loadmore SUCCEED_GET_SEARCH_USERS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.succeedGetSearchUsers({
          users: { data: ["U123"], paging: {} },
          isLoadMore: true,
        }),
      );

      expect(state.users.data).toEqual(["U123"]);
      expect(state.users.paging).toEqual({});
      expect(state.searchUsersLoading).toBeFalsy();
    });
  });

  describe("when new users, dispatch Loadmore SUCCEED_GET_SEARCH_USERS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        { ...INITIAL_STATE, users: { data: ["U124"], paging: {} } },
        ActionCreators.succeedGetSearchUsers({
          users: { data: ["U123"], paging: {} },
          isLoadMore: false,
        }),
      );

      expect(state.users.data).toEqual(["U123"]);
      expect(state.users.paging).toEqual({});
      expect(state.searchUsersLoading).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_SEARCH_USERS Action", () => {
    it("should change getPositionsLoading is truthy", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.failedGetSearchUsers(),
      );

      expect(state.searchUsersLoading).toBeFalsy();
    });
  });
});
