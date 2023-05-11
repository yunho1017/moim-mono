import * as React from "react";
import ProductItemCell from "common/components/productItemCell";
import InfiniteScroller, {
  PureInfiniteScroller,
} from "common/components/infiniteScroller/new";
import ScrollToTop from "common/components/scrollToTop";
import useIsMobile from "common/hooks/useIsMobile";
import { Wrapper, LoaderWrapper, List } from "./styled";
import Empty from "./empty";
import { DefaultLoader } from "common/components/loading";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import { useCommerceAnalyticsReport } from "common/hooks/commerce/useCommerceAnalytics";

interface IProps {
  isLoading: boolean;
  currentId: Moim.Id;
  pageType: Moim.Commerce.PAGE_TYPE;
  products: (Moim.Commerce.IProduct | undefined)[] | undefined;
  paging?: Moim.IPaging;
  productItemLayout?: Moim.Component.ProductItem.IWrapper;
  onLoadMore(pagingKey: keyof Moim.IPaging): void;
}

const PageProductList: React.FC<IProps> = React.memo(
  ({
    isLoading,
    pageType,
    currentId,
    products,
    paging,
    onLoadMore,
    productItemLayout,
  }) => {
    const refScroll = React.useRef<PureInfiniteScroller>(null);
    const isMobile = useIsMobile();
    const hubSeller = useHubSeller();
    const reports = useCommerceAnalyticsReport();

    const elements = React.useMemo(
      () =>
        products
          ?.filter(
            (product): product is Moim.Commerce.IProduct =>
              Boolean(product) && Boolean(product?.isDisplayed),
          )
          .map(product => (
            <ProductItemCell
              key={`${currentId}_${product.id}`}
              productId={product.id}
              block={productItemLayout}
              onProductSelect={reports.reportBlockProductListProductSelect}
              onSellerSelect={reports.reportBlockProductListSellerSelect}
              onBuyNowSelect={reports.reportBlockProductListProductBuyNow}
              onAddToCartSelect={reports.reportBlockProductListProductAddToCart}
            />
          )),
      [currentId, hubSeller, productItemLayout, products],
    );

    const infiniteListElement = React.useMemo(
      () => (
        <InfiniteScroller
          ref={refScroll}
          itemLength={elements?.length ?? 0}
          threshold={700}
          paging={paging}
          loader={
            <LoaderWrapper>
              <DefaultLoader />
            </LoaderWrapper>
          }
          loadMore={onLoadMore}
        >
          <List>{elements}</List>
        </InfiniteScroller>
      ),
      [elements, onLoadMore, paging],
    );

    const listSection = React.useMemo(() => {
      const isUndefinedArray =
        products?.some(pd => pd?.id === undefined) ?? true;
      if (isLoading || isUndefinedArray) {
        return (
          <List>
            {new Array(5).fill(0).map((_, idx) => (
              <ProductItemCellSkeleton
                key={`plp_skeleton_${idx}`}
                direction={productItemLayout?.direction}
              />
            ))}
          </List>
        );
      }

      if (!isLoading && products?.length === 0) {
        return <Empty />;
      }

      return pageType === "infinite" ? (
        infiniteListElement
      ) : (
        <div>Page index version is TBD</div>
      );
    }, [
      infiniteListElement,
      isLoading,
      pageType,
      products,
      productItemLayout?.direction,
    ]);

    return (
      <Wrapper>
        {listSection}
        <ScrollToTop
          useWindowScroll={isMobile}
          scrollingTarget={refScroll.current?.getScrollingElement()}
          disappearOffset={0}
        />
      </Wrapper>
    );
  },
);

export default PageProductList;
