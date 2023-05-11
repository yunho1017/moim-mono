import * as React from "react";
import { IHookProps } from "./useProps";
import { IHookHandlers } from "./useHandlers";

export function useEffects(hookProps: IHookProps, hookHandlers: IHookHandlers) {
  const { open } = hookProps;
  const { handleResetData } = hookHandlers;

  React.useEffect(() => {
    if (!open) {
      handleResetData();
    }
  }, [open]);
}
