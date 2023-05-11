import * as React from "react";

import uuid from "uuid";
import { useStoreState, arrayEqual } from "app/store";
import { selectCampaignProject } from "app/selectors/campaign";
// hooks
import { useParseListElementConfigWithFallback } from "../hooks";
// components
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

import { productItemLayoutSelector } from "app/selectors/componentLayout";

const CampaignPreview: React.FC<Pick<
  Moim.Blockit.Commerce.IProductListPreviewBlock,
  | "title"
  | "description"
  | "resourceId"
  | "header"
  | "itemLayout_web"
  | "footer"
  | "listElement"
  | "maxDisplayedItemsCount"
  | "maxDisplayedItemsCount_web"
>> = ({
  title,
  description,
  itemLayout_web,
  resourceId,
  header,
  footer,
  listElement,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
}) => {
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
    () => `campaign-portal-${uuid.v4()}`,
    [],
  );

  const products = useStoreState(
    state =>
      resourceId
        ? selectCampaignProject(state, resourceId)?.products ?? []
        : [],
    arrayEqual,
  );

  const splicedProducts = React.useMemo(
    () => products.slice(0, maxVisibleCount),
    [maxVisibleCount, products],
  );

  const itemElements = React.useMemo(() => {
    const isUndefinedArray = splicedProducts.some(pd => pd?.id === undefined);
    if (isUndefinedArray) {
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
        />
      ));
  }, [splicedProducts, maxVisibleCount, productItemLayout]);

  const isEmpty =
    products === null || (products !== undefined && !products.length);
  return (
    <Inner>
      <BlockitHeader
        title={title}
        description={description}
        showTitle={header?.showTitle ?? true}
        showDescription={header?.showDescription ?? true}
        showMoreButton={header?.showMoreButton ?? true}
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
      />
    </Inner>
  );
};

export default React.memo(CampaignPreview);
