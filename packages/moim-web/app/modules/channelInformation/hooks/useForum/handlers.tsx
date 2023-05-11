import * as React from "react";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { dispatchGetMembers, cancelToken } = props;

  const handleGetMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetMembers({ ...paging }, cancelToken.current.token);
    },
    [dispatchGetMembers, cancelToken],
  );

  return {
    ...props,
    handleGetMembers,
  };
}
