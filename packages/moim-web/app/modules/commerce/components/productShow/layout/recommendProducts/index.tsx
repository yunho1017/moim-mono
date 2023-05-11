import * as React from "react";
import { FormattedMessage } from "react-intl";
import ProductItemCell from "common/components/productItemCell";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import {
  Wrapper,
  Header,
  Body,
  Title,
  ProductItemCellWrapper,
  ArrowButton,
  LeftIcon,
  RightIcon,
  PRODUCT_ITEM_WIDTH,
  PRODUCT_ITEM_GAP,
} from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import { arrayEqual, useActions, useStoreState } from "app/store";
import { getBatchProducts } from "app/actions/commerce";
import { productItemLayoutSelector } from "app/selectors/componentLayout";
import { useCommerceAnalyticsReport } from "common/hooks/commerce/useCommerceAnalytics";

const SCROLL_ITEM_COUNT = 3;

interface IProps {
  productId: string;
  block: Moim.Component.ProductShow.IProductGroup;
}

const scrollUnit =
  PRODUCT_ITEM_WIDTH * SCROLL_ITEM_COUNT +
  PRODUCT_ITEM_GAP * (SCROLL_ITEM_COUNT - 1);

function ProductItem({
  originProductId,
  productId,
  block,
}: {
  originProductId: string;
  productId: string;
  block?: Moim.Component.ProductItem.IWrapper;
}) {
  const product = useStoreState(
    state => state.entities.commerce_product[productId],
  );

  const reports = useCommerceAnalyticsReport();

  const handleProductSelect = React.useCallback(
    (_product: Moim.Commerce.IProduct) => {
      reports.reportProductShowRelatedProductSelect(
        _product.id,
        originProductId,
      );
    },
    [originProductId, reports],
  );

  const handleSellerSelect = React.useCallback(
    (_product: Moim.Commerce.IProduct) => {
      reports.reportProductShowRelatedProductSellerSelect(
        _product.id,
        originProductId,
        _product.sellerId,
      );
    },
    [originProductId, reports],
  );

  const handleBuyNowSelect = React.useCallback(
    (_product: Moim.Commerce.IProduct) => {
      reports.reportProductShowRelatedProductBuyNowSelect(
        _product.id,
        originProductId,
      );
    },
    [originProductId, reports],
  );

  const handleAddToCartSelect = React.useCallback(
    (_product: Moim.Commerce.IProduct) => {
      reports.reportProductShowRelatedProductAddToCartSelect(
        _product.id,
        originProductId,
      );
    },
    [originProductId, reports],
  );

  if (!product) {
    return (
      <ProductItemCellWrapper>
        <ProductItemCellSkeleton direction={block?.direction} />
      </ProductItemCellWrapper>
    );
  }

  if (!product.isDisplayed) {
    return null;
  }

  return (
    <ProductItemCellWrapper>
      <ProductItemCell
        productId={product.id}
        block={block}
        onAddToCartSelect={handleAddToCartSelect}
        onBuyNowSelect={handleBuyNowSelect}
        onSellerSelect={handleSellerSelect}
        onProductSelect={handleProductSelect}
      />
    </ProductItemCellWrapper>
  );
}

const RecommendProducts: React.FC<IProps> = ({ productId }) => {
  const { dispatchGetBatchProducts } = useActions({
    dispatchGetBatchProducts: getBatchProducts,
  });
  const { product, hasRecommendProducts } = useStoreState(state => {
    const product = state.entities.commerce_product[productId];
    return {
      product,
      hasRecommendProducts: Boolean(
        product?.recommendProductIds?.length &&
          product?.recommendProductIds.filter(
            id => state.entities.commerce_product[id]?.isDisplayed,
          )?.length,
      ),
    };
  });
  const productEntities = useStoreState(
    state =>
      product?.recommendProductIds?.filter(
        id => !state.entities.commerce_product[id],
      ),
    arrayEqual,
  );

  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "recommendProduct"),
  );

  const [disableLeftArrow, setDisableLeftArrow] = React.useState(true);
  const [disableRightArrow, setDisableRightArrow] = React.useState(false);
  const [hasScroll, setHasScroll] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const hubSeller = useHubSeller();

  const elements = React.useMemo(
    () =>
      product?.recommendProductIds?.map((id, index) => (
        <ProductItem
          originProductId={product.id}
          productId={id}
          key={`recommends_skeleton_${index}`}
          block={productItemLayout}
        />
      )),
    [product?.recommendProductIds, hubSeller, productItemLayout],
  );

  const handleScroll = React.useCallback<React.UIEventHandler<HTMLDivElement>>(
    e => {
      const isScrollToZero = e.currentTarget.scrollLeft === 0;
      const isScrollToEnd =
        e.currentTarget.scrollLeft + e.currentTarget.clientWidth ===
        e.currentTarget.scrollWidth;

      setDisableLeftArrow(isScrollToZero);
      setDisableRightArrow(isScrollToEnd);
    },
    [],
  );

  const handleLeftClick = React.useCallback(() => {
    scrollRef.current?.scrollTo(
      (scrollRef.current?.scrollLeft ?? 0) - scrollUnit,
      0,
    );
  }, [scrollUnit]);
  const handleRightClick = React.useCallback(() => {
    scrollRef.current?.scrollTo(
      (scrollRef.current?.scrollLeft ?? 0) + scrollUnit,
      0,
    );
  }, [scrollUnit]);

  React.useLayoutEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      setHasScroll(scrollElement.scrollWidth >= scrollElement.clientWidth);
      setDisableRightArrow(
        scrollElement.scrollWidth === scrollElement.clientWidth,
      );
    }
  }, [scrollRef, elements?.length]);

  React.useEffect(() => {
    if (productEntities && productEntities?.length > 0) {
      dispatchGetBatchProducts(productEntities);
    }
  }, [productEntities]);

  if (!hasRecommendProducts) {
    return null;
  }
  return (
    <Wrapper>
      <Header>
        <Title>
          <FormattedMessage id="product_show_related_products_title" />
        </Title>
        {!isMobile && (
          <div>
            <ArrowButton disabled={disableLeftArrow} onClick={handleLeftClick}>
              <LeftIcon />
            </ArrowButton>

            <ArrowButton
              disabled={disableRightArrow || !hasScroll}
              onClick={handleRightClick}
            >
              <RightIcon />
            </ArrowButton>
          </div>
        )}
      </Header>
      <Body ref={scrollRef} onScroll={handleScroll}>
        <div>{elements}</div>
      </Body>
    </Wrapper>
  );
};

export default React.memo(RecommendProducts);
