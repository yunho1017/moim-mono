import produce from "immer";
import { gRPCTypes, ConversationTypes } from "../actions/types";
import { AllActions } from "../actions";

export type IgRPCState = Readonly<{
  reconnectSnackBar: {
    open: boolean;
    message?: Partial<Record<Moim.gRPC.gRPCEventKey, string>>;
  };
  reconnectDelay: Record<Moim.gRPC.gRPCEventKey, number>;
  newMessages: Record<Moim.Id, Moim.Id[]>;
}>;

export const INITIAL_STATE: IgRPCState = {
  reconnectSnackBar: {
    open: false,
  },
  reconnectDelay: {
    message: 1,
    notification: 1,
    stat: 1,
    entity: 1,
  },
  newMessages: {},
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case gRPCTypes.SET_GRPC_ERROR_MESSAGE: {
        const { key, message } = action.payload;
        draft.reconnectSnackBar.message = {
          ...draft.reconnectSnackBar.message,
          [key]: message,
        };
        break;
      }
      case gRPCTypes.OPEN_RECONNECT_GRPC_SNACK_BAR: {
        draft.reconnectSnackBar.open = true;
        break;
      }
      case gRPCTypes.CLOSE_RECONNECT_GRPC_SNACK_BAR: {
        draft.reconnectSnackBar.open = false;
        break;
      }

      case gRPCTypes.INCREASE_RECONNECT_DELAY: {
        const { key } = action.payload;
        const currentDelay = draft.reconnectDelay[key];
        draft.reconnectDelay = {
          ...draft.reconnectDelay,
          [key]: currentDelay * 2,
        };
        break;
      }

      case gRPCTypes.RESET_RECONNECT_DELAY: {
        draft.reconnectDelay = INITIAL_STATE.reconnectDelay;
        break;
      }

      case gRPCTypes.RECEIVE_NEW_MESSAGE: {
        const { channelId, newMessageIds } = action.payload;
        if (draft.newMessages[channelId]) {
          draft.newMessages[channelId] = draft.newMessages[channelId].concat(
            newMessageIds,
          );
        } else {
          draft.newMessages[channelId] = newMessageIds;
        }
        break;
      }

      case ConversationTypes.SUCCEED_DELETE_CONVERSATION_MESSAGE: {
        const { channelId, messageId } = action.payload;
        const itemId = `${channelId}_${messageId}`;
        if (
          draft.newMessages[channelId] &&
          draft.newMessages[channelId].includes(itemId)
        ) {
          draft.newMessages[channelId] = draft.newMessages[channelId].filter(
            item => item !== itemId,
          );
        }
        break;
      }
    }
  });
