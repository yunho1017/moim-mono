import * as React from "react";
import { IHookProps } from ".";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    subMoims,
    isMobile,
    cancelToken,
    setStatus,
    dispatchGetJoinedSubMoims,
  } = props;

  const setOpen = React.useCallback(() => {
    setStatus("Open");
  }, [setStatus]);
  const setDisable = React.useCallback(() => {
    if (!isMobile) {
      setStatus("Disabled");
    }
  }, [isMobile, setStatus]);
  const setExpanded = React.useCallback(() => {
    setStatus("Expanded");
  }, [setStatus]);

  const handleGetJoinedSubMoims = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetJoinedSubMoims(paging, cancelToken.current.token);
    },
    [cancelToken, dispatchGetJoinedSubMoims],
  );

  const handleLoadMoreJoinedSubMoims = React.useCallback(() => {
    handleGetJoinedSubMoims(subMoims.paging);
  }, [handleGetJoinedSubMoims, subMoims.paging]);

  return {
    setOpen,
    setDisable,
    setExpanded,
    handleGetJoinedSubMoims,
    handleLoadMoreJoinedSubMoims,
  };
}
