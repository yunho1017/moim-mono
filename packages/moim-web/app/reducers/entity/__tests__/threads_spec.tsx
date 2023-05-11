import { reducer, INITIAL_STATE } from "../threads";

import { ActionCreators } from "app/actions/entity";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";

import { RAW } from "app/__mocks__";

describe("Thread Entity Reducer", () => {
  describe("when dispatch ADD_ENTITY Action", () => {
    it("should added thread entity", () => {
      const state = reducer(
        INITIAL_STATE,
        ActionCreators.addEntity({
          threads: {
            "T300.123": RAW.THREAD,
            "T300.124": {
              ...RAW.THREAD,
              id: "T300.124",
            },
          },
        }),
      );

      expect(state!["T300.123"]).not.toBeUndefined();
      expect(state!["T300.124"]).not.toBeUndefined();
    });
  });

  describe("when dispatch SUCCEED_DELETE_THREAD", () => {
    it("should delete thread", () => {
      const state = reducer(
        {
          ...INITIAL_STATE,
          "T300.123": {
            ...RAW.THREAD,
            id: "T300.123",
          },
        },
        ForumActionCreators.succeedDeleteThread({
          forumId: "F1234",
          threadId: "T300.123",
        }),
      );

      expect(state).not.toHaveProperty("T300.123");
    });
  });

  describe("when dispatch SUCCEED_DELETE_REPLY", () => {
    it("should delete thread", () => {
      const state = reducer(
        {
          ...INITIAL_STATE,
          R1234: {
            ...RAW.THREAD,
            deleted: false,
            id: "R1234",
          },
        },
        ForumActionCreators.succeedDeleteReply({
          forumId: "F1234",
          threadId: "T300.123",
          replyId: "R1234",
        }),
      );

      expect(state).toHaveProperty("R1234");
      expect(state.R1234?.deleted).toBeTruthy();
    });
  });
});
