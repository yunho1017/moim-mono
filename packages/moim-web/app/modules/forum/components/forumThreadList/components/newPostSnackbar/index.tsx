import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  newPostSnackbarStyles,
  UnreadSnackBarContent,
  NewPostIcon,
} from "./styled";

import { useActions, useStoreState } from "app/store";

import { closeNewItemSnackbar } from "app/actions/forum";
import Snackbar from "common/components/snackbar";

const NewPostSnackbar: React.FC = () => {
  const { isOpen } = useStoreState(state => ({
    isOpen: state.forumData.newPostSnackbar.open,
  }));
  const { dispatchCloseNewItemSnackbar } = useActions({
    dispatchCloseNewItemSnackbar: closeNewItemSnackbar,
  });

  const handleClick = React.useCallback(() => {
    dispatchCloseNewItemSnackbar("post");
  }, [dispatchCloseNewItemSnackbar]);

  return (
    <Snackbar
      styles={newPostSnackbarStyles}
      isOpen={isOpen}
      content={
        <>
          <UnreadSnackBarContent>
            <FormattedMessage id="post_list/list_new_posts" />
          </UnreadSnackBarContent>
          <NewPostIcon />
        </>
      }
      onClickSnackbar={handleClick}
      transitionDirection="top"
    />
  );
};

export default NewPostSnackbar;
