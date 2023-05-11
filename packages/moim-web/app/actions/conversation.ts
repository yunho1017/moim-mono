import { CancelToken } from "axios";
import { ActionUnion } from "./helpers";
import { ConversationTypes } from "./types";
import { ThunkPromiseResult } from "../store";
import { errorParseData } from "common/helpers/APIErrorParser";
import ConversationAPI from "common/api/conversation";
import { loadEntities } from "./entity";
import { conversationSingleItemNormalizer } from "../models";
import { userListNormalizer } from "../models/user";
import openCallbackWindow from "common/helpers/pluginWindowCallback";
import {
  messageListNormalizer,
  messageSingleItemNormalizer,
} from "../models/message";
import { MoimURL } from "common/helpers/url";
import { preFetchFromMessageList } from "app/actions/referenceBlock";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";

function createAction<T extends { type: ConversationTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetConversation: () =>
    createAction({ type: ConversationTypes.START_GET_CONVERSATION }),
  succeedGetConversation: (payload: {
    conversation: Moim.ISingleItemResponse<Moim.Id>;
  }) =>
    createAction({ type: ConversationTypes.SUCCEED_GET_CONVERSATION, payload }),
  failedGetConversation: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ type: ConversationTypes.FAILED_GET_CONVERSATION, payload }),
  startGetConversationMembers: (payload: { channelId: string }) =>
    createAction({
      type: ConversationTypes.START_GET_CONVERSATION_MEMBERS,
      payload,
    }),
  succeedGetConversationMembers: (payload: {
    members: Moim.IPaginatedListResponse<Moim.Id>;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.SUCCEED_GET_CONVERSATION_MEMBERS,
      payload,
    }),
  failedGetConversationMembers: (payload: {
    error?: Moim.IErrorResponse;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.FAILED_GET_CONVERSATION_MEMBERS,
      payload,
    }),
  startJoinConversation: (payload: { channelId: string }) =>
    createAction({ type: ConversationTypes.START_JOIN_CONVERSATION, payload }),
  succeedJoinConversation: (payload: {
    conversation: Moim.ISingleItemResponse<Moim.Id>;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.SUCCEED_JOIN_CONVERSATION,
      payload,
    }),
  failedJoinConversation: (payload: {
    error?: Moim.IErrorResponse;
    channelId: Moim.Id;
  }) =>
    createAction({ type: ConversationTypes.FAILED_JOIN_CONVERSATION, payload }),

  startGetConversationMessages: (payload: { channelId: string }) =>
    createAction({
      type: ConversationTypes.START_GET_CONVERSATION_MESSAGES,
      payload,
    }),
  succeedGetConversationMessages: (payload: {
    messages: Moim.IPaginatedListResponse<Moim.Id>;
    channelId: Moim.Id;
    fetchDirection: "before" | "after" | null;
  }) =>
    createAction({
      type: ConversationTypes.SUCCEED_GET_CONVERSATION_MESSAGES,
      payload,
    }),
  failedGetConversationMessages: (payload: {
    error?: Moim.IErrorResponse;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.FAILED_GET_CONVERSATION_MESSAGES,
      payload,
    }),
  startCreateConversationMessage: (payload: { channelId: string }) =>
    createAction({
      type: ConversationTypes.START_CREATE_CONVERSATION_MESSAGE,
      payload,
    }),
  succeedCreateConversationMessage: (payload: {
    message: Moim.ISingleItemResponse<Moim.Id>;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.SUCCEED_CREATE_CONVERSATION_MESSAGE,
      payload,
    }),
  failedCreateConversationMessage: (payload: {
    error?: Moim.IErrorResponse;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.FAILED_CREATE_CONVERSATION_MESSAGE,
      payload,
    }),

  startEditConversationMessage: () =>
    createAction({
      type: ConversationTypes.START_EDIT_CONVERSATION_MESSAGE,
    }),
  succeedEditConversationMessage: () =>
    createAction({
      type: ConversationTypes.SUCCEED_EDIT_CONVERSATION_MESSAGE,
    }),
  failedEditConversationMessage: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      type: ConversationTypes.FAILED_EDIT_CONVERSATION_MESSAGE,
      payload,
    }),

  startDeleteConversationMessage: () =>
    createAction({
      type: ConversationTypes.START_DELETE_CONVERSATION_MESSAGE,
    }),
  succeedDeleteConversationMessage: (payload: {
    channelId: Moim.Id;
    messageId: Moim.Id;
  }) =>
    createAction({
      type: ConversationTypes.SUCCEED_DELETE_CONVERSATION_MESSAGE,
      payload,
    }),
  failedDeleteConversationMessage: () =>
    createAction({
      type: ConversationTypes.FAILED_DELETE_CONVERSATION_MESSAGE,
    }),

  changeMessageEditState: (
    payload:
      | {
          channelId: Moim.Id;
          messageId: Moim.Id;
        }
      | undefined,
  ) =>
    createAction({
      type: ConversationTypes.CHANGE_MESSAGE_EDIT_STATE,
      payload,
    }),

  clearMessageEditState: () =>
    createAction({
      type: ConversationTypes.CLEAR_MESSAGE_EDIT_STATE,
    }),

  startSearchMessages: () =>
    createAction({ type: ConversationTypes.START_SEARCH_MESSAGES }),
  succeedSearchMessages: (
    result: Moim.IPlainPagingListResponse<
      Moim.Conversations.ISearchedMessageBody
    >,
  ) =>
    createAction({
      type: ConversationTypes.SUCCEED_SEARCH_MESSAGES,
      payload: { result },
    }),
  failedSearchMessages: () =>
    createAction({ type: ConversationTypes.FAILED_SEARCH_MESSAGES }),
  clearSearchMessages: () =>
    createAction({ type: ConversationTypes.CLEAR_SEARCH_MESSAGES }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getConversation(
  ...args: Parameters<typeof ConversationAPI.prototype.getConversation>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startGetConversation());
      const api = apiSelector(getState(), dispatch);
      const conversation = conversationSingleItemNormalizer(
        await api.conversation.getConversation(...args),
      );
      dispatch(loadEntities(conversation.entities));
      dispatch(
        ActionCreators.succeedGetConversation({
          conversation: conversation.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      if (error) {
        dispatch(ActionCreators.failedGetConversation({ error }));
      }
    }
  };
}

export function getConversationMembers(
  ...args: Parameters<typeof ConversationAPI.prototype.getConversationMembers>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const channelId = args[0].channel_id;
    try {
      dispatch(ActionCreators.startGetConversationMembers({ channelId }));
      const api = apiSelector(getState(), dispatch);
      const members = userListNormalizer(
        await api.conversation.getConversationMembers(...args),
      );
      dispatch(loadEntities(members.entities));
      dispatch(
        ActionCreators.succeedGetConversationMembers({
          members: members.result,
          channelId: args[0].channel_id,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      if (error) {
        dispatch(
          ActionCreators.failedGetConversationMembers({ error, channelId }),
        );
      }
    }
  };
}

export function joinConversation(
  ...args: Parameters<typeof ConversationAPI.prototype.joinConversation>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const channelId = args[0].channel_id;
    try {
      dispatch(ActionCreators.startJoinConversation({ channelId }));
      const api = apiSelector(getState(), dispatch);
      const conversation = conversationSingleItemNormalizer(
        await api.conversation.joinConversation(...args),
      );
      dispatch(loadEntities(conversation.entities));
      dispatch(
        ActionCreators.succeedJoinConversation({
          conversation: conversation.result,
          channelId,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedJoinConversation({ error, channelId }));
    }
  };
}

export function getConversationMessages(
  ...args: Parameters<typeof ConversationAPI.prototype.getConversationMessages>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const channelId = args[0].channel_id;
    try {
      dispatch(ActionCreators.startGetConversationMessages({ channelId }));
      const api = apiSelector(getState(), dispatch);
      const response = await api.conversation.getConversationMessages(...args);

      dispatch(preFetchFromMessageList(response.data));
      const messages = messageListNormalizer(response);
      dispatch(loadEntities(messages.entities));
      dispatch(
        ActionCreators.succeedGetConversationMessages({
          messages: messages.result,
          channelId,
          fetchDirection: Boolean(args[0].before)
            ? "before"
            : Boolean(args[0].after)
            ? "after"
            : null,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(
        ActionCreators.failedGetConversationMessages({ error, channelId }),
      );
    }
  };
}
export function getConversationMessagesWithLatestIdWithoutLoading(
  ...args: Parameters<typeof ConversationAPI.prototype.getConversationMessages>
): ThunkPromiseResult<Moim.Id | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const channelId = args[0].channel_id;
    try {
      // dispatch(ActionCreators.startGetConversationMessages({ channelId }));
      const api = apiSelector(getState(), dispatch);
      const response = await api.conversation.getConversationMessages(...args);

      dispatch(preFetchFromMessageList(response.data));
      const messages = messageListNormalizer(response);
      dispatch(loadEntities(messages.entities));
      dispatch(
        ActionCreators.succeedGetConversationMessages({
          messages: messages.result,
          channelId,
          fetchDirection: Boolean(args[0].before)
            ? "before"
            : Boolean(args[0].after)
            ? "after"
            : null,
        }),
      );
      return response.data.length
        ? response.data[response.data.length - 1].id
        : undefined;
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(
        ActionCreators.failedGetConversationMessages({ error, channelId }),
      );
    }
  };
}

export function createConversationMessage(
  preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
  ...args: Parameters<
    typeof ConversationAPI.prototype.createConversationMessage
  >
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const channelId = args[0].channel_id;
    try {
      dispatch(ActionCreators.startCreateConversationMessage({ channelId }));
      const api = apiSelector(getState(), dispatch);
      const messageEntity = await api.conversation.createConversationMessage(
        ...args,
      );
      const normalizedMessageEntity = messageSingleItemNormalizer(
        messageEntity,
      );
      if (preLinkMeeting) {
        await api.meeting.linkToMeeting(
          preLinkMeeting.id,
          channelId,
          messageEntity.data.id,
        );
        const url = new MoimURL.MeetingHome({
          meetingId: preLinkMeeting.id,
        }).toString(location.origin);
        setTimeout(() => {
          openCallbackWindow(url, "meeting-bot", dispatch, {
            width: 1200,
            height: 720,
          });
        }, 1000);
      }

      dispatch(loadEntities(normalizedMessageEntity.entities));
      dispatch(
        ActionCreators.succeedCreateConversationMessage({
          message: normalizedMessageEntity.result,
          channelId,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      if (error?.code === "BLOCKED") {
        dispatch(
          SnackbarActionCreators.openSnackbar({
            textKey: "toast_message_dm_not_allowed",
            type: "error",
          }),
        );
      }
      dispatch(
        ActionCreators.failedCreateConversationMessage({ error, channelId }),
      );
    }
  };
}

export function editConversationMessage(
  ...args: Parameters<typeof ConversationAPI.prototype.editConversationMessage>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startEditConversationMessage());
      const api = apiSelector(getState(), dispatch);
      const message = messageSingleItemNormalizer(
        await api.conversation.editConversationMessage(...args),
      );
      dispatch(loadEntities(message.entities));
      dispatch(ActionCreators.succeedEditConversationMessage());
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedEditConversationMessage({ error }));
    }
  };
}

export function deleteConversationMessage(
  ...args: Parameters<
    typeof ConversationAPI.prototype.deleteConversationMessage
  >
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { channelId, messageId } = args[0];
    dispatch(ActionCreators.startDeleteConversationMessage());
    try {
      await apiSelector(
        getState(),
        dispatch,
      ).conversation.deleteConversationMessage(...args);
      dispatch(
        ActionCreators.succeedDeleteConversationMessage({
          channelId,
          messageId,
        }),
      );
    } catch (err) {
      dispatch(ActionCreators.failedDeleteConversationMessage());
    }
  };
}

export function getSearchMessages(
  params: Moim.Conversations.IGetSearchMessagesRequest,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchMessages());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).conversation.getSearchMessages(params, cancelToken);
      dispatch(ActionCreators.succeedSearchMessages(result));
    } catch {
      dispatch(ActionCreators.failedSearchMessages());
    }
  };
}
