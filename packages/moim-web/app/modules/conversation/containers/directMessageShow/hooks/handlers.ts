import * as React from "react";
// hooks
import { IHookProps } from ".";
import { useDirectMessageThreadInput } from "common/components/threadV2/components/threadInput/hooks";
// helper
import isEmpty from "common/components/richEditor/helpers/isEmpty";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { inputRef, channelId } = props;

  const threadInputHookProps = useDirectMessageThreadInput.useProps(channelId);
  const { handlePostMessage } = useDirectMessageThreadInput.useHandlers(
    threadInputHookProps,
  );

  const handleEnter = React.useCallback(
    async (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => {
      const { isEmptyFile, isEmptyText } = isEmpty(contents);
      if (isEmptyFile && isEmptyText) return;

      await handlePostMessage(contents, preLinkMeeting);
      inputRef.current?.groupInputClear();
    },
    [handlePostMessage, inputRef],
  );

  return {
    handleEnter,
  };
}
