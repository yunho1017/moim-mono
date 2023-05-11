import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageUpdater from "common/components/pageUpdater";
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import MoimCard from "common/components/moimCard";
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
  moims: Moim.ChildMoimGroup.IChildMoimGroupMoimDatum[];
  paging: Moim.IPaging;
  listShowConfig: Moim.Blockit.IPostListShowConfig;
  onLoadMore(): void;
  onJoinClick(moimUrl: string, moimId: string): void;
}

const ContentsGroupThreadsComponents: React.FC<IProps> = ({
  resourceId,
  isFetched,
  isLoading,
  title,
  description,
  moims,
  paging,
  listShowConfig,
  onLoadMore,
  onJoinClick,
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

  const itemElements = React.useMemo(
    () =>
      moims.map(moim => (
        <MoimCard
          key={moim.id}
          moimId={moim.id}
          url={moim.url}
          domain={moim.domain}
          banner={moim.banner}
          title={moim.name}
          isJoined={moim.joined}
          disableQuickJoin={true}
          memberCount={moim.users_count}
          profileImage={moim.icon}
          description={moim.description}
          tags={moim.tags}
          showNewBadge={moim.stat?.has_new_for_list}
          period={moim.period}
          status={moim.status}
          statusConfig={moim.status_config}
          onClickJoinButton={onJoinClick}
        />
      )),
    [moims, onJoinClick],
  );

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
              {isFetched && moims.length === 0 ? (
                <BlockitFeedback.Empty textKey="child_moim_group_show_empty" />
              ) : (
                <>
                  <InfiniteScroller
                    ref={refScroll}
                    isLoading={isLoading}
                    itemLength={moims.length}
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
