import * as React from "react";
import uuid from "uuid";

import { MoimURL } from "common/helpers/url";
import { getBatchProductSets } from "app/actions/commerce";

import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";
// hooks
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
import { useParseListElementConfigWithFallback } from "../hooks";
// components
import InViewTrigger from "../../../inViewTrigger";
import { BlockitFeedback } from "../../../feedback";
import BlockitHeader from "../../../header";
import BlockitFooter from "../../../footer";
import BlockitListLayout from "common/components/blockitListLayout";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import ProductItemCell from "common/components/productItemCell";
import { Inner } from "../styled";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";

import { productItemLayoutSelector } from "app/selectors/componentLayout";
import { useCommerceAnalyticsReport } from "common/hooks/commerce/useCommerceAnalytics";

const getStoreProductVariantById = createSelector(
  (state: IAppState, id: Moim.Id) => state.entities.commerce_productSet[id],
  (state: IAppState) => state.entities.commerce_product,
  (productSet, productEntities) =>
    productSet?.productIds.map(id => productEntities[id]),
);

const ProductSetPreview: React.FC<Pick<
  Moim.Blockit.Commerce.IProductListPreviewBlock,
  | "title"
  | "description"
  | "resourceId"
  | "header"
  | "footer"
  | "itemLayout_web"
  | "listElement"
  | "maxDisplayedItemsCount"
  | "maxDisplayedItemsCount_web"
>> = ({
  title,
  description,
  header,
  footer,
  resourceId,
  itemLayout_web,
  listElement,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
}) => {
  const redirect = useRedirect();
  const productItemLayout = useStoreState(
    state => itemLayout_web ?? productItemLayoutSelector(state, "listPreview"),
  );
  const {
    listElementType,
    maxVisibleCount,
    convertedListElement,
  } = useParseListElementConfigWithFallback(
    listElement,
    maxDisplayedItemsCount,
    maxDisplayedItemsCount_web,
  );

  const portalSectionId = React.useMemo(
    () => `product-set-preview-portal-${uuid.v4()}`,
    [],
  );

  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const currentGroup = useCurrentGroup();

  const products = useStoreState(state =>
    resourceId ? getStoreProductVariantById(state, resourceId) : undefined,
  );

  const { dispatchGetBatchProductSets } = useActions({
    dispatchGetBatchProductSets: getBatchProductSets,
  });

  const handleClickViewMore = React.useCallback(() => {
    if (!resourceId) return;

    redirect(
      new MoimURL.CommerceProductSets({
        id: resourceId,
        section: "products",
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (isLoading === undefined && resourceId && currentGroup?.seller_id) {
      setLoadStatus(true);
      dispatchGetBatchProductSets(resourceId, maxVisibleCount).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    isLoading,
    resourceId,
    currentGroup?.seller_id,
    dispatchGetBatchProductSets,
    maxVisibleCount,
  ]);

  const slicedProducts = React.useMemo(
    () => products?.slice(0, maxVisibleCount) ?? [],
    [products, maxVisibleCount],
  );

  const reports = useCommerceAnalyticsReport();

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = slicedProducts?.some(pd => pd?.id === undefined);

    if (isLoading !== false || isUndefinedArray) {
      return new Array(maxVisibleCount)
        .fill(0)
        .map((_, idx) => (
          <ProductItemCellSkeleton
            key={`plp_skeleton_${idx}`}
            direction={productItemLayout?.direction}
          />
        ));
    }

    return slicedProducts
      .filter(pd => Boolean(pd) && Boolean(pd.isDisplayed))
      .map(product => (
        <ProductItemCell
          key={`${product.id}`}
          productId={product.id}
          block={productItemLayout}
          onProductSelect={reports.reportBlockProductListPreviewProductSelect}
          onSellerSelect={reports.reportBlockProductListPreviewSellerSelect}
          onBuyNowSelect={reports.reportBlockProductListPreviewProductBuyNow}
          onAddToCartSelect={
            reports.reportBlockProductListPreviewProductAddToCart
          }
        />
      ));
  }, [slicedProducts, isLoading, maxVisibleCount, productItemLayout]);

  const isEmpty =
    isLoading === false && products !== undefined && !products?.length;
  return (
    <Inner>
      <InViewTrigger onVisible={handleOnView} />
      <BlockitHeader
        title={title}
        description={description}
        showTitle={header?.showTitle ?? true}
        showDescription={header?.showDescription ?? true}
        showMoreButton={header?.showMoreButton ?? true}
        onClickViewMore={handleClickViewMore}
      />
      {listElementType === "horizontal" && (
        <ArrowContainer id={portalSectionId} />
      )}
      {isEmpty ? (
        <BlockitFeedback.Empty textKey="product_list_preview_empty" />
      ) : (
        <BlockitListLayout
          element={convertedListElement}
          rightArrow={
            listElementType === "horizontal" ? PortalRightArrow : undefined
          }
          leftArrow={
            listElementType === "horizontal" ? PortalLeftArrow : undefined
          }
          arrowPortalTargetId={portalSectionId}
        >
          {itemElements}
        </BlockitListLayout>
      )}
      <BlockitFooter
        showMoreButton={footer?.showMoreButton ?? false}
        textKey={"button_see_more_product"}
        onClickViewMore={handleClickViewMore}
      />
    </Inner>
  );
};

export default React.memo(ProductSetPreview);
