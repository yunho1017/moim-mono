import * as React from "react";
import { CancelToken } from "axios";
import { getProductReviews } from "app/actions/commerce";
// hooks
import { useActions } from "app/store";
// components
import ReviewItem from "./reviewItem";
import { Divider } from "../common/styled";
import { ReviewItemWrapper } from "./styled";
import ProductThreadList from "../common/threadList";

import ProductThreadListContext, {
  useProductThreadListContextValue,
} from "../context";
import { REVIEW_PAGE_ITEM_COUNT } from "app/modules/commerce/containers/productShow/constants";

interface IProps {
  reviews: Moim.IIndexedPagingList<string>;
  productId?: Moim.Id;
  sellerId?: Moim.Id;
}

const ProductReviews: React.FC<IProps> = ({ productId, sellerId, reviews }) => {
  const contextValue = useProductThreadListContextValue(
    "review",
    productId,
    sellerId,
  );
  const { dispatchGetProductReviews } = useActions({
    dispatchGetProductReviews: getProductReviews,
  });

  const handleGetProductReviews = React.useCallback(
    (index: number, cancelToken: CancelToken) => {
      if (sellerId && productId) {
        return dispatchGetProductReviews(
          {
            channelId: sellerId,
            threadId: productId,
            sort: "createdAt",
            order: "DESC",
            from: index * REVIEW_PAGE_ITEM_COUNT,
            limit: REVIEW_PAGE_ITEM_COUNT,
          },
          cancelToken,
          index,
        );
      } else {
        return Promise.resolve();
      }
    },
    [sellerId, productId, dispatchGetProductReviews],
  );

  const renderReview = React.useCallback(
    (review: Moim.Forum.IThread) => (
      <ReviewItemWrapper key={`review_${review.id}`}>
        <Divider />
        <ReviewItem type="review" review={review} />
      </ReviewItemWrapper>
    ),
    [],
  );

  return (
    <ProductThreadListContext.Provider value={contextValue}>
      <ProductThreadList
        threads={reviews}
        getThreads={handleGetProductReviews}
        renderThread={renderReview}
        emptyTextKey="product_show_reviews_empty"
        maxCount={REVIEW_PAGE_ITEM_COUNT}
      />
    </ProductThreadListContext.Provider>
  );
};

export default React.memo(ProductReviews);
