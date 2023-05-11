import { INITIAL_STATE, reducers } from "../";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";

describe("forumData Reducer", () => {
  describe("when dispatch SUCCEED_GET_THREAD_LIST action", () => {
    const forumId = "G1234";
    it("should append threadIds", () => {
      const state = reducers(
        {
          ...INITIAL_STATE,
          threadIds: { G1234: { data: ["T:999"], paging: {} } },
        },
        ForumActionCreators.succeedGetThreadList(
          forumId,
          ["T:123", "T:456"],
          {
            after: "T:456",
            before: null,
          },
          "after",
        ),
      );

      expect(state.threadIds[forumId].data).toEqual([
        "T:999",
        "T:123",
        "T:456",
      ]);
    });
  });

  describe("when dispatch SUCCEEDED_POSTING_THREAD action", () => {
    const forumId = "G1234";
    it("should append threadIds", () => {
      const state = reducers(
        {
          ...INITIAL_STATE,
          threadIds: { [forumId]: { data: ["T:999"], paging: {} } },
        },
        ForumActionCreators.succeededPostingThread(forumId, "T:123"),
      );

      expect(state.threadIds[forumId].data).toEqual(["T:123", "T:999"]);
    });
  });

  describe("when dispatch CLEAR_THREAD_LIST action", () => {
    it("should change threadIds to empty", () => {
      const state = reducers(
        {
          ...INITIAL_STATE,
          threadIds: { G1234: { data: ["T:999", "T:123"], paging: {} } },
        },
        ForumActionCreators.clearThreadList({ channelId: "G1234" }),
      );

      expect(state.threadIds).toEqual({});
    });
  });

  describe("when dispatch ADD_THREAD action", () => {
    const forumId = "G1234";
    describe("when empty threadIds", () => {
      it("should add threadIds", () => {
        const state = reducers(
          INITIAL_STATE,
          ForumActionCreators.addThread(forumId, "T:333"),
        );
        expect(state.threadIds[forumId].data).toEqual(["T:333"]);
      });
    });

    describe("when threadIds has data", () => {
      it("should add threadIds should first position", () => {
        const state = reducers(
          {
            ...INITIAL_STATE,
            threadIds: { [forumId]: { data: ["T:111", "T:222"], paging: {} } },
          },
          ForumActionCreators.addThread(forumId, "T:333"),
        );
        expect(state.threadIds[forumId].data).toHaveLength(3);
        expect(state.threadIds[forumId].data).toEqual([
          "T:111",
          "T:222",
          "T:333",
        ]);
      });
    });
  });
});
