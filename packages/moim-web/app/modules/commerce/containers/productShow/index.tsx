import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import {
  getProductData,
  getProductReviews,
  getProductQuestions,
  getFundComments,
  getPaidFund,
} from "app/actions/commerce";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { QNA_PAGE_ITEM_COUNT, REVIEW_PAGE_ITEM_COUNT } from "./constants";

import PageUpdater from "common/components/pageUpdater";
import ProductShowComponent from "../../components/productShow";
import { productShowAllLayoutSelector } from "app/selectors/componentLayout";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ProductShowContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as { id: Moim.Id; threadId?: string };
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const currentGroup = useCurrentGroup();

  const cancelToken = useCancelToken();
  const product = useStoreState(state => state.entities.commerce_product[id]);
  const { productShowLayout } = useStoreState(state => ({
    productShowLayout: productShowAllLayoutSelector(state),
  }));

  const {
    dispatchGetSellerProductData,
    dispatchGetProductReviews,
    dispatchGetProductQuestions,
    dispatchGetFundComments,
    dispatchGetPaidFund,
  } = useActions({
    dispatchGetSellerProductData: getProductData,
    dispatchGetProductReviews: getProductReviews,
    dispatchGetProductQuestions: getProductQuestions,
    dispatchGetFundComments: getFundComments,
    dispatchGetPaidFund: getPaidFund,
  });

  const handleGetInitialData = React.useCallback(() => {
    AnalyticsClass.getInstance().productShowView({ productId: id });
    setLoadStatus(true);
    dispatchGetSellerProductData(id, cancelToken.current.token)
      .then(rawProductData => {
        const tabElement = productShowLayout?.[
          rawProductData.type
        ].children.find(child => child.type === "product-tab") as
          | Moim.Component.ProductShow.IProductTab
          | undefined;

        if (tabElement) {
          const promises: Promise<void>[] = [];

          if (
            tabElement.children.find(child => child.type === "product-qnas")
          ) {
            promises.push(
              dispatchGetProductQuestions(
                {
                  channelId: rawProductData.sellerId,
                  threadId: rawProductData.id,
                  sort: "createdAt",
                  order: "DESC",
                  limit: QNA_PAGE_ITEM_COUNT,
                  from: 0,
                },
                cancelToken.current.token,
                0,
              ),
            );
          }

          if (
            tabElement.children.find(child => child.type === "product-reviews")
          ) {
            promises.push(
              dispatchGetProductReviews(
                {
                  channelId: rawProductData.sellerId,
                  threadId: rawProductData.id,
                  sort: "createdAt",
                  order: "DESC",
                  limit: REVIEW_PAGE_ITEM_COUNT,
                  from: 0,
                },
                cancelToken.current.token,
                0,
              ),
            );
          }

          if (
            tabElement.children.find(child => child.type === "product-comments")
          ) {
            promises.push(
              dispatchGetFundComments(
                {
                  channelId: rawProductData.sellerId,
                  threadId: rawProductData.id,
                  sort: "createdAt",
                  order: "DESC",
                  limit: QNA_PAGE_ITEM_COUNT,
                  from: 0,
                },
                cancelToken.current.token,
                0,
              ),
            );
          }

          if (
            tabElement.children.find(
              child => child.type === "product-participants",
            )
          ) {
            promises.push(dispatchGetPaidFund("new", rawProductData.id));
          }

          Promise.all(promises);
        }
      })
      .finally(() => {
        setLoadStatus(false);
      });
  }, [
    id,
    dispatchGetSellerProductData,
    cancelToken,
    productShowLayout,
    dispatchGetProductQuestions,
    dispatchGetProductReviews,
    dispatchGetFundComments,
    dispatchGetPaidFund,
  ]);

  // initial loading case
  React.useEffect(() => {
    if (productShowLayout && isLoading === undefined) {
      handleGetInitialData();
    }
  }, [productShowLayout]);

  // id update case
  React.useEffect(() => {
    if (isLoading === false) {
      handleGetInitialData();
    }
  }, [id]);

  return (
    <>
      <PageUpdater
        title={
          product?.name
            ? `${product.name}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <ProductShowComponent
        productId={id}
        isLoading={isLoading}
        product={product}
        productShowLayout={productShowLayout?.[product?.type]}
      />
    </>
  );
};

export default ProductShowContainer;
