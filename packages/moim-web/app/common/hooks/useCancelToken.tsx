import * as React from "react";
import axios, { CancelTokenSource } from "axios";

export default function useCancelToken(identity?: any) {
  const cancelTokenSource: React.MutableRefObject<
    CancelTokenSource | undefined
  > = React.useRef(undefined);
  if (!cancelTokenSource.current) {
    cancelTokenSource.current = axios.CancelToken.source();
  }
  React.useEffect(
    () => () => {
      if (cancelTokenSource.current) {
        // cancelTokenSource.current.cancel();
        cancelTokenSource.current = axios.CancelToken.source();
      }
    },
    [identity],
  );
  return cancelTokenSource as { current: CancelTokenSource };
}

export function useCancelTokenWithCancelHandler() {
  const cancelTokenSource: React.MutableRefObject<
    CancelTokenSource | undefined
  > = React.useRef(undefined);
  if (!cancelTokenSource.current) {
    cancelTokenSource.current = axios.CancelToken.source();
  }

  const handleCancel = React.useCallback(() => {
    cancelTokenSource.current?.cancel();
    cancelTokenSource.current = axios.CancelToken.source();
    return cancelTokenSource.current;
  }, []);

  return {
    cancelTokenSource: cancelTokenSource as { current: CancelTokenSource },
    handleCancel,
  };
}
