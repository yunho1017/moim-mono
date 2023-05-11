import * as React from "react";
import { IHookProps } from "./";
import useCurrentUser from "common/hooks/useCurrentUser";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    dispatchPostComment,
    dispatchEditComment,
    cancelToken,
    commentEditState,
  } = props;
  const currentUser = useCurrentUser();

  const handlePostThread = React.useCallback(
    (params: {
      contents: Moim.Blockit.Blocks[];
      channelId: Moim.Id;
      threadId: Moim.Id;
      groupId?: string;
    }) => {
      if (currentUser) {
        dispatchPostComment(
          {
            type: "reply",
            channelId: params.channelId,
            threadId: params.threadId,
            content: params.contents,
          },
          cancelToken.current.token,
          params.groupId,
        );
      }
    },
    [currentUser, dispatchPostComment, cancelToken],
  );

  const handleEditThread = React.useCallback(
    (title: string | undefined, content: Moim.Blockit.Blocks[]) => {
      if (currentUser && commentEditState) {
        dispatchEditComment(
          {
            title,
            content,
            channelId: commentEditState.channelId,
            threadId: commentEditState.threadId,
            replyId: commentEditState.commentId,
          },
          cancelToken.current.token,
          commentEditState.groupId,
        );
      }
    },
    [currentUser, commentEditState, dispatchEditComment, cancelToken],
  );

  return {
    handlePostThread,
    handleEditThread,
  };
}
