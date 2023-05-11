import * as React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useActions } from "app/store";
import {
  addToCart as addToCartAction,
  updateCart as removeFromCartAction,
} from "app/actions/commerce";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { TextButton as TextButtonBase } from "common/components/designSystem/buttons";
import { B2Regular } from "common/components/designSystem/typos";
import { isEqual } from "lodash";
import { openSnackbar } from "app/actions/snackbar";
import useHubSeller from "./useHubSeller";

const TextButton = styled(TextButtonBase)`
  background-color: transparent;
`;
const Message = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.white1000};
  font-weight: ${props => props.theme.font.bold};
  text-decoration: underline;
`;

const LOCAL_STORAGE_KEY = "CARTS";

export const getStoredCarts = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

export const setStoredCarts = (
  items: Moim.Commerce.IFlattenedCartSellerItem[],
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

function purchaseReadyToCartItem(
  items: Moim.Commerce.IPurchaseReadyItem[],
  initialChecked?: boolean,
): Moim.Commerce.IFlattenedCartSellerItem[] {
  const tmpHeap: Record<
    string,
    Pick<Moim.Commerce.IFlattenedCartSellerItem, "items">
  > = {};
  items.forEach(item => {
    const seller = tmpHeap[item.sellerId];
    const transItem = {
      productId: item.productId,
      productVariantId: item.variantId,
      quantity: item.qty,
      checked: Boolean(initialChecked),
      disabled: false,
    };
    if (seller) {
      seller.items.push(transItem);
    } else {
      tmpHeap[item.sellerId] = {
        items: [transItem],
      };
    }
  });

  return Object.entries(tmpHeap).map(([key, value]) => ({
    sellerId: key,
    items: value.items,
  }));
}

export default function useCartActions() {
  const intl = useIntl();
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser(isEqual);
  const hubSeller = useHubSeller();
  const dispatchSignIn = useHandleSignIn();
  const {
    dispatchAddToCart,
    dispatchRemoveFromCart,
    dispatchOpenSnackbar,
  } = useActions({
    dispatchAddToCart: addToCartAction,
    dispatchRemoveFromCart: removeFromCartAction,
    dispatchOpenSnackbar: openSnackbar,
  });
  const { redirect } = useNativeSecondaryView();
  const handleClickOpenCarts = React.useCallback(() => {
    redirect(new MoimURL.CommerceMyCarts().toString());
  }, [redirect]);

  const successSnackRightElement = React.useMemo(
    () => (
      <TextButton size="s" onClick={handleClickOpenCarts}>
        <Message>
          {intl.formatMessage({
            id: "add_cart/success_message_snack_right_button",
          })}
        </Message>
      </TextButton>
    ),
    [handleClickOpenCarts, intl],
  );

  const handleSuccessAddToCart = React.useCallback(() => {
    switch (hubSeller?.config.afterAddingItemToCart) {
      case "moveToCartForce":
        handleClickOpenCarts();
        break;
      case "giveOptions":
      default:
        dispatchOpenSnackbar({
          text: intl.formatMessage({ id: "add_cart/success_message" }),
          rightIcon: { component: successSnackRightElement },
          timeout: 5000,
        });
        break;
    }
  }, [successSnackRightElement, hubSeller, handleClickOpenCarts]);

  const addToCart = React.useCallback(
    (_productId: Moim.Id, items: Moim.Commerce.IPurchaseReadyItem[]) => {
      if (!currentUser) {
        dispatchSignIn();
        return;
      }
      if (currentGroup?.seller_id && items.length > 0) {
        dispatchAddToCart(
          currentGroup.seller_id,
          purchaseReadyToCartItem(items, true),
          handleSuccessAddToCart,
        );
      }
    },
    [
      currentGroup,
      currentUser,
      dispatchAddToCart,
      dispatchSignIn,
      handleSuccessAddToCart,
    ],
  );
  const removeFromCart = React.useCallback(
    (_productId: Moim.Id, items: Moim.Commerce.IPurchaseReadyItem[]) => {
      if (currentGroup?.seller_id && items.length > 0) {
        dispatchRemoveFromCart(
          currentGroup.seller_id,
          purchaseReadyToCartItem(items),
        );
      }
    },
    [currentGroup, dispatchRemoveFromCart],
  );

  return {
    addToCart,
    removeFromCart,
  };
}
