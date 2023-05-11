import * as React from "react";
import blockitForMessage from "../utils/blockitForMessage";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { dispatchCreateConversationMessage, channelId, cancelToken } = props;

  const handlePostMessage = React.useCallback(
    async (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => {
      const { content, files } = blockitForMessage(contents);

      await dispatchCreateConversationMessage(
        preLinkMeeting,
        {
          channel_id: channelId,
          message: {
            content: content === "" ? undefined : content,
            files,
          },
        },
        cancelToken.current.token,
      );
    },
    [channelId, dispatchCreateConversationMessage, cancelToken],
  );

  return {
    handlePostMessage,
  };
}
