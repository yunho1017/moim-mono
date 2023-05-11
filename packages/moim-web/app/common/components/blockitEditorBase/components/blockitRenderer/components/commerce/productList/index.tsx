import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { MoimURL } from "common/helpers/url";
import {
  getProductsSelector,
  getProductSetSelector,
  getCommerceCategorySelector,
  getCommerceAllCategoryIdSelector,
} from "app/selectors/commerce";
import {
  getBatchProductSets,
  searchSellerProducts,
} from "app/actions/commerce";
import ProductItemCell from "common/components/productItemCell";
import InfiniteScroller from "common/components/infiniteScroller/new";
import BlockitHeader from "../../header";

import { LoadWrapper, Loading, Inner, List } from "./styled";
import { withPlacement } from "../../../hoc/withPlacement";
import { productItemLayoutSelector } from "app/selectors/componentLayout";
import { useCommerceAnalyticsReport } from "common/hooks/commerce/useCommerceAnalytics";

const LOAD_MORE_COUNT = 20;

interface IProps extends Omit<Moim.Blockit.Commerce.IProductListBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ProductList: React.FC<IProps> = ({
  title,
  description,
  resourceType,
  resourceId: rId,
  header,
}) => {
  const [isInitialed, setInitialStatus] = React.useState(false);
  const [isLoading, setLoadStatus] = React.useState(false);
  const [list, setList] = React.useState<Moim.IPaginatedListResponse<Moim.Id>>({
    data: [],
    paging: {},
  });

  const currentGroup = useCurrentGroup();
  const productItemLayout = useStoreState(state => {
    switch (resourceType) {
      case "seller":
        return productItemLayoutSelector(state, "seller");

      default:
        return productItemLayoutSelector(state, "listShow");
    }
  });

  const products = useStoreState(state => {
    let targetDatum: Moim.Commerce.IProduct[] = [];

    const cateAllId = getCommerceAllCategoryIdSelector(state);
    const resId = rId
      ? rId
      : resourceType === "category"
      ? cateAllId
      : undefined;

    if (resId) {
      switch (resourceType) {
        case "category": {
          targetDatum = getProductsSelector(state, list.data).data;
          break;
        }
        case "productSet": {
          targetDatum = getProductSetSelector(state, resId)?.products ?? [];

          break;
        }

        case "seller": {
          targetDatum = getProductsSelector(state, list.data).data;
          break;
        }
      }
    }

    return targetDatum.filter(i => Boolean(i));
  });
  const { category, resourceId, isAllCategory } = useStoreState(state => {
    let categoryDatum: Moim.Commerce.ICategory | undefined;

    const cateAllId = getCommerceAllCategoryIdSelector(state);
    const resId = rId
      ? rId
      : resourceType === "category"
      ? cateAllId
      : undefined;

    if (resId && resourceType === "category") {
      categoryDatum = getCommerceCategorySelector(state, resId);
    }

    return {
      category: categoryDatum,

      resourceId: resId,
      isAllCategory: resourceType === "category" && (!rId || rId === cateAllId),
    };
  });
  const {
    dispatchGetBatchProductSets,
    dispatchSearchSellerProducts,
  } = useActions({
    dispatchGetBatchProductSets: getBatchProductSets,
    dispatchSearchSellerProducts: searchSellerProducts,
  });

  const breadCrumbLink = React.useMemo(() => {
    if (resourceType !== "category" || !category) return undefined;

    return new MoimURL.CommerceCategories({
      id: category.id,
      section: "products",
    }).toString();
  }, [category, resourceType]);

  const reports = useCommerceAnalyticsReport();

  const element = React.useMemo(
    () =>
      products
        .filter(pd => Boolean(pd.isDisplayed))
        .map(product => (
          <ProductItemCell
            key={`${resourceId}_${product.id}`}
            productId={product.id}
            block={productItemLayout}
            onProductSelect={reports.reportBlockProductListProductSelect}
            onSellerSelect={reports.reportBlockProductListSellerSelect}
            onBuyNowSelect={reports.reportBlockProductListProductBuyNow}
            onAddToCartSelect={reports.reportBlockProductListProductAddToCart}
          />
        )),
    [products, resourceId, productItemLayout],
  );

  const handleLoadMore = React.useCallback(() => {
    if (resourceId && currentGroup?.seller_id) {
      switch (resourceType) {
        case "category": {
          dispatchSearchSellerProducts(
            currentGroup.seller_id,
            {
              categoryIds: [resourceId],
              limit: LOAD_MORE_COUNT,
              after: `${list.paging.after}`,
            },
            isAllCategory,
          )
            .then(result => {
              setList({
                data: [...list.data, ...result.data],
                paging: result.paging,
              });
            })
            .finally(() => {
              setLoadStatus(false);
            });
          break;
        }
        case "productSet": {
          // dispatchGetBatchProductSets(resourceId).finally(() => {
          //   setLoadStatus(false);
          // });
          break;
        }

        case "seller": {
          dispatchSearchSellerProducts(resourceId, {
            limit: LOAD_MORE_COUNT,
            after: `${list.paging.after}`,
          })
            .then(result => {
              setList({
                data: [...list.data, ...result.data],
                paging: result.paging,
              });
            })
            .finally(() => {
              setLoadStatus(false);
            });
          break;
        }
      }
    }
  }, [
    isAllCategory,
    currentGroup,
    dispatchSearchSellerProducts,
    list.data,
    list.paging,
    resourceId,
    resourceType,
  ]);

  React.useEffect(() => {
    if (
      !products?.length &&
      !isInitialed &&
      !isLoading &&
      resourceId &&
      currentGroup?.seller_id
    ) {
      setInitialStatus(true);
      setLoadStatus(true);
      switch (resourceType) {
        case "category": {
          dispatchSearchSellerProducts(
            currentGroup.seller_id,
            {
              categoryIds: [resourceId],
              limit: LOAD_MORE_COUNT,
            },
            isAllCategory,
          )
            .then(result => {
              setList(result);
            })
            .finally(() => {
              setLoadStatus(false);
            });
          break;
        }
        case "productSet": {
          dispatchGetBatchProductSets(resourceId).finally(() => {
            setLoadStatus(false);
          });
          break;
        }

        case "seller": {
          dispatchSearchSellerProducts(resourceId, {
            limit: LOAD_MORE_COUNT,
          })
            .then(result => {
              setList(result);
            })
            .finally(() => {
              setLoadStatus(false);
            });
          break;
        }
      }
    }
  }, [
    isAllCategory,
    currentGroup,
    products,
    dispatchGetBatchProductSets,
    dispatchSearchSellerProducts,
    isInitialed,
    isLoading,
    resourceId,
    resourceType,
  ]);

  return (
    <>
      {isLoading ? (
        <LoadWrapper>
          <Loading />
        </LoadWrapper>
      ) : (
        <Inner>
          <BlockitHeader
            title={title}
            description={description}
            showTitle={header?.showTitle ?? true}
            showDescription={header?.showDescription ?? true}
            showMoreButton={header?.showMoreButton ?? true}
            breadCrumbLink={breadCrumbLink}
            breadCrumbText={category?.name}
          />
          <InfiniteScroller
            itemLength={element.length}
            threshold={700}
            paging={list.paging}
            loader={
              <LoadWrapper>
                <Loading />
              </LoadWrapper>
            }
            loadMore={handleLoadMore}
          >
            <List>{element}</List>
          </InfiniteScroller>
        </Inner>
      )}
    </>
  );
};

export default withPlacement(React.memo(ProductList));
