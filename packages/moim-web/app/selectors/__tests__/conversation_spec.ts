import {
  conversationsSelector,
  conversationMembersSelector,
  conversationMessagesSelector,
  conversationMembersLoadingSelector,
  joinConversationLoadingSelector,
  createMessagesLoadingSelector,
  getMessagesLoadingSelector,
  getConversationByNameSelector,
} from "../conversation";
import { initialState } from "app/rootReducer";
import { RAW } from "app/__mocks__";

describe("conversation selector", () => {
  const MOCK_CONVERSATION_ID = "C1234";
  const MOCK_USER_ID = "U1234";
  const MOCK_GROUP_ID = "G1234";
  const MOCK_MESSAGE_ID = "M1234";

  describe("conversationsSelector", () => {
    it("should denormalize channel data from state.conversation.conversations", () => {
      expect(
        conversationsSelector({
          ...initialState,
          entities: {
            ...initialState.entities,
            conversations: {
              [MOCK_CONVERSATION_ID]: {
                ...(RAW.NORMALIZED_CHANNEL as Moim.Conversations.INormalizedConversation),
                creator: MOCK_USER_ID,
                group: MOCK_GROUP_ID,
              },
            },
            users: {
              [MOCK_USER_ID]: {
                ...RAW.NORMALIZED_MEMBER,
                id: MOCK_USER_ID,
              },
            },
            groups: {
              [MOCK_GROUP_ID]: {
                ...RAW.NORMALIZED_GROUP,
                id: MOCK_GROUP_ID,
              },
            },
          },
          conversation: {
            ...initialState.conversation,
            conversations: {
              data: [MOCK_CONVERSATION_ID],
              paging: {
                after: "A1234",
              },
            },
          },
        }),
      ).toEqual({
        data: [
          {
            ...RAW.NORMALIZED_CHANNEL,
            creator: {
              ...RAW.MEMBER,
              id: MOCK_USER_ID,
            },
            group: {
              ...RAW.NORMALIZED_GROUP,
              id: MOCK_GROUP_ID,
            },
          },
        ],
        paging: {
          after: "A1234",
        },
      });
    });
  });

  describe("conversationMembersSelector", () => {
    it("should denormalize member data from state.conversation.members", () => {
      expect(
        conversationMembersSelector(
          {
            ...initialState,
            entities: {
              ...initialState.entities,
              users: {
                [MOCK_USER_ID]: {
                  ...RAW.NORMALIZED_MEMBER,
                  id: MOCK_USER_ID,
                },
              },
            },
            conversation: {
              ...initialState.conversation,
              members: {
                [MOCK_CONVERSATION_ID]: {
                  data: [MOCK_USER_ID],
                  paging: {
                    after: "A1234",
                  },
                },
              },
            },
          },
          MOCK_CONVERSATION_ID,
        ),
      ).toEqual({
        data: [
          {
            ...RAW.MEMBER,
            id: MOCK_USER_ID,
          },
        ],
        paging: {
          after: "A1234",
        },
      });
    });
  });

  describe("conversationMessagesSelector", () => {
    // TODO user api 붙인 뒤 skip제거
    it.skip("should denormalize message data from state.conversation.messages", () => {
      expect(
        conversationMessagesSelector(
          {
            ...initialState,
            entities: {
              ...initialState.entities,
              messages: {
                [MOCK_MESSAGE_ID]: {
                  ...RAW.NORMALIZED_MESSAGE,
                  user: MOCK_USER_ID,
                },
              },
              users: {
                [MOCK_USER_ID]: {
                  ...RAW.NORMALIZED_MEMBER,
                  id: MOCK_USER_ID,
                },
              },
            },
            conversation: {
              ...initialState.conversation,
              messages: {
                [MOCK_CONVERSATION_ID]: {
                  data: [MOCK_MESSAGE_ID],
                  paging: {
                    after: "A1234",
                  },
                },
              },
              currentConversationId: MOCK_CONVERSATION_ID,
            },
          },
          MOCK_MESSAGE_ID,
        ),
      ).toEqual({
        data: [
          {
            created_at: RAW.NORMALIZED_MESSAGE.created_at,
            data: [
              {
                created_at: RAW.NORMALIZED_MESSAGE.created_at,
                user: MOCK_USER_ID,
                messages: [
                  {
                    ...RAW.NORMALIZED_MESSAGE,
                    user: {
                      ...RAW.MEMBER,
                      id: MOCK_USER_ID,
                    },
                  },
                ],
              },
            ],
          },
        ],
        paging: {
          after: "A1234",
        },
      });
    });
  });

  describe("conversationMembersLoadingSelector", () => {
    it("should get conversation members loading state from MOCK_CHANNEL_ID", () => {
      expect(
        conversationMembersLoadingSelector({
          ...initialState,
          conversation: {
            ...initialState.conversation,
            conversationMembersLoading: {
              [MOCK_CONVERSATION_ID]: true,
            },
            currentConversationId: MOCK_CONVERSATION_ID,
          },
        }),
      ).toEqual(true);
    });
  });

  describe("joinConversationLoadingSelector", () => {
    it("should get join conversation loading state from MOCK_CHANNEL_ID", () => {
      expect(
        joinConversationLoadingSelector({
          ...initialState,
          conversation: {
            ...initialState.conversation,
            joinConversationLoading: {
              [MOCK_CONVERSATION_ID]: true,
            },
            currentConversationId: MOCK_CONVERSATION_ID,
          },
        }),
      ).toEqual(true);
    });
  });

  describe("createMessagesLoadingSelector", () => {
    it("should create messages loading state from MOCK_CHANNEL_ID", () => {
      expect(
        createMessagesLoadingSelector({
          ...initialState,
          conversation: {
            ...initialState.conversation,
            createMessageLoading: {
              [MOCK_CONVERSATION_ID]: true,
            },
            currentConversationId: MOCK_CONVERSATION_ID,
          },
        }),
      ).toEqual(true);
    });
  });

  describe("getMessagesLoadingSelector", () => {
    it("should get messages loading state from MOCK_CHANNEL_ID", () => {
      expect(
        getMessagesLoadingSelector({
          ...initialState,
          conversation: {
            ...initialState.conversation,
            getMessagesLoading: {
              [MOCK_CONVERSATION_ID]: true,
            },
            currentConversationId: MOCK_CONVERSATION_ID,
          },
        }),
      ).toEqual(true);
    });
  });

  describe("getConversationByName", () => {
    describe("when has same name channel", () => {
      it("should return denormalized channel as same name", () => {
        const state = {
          ...initialState,
          entities: {
            ...initialState.entities,
            conversations: {
              [MOCK_CONVERSATION_ID]: {
                ...RAW.NORMALIZED_CHANNEL,
                creator: MOCK_USER_ID,
                group: MOCK_GROUP_ID,
              },
            },
            users: {
              [MOCK_USER_ID]: {
                ...RAW.NORMALIZED_MEMBER,
                id: MOCK_USER_ID,
              },
            },
            groups: {
              [MOCK_GROUP_ID]: {
                ...RAW.NORMALIZED_GROUP,
                id: MOCK_GROUP_ID,
              },
            },
          },
          conversation: {
            ...initialState.conversation,
            conversations: {
              data: [MOCK_CONVERSATION_ID],
              paging: {
                after: "A1234",
              },
            },
          },
        };

        expect(
          getConversationByNameSelector(state, RAW.NORMALIZED_CHANNEL.name),
        ).toEqual({
          ...RAW.NORMALIZED_CHANNEL,
          creator: {
            ...RAW.NORMALIZED_MEMBER,
            id: MOCK_USER_ID,
          },
          group: {
            ...RAW.NORMALIZED_GROUP,
            id: MOCK_GROUP_ID,
          },
        });
      });
    });
  });
});
