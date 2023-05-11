import * as React from "react";
// hooks
import { IHookProps } from ".";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { cancelToken, dispatchGetChannel } = props;

  const handleGetChannel = React.useCallback(
    (id: Moim.Id) => {
      dispatchGetChannel({ channelId: id }, cancelToken.current.token);
    },
    [dispatchGetChannel, cancelToken],
  );

  return {
    handleGetChannel,
  };
}
