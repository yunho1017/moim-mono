import * as React from "react";
import { InView } from "react-intersection-observer";
import Component from "./component";
import { useRouteMatch } from "react-router";
import {
  closeNewItemSnackbar,
  ActionCreators as ForumActionCreators,
} from "app/actions/forum";
import { ActionCreators as ForumCommentActionCreators } from "../action";
import { PostShowContext } from "app/modules/postShow/context";
import { useActions, useStoreState } from "app/store";
import useHover from "common/hooks/useHover";

const WithInViewController = React.memo(
  ({ comment }: { comment: Moim.Forum.IThread }) => {
    const match = useRouteMatch<Moim.IMatchParams>();
    const focusedId = match.params.focusedId;
    const { containerRef, showConfig } = React.useContext(PostShowContext);
    const [hoverRef, isHover] = useHover<HTMLDivElement>();
    const [forumShowPositionTop, setForumShowPositionTop] = React.useState<
      number | undefined
    >(undefined);

    const newCommentId = useStoreState(
      state =>
        state.forumData.newCommentSnackbar.newCommentId ??
        state.forumData.postedCommentIds[state.forumData.currentThreadId][0],
    );

    const {
      closeNewCommentSnackbar,
      resetHasNewComment,
      setCommentSnackbarDirection,
    } = useActions({
      closeNewCommentSnackbar: closeNewItemSnackbar,
      resetHasNewComment: ForumCommentActionCreators.resetJustAdded,
      setCommentSnackbarDirection:
        ForumActionCreators.setNewItemSnackbarDirection,
    });

    const autoFocus = comment?.id === newCommentId;

    const handleViewChange = React.useCallback(
      (inView: boolean) => {
        if (inView && autoFocus) {
          resetHasNewComment?.();
        }

        if (comment.id === newCommentId) {
          if (inView) {
            closeNewCommentSnackbar("comment");
          } else {
            if (hoverRef?.current) {
              if (
                hoverRef.current.getBoundingClientRect().y <
                (forumShowPositionTop || 0)
              ) {
                setCommentSnackbarDirection({
                  type: "comment",
                  direction: "top",
                });
              } else {
                setCommentSnackbarDirection({
                  type: "comment",
                  direction: "bottom",
                });
              }
            }
          }
        }
      },
      [
        autoFocus,
        comment.id,
        hoverRef,
        newCommentId,
        forumShowPositionTop,
        closeNewCommentSnackbar,
        resetHasNewComment,
        setCommentSnackbarDirection,
      ],
    );

    React.useLayoutEffect(() => {
      if (autoFocus) {
        hoverRef.current?.scrollIntoView({ block: "center" });
      }
    }, [autoFocus]);

    React.useLayoutEffect(() => {
      if (focusedId === comment.id) {
        hoverRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }, [comment.id, focusedId]);

    React.useLayoutEffect(() => {
      setForumShowPositionTop(containerRef?.current?.getBoundingClientRect().y);
    }, [containerRef]);

    return (
      <InView onChange={handleViewChange} triggerOnce={true}>
        <Component
          ref={hoverRef}
          comment={comment}
          focusedId={focusedId}
          isHover={isHover}
          showCommentReaction={showConfig.show_comment_reaction}
          commentReactionType={showConfig.comment_reaction_type}
        />
      </InView>
    );
  },
);

interface IProps {
  commentId: string;
}

const CommentItem = React.memo(({ commentId }: IProps) => {
  const comment = useStoreState(state => state.entities.threads[commentId]);

  if (!comment || comment.deleted) {
    return null;
  }

  return <WithInViewController comment={comment} />;
});

export default React.memo(CommentItem);
