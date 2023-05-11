import * as React from "react";
import { getProductsSelector } from "app/selectors/commerce";
import { searchSellerProducts } from "app/actions/commerce";
import InViewTrigger from "../../../inViewTrigger";
import { Inner, Header, TitleWrapper, Title, Description } from "../styled";
import { MobileViewMore, ViewMore } from "./viewMore";
import ProductList from "./list";

import { useActions, useStoreState, arrayEqual } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

const SellerPreview: React.FC<Pick<
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

  const handleClickViewMore = React.useCallback(() => {
    if (!resourceId) return;

    redirect(
      new MoimURL.CommerceSellers({
        id: resourceId,
        section: "products",
      }).toString(),
    );
  }, [redirect, resourceId]);

  const hasMoreContent = React.useMemo(
    () => (list?.paging.total || 0) > responsiveMaxDisplayCount,
    [responsiveMaxDisplayCount, list?.paging.total],
  );

  const handleOnView = React.useCallback(() => {
    if (
      !products?.length &&
      products === undefined &&
      resourceId &&
      currentGroup?.seller_id
    ) {
      dispatchSearchSellerProducts(resourceId, {
        limit: responsiveMaxDisplayCount,
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
    () => products?.slice(0, responsiveMaxDisplayCount) ?? [],
    [responsiveMaxDisplayCount, products],
  );
  return (
    <Inner>
      <InViewTrigger onVisible={handleOnView} />
      <Header>
        <TitleWrapper>
          <Title>{title}</Title>
          {hasMoreContent && <ViewMore onClick={handleClickViewMore} />}
        </TitleWrapper>
        {description && <Description>{description}</Description>}
      </Header>
      <ProductList
        direction={!isMobile && direction_web ? direction_web : "horizontal"}
        column={isMobile ? 2 : responsiveMaxDisplayCount}
        maxDisplayCount={responsiveMaxDisplayCount}
        isLoading={list === undefined}
        products={splicedProducts}
        productItemLayout={productItemLayout}
      />
      {hasMoreContent && <MobileViewMore onClick={handleClickViewMore} />}
    </Inner>
  );
};

export default React.memo(SellerPreview);
