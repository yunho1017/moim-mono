jest.mock("common/api/forum");
jest.mock("common/api/user");

import axios from "axios";
import { RAW, NORMALIZED } from "app/__mocks__";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { ForumTypes, ForumEditorTypes, EntityTypes } from "../types";
import {
  getThreadList,
  postThread,
  getThread,
  getThreadListWithOne,
  getCommentList,
  voteThread,
  getThreadVotes,
  postComment,
  deleteThread,
  deleteReply,
} from "../forum";
import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";
import { VoteStatus } from "app/enums";

describe("forum action", () => {
  let store: IThunkMockState;
  const cancelToken = axios.CancelToken.source().token;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getThreadList()", () => {
    describe("when succeed", () => {
      it("should dispatch action START_GET_THREAD_LIST and SUCCEED_GET_THREAD_LIST", async () => {
        await store.dispatch(
          getThreadList(
            {
              channelId: "C123",
              sort: "createdAt",
            },
            axios.CancelToken.source().token,
            "after",
          ),
        );

        const [
          startGetThreadListAction,
          addEntityAction,
          succeedGetThreadListAction,
        ] = store.getActions();

        expect(startGetThreadListAction).toEqual({
          type: ForumTypes.START_GET_THREAD_LIST,
          payload: {
            paging: {},
            sort: "createdAt",
            forumId: "C123",
          },
        });

        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedGetThreadListAction).toMatchObject({
          type: ForumTypes.SUCCEED_GET_THREAD_LIST,
        });
      });
    });
  });

  describe("getCommentList()", () => {
    describe("when succeed", () => {
      it("should dispatch action START_GET_COMMENT_LIST and SUCCEED_GET_COMMENT_LIST", async () => {
        await store.dispatch(
          getCommentList(
            {
              channelId: "C1234",
              threadId: "T123",
              sort: "createdAt",
              order: "ASC",
            },
            axios.CancelToken.source().token,
          ),
        );

        const [
          startGetCommentListAction,
          addEntityAction,
          succeedGetCommentListAction,
        ] = store.getActions();

        expect(startGetCommentListAction).toEqual({
          type: ForumTypes.START_GET_COMMENT_LIST,
          payload: { forumId: "T123" },
        });

        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedGetCommentListAction).toMatchObject({
          type: ForumTypes.SUCCEED_GET_COMMENT_LIST,
        });
      });
    });
  });

  describe("voteThread", () => {
    describe("when succeed", () => {
      it("should dispatch action START_VOTE_THREAD and SUCCEEDED_VOTE_THREAD", async () => {
        await store.dispatch(
          voteThread({
            channelId: "C123",
            threadId: "123",
            type: "upvote",
            cancelToken: axios.CancelToken.source().token,
          }),
        );

        const [
          startVoteThreadAction,
          addEntityAction,
          succeedVoteThreadAction,
        ] = store.getActions();

        expect(startVoteThreadAction).toEqual({
          type: ForumTypes.START_VOTE_THREAD,
        });

        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedVoteThreadAction).toMatchObject({
          type: ForumTypes.SUCCEEDED_VOTE_THREAD,
        });
      });
    });
  });

  describe("postThread()", () => {
    describe("when called successfully", () => {
      it("should return START, SUCCESS, CLEAR", async () => {
        try {
          await store.dispatch(
            postThread(null, {
              channelId: "C123",
              title: "",
              content: [
                {
                  type: "text",
                  content: "hello",
                },
              ],
              cancelToken,
            }),
          );
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: ForumEditorTypes.START_POSTING_THREAD,
          });
          expect(actions[1]).toMatchObject({
            type: EntityTypes.ADD_ENTITY,
          });

          expect(actions[2].type).toEqual(
            ForumEditorTypes.SUCCEEDED_POSTING_THREAD,
          );
          expect(actions[3]).toEqual({
            type: ForumEditorTypes.CLEAR_POSTING_THREAD,
          });
          // eslint-disable-next-line no-empty
        } catch {}
      });
    });

    describe("when called failure", () => {
      it("should return START, FAILED", async () => {
        try {
          await store.dispatch(
            postThread(null, {
              channelId: "forceError",
              title: "",
              content: [
                {
                  type: "text",
                  content: "hello",
                },
              ],
              cancelToken,
            }),
          );
        } catch {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: ForumEditorTypes.START_POSTING_THREAD,
          });
          expect(actions[1]).toEqual({
            type: ForumEditorTypes.FAILED_POSTING_THREAD,
          });
        }
      });
    });
  });

  describe("postComment()", () => {
    describe("when called successfully", () => {
      it("should return START, SUCCESS", async () => {
        await store.dispatch(
          postComment(
            {
              type: "reply",
              channelId: "C123",
              threadId: "C123",
              title: "",
              content: [
                {
                  type: "text",
                  content: "hello",
                },
              ],
            },
            cancelToken,
          ),
        );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
          type: ForumTypes.START_POST_COMMENT,
        });
        expect(actions[1].type).toEqual(ForumTypes.SUCCEED_POST_COMMENT);
        expect(actions[2]).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
      });
    });

    describe("when called failure", () => {
      it("should return START, FAILED", async () => {
        await store.dispatch(
          postComment(
            {
              type: "reply",
              channelId: "C123",
              threadId: "forceError",
              title: "",
              content: [
                {
                  type: "text",
                  content: "hello",
                },
              ],
            },
            cancelToken,
          ),
        );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
          type: ForumTypes.START_POST_COMMENT,
        });
        expect(actions[1]).toEqual({
          type: ForumTypes.FAILED_POST_COMMENT,
        });
      });
    });
  });

  describe("getThread()", () => {
    it("should return START, ADD_ENTITY, SUCCEEDED", async () => {
      await store.dispatch(
        getThread(
          {
            parentId: "C123",
            threadId: RAW.THREAD.id,
          },
          cancelToken,
        ),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: ForumTypes.START_GET_THREAD,
        payload: {
          threadId: RAW.THREAD.id,
        },
      });

      expect(actions[1]).toEqual({
        type: EntityTypes.ADD_ENTITY,
        payload: {
          ...NORMALIZED.THREAD.entities,
        },
      });

      expect(actions[2]).toEqual({
        type: ForumTypes.SUCCEEDED_GET_THREAD,
        payload: {
          threadId: RAW.THREAD.id,
        },
      });
    });
  });

  describe("getThreadListWithOne()", () => {
    it("should dispatch ADD_THREAD", async () => {
      const forumId = "T:456";
      const threadId = "T:123";
      const sorting = "createdAt";

      await store.dispatch(
        getThreadListWithOne(
          {
            sort: sorting,
            channelId: forumId,
            before: threadId,
          },
          cancelToken,
          threadId,
        ),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: ForumTypes.START_GET_THREAD_LIST,
        payload: {
          forumId,
          paging: {
            before: threadId,
          },
          sort: "createdAt",
        },
      });

      expect(actions[1]).toEqual({
        type: ForumTypes.CLEAR_THREAD_LIST,
        payload: {
          channelId: forumId,
        },
      });

      expect(actions[2]).toEqual({
        type: EntityTypes.ADD_ENTITY,
        payload: {
          ...NORMALIZED.THREAD.entities,
        },
      });

      expect(actions[3]).toEqual({
        type: ForumTypes.SUCCEED_GET_THREAD_LIST,
        payload: {
          forumId,
          paging: {
            after: null,
            before: null,
          },
          threadIds: ["T1577080529252.1435", "T1577080529252.1435"],
        },
      });
    });
  });

  describe("getConversationMessages()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_THREAD_VOTES, SUCCEEDED_GET_THREAD_VOTES)", async () => {
        await store.dispatch(
          getThreadVotes({
            channelId: RAW.NORMALIZED_CHANNEL.id,
            type: VoteStatus.POSITIVE,
            threadId: RAW.NORMALIZED_CHANNEL.id,
          }),
        );
        const [
          startGetThreadVotesAction,
          succeededGetThreadVotesAction,
        ] = store.getActions();
        expect(startGetThreadVotesAction).toMatchObject({
          type: ForumTypes.START_GET_THREAD_VOTES,
        });
        expect(succeededGetThreadVotesAction).toMatchObject({
          type: ForumTypes.SUCCEEDED_GET_THREAD_VOTES,
          payload: {
            threadId: RAW.NORMALIZED_CHANNEL.id,
            type: VoteStatus.POSITIVE,
            votes: {
              data: [RAW.THREAD_VOTE],
              paging: {},
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_THREAD_VOTES, FAILED_GET_THREAD_VOTES)", async () => {
        await store.dispatch(
          getThreadVotes(
            {
              channelId: RAW.NORMALIZED_CHANNEL.id,
              type: VoteStatus.POSITIVE,
              threadId: RAW.NORMALIZED_CHANNEL.id,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startGetThreadVotesAction,
          failedGetThreadVotesAction,
        ] = store.getActions();
        expect(startGetThreadVotesAction).toMatchObject({
          type: ForumTypes.START_GET_THREAD_VOTES,
        });
        expect(failedGetThreadVotesAction).toMatchObject({
          type: ForumTypes.FAILED_GET_THREAD_VOTES,
        });
      });
    });
  });

  describe("deleteThread()", () => {
    describe("when response success", () => {
      it("should return START, SUCCESS", async () => {
        try {
          await store.dispatch(
            deleteThread({
              forumId: "F1234",
              threadId: "T1234",
            }),
          );
        } catch (error) {
          expect(error).toEqual(MOCK_ERROR);
        }

        const [startDeleteAction, successDeleteAction] = store.getActions();

        expect(startDeleteAction).toMatchObject({
          type: ForumTypes.START_DELETE_THREAD,
        });

        expect(successDeleteAction).toMatchObject({
          type: ForumTypes.SUCCEED_DELETE_THREAD,
          payload: {
            forumId: "F1234",
            threadId: "T1234",
          },
        });
      });
    });

    describe("when response failed", () => {
      it("should return START, FAILED", async () => {
        try {
          await store.dispatch(
            deleteThread({
              forumId: "F1234",
              threadId: "forceError",
            }),
          );
        } catch (error) {
          expect(error).toEqual(MOCK_ERROR);
        }

        const [startDeleteAction, failedDeleteAction] = store.getActions();

        expect(startDeleteAction).toMatchObject({
          type: ForumTypes.START_DELETE_THREAD,
        });

        expect(failedDeleteAction).toMatchObject({
          type: ForumTypes.FAILED_DELETE_THREAD,
        });
      });
    });
  });

  describe("deleteReply()", () => {
    describe("when response success", () => {
      it("should return START, SUCCESS", async () => {
        try {
          await store.dispatch(
            deleteReply({
              forumId: "F1234",
              threadId: "T1234",
              replyId: "R1234",
            }),
          );
        } catch (error) {
          expect(error).toEqual(MOCK_ERROR);
        }

        const [startDeleteAction, successDeleteAction] = store.getActions();

        expect(startDeleteAction).toMatchObject({
          type: ForumTypes.START_DELETE_REPLY,
        });

        expect(successDeleteAction).toMatchObject({
          type: ForumTypes.SUCCEED_DELETE_REPLY,
          payload: {
            forumId: "F1234",
            threadId: "T1234",
            replyId: "R1234",
          },
        });
      });
    });

    describe("when response failed", () => {
      it("should return START, FAILED", async () => {
        try {
          await store.dispatch(
            deleteReply({
              forumId: "F1234",
              threadId: "forceError",
              replyId: "R1234",
            }),
          );
        } catch (error) {
          expect(error).toEqual(MOCK_ERROR);
        }

        const [startDeleteAction, failedDeleteAction] = store.getActions();

        expect(startDeleteAction).toMatchObject({
          type: ForumTypes.START_DELETE_REPLY,
        });

        expect(failedDeleteAction).toMatchObject({
          type: ForumTypes.FAILED_DELETE_REPLY,
        });
      });
    });
  });
});
