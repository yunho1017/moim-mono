import * as React from "react";
// helpers
import { IHookHandlers, IHookProps } from "../hooks";

export default function useEffects(
  _props: IHookProps,
  handlers: IHookHandlers,
) {
  const { handleInitialDataLoad } = handlers;
  React.useEffect(() => {
    handleInitialDataLoad();
  }, [handleInitialDataLoad]);
}
