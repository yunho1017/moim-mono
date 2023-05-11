import * as React from "react";
import { IHookProps } from "./useProps";
import { IHookHandlers } from "./useHandlers";

export function useEffects(
  hookProps: IHookProps,
  _hookHandlers: IHookHandlers,
) {
  const { dispatchGetPositions, cancelToken } = hookProps;

  React.useEffect(() => {
    dispatchGetPositions({}, cancelToken.current.token);
  }, [dispatchGetPositions, cancelToken.current.token]);
}
