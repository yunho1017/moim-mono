import { useCallback } from "react";
import { useIntl } from "react-intl";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import {
  ActionCreators as ForumActionCreators,
  arrangePinnedPostList,
  getPinnedPostList,
} from "app/actions/forum";
import { pinnedPostListSelector } from "app/selectors/forum";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import { PinnedItemType } from "..";

export default function usePinnedPostProps(channelId?: Moim.Id) {
  const intl = useIntl();
  const cancelToken = useCancelToken();

  const states = useStoreState(state => {
    const currentChannelId = channelId ?? state.forumData.currentForumId;

    return {
      currentChannelId,
      open: state.forumListPage.editPinnedPostListDialogOpen,
      isLoadingArrangePinnedPostList:
        state.forumListPage.isLoadingArrangePinnedPostList[currentChannelId],
      isLoadingGetPinnedPostList:
        state.forumListPage.isLoadingGetPinnedPostList[currentChannelId],
      pinnedPostList: pinnedPostListSelector(
        state,
        state.forumData.currentForumId,
      ),
    };
  });

  const {
    dispatchGetPinnedPostList,
    dispatchArrangePinnedPostList,
    handleOpen,
    onClose,
    dispatchOpenSnackbar,
  } = useActions({
    dispatchGetPinnedPostList: getPinnedPostList,
    dispatchArrangePinnedPostList: arrangePinnedPostList,
    handleOpen: ForumActionCreators.openEditPinnedPostListDialog,
    onClose: ForumActionCreators.closeEditPinnedPostListDialog,
    dispatchOpenSnackbar: SnackbarActionCreators.openSnackbar,
  });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleArrange = useCallback(
    async (items: PinnedItemType[]) => {
      const data = await dispatchArrangePinnedPostList(
        {
          channelId: states.currentChannelId,
          pinIds: items.map(item => item.id),
        },
        cancelToken.current.token,
      );
      if (data?.success) {
        dispatchOpenSnackbar({
          text: intl.formatMessage({ id: "save_success_toast_message" }),
        });
      } else {
        dispatchOpenSnackbar({
          text: intl.formatMessage({ id: "save_failure_toast_message" }),
        });
      }
    },
    [
      cancelToken,
      dispatchArrangePinnedPostList,
      dispatchOpenSnackbar,
      intl,
      states.currentChannelId,
    ],
  );

  const handleGetPinnedPostList = useCallback(async () => {
    dispatchGetPinnedPostList(
      {
        channelId: states.currentChannelId,
      },
      cancelToken.current.token,
    );
  }, [cancelToken, dispatchGetPinnedPostList, states.currentChannelId]);

  return {
    ...states,
    handleOpen,
    handleClose,
    handleArrange,
    handleGetPinnedPostList,
  };
}
