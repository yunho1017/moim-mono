import * as React from "react";
// hooks
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

// helpers
import {
  conversationMessagesSelector,
  getMessagesLoadingSelector,
  conversationMessageLengthSelector,
} from "app/selectors/conversation";
// actions
import {
  getConversationMessages,
  getConversationMessagesWithLatestIdWithoutLoading,
  deleteConversationMessage,
} from "app/actions/conversation";

export default function useMessages(channelId: string) {
  const { messages, getMessageLoading, messageLength } = useStoreState(
    state => ({
      getMessageLoading: getMessagesLoadingSelector(state),
      messages: conversationMessagesSelector(state, channelId),
      messageLength: conversationMessageLengthSelector(state, channelId),
    }),
  );

  const {
    dispatchGetConversationMessage,
    dispatchGetConversationMessageWithLatestId,
    dispatchDeleteConversationMessage,
  } = useActions({
    dispatchGetConversationMessage: getConversationMessages,
    dispatchGetConversationMessageWithLatestId: getConversationMessagesWithLatestIdWithoutLoading,
    dispatchDeleteConversationMessage: deleteConversationMessage,
  });

  const cancelToken = useCancelToken();

  const handleGetConversationMessage = React.useCallback(
    (id: Moim.Id, paging?: Moim.IPaging) => {
      dispatchGetConversationMessage(
        { channel_id: id, ...paging },
        cancelToken.current.token,
      );
    },
    [dispatchGetConversationMessage, cancelToken],
  );

  const handleGetConversationMessageWithLatestId = React.useCallback(
    async (id: Moim.Id, paging?: Moim.IPaging) =>
      dispatchGetConversationMessageWithLatestId(
        { channel_id: id, ...paging },
        cancelToken.current.token,
      ),
    [dispatchGetConversationMessageWithLatestId, cancelToken],
  );

  const handleLoadMoreMessageList = React.useCallback(
    (pagingKey: keyof Moim.IPaging) => {
      if (channelId) {
        handleGetConversationMessage(channelId, {
          [pagingKey]: messages.paging[pagingKey],
        });
      }
    },
    [channelId, handleGetConversationMessage, messages.paging],
  );

  const handleDelete = React.useCallback(
    (message: Moim.Conversations.IMessage) => {
      dispatchDeleteConversationMessage({
        channelId,
        messageId: message.id,
      });
    },
    [channelId, dispatchDeleteConversationMessage],
  );

  return {
    messages,
    getMessageLoading,
    messageLength,
    handleLoadMoreMessageList,
    handleGetConversationMessage,
    handleGetConversationMessageWithLatestId,
    handleDelete,
  };
}
