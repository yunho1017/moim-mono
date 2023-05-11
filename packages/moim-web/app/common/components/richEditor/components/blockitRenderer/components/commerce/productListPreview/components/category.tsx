import * as React from "react";
import {
  getProductsSelector,
  getCommerceAllCategoryIdSelector,
} from "app/selectors/commerce";
import { searchSellerProducts } from "app/actions/commerce";
import InViewTrigger from "../../../inViewTrigger";
import { Inner, Header, TitleWrapper, Title, Description } from "../styled";
import { MobileViewMore, ViewMore } from "./viewMore";
import BreadCrumb from "./breadCrumb";
import ProductList from "./list";
import { BlockitFeedback } from "../../../feedback";

import { useActions, useStoreState, arrayEqual } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";

import { productItemLayoutSelector } from "app/selectors/componentLayout";
import { MoimURL } from "common/helpers/url";

const CategoryPreview: React.FC<Pick<
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
  resourceId: rId,
  itemLayout_web,
}) => {
  const productItemLayout = useStoreState(
    state => itemLayout_web ?? productItemLayoutSelector(state, "listPreview"),
  );

  const [list, setList] = React.useState<
    Moim.IPaginatedListResponse<Moim.Id> | undefined | null
  >(undefined);
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const redirect = useRedirect();

  const products = useStoreState(
    state => (list ? getProductsSelector(state, list.data).data : undefined),
    arrayEqual,
  );
  const { isAllCategory, resourceId } = useStoreState((state): {
    isAllCategory: boolean;
    resourceId: string | undefined;
  } => {
    const cateAllId = getCommerceAllCategoryIdSelector(state);
    const resId = rId ?? cateAllId;
    return {
      isAllCategory: !resId || cateAllId === resId,
      resourceId: resId,
    };
  });

  const { dispatchSearchSellerProducts } = useActions({
    dispatchSearchSellerProducts: searchSellerProducts,
  });

  const responsiveMaxDisplayCount = React.useMemo(
    () =>
      !isMobile && maxDisplayedItemsCount_web !== undefined
        ? maxDisplayedItemsCount_web
        : maxDisplayedItemsCount,
    [isMobile, maxDisplayedItemsCount_web, maxDisplayedItemsCount],
  );

  const hasMoreContent = React.useMemo(
    () => (list?.paging.total ?? 0) > responsiveMaxDisplayCount,
    [responsiveMaxDisplayCount, list?.paging.total],
  );
  const handleClickViewMore = React.useCallback(() => {
    if (!resourceId) return;

    redirect(
      new MoimURL.CommerceCategories({
        id: resourceId,
        section: "products",
      }).toString(),
    );
  }, [redirect, resourceId]);

  const handleOnView = React.useCallback(() => {
    if (products === undefined && resourceId && currentGroup?.seller_id) {
      dispatchSearchSellerProducts(
        currentGroup.seller_id,
        {
          categoryIds: [resourceId],
          limit: responsiveMaxDisplayCount,
        },
        isAllCategory,
      )
        .then(result => {
          setList(result);
        })
        .catch(() => {
          setList(null);
        });
    }
  }, [
    currentGroup?.seller_id,
    dispatchSearchSellerProducts,
    products,
    resourceId,
  ]);

  const splicedProducts = React.useMemo(
    () => products?.slice(0, responsiveMaxDisplayCount) ?? [],
    [responsiveMaxDisplayCount, products],
  );

  const isEmpty = list === null || (list !== undefined && !list.data.length);
  return (
    <Inner>
      <InViewTrigger onVisible={handleOnView} />
      <Header>
        {resourceId && <BreadCrumb resourceId={resourceId} />}
        <TitleWrapper>
          <Title>{title}</Title>
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
          isLoading={list === undefined}
          products={splicedProducts}
          productItemLayout={productItemLayout}
        />
      )}
      {hasMoreContent && <MobileViewMore onClick={handleClickViewMore} />}
    </Inner>
  );
};

export default React.memo(CategoryPreview);
