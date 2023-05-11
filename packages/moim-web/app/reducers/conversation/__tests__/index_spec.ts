import { reducer, INITIAL_STATE, IConversationState } from "../";
import { ConversationTypes } from "app/actions/types";

describe("conversation reducer", () => {
  let state: IConversationState;
  describe("GET_CONVERSATION", () => {
    describe("when receive START_GET_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: ConversationTypes.START_GET_CONVERSATION,
        });
      });
      it("should getConversationsLoading set true", () => {
        expect(state.getConversationsLoading).toBe(true);
      });
    });
    describe("when receive SUCCEED_GET_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            getConversationsLoading: true,
          },
          {
            type: ConversationTypes.SUCCEED_GET_CONVERSATION,
            payload: {
              conversation: {
                data: "C1234",
              },
            },
          },
        );
      });
      it("should getConversationsLoading set false", () => {
        expect(state.getConversationsLoading).toBe(false);
      });
    });
    describe("when receive FAILED_GET_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            getConversationsLoading: true,
          },
          {
            type: ConversationTypes.FAILED_GET_CONVERSATION,
            payload: {},
          },
        );
      });
      it("should getConversationsLoading set false", () => {
        expect(state.getConversationsLoading).toBe(false);
      });
    });
  });
  describe("GET_CONVERSATION_MEMBERS", () => {
    const MOCK_CHANNEL_ID = "C1234";
    describe("when receive START_GET_CONVERSATION_MEMBERS", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: ConversationTypes.START_GET_CONVERSATION_MEMBERS,
          payload: {
            channelId: MOCK_CHANNEL_ID,
          },
        });
      });
      it("should conversationMembersLoading[MOCK_CHANNEL_ID] set true", () => {
        expect(state.conversationMembersLoading[MOCK_CHANNEL_ID]).toBe(true);
      });
    });
    describe("when receive SUCCEED_GET_CONVERSATION_MEMBERS", () => {
      describe("when member data is empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              conversationMembersLoading: {
                [MOCK_CHANNEL_ID]: true,
              },
            },
            {
              type: ConversationTypes.SUCCEED_GET_CONVERSATION_MEMBERS,
              payload: {
                channelId: MOCK_CHANNEL_ID,
                members: {
                  data: ["U1234"],
                  paging: {},
                },
              },
            },
          );
        });
        it("should conversationMembersLoading[MOCK_CHANNEL_ID] set false", () => {
          expect(state.conversationMembersLoading[MOCK_CHANNEL_ID]).toBe(false);
        });
        it("should conversations is payload.conversations", () => {
          expect(state.members[MOCK_CHANNEL_ID]).toEqual({
            data: ["U1234"],
            paging: {},
          });
        });
      });
      describe("when conversations is not empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              conversationMembersLoading: {
                [MOCK_CHANNEL_ID]: true,
              },
              members: {
                [MOCK_CHANNEL_ID]: {
                  data: ["U1234"],
                  paging: {},
                },
              },
            },
            {
              type: ConversationTypes.SUCCEED_GET_CONVERSATION_MEMBERS,
              payload: {
                channelId: MOCK_CHANNEL_ID,
                members: {
                  data: ["U2345"],
                  paging: { after: "A1234" },
                },
              },
            },
          );
        });
        it("should data added from payload", () => {
          expect(state.members[MOCK_CHANNEL_ID]).toEqual({
            data: ["U1234", "U2345"],
            paging: { after: "A1234" },
          });
        });
      });
    });
    describe("when receive FAILED_GET_CONVERSATION_MEMBERS", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            conversationMembersLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
          },
          {
            type: ConversationTypes.FAILED_GET_CONVERSATION_MEMBERS,
            payload: {
              channelId: MOCK_CHANNEL_ID,
            },
          },
        );
      });
      it("should getConversationsLoading set false", () => {
        expect(state.conversationMembersLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
    });
  });
  describe("JOIN_CONVERSATION", () => {
    const MOCK_CHANNEL_ID = "C1234";
    describe("when receive START_JOIN_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: ConversationTypes.START_JOIN_CONVERSATION,
          payload: {
            channelId: MOCK_CHANNEL_ID,
          },
        });
      });
      it("should joinConversationLoading[MOCK_CHANNEL_ID] set true", () => {
        expect(state.joinConversationLoading[MOCK_CHANNEL_ID]).toBe(true);
      });
    });
    describe("when receive SUCCEED_JOIN_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            joinConversationLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
          },
          {
            type: ConversationTypes.SUCCEED_JOIN_CONVERSATION,
            payload: {
              channelId: MOCK_CHANNEL_ID,
              conversation: {
                data: MOCK_CHANNEL_ID,
              },
            },
          },
        );
      });
      it("should joinConversationLoading[MOCK_CHANNEL_ID] set false", () => {
        expect(state.joinConversationLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
    });
    describe("when receive FAILED_JOIN_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            joinConversationLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
          },
          {
            type: ConversationTypes.FAILED_JOIN_CONVERSATION,
            payload: {
              channelId: MOCK_CHANNEL_ID,
            },
          },
        );
      });
      it("should joinConversationLoading[MOCK_CHANNEL_ID] set false", () => {
        expect(state.joinConversationLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
    });
  });
  describe("GET_CONVERSATION_MESSAGES", () => {
    const MOCK_CHANNEL_ID = "C1234";
    describe("when receive START_GET_CONVERSATION_MESSAGES", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: ConversationTypes.START_GET_CONVERSATION_MESSAGES,
          payload: {
            channelId: MOCK_CHANNEL_ID,
          },
        });
      });
      it("should getMessagesLoading[MOCK_CHANNEL_ID] set true", () => {
        expect(state.getMessagesLoading[MOCK_CHANNEL_ID]).toBe(true);
      });
    });
    describe("when receive SUCCEED_GET_CONVERSATION_MESSAGES", () => {
      describe("when member data is empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getMessagesLoading: {
                [MOCK_CHANNEL_ID]: true,
              },
            },
            {
              type: ConversationTypes.SUCCEED_GET_CONVERSATION_MESSAGES,
              payload: {
                channelId: MOCK_CHANNEL_ID,
                messages: {
                  data: ["M1234"],
                  paging: {
                    after: "1234",
                  },
                },
                fetchDirection: null,
              },
            },
          );
        });
        it("should getMessagesLoading[MOCK_CHANNEL_ID] set false", () => {
          expect(state.getMessagesLoading[MOCK_CHANNEL_ID]).toBe(false);
        });
        it("should conversations is payload.conversations", () => {
          expect(state.messages[MOCK_CHANNEL_ID]).toEqual({
            data: ["M1234"],
            paging: {
              after: "1234",
            },
          });
        });
      });
      describe("when conversations is not empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getMessagesLoading: {
                [MOCK_CHANNEL_ID]: true,
              },
              messages: {
                [MOCK_CHANNEL_ID]: {
                  data: ["M1234"],
                  paging: {
                    after: "A0123",
                  },
                },
              },
            },
            {
              type: ConversationTypes.SUCCEED_GET_CONVERSATION_MESSAGES,
              payload: {
                channelId: MOCK_CHANNEL_ID,
                messages: {
                  data: ["M2345"],
                  paging: {},
                },
                fetchDirection: "after",
              },
            },
          );
        });
        it("should data added from payload", () => {
          expect(state.messages[MOCK_CHANNEL_ID]).toEqual({
            data: ["M1234", "M2345"],
            paging: {},
          });
        });
      });
    });
    describe("when receive FAILED_GET_CONVERSATION_MESSAGES", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            getMessagesLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
          },
          {
            type: ConversationTypes.FAILED_GET_CONVERSATION_MESSAGES,
            payload: {
              channelId: MOCK_CHANNEL_ID,
            },
          },
        );
      });
      it("should getMessagesLoading set false", () => {
        expect(state.getMessagesLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
    });
  });
  describe("CREATE_CONVERSATION_MESSAGE", () => {
    const MOCK_CHANNEL_ID = "C1234";
    describe("START_CREATE_CONVERSATION", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: ConversationTypes.START_CREATE_CONVERSATION_MESSAGE,
          payload: {
            channelId: MOCK_CHANNEL_ID,
          },
        });
      });
      it("should set createMessageLoading[MOCK_CHANNEL_ID] true", () => {
        expect(state.createMessageLoading[MOCK_CHANNEL_ID]).toBe(true);
      });
    });
    describe("SUCCEED_CREATE_CONVERSATION_MESSAGE", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            createMessageLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
            messages: {
              [MOCK_CHANNEL_ID]: {
                data: ["M1234"],
                paging: {},
              },
            },
          },
          {
            type: ConversationTypes.SUCCEED_CREATE_CONVERSATION_MESSAGE,
            payload: {
              channelId: MOCK_CHANNEL_ID,
              message: {
                data: "M2345",
              },
            },
          },
        );
      });
      it("should set createMessageLoading[MOCK_CHANNEL_ID] false", () => {
        expect(state.createMessageLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
      it("should add messages[MOCK_CHANNEL_ID] data from payload", () => {
        expect(state.messages[MOCK_CHANNEL_ID]).toEqual({
          data: ["M1234", "M2345"],
          paging: {},
        });
      });
    });
    describe("FAILED_CREATE_CONVERSATION_MESSAGE", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            createMessageLoading: {
              [MOCK_CHANNEL_ID]: true,
            },
            messages: {
              [MOCK_CHANNEL_ID]: {
                data: ["M1234"],
                paging: {},
              },
            },
          },
          {
            type: ConversationTypes.FAILED_CREATE_CONVERSATION_MESSAGE,
            payload: {
              channelId: MOCK_CHANNEL_ID,
            },
          },
        );
      });
      it("should set createMessageLoading[MOCK_CHANNEL_ID] false", () => {
        expect(state.createMessageLoading[MOCK_CHANNEL_ID]).toBe(false);
      });
    });
  });

  describe("DELETE_CONVERSATION_MESSAGE", () => {
    it("should remove target message", () => {
      const result = reducer(
        {
          ...INITIAL_STATE,
          messages: {
            C1234: {
              data: ["M1111", "M2222", "M3333"],
              paging: {},
            },
          },
        },
        {
          type: ConversationTypes.SUCCEED_DELETE_CONVERSATION_MESSAGE,
          payload: { messageId: "M1111", channelId: "C1234" },
        },
      );

      expect(result.messages.C1234.data).toHaveLength(3);
    });
  });
});
