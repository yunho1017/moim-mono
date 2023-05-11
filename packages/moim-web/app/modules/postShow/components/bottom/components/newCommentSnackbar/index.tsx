import * as React from "react";
import { FormattedMessage } from "react-intl";
import Snackbar from "common/components/snackbar";
import {
  newCommentSnackbarStyles,
  UnreadSnackBarContent,
  BottomUnreadIcon,
  TopUnreadIcon,
} from "./styled";

import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";

import { MoimURL } from "common/helpers/url";
import { closeNewItemSnackbar } from "app/actions/forum";
import { TransitionDirection } from "common/components/snackbar/types";

interface INewCommentSnackbar {
  forumId: Moim.Id;
  threadId: Moim.Id;
  threadType: Moim.Forum.THREAD_TYPE;
  direction: TransitionDirection;
}

const NewCommentSnackbar: React.FC<INewCommentSnackbar> = ({
  direction,
  forumId,
  threadId,
}) => {
  const redirect = useRedirect();
  const { isOpen, focusedId, openedDirection } = useStoreState(state => ({
    isOpen: state.forumData.newCommentSnackbar.open,
    focusedId: state.forumData.newCommentSnackbar.newCommentId,
    openedDirection: state.forumData.newCommentSnackbar.direction,
  }));
  const { dispatchCloseNewItemSnackbar } = useActions({
    dispatchCloseNewItemSnackbar: closeNewItemSnackbar,
  });

  const snackbarIcon = React.useMemo(
    () => (direction === "top" ? <TopUnreadIcon /> : <BottomUnreadIcon />),
    [direction],
  );
  const handleClick = React.useCallback(() => {
    if (focusedId) {
      redirect(
        new MoimURL.FocusedShowForumThread({
          forumId,
          threadId,
          focusedId,
        }).toString(),
      );
    }
    dispatchCloseNewItemSnackbar("comment");
  }, [dispatchCloseNewItemSnackbar, focusedId, forumId, redirect, threadId]);

  if (openedDirection !== direction) {
    return null;
  }
  return (
    <Snackbar
      styles={newCommentSnackbarStyles}
      transitionDirection={direction}
      isOpen={isOpen}
      content={
        <>
          {snackbarIcon}
          <UnreadSnackBarContent>
            <FormattedMessage id="post_show/comment_new_comments" />
          </UnreadSnackBarContent>
        </>
      }
      onClickSnackbar={handleClick}
    />
  );
};

export default NewCommentSnackbar;
