import * as React from "react";
import { IHookProps } from "./useProps";

export function useEffects(hookProps: IHookProps) {
  const { cancelToken } = hookProps;

  React.useEffect(() => () => cancelToken.current.cancel(), [
    cancelToken.current,
  ]);
}
