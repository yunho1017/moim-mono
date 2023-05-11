import * as React from "react";

import { useActions } from "app/store";
import { ActionCreators } from "app/actions/group";

export default function useOpenJoinGroupDialog(
  type?: Moim.Group.JoinGroupDialogType,
) {
  const { open } = useActions({
    open: ActionCreators.openJoinGroupDialog,
  });

  return React.useCallback(
    (initialStep?: Moim.Group.JoinGroupDialogStepType) => {
      open(type ?? "current", initialStep);
    },
    [open, type],
  );
}
