import { gRPCTypes } from "./types";
import { ThunkResult, AppDispatch } from "../store";
import { subscribe } from "app/event";
// helper
import { ActionUnion } from "./helpers";
import { IAppState } from "app/rootReducer";
import { ThunkPromiseResult } from "app/store";
import { loadEntities } from "app/actions/entity";
import { messageListNormalizer } from "app/models/message/normalizer";

const MAX_RECONNECT_GRPC_DELAY = 100;
function createAction<T extends { type: gRPCTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  setGRPCErrorMessage: (payload: {
    key: Moim.gRPC.gRPCEventKey;
    message: string;
  }) => createAction({ type: gRPCTypes.SET_GRPC_ERROR_MESSAGE, payload }),
  openReconnectGRPCSnackBar: () =>
    createAction({ type: gRPCTypes.OPEN_RECONNECT_GRPC_SNACK_BAR }),
  closeReconnectGRPCSnackBar: () =>
    createAction({ type: gRPCTypes.CLOSE_RECONNECT_GRPC_SNACK_BAR }),

  increaseReconnectDelay: (payload: { key: Moim.gRPC.gRPCEventKey }) =>
    createAction({ type: gRPCTypes.INCREASE_RECONNECT_DELAY, payload }),
  resetReconnectDelay: () =>
    createAction({ type: gRPCTypes.RESET_RECONNECT_DELAY }),

  receivedNewMessages: (channelId: Moim.Id, newMessageIds: Moim.Id[]) =>
    createAction({
      type: gRPCTypes.RECEIVE_NEW_MESSAGE,
      payload: {
        channelId,
        newMessageIds,
      },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function reconnectGRPC(): ThunkResult {
  return async (dispatch, getState) => {
    subscribe(getState, dispatch);
  };
}

export function reconnectGRPCBackOffice(
  eventKey: Moim.gRPC.gRPCEventKey,
  reconnectCallback: (getState: () => IAppState, dispatch: AppDispatch) => void,
): ThunkResult {
  return async (dispatch, getState) => {
    const state = getState();
    const { reconnectDelay, reconnectSnackBar } = state.gRPC;

    if (reconnectDelay[eventKey] < MAX_RECONNECT_GRPC_DELAY) {
      setTimeout(() => {
        reconnectCallback(getState, dispatch);
        dispatch(ActionCreators.increaseReconnectDelay({ key: eventKey }));
      }, reconnectDelay[eventKey] * 1000);
    } else {
      if (!reconnectSnackBar.open) {
        dispatch(ActionCreators.openReconnectGRPCSnackBar());
      }
    }
  };
}

export function saveMessagesToStore(
  channelId: Moim.Id,
  messages: Moim.Conversations.INormalizedMessage[], // Mean raw messages
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const ConversationAPI = apiSelector(getState(), dispatch).conversation;
    const lastSeenMessageId = (getState().conversation.messages[channelId]
      ?.data || [])[0];

    if (lastSeenMessageId) {
      ConversationAPI.getConversationMessages({
        channel_id: channelId,
        after: lastSeenMessageId,
      });
    }
    const normalizedMessages = messageListNormalizer({
      data: messages,
      paging: {},
    });

    dispatch(loadEntities(normalizedMessages.entities));
    dispatch(
      ActionCreators.receivedNewMessages(
        channelId,
        normalizedMessages.result.data,
      ),
    );
  };
}
