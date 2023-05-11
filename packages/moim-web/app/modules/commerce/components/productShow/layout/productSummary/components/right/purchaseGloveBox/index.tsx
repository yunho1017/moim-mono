import * as React from "react";

import Component from "./component";
import ProductSummaryElementWrapper from "../../wrapper";

import { putProductVote } from "app/actions/commerce";
import { VoteStatus } from "app/enums";
import { useActions, useStoreState } from "app/store";
import useBuyNowAction from "common/hooks/commerce/useBuyNowAction";
import useCartActions from "common/hooks/commerce/useCartActions";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";

import { ProductShowHeaderContext } from "../../../../../context";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

const ProductShowPurchaseGloveBox: React.FC<{
  block: Moim.Component.ProductShow.IOptionSelection;
}> = ({ block }) => {
  const { productId, product } = React.useContext(ProductShowHeaderContext);
  const openShareDialog = useOpenSNSShareDialog(location.href);

  const { dispatchPutProductVote } = useActions({
    dispatchPutProductVote: putProductVote,
  });
  const { currentUserId } = useStoreState(state => ({
    currentUserId: state.app.currentUserId,
  }));

  const { addToCart } = useCartActions();
  const buyNowAction = useBuyNowAction();
  const dispatchSignIn = useHandleSignIn();

  const handleLikeClick = React.useCallback(() => {
    if (!currentUserId) {
      dispatchSignIn();
      return;
    }
    // Product support Like type
    if (product) {
      switch (product.vote?.type) {
        case VoteStatus.POSITIVE: {
          AnalyticsClass.getInstance().productShowProductLikeCancel({
            productId: product.id ?? "",
          });

          dispatchPutProductVote(
            productId,
            VoteStatus.POSITIVE,
            VoteStatus.NONE,
          );
          break;
        }

        default: {
          AnalyticsClass.getInstance().productShowProductLike({
            productId: product.id ?? "",
          });

          dispatchPutProductVote(
            productId,
            VoteStatus.NONE,
            VoteStatus.POSITIVE,
          );
          break;
        }
      }
    }
  }, [
    currentUserId,
    dispatchPutProductVote,
    dispatchSignIn,
    productId,
    product,
  ]);

  const handleAddCartClick = React.useCallback(
    (_productId: Moim.Id, items: Moim.Commerce.IPurchaseReadyItem[]) => {
      addToCart(_productId, items);
      AnalyticsClass.getInstance().productBuyDialogCartSelect({
        productId: _productId,
      });
    },
    [addToCart],
  );

  const handleBuyNowClick = React.useCallback(
    (_: Moim.Id, items: Moim.Commerce.IPurchaseReadyItem[]) => {
      const itemsObj = items.reduce((acc, value) => {
        if (acc[value.sellerId]) {
          acc[value.sellerId].push({
            productId: value.productId,
            quantity: value.qty,
            productVariantId: value.variantId,
            checked: true,
            disabled: false,
          });
        } else {
          acc[value.sellerId] = [
            {
              productId: value.productId,
              quantity: value.qty,
              productVariantId: value.variantId,
              checked: true,
              disabled: false,
            },
          ];
        }

        return acc;
      }, {} as Record<string, Moim.Commerce.ICartItemDatum[]>);

      buyNowAction(
        Object.entries(itemsObj).map(([key, value]) => ({
          sellerId: key,
          items: [
            {
              type: product.shippingRequired
                ? product.deliveryGroupId
                  ? "deliveryGroup"
                  : "deliveryAlone"
                : "noDelivery",
              id: product.deliveryGroupId,
              items: value,
            },
          ],
        })),
        false,
      );

      AnalyticsClass.getInstance().productBuyDialogBuySelect({
        productId: product.id,
      });
    },
    [buyNowAction, product],
  );

  return (
    <ProductSummaryElementWrapper
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <Component
        product={product}
        onLikeClick={handleLikeClick}
        onFavoriteClick={handleLikeClick}
        onShareClick={openShareDialog}
        onAddCartClick={handleAddCartClick}
        onBuyNowClick={handleBuyNowClick}
      />
    </ProductSummaryElementWrapper>
  );
};

export default React.memo(ProductShowPurchaseGloveBox);
