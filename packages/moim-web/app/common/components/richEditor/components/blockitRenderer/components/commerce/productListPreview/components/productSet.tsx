import * as React from "react";

import InViewTrigger from "../../../inViewTrigger";
import { Inner, Header, TitleWrapper, Title, Description } from "../styled";
import { MobileViewMore, ViewMore } from "./viewMore";
import ProductList from "./list";
import { BlockitFeedback } from "../../../feedback";

import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
import { getBatchProductSets } from "app/actions/commerce";

import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

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
  | "maxDisplayedItemsCount"
  | "maxDisplayedItemsCount_web"
  | "resourceId"
  | "direction_web"
  | "itemLayout_web"
>> = ({
  title,
  description,
  direction_web,
  maxDisplayedItemsCount,
  maxDisplayedItemsCount_web,
  resourceId,
  itemLayout_web,
}) => {
  const productItemLayout = useStoreState(
    state => itemLayout_web ?? productItemLayoutSelector(state, "listPreview"),
  );
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const redirect = useRedirect();

  const products = useStoreState(state =>
    resourceId ? getStoreProductVariantById(state, resourceId) : undefined,
  );

  const { dispatchGetBatchProductSets } = useActions({
    dispatchGetBatchProductSets: getBatchProductSets,
  });

  const responsiveMaxDisplayCount = React.useMemo(
    () =>
      !isMobile && maxDisplayedItemsCount_web !== undefined
        ? maxDisplayedItemsCount_web
        : maxDisplayedItemsCount,
    [isMobile, maxDisplayedItemsCount_web, maxDisplayedItemsCount],
  );

  const handleClickViewMore = React.useCallback(() => {
    if (!resourceId) return;

    redirect(
      new MoimURL.CommerceProductSets({
        id: resourceId,
        section: "products",
      }).toString(),
    );
  }, [redirect, resourceId]);

  const hasMoreContent = React.useMemo(
    () => (products?.length ?? 0) > responsiveMaxDisplayCount,
    [responsiveMaxDisplayCount, products?.length],
  );

  const handleOnView = React.useCallback(() => {
    if (
      !products?.length &&
      !isLoading &&
      resourceId &&
      currentGroup?.seller_id
    ) {
      setLoadStatus(true);
      dispatchGetBatchProductSets(
        resourceId,
        responsiveMaxDisplayCount,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [
    currentGroup?.seller_id,
    products?.length,
    dispatchGetBatchProductSets,
    isLoading,
    resourceId,
    responsiveMaxDisplayCount,
  ]);

  const slicedProducts = React.useMemo(
    () => products?.slice(0, responsiveMaxDisplayCount) ?? [],
    [products, responsiveMaxDisplayCount],
  );

  const isEmpty =
    isLoading === false && products !== undefined && !products.length;
  return (
    <Inner>
      <InViewTrigger onVisible={handleOnView} />
      <Header>
        <TitleWrapper>
          <Title role="button" onClick={handleClickViewMore}>
            {title}
          </Title>
          {hasMoreContent && <ViewMore onClick={handleClickViewMore} />}
        </TitleWrapper>
        {description && <Description>{description}</Description>}
      </Header>
      {isEmpty ? (
        <BlockitFeedback.Empty textKey="product_list_preview_empty" />
      ) : (
        <ProductList
          direction={!isMobile && direction_web ? direction_web : "horizontal"}
          column={isMobile ? 2 : responsiveMaxDisplayCount}
          maxDisplayCount={responsiveMaxDisplayCount}
          isLoading={products === undefined || isLoading}
          products={slicedProducts}
          productItemLayout={productItemLayout}
        />
      )}
      {hasMoreContent && <MobileViewMore onClick={handleClickViewMore} />}
    </Inner>
  );
};

export default React.memo(ProductSetPreview);
