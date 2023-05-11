import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageUpdater from "common/components/pageUpdater";
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import PostItem from "common/components/blockitEditorBase/components/blockitRenderer/components/contentsGroup/components/postCell";
import ScrollToTop from "common/components/scrollToTop";
import { Spacer } from "common/components/designSystem/spacer";
import { BlockitFeedback } from "common/components/blockitEditorBase/components/blockitRenderer/components/feedback";
import {
  RootWrapper,
  InnerStyle,
  Header,
  Title,
  Description,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  InnerWrapper,
} from "./styled";

interface IProps {
  resourceId: Moim.Id;
  isLoading: boolean;
  isFetched: boolean;
  title: string;
  description?: string;
  threads: Moim.Forum.IThread[];
  paging: Moim.IPaging;
  listShowConfig: Moim.Blockit.IPostListShowConfig;
  onLoadMore(): void;
}

const ContentsGroupThreadsComponents: React.FC<IProps> = ({
  resourceId,
  isFetched,
  isLoading,
  title,
  description,
  threads,
  paging,
  listShowConfig,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);

  const showConfig = React.useMemo(() => {
    const column =
      (isMobile || !listShowConfig.columnCount
        ? listShowConfig.mobileColumnCount
        : listShowConfig.columnCount) ?? 1;
    const showEngage = Boolean(
      listShowConfig.showReaction ||
        listShowConfig.showCommentCount ||
        listShowConfig.showAuthor ||
        listShowConfig.showDate,
    );

    return {
      column,
      showEngage,
    };
  }, [isMobile, listShowConfig]);

  const itemElements = React.useMemo(() => {
    return threads.map(thread => (
      <PostItem
        key={`contents_group_${thread.id}`}
        thread={thread}
        config={listShowConfig}
      />
    ));
  }, [threads, listShowConfig]);

  return (
    <>
      <PageUpdater title={title} />
      <RootWrapper>
        <ScrollPositionSaveList id={resourceId} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <Header>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Header>
            <Body>
              {isFetched && threads.length === 0 ? (
                <BlockitFeedback.Empty textKey="content_group_show_empty" />
              ) : (
                <>
                  <InfiniteScroller
                    ref={refScroll}
                    isLoading={isLoading}
                    itemLength={threads.length}
                    threshold={700}
                    paging={paging}
                    loader={
                      <LoadWrapper>
                        <Loading />
                      </LoadWrapper>
                    }
                    loadMore={onLoadMore}
                  >
                    <InnerWrapper columnCount={showConfig.column}>
                      {itemElements}
                      <Spacer value={40} />
                    </InnerWrapper>
                  </InfiniteScroller>
                  <ScrollToTop
                    useWindowScroll={isMobile}
                    scrollingTarget={refScroll.current?.getScrollingElement()}
                    disappearOffset={0}
                  />
                </>
              )}
            </Body>
          </InnerContentWrapper>
        </ScrollPositionSaveList>
      </RootWrapper>
    </>
  );
};

export default ContentsGroupThreadsComponents;
