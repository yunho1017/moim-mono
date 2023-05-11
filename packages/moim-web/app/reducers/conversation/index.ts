import { AllActions } from "app/actions";
import produce from "immer";
import { ConversationTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";

export interface IConversationState {
  conversations: Moim.IPaginatedListResponse<Moim.Id>;
  currentConversationId: Moim.Id;
  messages: Record<Moim.Id, Moim.IPaginatedListResponse<Moim.Id>>;
  postedMessageId: Moim.Id | undefined;
  members: Record<Moim.Id, Moim.IPaginatedListResponse<Moim.Id>>;
  getConversationsLoading: boolean;
  conversationMembersLoading: Record<Moim.Id, boolean>;
  joinConversationLoading: Record<Moim.Id, boolean>;
  getMessagesLoading: Record<Moim.Id, boolean>;
  createMessageLoading: Record<Moim.Id, boolean>;
}

export const INITIAL_STATE: IConversationState = {
  conversations: { data: [], paging: {} },
  currentConversationId: "",
  messages: {},
  postedMessageId: undefined,
  members: {},
  getConversationsLoading: false,
  conversationMembersLoading: {},
  joinConversationLoading: {},
  getMessagesLoading: {},
  createMessageLoading: {},
};

export const reducer = (
  state: IConversationState = INITIAL_STATE,
  action: AllActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      // GET_CONVERSATIONS, GET_CONVERSATION
      case ConversationTypes.START_GET_CONVERSATION: {
        draft.getConversationsLoading = true;
        break;
      }

      case ConversationTypes.SUCCEED_GET_CONVERSATION: {
        draft.currentConversationId = action.payload.conversation.data;
        draft.getConversationsLoading = false;
        break;
      }

      case ConversationTypes.FAILED_GET_CONVERSATION: {
        draft.getConversationsLoading = false;
        break;
      }

      // GET_CONVERSATION_MEMBERS
      case ConversationTypes.START_GET_CONVERSATION_MEMBERS: {
        draft.conversationMembersLoading[action.payload.channelId] = true;
        break;
      }
      case ConversationTypes.SUCCEED_GET_CONVERSATION_MEMBERS: {
        draft.members[action.payload.channelId] = mergePaginatedResponse(
          draft.members[action.payload.channelId],
          action.payload.members,
        );
        draft.conversationMembersLoading[action.payload.channelId] = false;
        break;
      }
      case ConversationTypes.FAILED_GET_CONVERSATION_MEMBERS: {
        draft.conversationMembersLoading[action.payload.channelId] = false;
        break;
      }
      // JOIN_CONVERSATION
      case ConversationTypes.START_JOIN_CONVERSATION: {
        draft.joinConversationLoading[action.payload.channelId] = true;
        break;
      }
      case ConversationTypes.SUCCEED_JOIN_CONVERSATION:
      case ConversationTypes.FAILED_JOIN_CONVERSATION: {
        draft.joinConversationLoading[action.payload.channelId] = false;
        break;
      }
      // GET_CONVERSATION_MESSAGES
      case ConversationTypes.START_GET_CONVERSATION_MESSAGES: {
        draft.getMessagesLoading[action.payload.channelId] = true;
        break;
      }
      case ConversationTypes.SUCCEED_GET_CONVERSATION_MESSAGES: {
        if (action.payload.fetchDirection === "before") {
          draft.messages[action.payload.channelId] = mergePaginatedResponse(
            action.payload.messages,
            draft.messages[action.payload.channelId] || {},
          );
        } else {
          draft.messages[action.payload.channelId] = mergePaginatedResponse(
            draft.messages[action.payload.channelId] || {},
            action.payload.messages,
          );
        }
        draft.messages[action.payload.channelId].paging =
          action.payload.messages.paging;
        draft.getMessagesLoading[action.payload.channelId] = false;
        break;
      }

      case ConversationTypes.FAILED_GET_CONVERSATION_MESSAGES: {
        draft.getMessagesLoading[action.payload.channelId] = false;
        break;
      }
      // CREATE_MESSAGES
      case ConversationTypes.START_CREATE_CONVERSATION_MESSAGE: {
        draft.createMessageLoading[action.payload.channelId] = true;
        break;
      }
      case ConversationTypes.SUCCEED_CREATE_CONVERSATION_MESSAGE: {
        // @TODO: Check to between socket receive
        if (draft.messages[action.payload.channelId]) {
          draft.messages[action.payload.channelId].data.push(
            action.payload.message.data,
          );
          draft.postedMessageId = action.payload.message.data;
        }
        draft.createMessageLoading[action.payload.channelId] = false;
        break;
      }
      case ConversationTypes.FAILED_CREATE_CONVERSATION_MESSAGE: {
        draft.createMessageLoading[action.payload.channelId] = false;
        break;
      }

      case ConversationTypes.SUCCEED_DELETE_CONVERSATION_MESSAGE: {
        if (draft.messages[action.payload.channelId]) {
          draft.messages[action.payload.channelId].data = draft.messages[
            action.payload.channelId
          ].data.filter(
            item =>
              item !==
              `${action.payload.channelId}_${action.payload.messageId}`,
          );
        }
        break;
      }
    }
  });
