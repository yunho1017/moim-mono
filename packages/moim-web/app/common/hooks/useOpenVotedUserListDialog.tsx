import * as React from "react";

import { useActions } from "app/store";
import { ActionCreators } from "app/actions/forum";

export default function useOpenVotedUserListDialog(payload: {
  threadId: Moim.Id;
  channelId?: Moim.Id;
  replyId?: Moim.Id;
  useTab?: boolean;
  defaultTab?: Moim.Forum.VotedUserListDialogTabType;
}) {
  const { open } = useActions({
    open: ActionCreators.openVotedUserListDialog,
  });

  return React.useCallback(
    (newPayload?: {
      channelId?: Moim.Id;
      threadId?: Moim.Id;
      replyId?: Moim.Id;
      useTab?: boolean;
      defaultTab?: Moim.Forum.VotedUserListDialogTabType;
    }) => {
      open({ ...payload, ...newPayload });
    },
    [open, payload],
  );
}
