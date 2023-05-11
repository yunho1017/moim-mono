import * as React from "react";

import { TabContentSkeleton } from "../../skeleton";
import ProductTab from "../../components/productTab";

import useDetailTab from "./detail";
import useQnATab from "./qna";
import useRefundTab from "./refund";
import useReviewTab from "./review";
import useCommentTab from "./comment";
import useParticipantTab from "./participant";
import { useStoreState } from "app/store";

import { useHandleSignIn } from "common/hooks/useHandleSign";

export const TabLoadingWrapper = React.memo(
  ({
    isLoading,
    children,
  }: React.PropsWithChildren<{
    isLoading: boolean | undefined;
  }>) => {
    if (isLoading !== false) {
      return <TabContentSkeleton />;
    }

    return <>{children}</>;
  },
);

interface IProps {
  productId: string;
  isLoading: boolean | undefined;
  block: Moim.Component.ProductShow.IProductTab;
}

export const defaultPagingListValue: Moim.IIndexedPagingList<string> = {
  items: [],
  total: 0,
  currentIndex: 0,
};

function ProductTabContainer({ isLoading, productId, block }: IProps) {
  const dispatchSignIn = useHandleSignIn();
  const { product, content, currentUserId } = useStoreState(state => ({
    product: state.entities.commerce_product[productId],
    content: state.entities.threads[productId]?.content,
    currentUserId: state.app.currentUserId,
  }));

  const productSeller = useStoreState(state =>
    product ? state.entities.commerce_seller[product.sellerId] : undefined,
  );

  const signCheckCallback = React.useCallback(
    (action: VoidFunction) => {
      if (!currentUserId) {
        dispatchSignIn();
        return;
      }

      action();
    },
    [currentUserId, dispatchSignIn],
  );

  const detailTabContent = useDetailTab(
    isLoading,
    product?.type,
    content,
    product?.detailImages,
    product?.details,
  );
  const refundTabContent = useRefundTab(
    isLoading,
    product?.shippingRequired,
    product?.returnReplacementPolicy ?? productSeller?.returnReplacementPolicy,
  );
  const participantTabContent = useParticipantTab(
    isLoading,
    productId,
    product?.buyersCount,
    product?.sellerId,
  );

  const reviewTabContent = useReviewTab(isLoading, product);
  const qnaTabContent = useQnATab(isLoading, product, signCheckCallback);
  const commentTabContent = useCommentTab(
    isLoading,
    product,
    signCheckCallback,
  );

  const tabs = React.useMemo(() => {
    return block.children.map(block => {
      switch (block.type) {
        case "product-comments":
          return commentTabContent;
        case "product-detail":
          return detailTabContent;
        case "product-participants":
          return participantTabContent;
        case "product-refund":
          return refundTabContent;
        case "product-reviews":
          return reviewTabContent;
        case "product-qnas":
          return qnaTabContent;
      }
    });
  }, [
    block.children,
    commentTabContent,
    detailTabContent,
    product,
    qnaTabContent,
    refundTabContent,
    reviewTabContent,
    participantTabContent,
  ]);

  return <ProductTab tabs={tabs} productId={productId} />;
}
export default React.memo(ProductTabContainer);
