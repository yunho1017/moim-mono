import { FormattedMessage } from "react-intl";
import React, { useCallback } from "react";
import useCartActions from "common/hooks/commerce/useCartActions";
import { useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import {
  useNativeSecondaryView,
  useRedirectToMoimURL,
} from "common/hooks/useSecondaryView";
import { ActionCreators as CommerceActionCreators } from "app/actions/commerce";
import { getCommerceAPIDomain } from "common/helpers/domainMaker";
import { MoimURL } from "common/helpers/url";
import { IButton } from "common/components/commerce/optionItem/buttonCase/payment";
import validateUrl from "common/helpers/validator/url";
import useGroupTexts from "common/hooks/useGroupTexts";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";

const WINDOW_OPTION: { [key: string]: number } = {
  width: 500,
  height: 700,
  left: window.screen.width / 2 - 500 / 2,
  top: window.screen.height / 2 - 700 / 2,
};

const WINDOW_OPTION_STRING = Object.entries(WINDOW_OPTION)
  .map(([key, value]) => `${key}=${value}`)
  .join(",");

export const useDeliveryTrackingButton = (deliveryId?: string): IButton => {
  const handler = useCallback(() => {
    if (!deliveryId) {
      return;
    }

    const url = `${getCommerceAPIDomain()}/deliveries/${deliveryId}`;
    window.open(url, "_blank", WINDOW_OPTION_STRING);
  }, [deliveryId]);

  return {
    text: <FormattedMessage id="button_delivery_tracking" />,
    style: "general",
    handler,
  };
};

export const useAddCartButton = (
  purchaseItem: Moim.Commerce.IPurchaseItem,
): IButton => {
  const { addToCart } = useCartActions();
  const handler = useCallback(() => {
    const { productId, sellerId, quantity, productVariantId } = purchaseItem;
    addToCart(purchaseItem.productId, [
      { productId, sellerId, variantId: productVariantId, qty: quantity },
    ]);
  }, [purchaseItem, addToCart]);

  return {
    text: <FormattedMessage id="button_add_to_cart" />,
    style: "general",
    handler,
  };
};

export const useOpenReviewWriteDialog = (
  purchaseItem: Moim.Commerce.IPurchaseItem,
  purchaseId?: string,
) => {
  const { openReviewWrite } = useActions({
    openReviewWrite: CommerceActionCreators.openReviewWriteDialog,
  });
  return useCallback(() => {
    if (purchaseId) {
      openReviewWrite({
        mode: "new",
        productId: purchaseItem.productId,
        sellerId: purchaseItem.sellerId,
        purchaseId,
        meta: {
          purchaseItem: {
            id: purchaseItem.id,
            userId: purchaseItem.userId,
          },
          purchaseItemSnap: {
            productId: purchaseItem.productId,
            productName: purchaseItem.productName,
            quantity: purchaseItem.quantity,
            checkoutPrice: purchaseItem.price,
            optionsLabel: purchaseItem.productVariantValue,
            productImage: purchaseItem.imageUrl
              ? {
                  web: purchaseItem.imageUrl,
                  mobile: purchaseItem.imageUrl,
                }
              : undefined,
          },
        },
      });
    }
  }, [
    openReviewWrite,
    purchaseItem.productId,
    purchaseItem.sellerId,
    purchaseId,
    purchaseItem.id,
    purchaseItem.userId,
    purchaseItem.productName,
    purchaseItem.quantity,
    purchaseItem.price,
    purchaseItem.productVariantValue,
    purchaseItem.imageUrl,
  ]);
};
export const useReviewWriteButton = (handler: () => void): IButton => {
  return {
    text: <FormattedMessage id={"button_write_review"} />,
    style: "primary",
    handler,
  };
};

export const useManualPurchaseConfirmButton = (
  handler: () => void,
): IButton => {
  return {
    text: <FormattedMessage id="button_confirm_purchase" />,
    style: "primary",
    handler,
  };
};

export const useMyReviewButton = (
  productId: string,
  reviewId?: string,
): IButton => {
  const isMobile = useIsMobile();
  const { close } = useNativeSecondaryView();
  const redirect = useRedirect();

  const handler = useCallback(() => {
    if (isMobile) {
      close();
    }
    if (reviewId) {
      redirect(
        new MoimURL.CommerceProductShowReview({
          id: productId,
          threadId: reviewId,
        }).toString(),
      );
    }
  }, [close, redirect, isMobile, productId, reviewId]);

  return {
    text: <FormattedMessage id="button_my_review" />,
    style: "primary",
    isActive: true,
    handler,
  };
};

export const useFundingSignButton = (url?: string): IButton => {
  const handler = useCallback(() => {
    if (!url) {
      return;
    }

    window.open(url, "_self", WINDOW_OPTION_STRING);
  }, [url]);

  return {
    text: <FormattedMessage id="button_funding_sign" />,
    style: "primary",
    handler,
  };
};

export const useSellerCustomButton = (
  customButtons?: Moim.Commerce.ISellerCustomButton[],
): IButton | undefined => {
  const link = customButtons?.[customButtons?.length - 1]?.link;
  const currentGroup = useCurrentGroup();
  const redirect = useRedirectToMoimURL();
  const sellerUpdatesButtonText = useGroupTexts("button_seller_updates");
  const handler = useCallback(() => {
    if (!link || !validateUrl(link)) {
      return;
    }

    if (currentGroup?.url && link.startsWith(currentGroup?.url)) {
      redirect(link.replace(currentGroup.url, ""));
    } else {
      window.open(link, "_blank");
    }
  }, [redirect, link, currentGroup?.url]);

  if (!link || !validateUrl(link)) {
    return undefined;
  }

  return {
    text: sellerUpdatesButtonText?.singular,
    style: "general",
    handler,
  };
};
