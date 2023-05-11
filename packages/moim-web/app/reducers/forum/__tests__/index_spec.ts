import { INITIAL_STATE, reducers } from "../";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";
import { RAW } from "app/__mocks__";
import { VoteStatus } from "app/enums";

describe("forumData Reducer", () => {
  const threadId = "T1234";

  describe("when dispatch START_GET_THREAD_LIST action", () => {
    describe("when initialized state", () => {
      it("should change forum id", () => {
        const state = reducers(
          INITIAL_STATE,
          ForumActionCreators.startGetThreadList("T:123", {}, "createdAt"),
        );

        expect(state.currentForumId).toEqual("T:123");
      });
    });
  });

  describe("getThreadVotes", () => {
    describe("when receive SUCCEEDED_GET_THREAD_VOTES", () => {
      let state: Moim.Forum.IForumData;
      beforeEach(() => {
        state = reducers(
          {
            ...INITIAL_STATE,
          },
          ForumActionCreators.succeededGetThreadVotes({
            threadId: RAW.NORMALIZED_CHANNEL.id,
            type: VoteStatus.POSITIVE,
            votes: {
              data: [RAW.THREAD_VOTE],
              paging: {},
            },
          }),
        );
      });

      it("should set new threadVote by thread id", () => {
        expect(state.threadVotes[RAW.NORMALIZED_CHANNEL.id]).toEqual({
          [VoteStatus.POSITIVE]: {
            data: [RAW.THREAD_VOTE],
            paging: {},
          },
        });
      });

      it("should set new type threadVote by thread id", () => {
        const newState = reducers(
          {
            ...state,
          },
          ForumActionCreators.succeededGetThreadVotes({
            threadId: RAW.NORMALIZED_CHANNEL.id,
            type: VoteStatus.NEGATIVE,
            votes: {
              data: [RAW.THREAD_VOTE],
              paging: {},
            },
          }),
        );
        expect(newState.threadVotes[RAW.NORMALIZED_CHANNEL.id]).toEqual({
          [VoteStatus.POSITIVE]: {
            data: [RAW.THREAD_VOTE],
            paging: {},
          },
          [VoteStatus.NEGATIVE]: {
            data: [RAW.THREAD_VOTE],
            paging: {},
          },
        });
      });
    });
  });

  describe("when dispatch START_GET_THREAD action", () => {
    it("should add threadIds", () => {
      const state = reducers(
        INITIAL_STATE,
        ForumActionCreators.startGetThread("T123"),
      );

      expect(state.isLoadingForumShow.T123).toBeTruthy();
    });
  });

  describe("when dispatch SUCCEEDED_GET_THREAD action", () => {
    it("should add threadIds", () => {
      const state = reducers(
        INITIAL_STATE,
        ForumActionCreators.succeededGetThread("T:333"),
      );
      expect(state.isLoadingForumShow["T:333"]).toBeFalsy();
      expect(state.currentThreadId).toEqual("T:333");
    });
  });

  describe("when dispatch FAILED_GET_THREAD action", () => {
    it("should add threadIds", () => {
      const state = reducers(
        INITIAL_STATE,
        ForumActionCreators.failedGetThread("T123"),
      );

      expect(state.isLoadingForumShow.T123).toBeFalsy();
    });
  });

  describe("when dispatch CLEAR_CURRENT_THREAD action", () => {
    it("should reset related of thread store fields", () => {
      const state = reducers(
        {
          ...INITIAL_STATE,
          isLoadingForumShow: { T1234: true },
          currentThreadId: "T1234",
        },
        ForumActionCreators.clearCurrentThread(),
      );

      expect(state.isLoadingForumShow.T1234).toBeUndefined();
      expect(state.currentThreadId).toBe("");
    });
  });

  describe("when dispatch CLEAR_COMMENT_LIST action", () => {
    it("should change commentIds to empty", () => {
      const state = reducers(
        {
          ...INITIAL_STATE,
          postedCommentIds: { T777: ["5555"] },
        },
        ForumActionCreators.clearCommentList({ threadId: "T777" }),
      );

      expect(state.postedCommentIds).toEqual({});
    });
  });

  describe("when dispatch SUCCEED_POST_COMMENT action", () => {
    it("should push new data to postedCommentIds", () => {
      const state = reducers(
        INITIAL_STATE,
        ForumActionCreators.succeedPostComment({
          threadId,
          channelId: "THWSA",
          commentId: "R1111",
        }),
      );

      expect(state.postedCommentIds[threadId]).toHaveLength(1);
    });
  });

  describe("when dispatch SUCCEED_GET_COMMENT_LIST action", () => {
    describe("when empty postedCommentIds", () => {
      it("should set new data", () => {
        const state = reducers(
          {
            ...INITIAL_STATE,
            currentThreadId: threadId,
          },
          ForumActionCreators.succeedGetCommentList(threadId, {
            data: ["R1111"],
            paging: {},
          }),
        );

        expect(state.postedCommentIds[threadId]).toHaveLength(0);
      });
    });

    describe("when have postedCommentIds", () => {
      describe("when it's different thread's comment", () => {
        it("should set new data", () => {
          const state = reducers(
            {
              ...INITIAL_STATE,
              currentThreadId: threadId,
              postedCommentIds: { [threadId]: ["R912", "R8888"] },
            },
            ForumActionCreators.succeedGetCommentList(threadId, {
              data: ["R3333", "R4444", "R5555"],
              paging: {},
            }),
          );

          expect(state.postedCommentIds[threadId]).toHaveLength(2);
        });
      });

      describe("when it's same thread's comment", () => {
        it("should set new data", () => {
          const state = reducers(
            {
              ...INITIAL_STATE,
              currentThreadId: threadId,
              postedCommentIds: { [threadId]: ["R4444", "R8888"] },
            },
            ForumActionCreators.succeedGetCommentList(threadId, {
              data: ["R3333", "R4444", "R5555"],
              paging: {},
            }),
          );

          expect(state.postedCommentIds[threadId]).toHaveLength(1);
        });
      });
    });
  });
});
