import * as React from "react";
import { useIntl } from "react-intl";
import ActionCount from "common/components/actionCount";
import {
  SmallCount,
  LargeCount,
  LargeLikeButton,
  SmallLikeButton,
  MiddleLikeButton,
  MiddleCount,
  Wrapper,
} from "./styled";

import useOpenVotedUserListDialog from "common/hooks/useOpenVotedUserListDialog";

import { VoteStatus } from "app/enums";

export interface IProps {
  likeCount: number;
  liked: boolean;
  threadId: Moim.Id;
  disabled?: boolean;
  channelId?: Moim.Id;
  replyId?: Moim.Id;
  normalColor?: string;
  likedColor?: string;
  disableOpenVotedUserList?: boolean;
  handleLike?: (status: Moim.Enums.VoteStatus) => void;
  handleCountClick?: () => void;
}

export function LargeLike({
  liked,
  likeCount,
  channelId,
  threadId,
  replyId,
  disabled,
  normalColor,
  likedColor,
  disableOpenVotedUserList,
  handleLike: handler,
}: IProps) {
  const intl = useIntl();
  const openDialog = useOpenVotedUserListDialog({
    threadId,
    channelId,
    replyId,
  });
  const handleClick = React.useCallback(() => {
    handler?.(!liked ? VoteStatus.POSITIVE : VoteStatus.NONE);
  }, [handler, liked]);

  const handleCountClick = React.useCallback(() => {
    if (!disableOpenVotedUserList) {
      openDialog({ defaultTab: "like" });
    } else {
      handleClick();
    }
  }, [disableOpenVotedUserList, handleClick, openDialog]);

  const countElement = React.useMemo(() => {
    if (!likeCount) {
      return null;
    }
    const clickEvent = disableOpenVotedUserList
      ? undefined
      : likeCount
      ? handleCountClick
      : handleClick;
    return (
      <LargeCount
        isLiked={liked}
        normalColor={normalColor}
        likedColor={likedColor}
        role={disableOpenVotedUserList ? undefined : "button"}
        onClick={clickEvent}
      >
        <ActionCount value={likeCount} defaultValue="0" />
      </LargeCount>
    );
  }, [
    disableOpenVotedUserList,
    likeCount,
    handleCountClick,
    handleClick,
    liked,
    normalColor,
    likedColor,
  ]);

  return (
    <Wrapper
      disabled={disabled}
      title={intl.formatMessage({ id: "content_description_button_like" })}
    >
      <LargeLikeButton liked={liked} onClick={handleClick} />
      {countElement}
    </Wrapper>
  );
}

export function MiddleLike({
  liked,
  likeCount,
  disabled,
  normalColor,
  likedColor,
  channelId,
  threadId,
  replyId,
  disableOpenVotedUserList,
  handleLike: handler,
}: IProps) {
  const openDialog = useOpenVotedUserListDialog({
    threadId,
    channelId,
    replyId,
  });
  const handleClick = React.useCallback(() => {
    handler?.(!liked ? VoteStatus.POSITIVE : VoteStatus.NONE);
  }, [handler, liked]);

  const handleCountClick = React.useCallback(() => {
    if (!disableOpenVotedUserList) {
      openDialog({ defaultTab: "like" });
    } else {
      handleClick();
    }
  }, [disableOpenVotedUserList, handleClick, openDialog]);

  const clickEvent = React.useMemo(
    () =>
      disableOpenVotedUserList
        ? undefined
        : likeCount
        ? handleCountClick
        : handleClick,
    [disableOpenVotedUserList, handleClick, handleCountClick, likeCount],
  );

  return (
    <Wrapper disabled={disabled}>
      <MiddleLikeButton liked={liked} onClick={handleClick} />
      {likeCount > 0 && (
        <MiddleCount
          isLiked={liked}
          normalColor={normalColor}
          likedColor={likedColor}
          role={disableOpenVotedUserList ? undefined : "button"}
          onClick={clickEvent}
        >
          <ActionCount value={likeCount} defaultValue="0" />
        </MiddleCount>
      )}
    </Wrapper>
  );
}

export function SmallLike({
  liked,
  likeCount,
  channelId,
  threadId,
  disabled,
  normalColor,
  likedColor,
  disableOpenVotedUserList,
  replyId,
  handleLike: handler,
}: IProps) {
  const openDialog = useOpenVotedUserListDialog({
    channelId,
    threadId,
    replyId,
  });
  const handleClick = React.useCallback(() => {
    handler?.(!liked ? VoteStatus.POSITIVE : VoteStatus.NONE);
  }, [handler, liked]);

  const handleCountClick = React.useCallback(() => {
    if (!disableOpenVotedUserList) {
      openDialog({ defaultTab: "like" });
    } else {
      handleClick();
    }
  }, [disableOpenVotedUserList, handleClick, openDialog]);

  const clickEvent = React.useMemo(
    () =>
      disableOpenVotedUserList
        ? undefined
        : likeCount
        ? handleCountClick
        : handleClick,
    [disableOpenVotedUserList, handleClick, handleCountClick, likeCount],
  );

  return (
    <Wrapper disabled={disabled}>
      <SmallLikeButton liked={liked} onClick={handleClick} />
      {likeCount > 0 && (
        <SmallCount
          isLiked={liked}
          normalColor={normalColor}
          likedColor={likedColor}
          role={disableOpenVotedUserList ? undefined : "button"}
          onClick={clickEvent}
        >
          <ActionCount value={likeCount} defaultValue="0" />
        </SmallCount>
      )}
    </Wrapper>
  );
}
