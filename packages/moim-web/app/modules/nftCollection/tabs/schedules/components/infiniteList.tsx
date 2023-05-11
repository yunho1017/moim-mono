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
import ScheduleItem from "app/modules/nftCollection/components/scheduleList/components/item";
import { ScheduleItemSkeleton } from "app/modules/nftCollection/components/scheduleList/components/skeleton";
import ScrollToTop from "common/components/scrollToTop";
import { Spacer } from "common/components/designSystem/spacer";
import { TabEmptyCase } from "../..";
// style
import {
  RootWrapper,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  InnerWrapper,
} from "./styled";

interface IProps {
  resourceId: Moim.Id;
  isLoading: boolean | null | undefined;
  isFetched: boolean;
  paging: Moim.IPaging;
  items?: Moim.NFT.ISchedule[];
  onLoadMore(pagingKey?: keyof Moim.IPaging): void;
}

const NftSchedulesInfiniteList: React.FC<IProps> = ({
  isLoading,
  isFetched,
  items,
  paging,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = items?.some(
      schedule => schedule?.id === undefined,
    );
    if (items === undefined || isLoading || isUndefinedArray) {
      return new Array(isMobile ? 2 : 3)
        .fill(0)
        .map(_ => <ScheduleItemSkeleton />);
    }
    return items.map(item => {
      if (item) {
        return <ScheduleItem key={`schedule_${item.id}`} schedule={item} />;
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
              <InnerWrapper>{itemElements}</InnerWrapper>
              <Spacer value={40} />
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

export default NftSchedulesInfiniteList;
