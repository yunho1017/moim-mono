import * as React from "react";
import { useIntl } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import ControlHead from "./components/controlHead";
import CartSellerItem from "./components/sellerItem";
import Footer from "./components/footer";
import UserCoupons from "./components/userCoupons";
import { Wrapper, List, EmptyCart, Divider } from "./styled";
import { useStoreState } from "app/store";
import { CartHandlerContext } from "./context";
import {
  getCartItemBuyableSelector,
  getCartItemsFromFlattenedCart,
} from "./helpers";

interface IProps {
  cart: Moim.Commerce.ICartResponse | undefined;
  calcResponse: Moim.Commerce.IPaymentCalcResponse | undefined;

  onChangeProductGroup(
    options: {
      sellerId: string;
      type: Moim.Commerce.DeliveryProductGroupType;
      id?: Moim.Id;
    },

    items: (
      items: Moim.Commerce.ICartItemDatum[],
    ) => Moim.Commerce.ICartItemDatum[],
  ): void;
  updateMyCart(
    items: Moim.Commerce.IFlattenedCartSellerItem[],
    successMessage?: string,
  ): void;
  calculateMyCart(payload: {
    items?: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[];
    userCoupons?: string[];
    selectRecommendedCoupon?: boolean;
  }): void;
  onClickBuyNow(): void;
}

const CartsComponent: React.FC<IProps> = ({
  cart,
  calcResponse,
  onChangeProductGroup,
  calculateMyCart,
  updateMyCart,
  onClickBuyNow,
}) => {
  const intl = useIntl();

  const { currency, isAllChecked } = useStoreState(state => {
    const buyableCartItems = getCartItemsFromFlattenedCart(
      cart?.items ?? [],
    ).filter(cartItem => getCartItemBuyableSelector(cartItem, state));
    return {
      currency:
        (cart?.sellerId
          ? state.entities.commerce_seller[cart?.sellerId].currency
          : "KRW") ?? "KRW",
      isAllChecked: buyableCartItems?.length
        ? buyableCartItems.every(item => item.checked)
        : false,
    };
  });

  const cartItemElements = React.useMemo(
    () =>
      (cart?.items ?? []).map((item, index) => {
        const calcResponseItem = calcResponse?.items.find(
          calcItem => calcItem.sellerId === item.sellerId,
        );
        return (
          <>
            {index !== 0 && <Divider key={`divider_${index}`} />}
            <CartSellerItem
              key={item.sellerId}
              currency={currency}
              sellerId={item.sellerId}
              items={item.items}
              calcResponse={calcResponseItem?.items ?? []}
            />
          </>
        );
      }),
    [calcResponse?.items, cart, currency],
  );

  const shippingFee = React.useMemo(
    () =>
      calcResponse?.items.reduce((acc, value) => acc + value.deliveryFee, 0),
    [calcResponse?.items],
  );

  const contextValues = React.useMemo(
    () => ({
      onChangeProductGroup,
      calculateMyCart,
      updateMyCart,
    }),
    [onChangeProductGroup, calculateMyCart, updateMyCart],
  );

  if (!cart || cart?.items.length === 0) {
    return (
      <>
        <Wrapper>
          <EmptyCart>
            <span>{intl.formatMessage({ id: "cart/empty" })}</span>
          </EmptyCart>
        </Wrapper>
      </>
    );
  }

  return (
    <CartHandlerContext.Provider value={contextValues}>
      <Wrapper>
        <ControlHead
          totalItemCount={cart?.items.length ?? 0}
          isAllChecked={isAllChecked}
        />
        <List>{cartItemElements}</List>
        <Spacer value={8} />
        <UserCoupons
          currency={currency}
          userCoupons={calcResponse?.userCouponsV2}
          couponDiscount={calcResponse?.couponDiscount}
        />
        <Spacer value={8} />
        <DefaultDivider />
        <Spacer value={8} />
        <Footer
          currency={currency}
          shippingFee={shippingFee ?? 0}
          totalPrice={calcResponse?.totalPrice ?? 0}
          totalUsedCoinPrice={calcResponse?.usedCoin?.totalPrice ?? 0}
          totalAdditionalFees={calcResponse?.totalAdditionalFees}
          coupon={calcResponse?.couponDiscount ?? 0}
          points={calcResponse?.estimatedCreditAmount ?? 0}
          usedCoins={calcResponse?.usedCoin?.coins}
          onClickBuyNow={onClickBuyNow}
        />
      </Wrapper>
    </CartHandlerContext.Provider>
  );
};

export default CartsComponent;
