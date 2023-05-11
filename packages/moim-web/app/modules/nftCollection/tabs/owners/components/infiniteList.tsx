import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import { TopBannerContext } from "common/components/topBanner/context";
import ScrollToTop from "common/components/scrollToTop";
import { Spacer } from "common/components/designSystem/spacer";
import User from "./components/user";
import { TabEmptyCase } from "../..";
import { UserSkeleton } from "./components/skeleton";
// style
import {
  RootWrapper,
  Body,
  InnerContentWrapper,
  LoadWrapper,
  Loading,
  InnerWrapper,
} from "./styled";
import { OwnersTitle } from "../styled";

import {
  NFTCollectionShowContext,
  NFT_COLLECTION_MAX_TOTAL,
} from "app/modules/nftCollection/context";

interface IProps {
  resourceId: Moim.Id;
  isLoading: boolean | null | undefined;
  isFetched: boolean;
  paging: Moim.IPaging;
  items?: Moim.NFT.IContractOwner[];
  onLoadMore(pagingKey?: keyof Moim.IPaging): void;
}

const NftOwnersInfiniteList: React.FC<IProps> = ({
  isLoading,
  isFetched,
  paging,
  items,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const refScroll = React.useRef<PureInfiniteScroller>(null);
  const { totalOwnersCnt } = React.useContext(NFTCollectionShowContext);
  const [topBannerContext] = React.useContext(TopBannerContext);

  const itemElements = React.useMemo(() => {
    if (items === undefined || isLoading) {
      return new Array(5).fill(0).map(_ => <UserSkeleton />);
    }
    return items.map(item => {
      if (item) {
        return <User owner={item} />;
      }
    });
  }, [isLoading, items]);

  if (isFetched && items?.length === 0) {
    return <TabEmptyCase />;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <>
      <OwnersTitle isTopBannerOpen={topBannerContext.isOpen}>
        <FormattedMessage
          id="nft_collection_show_owners_tab_title"
          values={{
            count:
              totalOwnersCnt > NFT_COLLECTION_MAX_TOTAL
                ? `${NFT_COLLECTION_MAX_TOTAL}+`
                : `${totalOwnersCnt}`,
          }}
        />
      </OwnersTitle>
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

export default NftOwnersInfiniteList;
