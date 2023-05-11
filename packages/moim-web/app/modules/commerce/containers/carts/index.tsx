import * as React from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { isEqual } from "lodash";
import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";
import CartsComponent from "../../components/carts";
import Wishlist from "../myShopping/tabs/wishlist";

import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useBuyNowAction from "common/hooks/commerce/useBuyNowAction";
import { getCarts, updateCart, paymentCalc } from "app/actions/commerce";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import useGroupTexts from "common/hooks/useGroupTexts";
import { AppBarStickyWrapperStyle, StyledRoutedMoimTab } from "./styled";
import {
  checkedFilterCartSellerItem,
  checkedFilterGroupedByDeliveryOption,
  flattenCartSellerItem,
  groupingByDeliveryOption,
  groupingByDeliveryOptionCart,
} from "../../components/carts/helpers";
import { IRoutedTab } from "common/components/tab/routed";
import { MoimURL } from "common/helpers/url";

const DEBOUNCED_TIME = 300;

const Carts: React.FC = () => {
  const [isLoading, setLoading] = React.useState<boolean | undefined>(
    undefined,
  );

  const [calcResponse, setCalcResponse] = React.useState<
    Moim.Commerce.IPaymentCalcResponse | undefined
  >(undefined);
  const { cancelTokenSource, handleCancel } = useCancelTokenWithCancelHandler();
  const {
    cancelTokenSource: updateCartCancelToken,
    handleCancel: handleUpdateCartCancel,
  } = useCancelTokenWithCancelHandler();
  const currentGroup = useCurrentGroup();
  const buyNowAction = useBuyNowAction();

  const cart = useStoreState<Moim.Commerce.ICartResponse | undefined>(
    state =>
      state.commercePage.cartId
        ? state.entities.commerce_carts[state.commercePage.cartId]
        : undefined,
    isEqual,
  );

  const {
    dispatchGetCarts,
    dispatchUpdateCart,
    dispatchPaymentCalc,
  } = useActions({
    dispatchGetCarts: getCarts,
    dispatchUpdateCart: updateCart,
    dispatchPaymentCalc: paymentCalc,
  });

  const calculateMyCart = React.useCallback(
    debounce(
      ({
        items,
        userCoupons,
        ...rest
      }: {
        items?: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[];
        userCoupons?: string[];
        selectRecommendedCoupon?: boolean;
      }) => {
        if (currentGroup?.seller_id) {
          const _items =
            items ??
            checkedFilterGroupedByDeliveryOption(
              groupingByDeliveryOption(cart?.items ?? []),
            );

          const _userCoupons =
            userCoupons ??
            calcResponse?.userCoupons.reduce<string[]>((result, current) => {
              if (current.used) {
                result.push(current.id);
              }
              return result;
            }, []);

          let newToken = cancelTokenSource.current;
          if (!axios.isCancel(newToken.token.reason)) {
            newToken = handleCancel();
            dispatchPaymentCalc(
              currentGroup.seller_id,
              {
                ...rest,
                items: _items,
                userCouponIds: _userCoupons?.length ? _userCoupons : undefined,
                useCoinMaxPrice: true,
              },
              newToken.token,
            ).then(res => {
              setCalcResponse(res);
            });
          }
        }
      },
      DEBOUNCED_TIME,
    ),
    [
      cancelTokenSource,
      currentGroup,
      dispatchPaymentCalc,
      cart?.items,
      handleCancel,
    ],
  );

  const updateMyCart = React.useCallback(
    debounce(
      async (
        items: Moim.Commerce.IFlattenedCartSellerItem[],
        successMessage?: string,
      ) => {
        try {
          if (currentGroup?.seller_id) {
            let newToken = updateCartCancelToken.current;
            if (newToken && !axios.isCancel(newToken.token.reason)) {
              newToken = handleUpdateCartCancel();
              await dispatchUpdateCart(
                currentGroup.seller_id,
                items,
                successMessage,
                newToken.token,
              );
            }
          }
        } catch (err) {
          throw err;
        }
      },
      DEBOUNCED_TIME,
    ),
    [
      currentGroup?.seller_id,
      dispatchUpdateCart,
      updateCartCancelToken,
      handleUpdateCartCancel,
    ],
  );

  const onChangeProductGroup = React.useCallback(
    (
      {
        sellerId,
        type,
        id,
      }: {
        sellerId: string;
        type: Moim.Commerce.DeliveryProductGroupType;
        id?: Moim.Id;
      },

      items: (
        items: Moim.Commerce.ICartItemDatum[],
      ) => Moim.Commerce.ICartItemDatum[],
    ) => {
      if (cart) {
        const simpleItems = cart.items.map<Moim.Commerce.ICartSellerItem>(
          sellerItem => {
            if (sellerItem.sellerId === sellerId) {
              return {
                sellerId,
                items: sellerItem.items.map(productGroup => {
                  if (
                    productGroup.type === "noDelivery"
                      ? type === "noDelivery"
                      : productGroup.id === id
                  ) {
                    return {
                      ...productGroup,
                      items: items(productGroup.items),
                    };
                  }

                  return productGroup;
                }),
              };
            }

            return sellerItem;
          },
        );
        updateMyCart(flattenCartSellerItem(simpleItems));
      }
    },
    [cart, updateMyCart],
  );

  const handleClickBuyNow = React.useCallback(() => {
    if (cart) {
      const simpleItems = checkedFilterCartSellerItem(cart.items);

      buyNowAction(
        simpleItems,
        true,
        calcResponse?.userCoupons
          .filter(userCoupon => userCoupon.used)
          .map(userCoupon => userCoupon.id),
        calcResponse?.usedCoin?.coins?.map(coin => ({
          coinId: coin.coinId,
          amount: coin.usedAmount,
        })),
      );
    }
  }, [buyNowAction, cart, calcResponse?.userCoupons, calcResponse?.usedCoin]);

  const initialFetch = React.useCallback(
    debounce(() => {
      if (currentGroup?.seller_id) {
        setLoading(true);
        dispatchGetCarts(currentGroup.seller_id).finally(() => {
          setLoading(false);
        });
      }
    }, DEBOUNCED_TIME),
    [currentGroup, dispatchGetCarts],
  );

  React.useEffect(() => {
    if (isLoading === undefined) {
      initialFetch();
    }
  }, []);

  React.useEffect(() => {
    if (cart) {
      const result = groupingByDeliveryOptionCart(cart)?.items;
      calculateMyCart({
        items: result
          ? checkedFilterGroupedByDeliveryOption(result)
          : undefined,
        selectRecommendedCoupon: calcResponse === undefined,
      });
    }
  }, [cart]);

  return (
    <CartsComponent
      cart={cart}
      calcResponse={calcResponse}
      onChangeProductGroup={onChangeProductGroup}
      calculateMyCart={calculateMyCart}
      updateMyCart={updateMyCart}
      onClickBuyNow={handleClickBuyNow}
    />
  );
};

const Container: React.FC = () => {
  const myShoppingWishListText = useGroupTexts(
    "my_shopping_wishlist_menu_title",
  );
  const tabs: IRoutedTab[] = React.useMemo(
    () => [
      {
        key: "cart",
        url: MoimURL.CommerceMyCarts,
        page: () => <Carts />,
        title: <FormattedMessage id="cart/page_title" />,
        default: true,
      },
      {
        key: "wishlist",
        url: MoimURL.CommerceMyCartsWishlist,
        page: Wishlist,
        title: myShoppingWishListText?.singular ?? (
          <FormattedMessage id="my_shopping_wishlist_menu_title" />
        ),
      },
    ],
    [myShoppingWishListText],
  );

  return (
    <DefaultLayout
      appBar={{
        enableScrollParallax: true,
        wrapperStickyStyle: AppBarStickyWrapperStyle,
      }}
    >
      <StyledRoutedMoimTab tabs={tabs} stickyData={{ topPosition: 45 }} />
    </DefaultLayout>
  );
};
export default React.memo(Container);
