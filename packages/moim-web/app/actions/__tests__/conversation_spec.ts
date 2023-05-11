jest.mock("common/api/conversation");
jest.mock("common/api/user");
jest.mock("common/api/fileUpload");

import { RAW } from "app/__mocks__";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { ConversationTypes, EntityTypes } from "../types";
import {
  getConversation,
  getConversationMembers,
  getConversationMessages,
  createConversationMessage,
  joinConversation,
} from "../conversation";
import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";

describe("Conversation actions", () => {
  let store: IThunkMockState;

  const MOCK_CHANNEL_ID = RAW.NORMALIZED_CHANNEL.id;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getConversation()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_CONVERSATION, ADD_ENTITY, SUCCEED_GET_CONVERSATION)", async () => {
        await store.dispatch(
          getConversation({
            channel_id: MOCK_CHANNEL_ID,
          }),
        );
        const [
          startGetConversationAction,
          addEntityAction,
          succeedGetConversationAction,
        ] = store.getActions();
        expect(startGetConversationAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetConversationAction).toMatchObject({
          type: ConversationTypes.SUCCEED_GET_CONVERSATION,
          payload: {
            conversation: {
              data: RAW.NORMALIZED_CHANNEL.id,
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_CONVERSATION, FAILED_GET_CONVERSATION)", async () => {
        await store.dispatch(
          getConversation(
            {
              channel_id: MOCK_CHANNEL_ID,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startGetConversationAction,
          failedGetConversationAction,
        ] = store.getActions();
        expect(startGetConversationAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION,
        });
        expect(failedGetConversationAction).toMatchObject({
          type: ConversationTypes.FAILED_GET_CONVERSATION,
          payload: {
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("getConversationMembers()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_CONVERSATION_MEMBERS, ADD_ENTITY, SUCCEED_GET_CONVERSATION_MEMBERS)", async () => {
        await store.dispatch(
          getConversationMembers({
            channel_id: MOCK_CHANNEL_ID,
          }),
        );
        const [
          startGetConversationMembersAction,
          addEntityAction,

          succeedGetConversationMembersAction,
        ] = store.getActions();
        expect(startGetConversationMembersAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION_MEMBERS,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedGetConversationMembersAction).toMatchObject({
          type: ConversationTypes.SUCCEED_GET_CONVERSATION_MEMBERS,
          payload: {
            members: {
              data: [RAW.MEMBER.id],
              paging: {},
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_CONVERSATION_MEMBERS, FAILED_GET_CONVERSATION_MEMBERS)", async () => {
        await store.dispatch(
          getConversationMembers(
            {
              channel_id: MOCK_CHANNEL_ID,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startGetConversationMembersAction,
          failedGetConversationMembersAction,
        ] = store.getActions();
        expect(startGetConversationMembersAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION_MEMBERS,
        });
        expect(failedGetConversationMembersAction).toMatchObject({
          type: ConversationTypes.FAILED_GET_CONVERSATION_MEMBERS,
          payload: {
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("joinConversation()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_JOIN_CONVERSATION, ADD_ENTITY, SUCCEED_JOIN_CONVERSATION)", async () => {
        await store.dispatch(
          joinConversation({
            channel_id: MOCK_CHANNEL_ID,
          }),
        );
        const [
          startJoinConversationAction,
          addEntityAction,
          succeedJoinConversationAction,
        ] = store.getActions();
        expect(startJoinConversationAction).toMatchObject({
          type: ConversationTypes.START_JOIN_CONVERSATION,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedJoinConversationAction).toMatchObject({
          type: ConversationTypes.SUCCEED_JOIN_CONVERSATION,
          payload: {
            conversation: {
              data: RAW.NORMALIZED_CHANNEL.id,
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_JOIN_CONVERSATION, FAILED_JOIN_CONVERSATION)", async () => {
        await store.dispatch(
          joinConversation(
            {
              channel_id: MOCK_CHANNEL_ID,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startJoinConversationAction,
          failedJoinConversationAction,
        ] = store.getActions();
        expect(startJoinConversationAction).toMatchObject({
          type: ConversationTypes.START_JOIN_CONVERSATION,
        });
        expect(failedJoinConversationAction).toMatchObject({
          type: ConversationTypes.FAILED_JOIN_CONVERSATION,
          payload: {
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("getConversationMessages()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_CONVERSATION_MESSAGE, ADD_ENTITY, SUCCEED_GET_CONVERSATION_MESSAGE)", async () => {
        await store.dispatch(
          getConversationMessages({
            channel_id: MOCK_CHANNEL_ID,
            before: "B1234",
            after: "A1234",
          }),
        );
        const [
          startGetConversationMessagesAction,
          addEntityAction,
          succeedGetConversationMessagesAction,
        ] = store.getActions();
        expect(startGetConversationMessagesAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION_MESSAGES,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedGetConversationMessagesAction).toMatchObject({
          type: ConversationTypes.SUCCEED_GET_CONVERSATION_MESSAGES,
          payload: {
            messages: {
              data: [
                `${RAW.NORMALIZED_MESSAGE.parent_id}_${RAW.NORMALIZED_MESSAGE.id}`,
              ],
              paging: {},
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_GET_CONVERSATION_MESSAGE, FAILED_GET_CONVERSATION_MESSAGE)", async () => {
        await store.dispatch(
          getConversationMessages(
            {
              channel_id: MOCK_CHANNEL_ID,
              before: "B1234",
              after: "A1234",
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startGetConversationMessagesAction,
          failedGetConversationMessagesAction,
        ] = store.getActions();
        expect(startGetConversationMessagesAction).toMatchObject({
          type: ConversationTypes.START_GET_CONVERSATION_MESSAGES,
        });
        expect(failedGetConversationMessagesAction).toMatchObject({
          type: ConversationTypes.FAILED_GET_CONVERSATION_MESSAGES,
          payload: {
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("createConversationMessage()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_CREATE_CONVERSATION_MESSAGE, ADD_ENTITY, SUCCEED_CREATE_CONVERSATION_MESSAGE)", async () => {
        await store.dispatch(
          createConversationMessage(null, {
            channel_id: MOCK_CHANNEL_ID,
            message: {
              content: "Hello World!",
              files: [],
            },
          }),
        );
        const [
          startCreateConversationMessageAction,
          addEntityAction,
          succeedCreateConversationMessageAction,
        ] = store.getActions();
        expect(startCreateConversationMessageAction).toMatchObject({
          type: ConversationTypes.START_CREATE_CONVERSATION_MESSAGE,
        });
        expect(addEntityAction).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedCreateConversationMessageAction).toMatchObject({
          type: ConversationTypes.SUCCEED_CREATE_CONVERSATION_MESSAGE,
          payload: {
            message: {
              data: `${RAW.NORMALIZED_MESSAGE.parent_id}_${RAW.NORMALIZED_MESSAGE.id}`,
            },
          },
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_CREATE_CONVERSATION_MESSAGE, FAILED_CREATE_CONVERSATION_MESSAGE)", async () => {
        await store.dispatch(
          createConversationMessage(
            null,
            {
              channel_id: MOCK_CHANNEL_ID,
              message: {
                content: "Hello World!",
                files: [],
              },
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [
          startCreateConversationMessageAction,
          failedCreateConversationMessageAction,
        ] = store.getActions();
        expect(startCreateConversationMessageAction).toMatchObject({
          type: ConversationTypes.START_CREATE_CONVERSATION_MESSAGE,
        });
        expect(failedCreateConversationMessageAction).toMatchObject({
          type: ConversationTypes.FAILED_CREATE_CONVERSATION_MESSAGE,
          payload: {
            error: MOCK_ERROR,
          },
        });
      });
    });
  });
});
