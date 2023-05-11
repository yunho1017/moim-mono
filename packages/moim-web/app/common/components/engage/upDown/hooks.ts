import * as React from "react";
import useOpenVotedUserListDialog from "common/hooks/useOpenVotedUserListDialog";
import { VoteStatus } from "app/enums";
import { IProps } from "./";

export default function useHooks(props: IProps) {
  const {
    threadId,
    channelId,
    replyId,
    status,
    disableOpenVotedUserList,
    handler,
  } = props;
  const openDialog = useOpenVotedUserListDialog({
    channelId,
    threadId,
    replyId,
    useTab: true,
  });
  const isActiveUpButton = React.useMemo(() => status === VoteStatus.POSITIVE, [
    status,
  ]);
  const isActiveDownButton = React.useMemo(
    () => status === VoteStatus.NEGATIVE,
    [status],
  );

  const handleClick = React.useCallback(
    (newType: Moim.Enums.VoteStatus) => {
      handler?.(status !== newType ? newType : VoteStatus.NONE);
    },
    [status, handler],
  );

  const handleUpClick = React.useCallback(() => {
    handleClick(VoteStatus.POSITIVE);
  }, [handleClick]);

  const handleDownClick = React.useCallback(() => {
    handleClick(VoteStatus.NEGATIVE);
  }, [handleClick]);

  const handleUpCountClick = React.useCallback(() => {
    if (!disableOpenVotedUserList) {
      openDialog({ defaultTab: "like" });
    } else {
      handleClick(VoteStatus.POSITIVE);
    }
  }, [disableOpenVotedUserList, handleClick, openDialog]);

  const handleDownCountClick = React.useCallback(() => {
    if (!disableOpenVotedUserList) {
      openDialog({ defaultTab: "dislike" });
    } else {
      handleClick(VoteStatus.NEGATIVE);
    }
  }, [disableOpenVotedUserList, handleClick, openDialog]);

  return {
    ...props,
    openDialog,
    isActiveUpButton,
    isActiveDownButton,
    handleClick,
    handleUpClick,
    handleDownClick,
    handleUpCountClick,
    handleDownCountClick,
  };
}
