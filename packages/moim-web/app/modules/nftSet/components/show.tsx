import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageUpdater from "common/components/pageUpdater";
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import ScrollToTop from "common/components/scrollToTop";
import { Spacer } from "common/components/designSystem/spacer";
import { BlockitFeedback } from "common/components/blockitEditorBase/components/blockitRenderer/components/feedback";
import { NFTItemCell } from "common/components/NFTItemCell";
// style
import {
  RootWrapper,
  InnerStyle,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  InnerWrapper,
} from "./styled";

interface IProps {
  resourceId: Moim.Id;
  groupId?: Moim.Id;
  hubGroupId?: Moim.Id;
  isLoading: boolean;
  isFetched: boolean;
  title: string;
  items?: Moim.NFT.INftDetail[];
  paging: Moim.IPaging;
  listShowConfig?: Moim.NFT.INftItemShowConfig;
  columnCountWeb: number;
  columnCount: number;
  onLoadMore(pagingKey?: keyof Moim.IPaging): void;
}

const NftSetShowComponents: React.FC<IProps> = ({
  resourceId,
  groupId,
  hubGroupId,
  isLoading,
  isFetched,
  title,
  items,
  paging,
  listShowConfig,
  columnCountWeb,
  columnCount,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);

  const itemElements = React.useMemo(() => {
    if (!items) return null;
    return items.map(item => {
      if (item) {
        return (
          <NFTItemCell
            item={item}
            groupId={groupId}
            hubGroupId={hubGroupId}
            config={listShowConfig}
          />
        );
      }
    });
  }, [groupId, hubGroupId, items, listShowConfig]);

  return (
    <>
      <PageUpdater title={title} />
      <RootWrapper>
        <ScrollPositionSaveList id={resourceId} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <Body>
              {isFetched && items?.length === 0 ? (
                <BlockitFeedback.Empty textKey="content_group_show_empty" />
              ) : (
                <>
                  <InfiniteScroller
                    ref={refScroll}
                    isLoading={isLoading}
                    itemLength={items?.length ?? 0}
                    threshold={700}
                    paging={paging}
                    loader={
                      <LoadWrapper>
                        <Loading />
                      </LoadWrapper>
                    }
                    loadMore={onLoadMore}
                  >
                    <InnerWrapper
                      columnCount={isMobile ? columnCount : columnCountWeb}
                    >
                      {itemElements}
                    </InnerWrapper>
                    <Spacer value={40} />
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

export default NftSetShowComponents;
