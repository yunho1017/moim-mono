import * as React from "react";
import uuid from "uuid";

// components
import InViewTrigger from "../../../inViewTrigger";
import BlockitHeader from "../../../header";
import BlockitFooter from "../../../footer";
import ProductItemCell from "common/components/productItemCell";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import { BlockitFeedback } from "../../../feedback";
import BlockitListLayout from "common/components/blockitListLayout";
import {
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";
import { Inner } from "../styled";
import { ArrowContainer } from "common/components/blockitEditorBase/styled";

import { getProductsSelector } from "app/selectors/commerce";
import { searchSellerProducts } from "app/actions/commerce";
import { productItemLayoutSelector } from "app/selectors/componentLayout";
import { MoimURL } from "common/helpers/url";
// hooks
import { useActions, useStoreState, arrayEqual } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
import { useParseListElementConfigWithFallback } from "../hooks";
import { useCommerceAnalyticsReport } from "common/hooks/commerce/useCommerceAnalytics";

const SellerPreview: React.FC<Pick<
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
  resourceId,
  header,
  footer,
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

  const [list, setList] = React.useState<
    Moim.IPaginatedListResponse<Moim.Id> | undefined | null
  >(undefined);
  const currentGroup = useCurrentGroup();

  const products = useStoreState(
    state => (list ? getProductsSelector(state, list.data).data : undefined),
    arrayEqual,
  );

  const portalSectionId = React.useMemo(() => `seller-portal-${uuid.v4()}`, []);

  const { dispatchSearchSellerProducts } = useActions({
    dispatchSearchSellerProducts: searchSellerProducts,
  });

  const handleClickViewMore = React.useCallback(() => {
    if (!resourceId) return;

    redirect(
      new MoimURL.CommerceSellers({
        id: resourceId,
        section: "products",
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (
      !products?.length &&
      products === undefined &&
      resourceId &&
      currentGroup?.seller_id
    ) {
      dispatchSearchSellerProducts(resourceId, {
        limit: maxVisibleCount,
      })
        .then(result => {
          setList(result);
        })
        .catch(() => {
          setList(null);
        });
    }
  }, [
    currentGroup?.seller_id,
    products?.length,
    dispatchSearchSellerProducts,
    resourceId,
  ]);

  const splicedProducts = React.useMemo(
    () => products?.slice(0, maxVisibleCount) ?? [],
    [maxVisibleCount, products],
  );

  const reports = useCommerceAnalyticsReport();

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = splicedProducts.some(pd => pd?.id === undefined);
    if (isUndefinedArray || list === undefined) {
      return new Array(maxVisibleCount)
        .fill(0)
        .map((_, idx) => (
          <ProductItemCellSkeleton
            key={`plp_skeleton_${idx}`}
            direction={productItemLayout?.direction}
          />
        ));
    }

    return splicedProducts
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
  }, [splicedProducts, list, maxVisibleCount, productItemLayout]);

  const isEmpty = list === null || (list !== undefined && !list.data.length);
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

export default React.memo(SellerPreview);
