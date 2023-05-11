import { useCallback } from "react";
import { useActions } from "app/store";
import { ActionCreators } from "./actions";

export function useOpenPostReportDialog(option: {
  parentId: string;
  threadId: string;
}) {
  const { open } = useActions({ open: ActionCreators.open });

  return useCallback(() => {
    const { threadId, parentId } = option;
    open({ parentId, threadId });
  }, [option.threadId, option.parentId]);
}

export function useClosePostReportDialog() {
  const { close } = useActions({ close: ActionCreators.close });

  return close;
}
