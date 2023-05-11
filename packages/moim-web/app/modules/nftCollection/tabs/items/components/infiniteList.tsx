import * as React from "react";
import { Redirect } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import { Spacer } from "common/components/designSystem/spacer";
import { TabEmptyCase } from "../..";
import ScrollToTop from "common/components/scrollToTop";
import { NFTItemCell } from "common/components/NFTItemCell";
import Skeleton from "common/components/NFTItemCell/skeleton";
// style
import {
  RootWrapper,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  InnerWrapper,
} from "./styled";

const DESKTOP_COLUMN_COUNT = 4;
const MOBILE_COLUMN_COUNT = 2;
const NFT_ITEM_CONFIG = {
  showCollectionName: true,
  showName: true,
  showOwner: true,
  showPrice: true,
  showMintButton: false,
  showPeriod: false,
};

interface IProps {
  resourceId: Moim.Id;
  isLoading: boolean | null | undefined;
  isFetched: boolean;
  items?: Moim.NFT.INftDetail[];
  paging: Moim.IPaging;
  onLoadMore(pagingKey?: keyof Moim.IPaging): void;
}

const NftItemsInfiniteList: React.FC<IProps> = ({
  isLoading,
  isFetched,
  items,
  paging,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = items?.some(item => item?.id === undefined);
    if (items === undefined || isLoading || isUndefinedArray) {
      return new Array(isMobile ? 2 : 4).fill(0).map(_ => <Skeleton />);
    }
    return items.map(item => {
      if (item) {
        return (
          <NFTItemCell
            item={item}
            config={NFT_ITEM_CONFIG}
            disableClickCollectionName={true}
          />
        );
      }
    });
  }, [isLoading, isMobile, items]);

  if (isFetched && items?.length === 0) {
    return <TabEmptyCase />;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <>
      <RootWrapper>
        <InnerContentWrapper>
          <Body>
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
              {isMobile && <Spacer value={16} />}
              <InnerWrapper
                columnCount={
                  isMobile ? MOBILE_COLUMN_COUNT : DESKTOP_COLUMN_COUNT
                }
              >
                {itemElements}
              </InnerWrapper>
              <Spacer value={isMobile ? 74 : 40} />
            </InfiniteScroller>
            <ScrollToTop
              useWindowScroll={isMobile}
              scrollingTarget={refScroll.current?.getScrollingElement()}
              disappearOffset={0}
            />
          </Body>
        </InnerContentWrapper>
      </RootWrapper>
    </>
  );
};

export default NftItemsInfiniteList;
