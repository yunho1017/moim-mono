import * as React from "react";
// hooks
import { IHookProps } from ".";
import { useMessageThreadInput } from "common/components/threadV2/components/threadInput/hooks";
// helper
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { inputRef, cancelToken, dispatchGetConversation } = props;

  const threadInputHookProps = useMessageThreadInput.useProps();
  const { handlePostMessage } = useMessageThreadInput.useHandlers(
    threadInputHookProps,
  );

  const handleEnter = React.useCallback(
    (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => {
      const { isEmptyFile, isEmptyText } = isEmpty(contents);
      if (isEmptyFile && isEmptyText && !preLinkMeeting) return;

      handlePostMessage(contents, preLinkMeeting);
      inputRef.current?.groupInputClear();

      AnalyticsClass.getInstance().chatWriteMessagePublish({
        chatId: props.channelId,
      });
    },
    [handlePostMessage, inputRef, props.channelId],
  );

  const handleFocus = React.useCallback(() => {
    AnalyticsClass.getInstance().chatWriteMessageSelect({
      chatId: props.channelId,
    });
  }, [props.channelId]);

  const handleGetConversation = React.useCallback(
    (id: Moim.Id) => {
      dispatchGetConversation({ channel_id: id }, cancelToken.current.token);
    },
    [dispatchGetConversation, cancelToken],
  );

  return {
    handleEnter,
    handleFocus,
    handleGetConversation,
  };
}
