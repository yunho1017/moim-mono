import * as React from "react";
import styled from "styled-components";
import { LargeLike } from "common/components/engage/like";
import CommentCount from "../commentCount";
import { LargeUpDown } from "common/components/engage/upDown";
import PermissionChecker from "common/components/permissionChecker";

import {
  useVisibleReactionArea,
  useVisibleCommentArea,
  usePostShowPermission,
} from "app/modules/postShow/hooks";
// type
import { PermissionDeniedFallbackType, VoteStatus } from "app/enums";
import { px2rem } from "common/helpers/rem";
import { PostShowContext } from "app/modules/postShow/context";
import { useStoreState } from "app/store";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: ${px2rem(16)};
  }
`;
interface IProps {
  reaction: {
    type: Moim.Forum.PostReactionType;
    status: Moim.Enums.VoteStatus;
    upVoteScore: number;
    downVoteScore: number;
    isLoading: boolean;
    handler?: (status: Moim.Enums.VoteStatus) => void;
  };
  onCommentClick(): void;
}

export default function Left({ reaction, onCommentClick }: IProps) {
  const { post } = React.useContext(PostShowContext);
  const threadId = post.id;
  const channelId = post.parent_id;
  const commentCount = post.replies_count;
  const { hasPermission: votePermission, isLoading } = usePostShowPermission(
    "POST_VOTE",
  );
  const isAnonymousReaction = useStoreState(state =>
    Boolean(
      (state.entities.channels[channelId] as Moim.Channel.IForumSimpleChannel)
        ?.anonymous_config?.reaction,
    ),
  );

  const visibleReactionArea = useVisibleReactionArea();
  const visibleCommentArea = useVisibleCommentArea();
  const reactionElement = React.useMemo(() => {
    if (reaction.type === "up") {
      return (
        <LargeLike
          likeCount={reaction.upVoteScore}
          liked={reaction.status === VoteStatus.POSITIVE}
          threadId={threadId}
          channelId={channelId}
          handleLike={reaction.handler}
          disabled={reaction.isLoading}
          disableOpenVotedUserList={isAnonymousReaction}
        />
      );
    }

    return (
      <LargeUpDown
        threadId={threadId}
        channelId={channelId}
        status={reaction.status}
        upCount={reaction.upVoteScore}
        downCount={reaction.downVoteScore}
        disabled={reaction.isLoading}
        handler={reaction.handler}
        disableOpenVotedUserList={isAnonymousReaction}
      />
    );
  }, [
    channelId,
    isAnonymousReaction,
    reaction.downVoteScore,
    reaction.handler,
    reaction.isLoading,
    reaction.status,
    reaction.type,
    reaction.upVoteScore,
    threadId,
  ]);

  return (
    <Wrapper>
      {visibleReactionArea && (
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.ALERT}
          hasPermission={votePermission}
          isLoading={isLoading}
          groupId={post.groupId}
        >
          {reactionElement}
        </PermissionChecker>
      )}
      {visibleCommentArea && (
        <CommentCount count={commentCount} onClick={onCommentClick} />
      )}
    </Wrapper>
  );
}
