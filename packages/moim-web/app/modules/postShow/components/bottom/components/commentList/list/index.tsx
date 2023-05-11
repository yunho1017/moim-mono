import * as React from "react";

import InfiniteScroller from "common/components/infiniteScroller";
import { DefaultLoader as Loader } from "common/components/loading";

import CommentItem from "../commentItem";
import { LoaderWrapper } from "./styled";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

// actions
import { getCommentList } from "app/actions/forum";
import { selectCommentList } from "app/selectors/forum";

import { PostShowContext } from "app/modules/postShow/context";
import { IAppState } from "app/rootReducer";

interface IProps {
  sortingOptions?: Moim.Forum.IForumSortingOption;
}

export default function ListComponent({ sortingOptions }: IProps) {
  const cancelToken = useCancelToken();
  const { post } = React.useContext(PostShowContext);
  const rootId = post.parent_id;
  const threadId = post.id;

  const commentList = useStoreState(
    (state: IAppState) => selectCommentList(state, threadId)?.data,
  );
  const { commentListPaging, isLoading } = useStoreState(state => ({
    commentListPaging: state.thread.threadIds[post.id]?.paging,
    isLoading: state.forumCommentListPage.isLoading,
  }));

  const { dispatchGetCommentList } = useActions({
    dispatchGetCommentList: getCommentList,
  });
  const handleLoadMoreCommentList = React.useCallback(
    (pagingKey: keyof Moim.IPaging) => {
      dispatchGetCommentList(
        {
          [pagingKey]: commentListPaging?.[pagingKey],
          channelId: rootId,
          threadId,
          inclusive: false,
          sort: sortingOptions?.sort ?? "createdAt",
          order: sortingOptions?.order ?? "ASC",
        },
        cancelToken.current.token,
        pagingKey,
      );
    },
    [
      dispatchGetCommentList,
      commentListPaging,
      rootId,
      threadId,
      sortingOptions?.sort,
      sortingOptions?.order,
      cancelToken,
    ],
  );

  return commentList ? (
    <InfiniteScroller
      loadMore={handleLoadMoreCommentList}
      isLoading={isLoading}
      loader={<Loader />}
      paging={commentListPaging}
      itemLength={commentList.length}
    >
      {commentList.map((comment: Moim.Forum.IDenormalizedThread) => (
        <CommentItem key={`comment_${comment.id}`} commentId={comment.id} />
      ))}
    </InfiniteScroller>
  ) : (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
}
