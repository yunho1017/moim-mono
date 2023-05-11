import * as React from "react";
import blockitForMessage from "../utils/blockitForMessage";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    dispatchCreateConversationMessage,
    dispatchEditConversationMessage,
    messageEditState,
    conversationId,
    cancelToken,
  } = props;

  const handlePostMessage = React.useCallback(
    async (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => {
      const { content, files } = blockitForMessage(contents);

      await dispatchCreateConversationMessage(
        preLinkMeeting,
        {
          channel_id: conversationId,
          message: {
            content,
            files,
          },
        },
        cancelToken.current.token,
      );
    },
    [conversationId, dispatchCreateConversationMessage, cancelToken],
  );

  const handleEditMessage = React.useCallback(
    async (contents: Moim.Blockit.Blocks[]) => {
      if (messageEditState) {
        const { content, files } = blockitForMessage(contents);

        await dispatchEditConversationMessage(
          {
            channel_id: messageEditState.channelId,
            message_id: messageEditState.messageId,
            message: {
              content,
              files,
            },
          },
          cancelToken.current.token,
        );
      }
    },
    [messageEditState, dispatchEditConversationMessage, cancelToken],
  );

  return {
    handlePostMessage,
    handleEditMessage,
  };
}
