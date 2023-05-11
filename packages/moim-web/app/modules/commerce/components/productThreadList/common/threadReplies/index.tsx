import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DefaultLoader } from "common/components/loading";
import { ShowMoreThreads, ArrowDownIcon } from "../styled";

import { useActions, useStoreState } from "app/store";
import { getCommentList, ActionCreators } from "app/actions/forum";

import { getCommentListWithOne } from "./action";
import { threadReplies } from "app/selectors/forum";
import useCancelToken from "common/hooks/useCancelToken";

import ProductThreadListContext from "../../context";

interface IProps {
  threadId: string;
  threadType: Moim.Forum.THREAD_TYPE;
  totalCount: number;
  showMoreTextKey: {
    before: string;
    after: string;
    unfolded: string;
  };
  onClickMoreButton(): void;
  renderReply(reply: Moim.Forum.IDenormalizedThread): React.ReactNode;
}

export interface IRefHandler {
  open(): void;
  close(): void;
}

const ThreadReplies = React.forwardRef<IRefHandler, IProps>(
  (
    {
      threadType,
      totalCount,
      threadId,
      showMoreTextKey,
      onClickMoreButton,
      renderReply,
    },
    ref,
  ) => {
    const cancelToken = useCancelToken();
    const { highlight, productId, sellerId } = React.useContext(
      ProductThreadListContext,
    );
    const isHighlightedThread = highlight.threadId === threadId;
    const [loadingStatus, setLoadingStatus] = React.useState<{
      after?: boolean;
      before?: boolean;
    }>({});
    const [userRequiredOpen, setOpen] = React.useState(
      Boolean(isHighlightedThread && highlight.replyId),
    );
    const { replies } = useStoreState(state => ({
      replies: threadReplies(state, threadId) ?? { data: [], paging: {} },
    }));
    const {
      dispatchGetReplies,
      dispatchClearCommentList,
      dispatchGetCommentListWithOne,
    } = useActions({
      dispatchGetReplies: getCommentList,
      dispatchClearCommentList: ActionCreators.clearCommentList,
      dispatchGetCommentListWithOne: getCommentListWithOne,
    });

    const handleOpen = React.useCallback(() => {
      setOpen(true);
      onClickMoreButton();
    }, [onClickMoreButton]);

    const handleGetCommentListWithOne = React.useCallback(async () => {
      onClickMoreButton();
      if (highlight.replyId && sellerId) {
        if (replies.data.length !== 0) {
          await dispatchClearCommentList({ threadId });
        }
        setLoadingStatus({ after: true });
        await dispatchGetCommentListWithOne(
          threadId,
          highlight.replyId,
          cancelToken.current.token,
        );
        setLoadingStatus({ after: false });
      }
    }, [
      onClickMoreButton,
      threadType,
      replies.data.length,
      threadId,
      highlight.replyId,
      sellerId,
    ]);

    const handleLoadMore = React.useCallback(
      async (direction: "before" | "after") => {
        onClickMoreButton();
        if (sellerId) {
          setLoadingStatus({ [direction]: true });
          await dispatchGetReplies(
            {
              type: threadType,
              channelId: sellerId,
              threadId,
              order: "ASC",
              sort: "createdAt",
              limit: 5,
              [direction]: replies.paging[direction],
            },
            cancelToken.current.token,
            direction,
          );
          setLoadingStatus({ [direction]: false });
        }
      },
      [onClickMoreButton, threadType, replies, threadId, sellerId],
    );

    const handleLoadMoreBefore = React.useCallback(() => {
      if (!loadingStatus.before) {
        handleLoadMore("before");
      }
    }, [loadingStatus.before, handleLoadMore]);

    const handleLoadMoreAfter = React.useCallback(() => {
      if (!loadingStatus.after) {
        handleLoadMore("after");
      }
    }, [loadingStatus.after, handleLoadMore]);

    const elements = React.useMemo(
      () => replies.data.map(item => renderReply(item)),
      [replies.data, productId, sellerId],
    );

    React.useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: () => {
        setOpen(false);
      },
    }));

    React.useEffect(() => {
      if (userRequiredOpen) {
        if (isHighlightedThread && highlight.replyId) {
          handleGetCommentListWithOne();
        } else if (replies.data.length === 0) {
          handleLoadMoreAfter();
        }
      }
    }, [userRequiredOpen]);

    if (totalCount === 0) return null;

    if (!userRequiredOpen) {
      return (
        <div>
          <ShowMoreThreads role="button" onClick={handleOpen}>
            <span>
              <FormattedMessage
                id={showMoreTextKey.unfolded}
                values={{
                  left_count: totalCount,
                }}
              />
            </span>
            <ArrowDownIcon />
          </ShowMoreThreads>
        </div>
      );
    }

    return (
      <>
        {replies.paging.before && !loadingStatus.before && (
          <ShowMoreThreads role="button" onClick={handleLoadMoreBefore}>
            <span>
              <FormattedMessage id={showMoreTextKey.before} />
            </span>
          </ShowMoreThreads>
        )}
        {loadingStatus.before && <DefaultLoader />}

        {elements}
        {loadingStatus.after && <DefaultLoader />}
        {replies.paging.after && !loadingStatus.after && (
          <ShowMoreThreads role="button" onClick={handleLoadMoreAfter}>
            <span>
              <FormattedMessage id={showMoreTextKey.after} />
            </span>
          </ShowMoreThreads>
        )}
      </>
    );
  },
);

export default ThreadReplies;
