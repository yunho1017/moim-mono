// vendor
import * as React from "react";
// component
import { Loader, Wrapper } from "./styledComponents";
import InfiniteScroller from "common/components/infiniteScroller/new";
import PostList from "common/components/postListView";
import PostItem from "./postItem";

import { useStoreState } from "app/store";
import { pinnedPostListSelector } from "app/selectors/forum";
import useIsMobile from "common/hooks/useIsMobile";

export interface IProps {
  isLoading: boolean;
  selectedThreadId: Moim.Id;
  threadListConfig?: Moim.Forum.IForumListConfig;
  paging: Moim.IPaging;
  threadList?: Moim.Forum.IThread[];
  onLoadMoreThread(pagingKey: keyof Moim.IPaging): void;
}

function ThreadList(props: IProps) {
  const {
    threadList,
    threadListConfig,
    selectedThreadId,
    isLoading,
    paging,
    onLoadMoreThread,
  } = props;
  const isMobile = useIsMobile();
  const pinnedPostList = useStoreState(state =>
    pinnedPostListSelector(state, state.forumData.currentForumId),
  );

  const column = React.useMemo(
    () =>
      (isMobile
        ? threadListConfig?.mobile_column_count
        : threadListConfig?.column_count) ?? 1,
    [
      isMobile,
      threadListConfig?.column_count,
      threadListConfig?.mobile_column_count,
    ],
  );

  const pinnedPostListElement = React.useMemo(() => {
    const visiblePinnedPostList = Boolean(threadList) && !paging?.before;

    if (visiblePinnedPostList) {
      return pinnedPostList.map(thread => (
        <PostItem
          key={`pinned_${thread.id}`}
          thread={thread}
          selected={selectedThreadId === thread.id}
          pinned={true}
          config={threadListConfig}
          disableAnonymousSuffix={true}
        />
      ));
    }
    return null;
  }, [
    paging?.before,
    pinnedPostList,
    threadListConfig,
    selectedThreadId,
    threadList,
  ]);

  const threadListElement = React.useMemo(() => {
    return (
      <PostList column={column}>
        {pinnedPostListElement}
        {(threadList ?? []).map(thread => (
          <PostItem
            key={thread.id}
            thread={thread}
            selected={selectedThreadId === thread.id}
            config={threadListConfig}
            disableAnonymousSuffix={true}
          />
        ))}
      </PostList>
    );
  }, [
    pinnedPostListElement,
    selectedThreadId,
    threadList,
    column,
    threadListConfig,
  ]);

  if (!threadList) {
    return <Loader />;
  }

  return (
    <InfiniteScroller
      loadMore={onLoadMoreThread}
      isLoading={isLoading}
      loader={<Loader />}
      paging={paging}
      itemLength={threadList.length}
    >
      <Wrapper>{threadListElement}</Wrapper>
    </InfiniteScroller>
  );
}

export default ThreadList;
