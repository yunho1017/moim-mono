import * as React from "react";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { dispatchGetConversationMembers, cancelToken, channelId } = props;

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetConversationMembers(
        { ...paging, channel_id: channelId },
        cancelToken.current.token,
      );
    },
    [channelId, dispatchGetConversationMembers, cancelToken],
  );

  return {
    ...props,
    handleGetMembers,
  };
}
