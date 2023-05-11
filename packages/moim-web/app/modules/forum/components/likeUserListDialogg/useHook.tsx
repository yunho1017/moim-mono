import * as React from "react";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useNavigationModalClose from "common/hooks/useNavigationModalClose";
// actions
import { getThreadVotes } from "app/actions/forum";
// selector
import {
  threadVotesSelector,
  getThreadVotesLoadingSelector,
} from "app/selectors/forum";
// interface
import { IAppState } from "app/rootReducer";
import { IProps } from "./";
// enums
import { VoteStatus } from "app/enums";

export default function(props: IProps) {
  const { likedVotes, isLoading } = useStoreState((store: IAppState) => ({
    likedVotes: threadVotesSelector(store, props.threadId, VoteStatus.POSITIVE),
    isLoading: getThreadVotesLoadingSelector(store, props.threadId),
  }));
  const { dispatchGetThreadVotes } = useActions({
    dispatchGetThreadVotes: getThreadVotes,
  });
  const cancelToken = useCancelToken();
  const handleModalClose = useNavigationModalClose();

  const handleGetThreadVotes = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetThreadVotes(
        {
          ...paging,
          channelId: props.channelId,
          threadId: props.threadId,
          type: VoteStatus.POSITIVE,
        },
        cancelToken.current.token,
      );
    },
    [cancelToken, dispatchGetThreadVotes, props.channelId, props.threadId],
  );
  const handleLoadMoreLikeVotes = React.useCallback(() => {
    handleGetThreadVotes(likedVotes.paging);
  }, [handleGetThreadVotes, likedVotes.paging]);

  React.useEffect(() => {
    handleGetThreadVotes();
  }, [handleGetThreadVotes]);

  return {
    isLoading,
    likedVotes,
    handleLoadMoreLikeVotes,
    handleModalClose,
  };
}
