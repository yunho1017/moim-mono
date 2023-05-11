import * as React from "react";
// components
import { EngageWrapper } from "./styled";
import Right from "./components/right";
import Left from "./components/left";
import { PostShowContext } from "app/modules/postShow/context";
import { VoteStatus } from "app/enums";
import { useActions, useStoreState } from "app/store";
import { voteThread } from "app/actions/forum";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentUser from "common/hooks/useCurrentUser";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

const Engage: React.FC = () => {
  const { containerRef, post, showConfig } = React.useContext(PostShowContext);

  const currentUser = useCurrentUser();
  const cancelToken = useCancelToken();

  const { isLoadingToLike } = useStoreState(state => ({
    isLoadingToLike: state.forumData.isLoadingToLike,
  }));
  const { dispatchVoteThread } = useActions({
    dispatchVoteThread: voteThread,
  });

  const handleReactionForum = React.useCallback(
    (status: Moim.Enums.VoteStatus) => {
      if (currentUser && !isLoadingToLike) {
        dispatchVoteThread({
          channelId: post.parent_id,
          threadId: post.id,
          groupId: post.groupId,
          type: status,
          cancelToken: cancelToken.current.token,
        });

        if (status === null) {
          AnalyticsClass.getInstance().forumPostReactCancel({
            forumId: post.parent_id,
            postId: post.id,
            reactType: post.vote?.type ?? "upvote",
          });
        } else {
          AnalyticsClass.getInstance().forumPostReact({
            forumId: post.parent_id,
            postId: post.id,
            reactType: status,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      currentUser,
      isLoadingToLike,
      dispatchVoteThread,
      post.parent_id,
      post.id,
      post.groupId,
      cancelToken,
    ],
  );

  const reactionProps = React.useMemo(
    () => ({
      type: showConfig.reaction_type,
      status: post.vote?.type ?? VoteStatus.NONE,
      upVoteScore: post.up_vote_score,
      downVoteScore: post.down_vote_score,
      isLoading: isLoadingToLike,
      handler: handleReactionForum,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleReactionForum, isLoadingToLike],
  );

  const handleCommentClick = React.useCallback(() => {
    containerRef?.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [containerRef]);

  return (
    <EngageWrapper>
      <Left reaction={reactionProps} onCommentClick={handleCommentClick} />
      <Right />
    </EngageWrapper>
  );
};

export default Engage;
