import * as React from "react";
import { createSelector } from "reselect";
import { FormattedMessage } from "react-intl";
import { TextButton } from "../styled";
import { useStoreState } from "app/store";
import { CartHandlerContext } from "../../../context";
import { IAppState } from "app/rootReducer";
import { flattenCartSellerItem } from "../../../helpers";

const filteredCartItemsSelector = createSelector(
  (state: IAppState) =>
    state.commercePage.cartId
      ? state.entities.commerce_carts[state.commercePage.cartId]
      : null,
  (state: IAppState) => state.entities.commerce_product,
  (state: IAppState) => state.entities.commerce_variants,
  (cart, productEntities, variantEntities) => {
    if (!cart) return null;

    return flattenCartSellerItem(cart.items)
      .map(item => ({
        sellerId: item.sellerId,
        items: item.items.filter(x => {
          const product = productEntities[x.productId];
          const productVariant = x.productVariantId
            ? variantEntities[x.productVariantId]
            : null;

          if (product) {
            if (x.productVariantId) {
              return productVariant
                ? productVariant.status !== "soldOut" &&
                    productVariant.status !== "completed" &&
                    !(
                      productVariant.status === "onSale" &&
                      productVariant.stockCount !== undefined &&
                      productVariant.stockCount === 0
                    )
                : true;
            } else {
              return (
                product.status !== "soldOut" &&
                product.status !== "completed" &&
                !(
                  product.status === "onSale" &&
                  product.stockCount !== undefined &&
                  product.stockCount === 0
                )
              );
            }
          }

          return true;
        }),
      }))
      .filter(item => Boolean(item?.items.length > 0));
  },
);

const DeleteAutoButton: React.FC = () => {
  const { updateMyCart } = React.useContext(CartHandlerContext);
  const filteredCartItems = useStoreState(state =>
    filteredCartItemsSelector(state),
  );
  const handleAutoDeleteClick = React.useCallback(() => {
    if (filteredCartItems) {
      updateMyCart(filteredCartItems);
    }
  }, [filteredCartItems, updateMyCart]);

  return (
    <TextButton onClick={handleAutoDeleteClick}>
      <FormattedMessage id="cart/delete_sold_out_or_end_item" />
    </TextButton>
  );
};

export default React.memo(DeleteAutoButton);
