import { reducer, INITIAL_STATE } from "../reducer";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";

describe("ForumThreadListPage Reducer", () => {
  describe("when dispatch START_GET_THREAD_LIST action", () => {
    it("should change isLoading, sort state", () => {
      const state = reducer(
        INITIAL_STATE,
        ForumActionCreators.startGetThreadList("C:123", {}, "createdAt"),
      );

      expect(state.isLoading["C:123"]).toEqual(true);
      expect(state.sorting).toEqual("createdAt");
    });
  });

  describe("when dispatch SUCCEED_GET_THREAD_LIST action", () => {
    it("should change isLoading", () => {
      const state = reducer(
        INITIAL_STATE,
        ForumActionCreators.succeedGetThreadList("G1234", ["T:123", "T:456"], {
          after: "T:456",
        }),
      );

      expect(state.isLoading.G1234).toBeFalsy();
    });
  });

  describe("when dispatch FAILED_GET_THREAD_LIST action", () => {
    it("should change isLoading", () => {
      const state = reducer(
        INITIAL_STATE,
        ForumActionCreators.succeedGetThreadList(
          "G1234",
          ["T:123", "T:456"],
          {},
        ),
      );

      expect(state.isLoading.G1234).toBeFalsy();
    });
  });

  describe("when dispatch CHANGE_FILTER_OPTION action", () => {
    it("should change specific changes", () => {
      const newTagSets = {
        tagSet1: ["1111", "2222"],
        tagSet2: ["aaaa"],
      };
      const state = reducer(
        {
          ...INITIAL_STATE,
          filterOption: {
            ...INITIAL_STATE.filterOption,
            order: "asc",
            tagSets: {
              query: {
                tagSet1: ["12345"],
              },
              selectedTags: ["12345"],
            },
          },
        },
        ForumActionCreators.changeFilterOption("G1234", {
          filterOption: {
            tagSets: {
              query: newTagSets,
              selectedTags: ["1111", "2222", "aaaa"],
            },
          },
        }),
      );

      expect(state.filterOption.order).toBe("asc");
      expect(state.filterOption.tagSets?.query).toEqual(newTagSets);
      expect(state.filterOption.tagSets?.selectedTags).toHaveLength(3);
    });
  });
});
