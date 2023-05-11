import * as React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router";
import { useStoreState, useActions, arrayEqual } from "app/store";

import { getBatchProducts, searchProductsByQuery } from "app/actions/commerce";
import { getProductsSelector } from "app/selectors/commerce";
// components
import PageIndex from "common/components/pageIndex";
import ProductItemCell from "common/components/productItemCell";
import ProductItemCellSkeleton from "common/components/productItemCell/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import { SearchEmpty, SearchLoader } from "../../components/emptyAndLoader";
import { Inner } from "../styled";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import {
  WhiteBackgroundWrapper,
  SearchResultTitle,
  RelatedProductTitle,
  SearchedProductContainer,
  PageIndexContainer,
} from "./styled";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

export const PAGE_ITEM_SIZE = 40;
const RELATED_PRODUCTS_DISPLAY_ITEM_SIZE = 12;
const RELATED_PRODUCTS_DISPLAY_CONDITION_COUNT = 20;

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

function ProductItem({
  productId,
  block,
}: {
  productId: string;
  block?: Moim.Component.ProductItem.IWrapper;
}) {
  const product = useStoreState(
    state => state.entities.commerce_product[productId],
  );

  if (!product) {
    return <ProductItemCellSkeleton direction={block?.direction} />;
  }

  if (!product.isDisplayed) {
    return null;
  }

  return <ProductItemCell productId={product.id} block={block} />;
}

const SearchProducts: React.FC<IProps> = ({ match }) => {
  const currentGroup = useCurrentGroup();
  const hubSeller = useHubSeller();
  const [isLoading, setLoadStatue] = React.useState(false);

  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "search"),
  );
  const products = useStoreState(state => {
    const { items } = state.commercePage.productSearchListPages.paginated ?? {
      items: [],
      currentIndex: 0,
      total: 0,
    };
    const prds = (getProductsSelector(state, items)?.data ?? []).filter(
      i => Boolean(i) && Boolean(i.isDisplayed),
    );
    return prds;
  }, arrayEqual);

  const { currentIndex, total } = useStoreState(state => {
    const { currentIndex: currIdx, total: totalProduct } = state.commercePage
      .productSearchListPages.paginated ?? {
      items: [],
      currentIndex: 0,
      total: 0,
    };

    return {
      currentIndex: currIdx,
      total: totalProduct,
    };
  });

  const relatedProductIds = React.useMemo(
    () =>
      products
        .reduce<Moim.Id[]>((acc, item) => {
          if (item.recommendProductIds) {
            acc.push(...item.recommendProductIds);
          }
          return acc;
        }, [])
        .filter(i => Boolean(i))
        .slice(0, RELATED_PRODUCTS_DISPLAY_ITEM_SIZE),
    [products],
  );

  const productEntities = useStoreState(
    state =>
      relatedProductIds?.filter(id => !state.entities.commerce_product[id]),
    arrayEqual,
  );

  const {
    dispatchSearchProductsByQuery,
    dispatchGetBatchProducts,
  } = useActions({
    dispatchSearchProductsByQuery: searchProductsByQuery,
    dispatchGetBatchProducts: getBatchProducts,
  });

  const handleChangePageIndex = React.useCallback(
    (nextIndex: number) => {
      if (currentGroup?.seller_id) {
        setLoadStatue(true);
        dispatchSearchProductsByQuery(currentGroup.seller_id, {
          query: match.params.query,
          from: nextIndex * PAGE_ITEM_SIZE,
          limit: PAGE_ITEM_SIZE,
        }).finally(() => {
          setLoadStatue(false);
        });
      }
    },
    [currentGroup, dispatchSearchProductsByQuery, match.params.query],
  );

  const relatedProductElements = React.useMemo(() => {
    if (total > RELATED_PRODUCTS_DISPLAY_CONDITION_COUNT) {
      return null;
    }
    return relatedProductIds.map(productId => (
      <ProductItem
        key={`search_related_${productId}`}
        productId={productId}
        block={productItemLayout}
      />
    ));
  }, [hubSeller, relatedProductIds, total, productItemLayout]);

  const searchedProductElements = React.useMemo(
    () =>
      products
        .filter(product => Boolean(product.isDisplayed))
        .map(product => (
          <ProductItemCell
            key={`search_product_${product.id}`}
            productId={product.id}
            block={productItemLayout}
          />
        )),
    [hubSeller, products, productItemLayout],
  );

  React.useEffect(() => {
    if (productEntities && productEntities?.length > 0) {
      dispatchGetBatchProducts(productEntities);
    }
  }, [productEntities]);

  if (!products.length && currentIndex === 0) {
    return <SearchEmpty query={match.params.query} />;
  }

  return (
    <WhiteBackgroundWrapper>
      <Inner>
        <SearchResultTitle>
          <FormattedMessage
            id="search_result/query_with_searched_count"
            values={{ query: `'${match.params.query}'`, count: total }}
          />
        </SearchResultTitle>
        <SearchedProductContainer>
          {isLoading ? <SearchLoader /> : searchedProductElements}
        </SearchedProductContainer>
        <Spacer value={24} />

        {relatedProductElements && relatedProductElements.length > 0 && (
          <>
            <RelatedProductTitle>
              <FormattedMessage id="search_result_menu_products_related_products_title" />
            </RelatedProductTitle>
            <SearchedProductContainer>
              {relatedProductElements}
            </SearchedProductContainer>
            <Spacer value={24} />
          </>
        )}

        <PageIndexContainer>
          <PageIndex
            pageSize={PAGE_ITEM_SIZE}
            totalItemSize={total}
            onChangeIndex={handleChangePageIndex}
          />
        </PageIndexContainer>
        <Spacer value={60} />
      </Inner>
    </WhiteBackgroundWrapper>
  );
};

export default SearchProducts;
