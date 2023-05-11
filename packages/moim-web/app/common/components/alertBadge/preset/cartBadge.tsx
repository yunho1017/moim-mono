// vendor
import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import { getCarts } from "app/actions/commerce";
// component
import { CommonBadge } from "..";

interface IProps {
  className?: string;
  overrideStyle?: FlattenInterpolation<any>;
}

const EMPTY_ARRAY: Moim.Commerce.ICartSellerItem[] = [];
const CartBadge = styled(CommonBadge)<IProps>`
  ${props => props.overrideStyle}
`;

function CartAlertBadge({ className, overrideStyle }: IProps) {
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const count = useStoreState(state => {
    const cart =
      (state.commercePage.cartId
        ? state.entities.commerce_carts[state.commercePage.cartId]?.items
        : EMPTY_ARRAY) ?? EMPTY_ARRAY;

    return (
      cart.reduce(
        (total, sellerItems) =>
          total +
          sellerItems.items.reduce(
            (total2, item) => total2 + item.items.length,
            0,
          ),
        0,
      ) ?? 0
    );
  });
  const { dispatchGetCarts } = useActions({
    dispatchGetCarts: getCarts,
  });

  const cartBadgeElement = React.useMemo(() => {
    if (count === 0) {
      return null;
    }

    if (count > 99) {
      return (
        <CartBadge className={className} overrideStyle={overrideStyle}>
          99+
        </CartBadge>
      );
    }

    return (
      <CartBadge className={className} overrideStyle={overrideStyle}>
        {count}
      </CartBadge>
    );
  }, [count, overrideStyle, className]);

  React.useEffect(() => {
    if (currentGroup?.seller_id && currentUser?.id) {
      dispatchGetCarts(currentGroup.seller_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  return <>{cartBadgeElement}</>;
}

export default CartAlertBadge;
