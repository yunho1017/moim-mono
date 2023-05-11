import * as React from "react";
import { PostShowContext } from "app/modules/postShow/context";
import { useStoreState } from "app/store";

export function useIsEmptyCommentList() {
  const { post } = React.useContext(PostShowContext);

  const { isLoading, commentList } = useStoreState(state => ({
    commentList: [
      ...(state.thread.threadIds[post.id]?.data ?? []),
      ...(state.forumData.postedCommentIds[post.id] ?? []),
    ],
    isLoading: state.forumCommentListPage.isLoading,
  }));

  return !isLoading && commentList && !commentList.length;
}
