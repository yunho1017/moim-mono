import * as React from "react";
import debounce from "lodash/debounce";

export default function useBlinkBehavior(
  {
    resolveTime,
  }: {
    resolveTime?: number;
  } = { resolveTime: 300 },
) {
  const [status, setStatus] = React.useState(false);

  const resolveAction = React.useMemo(
    () =>
      debounce(() => {
        setStatus(false);
      }, resolveTime),
    [resolveTime],
  );

  const setAction = React.useCallback(() => {
    setStatus(true);
    resolveAction();
  }, [resolveAction]);

  return {
    status,
    onSetAction: setAction,
  };
}
