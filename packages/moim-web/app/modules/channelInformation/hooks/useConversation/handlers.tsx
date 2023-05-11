import * as React from "react";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { dispatchGetConversationMembers, cancelToken } = props;

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetConversationMembers({ ...paging }, cancelToken.current.token);
    },
    [dispatchGetConversationMembers, cancelToken],
  );

  return {
    ...props,
    handleGetMembers,
  };
}
