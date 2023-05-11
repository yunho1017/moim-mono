import * as React from "react";
import { FormattedMessage } from "react-intl";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import { BlockitFeedback } from "common/components/blockitEditorBase/components/blockitRenderer/components/feedback";
import ScrollToTop from "common/components/scrollToTop";
import { Spacer } from "common/components/designSystem/spacer";
import { NFTItemCell } from "common/components/NFTItemCell";
import Skeleton from "common/components/NFTItemCell/skeleton";
// style
import {
  RootWrapper,
  Title,
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
  items?: Moim.NFT.INftDetail[];
  paging: Moim.IPaging;
  type?: Moim.NFT.NFTScheduleViewType;
  onLoadMore(pagingKey?: keyof Moim.IPaging): void;
}

const NftScheduleItemList: React.FC<IProps> = ({
  groupId,
  hubGroupId,
  isLoading,
  isFetched,
  items,
  paging,
  type = "SELECTIVE",
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = items?.some(item => item?.id === undefined);
    if (items === undefined || isLoading || isUndefinedArray) {
      return new Array(4).fill(0).map(_ => <Skeleton />);
    }

    return items.map(item => {
      if (item) {
        return (
          <NFTItemCell
            key={item.id}
            item={item}
            groupId={groupId}
            hubGroupId={hubGroupId}
            config={{
              textAlignment: "LEFT",
              showCollectionName: true,
              showName: true,
              showOwner: true,
              showPrice: true,
              showMintButton: type === "SELECTIVE",
              showPeriod: false,
            }}
          />
        );
      }
    });
  }, [groupId, hubGroupId, isLoading, items, type]);

  return (
    <>
      <RootWrapper>
        <InnerContentWrapper>
          <Body>
            <Title>
              <FormattedMessage
                id={
                  type === "SELECTIVE"
                    ? "nft_collection_sale_schedule_show_selective_item_list_title"
                    : "nft_collection_sale_schedule_show_generative_item_list_title"
                }
              />
            </Title>
            <Spacer value={16} />
            {isFetched && items?.length === 0 ? (
              <BlockitFeedback.Empty textKey="nft_collection_sale_schedule_show_item_list_empty" />
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
                  <InnerWrapper columnCount={isMobile ? 2 : 4}>
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
      </RootWrapper>
      {isMobile && type === "GENERATIVE" && <Spacer value={68} />}
    </>
  );
};

export default NftScheduleItemList;
