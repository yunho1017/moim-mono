import * as React from "react";
// hooks
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
// actions
import {
  getThreadVotes,
  getReplyVotes,
  ActionCreators,
} from "app/actions/forum";
// selector
import {
  threadVotesSelector,
  getThreadVotesLoadingSelector,
} from "app/selectors/forum";
// interface
import { IAppState } from "app/rootReducer";
// enums
import { VoteStatus } from "app/enums";

export default function() {
  const {
    open,
    likedVotes,
    dislikedVotes,
    isLoading,
    threadId,
    channelId,
    replyId,
    defaultTab,
    useTab = false,
    ...restState
  } = useStoreState((store: IAppState) => ({
    likedVotes: threadVotesSelector(
      store,
      store.forumData.votedUserListDialog.replyId ||
        store.forumData.votedUserListDialog.threadId,
      VoteStatus.POSITIVE,
    ),
    dislikedVotes: threadVotesSelector(
      store,
      store.forumData.votedUserListDialog.replyId ||
        store.forumData.votedUserListDialog.threadId,
      VoteStatus.NEGATIVE,
    ),
    isLoading: getThreadVotesLoadingSelector(
      store,
      store.forumData.votedUserListDialog.replyId ||
        store.forumData.votedUserListDialog.threadId,
    ),
    open: store.forumData.votedUserListDialog.open,
    channelId:
      store.forumData.votedUserListDialog.channelId ??
      store.forumData.currentForumId,
    threadId: store.forumData.votedUserListDialog.threadId,
    replyId: store.forumData.votedUserListDialog.replyId,
    defaultTab: store.forumData.votedUserListDialog.defaultTab,
    useTab: store.forumData.votedUserListDialog.useTab,
  }));
  const {
    dispatchGetThreadVotes,
    dispatchGetReplyVotes,
    dispatchCloseDialog,
  } = useActions({
    dispatchGetThreadVotes: getThreadVotes,
    dispatchGetReplyVotes: getReplyVotes,
    dispatchCloseDialog: ActionCreators.closeVotedUserListDialog,
  });
  const [activeTab, setActiveTab] = React.useState<
    Moim.Forum.VotedUserListDialogTabType
  >("like");
  const cancelToken = useCancelToken();

  const handleGetVotes = React.useCallback(
    (type: Moim.Enums.VoteStatus, paging?: Moim.IPaging) => {
      if (replyId) {
        dispatchGetReplyVotes(
          {
            ...paging,
            channelId,
            threadId,
            replyId,
            type,
          },
          cancelToken.current.token,
        );
      } else {
        dispatchGetThreadVotes(
          {
            ...paging,
            channelId,
            threadId,
            type,
          },
          cancelToken.current.token,
        );
      }
    },
    [
      replyId,
      channelId,
      threadId,
      cancelToken,
      dispatchGetReplyVotes,
      dispatchGetThreadVotes,
    ],
  );
  const handleLoadMoreLikeVotes = React.useCallback(() => {
    handleGetVotes(VoteStatus.POSITIVE, likedVotes.paging);
  }, [handleGetVotes, likedVotes.paging]);
  const handleLoadMoreDislikeVotes = React.useCallback(() => {
    handleGetVotes(VoteStatus.NEGATIVE, dislikedVotes.paging);
  }, [handleGetVotes, dislikedVotes.paging]);
  const handleClose = React.useCallback(() => {
    dispatchCloseDialog(threadId);
  }, [dispatchCloseDialog, threadId]);
  const handleContentWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (open && Boolean(threadId) && Boolean(channelId)) {
      handleGetVotes(VoteStatus.POSITIVE);
      handleGetVotes(VoteStatus.NEGATIVE);
    }
  }, [open]);

  React.useEffect(() => {
    if (defaultTab && open) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, open]);
  return {
    ...restState,
    open,
    useTab,
    activeTab,
    setActiveTab,
    isLoading,
    likedVotes,
    dislikedVotes,
    handleClose,
    handleContentWrapperClick,
    handleLoadMoreLikeVotes,
    handleLoadMoreDislikeVotes,
  };
}
