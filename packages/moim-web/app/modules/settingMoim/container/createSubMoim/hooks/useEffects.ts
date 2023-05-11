import * as React from "react";
import { IHookProps } from "./useProps";
import { IHookHandlers } from "./useHandlers";

export function useEffects(hookProps: IHookProps, hookHandler: IHookHandlers) {
  const { dispatchGetTags } = hookProps;
  const { cancelGetTags } = hookHandler;

  React.useEffect(() => {
    dispatchGetTags({
      limit: 100,
    });
    return () => {
      cancelGetTags();
    };
  }, [cancelGetTags, dispatchGetTags]);
}
