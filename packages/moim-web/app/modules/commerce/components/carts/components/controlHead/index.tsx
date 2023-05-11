import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "common/components/designSystem/inputs";
import {
  Wrapper,
  AllSelectContainer,
  AllSelectLabel,
  TextButton,
} from "./styled";
import DeleteAutoButton from "./components/deleteAutoButton";
import { useStoreState } from "app/store";
import { CartHandlerContext } from "../../context";
import { flattenCartSellerItem } from "../../helpers";

interface IProps {
  totalItemCount: number;
  isAllChecked: boolean;
}

const ControlHead: React.FC<IProps> = ({ totalItemCount, isAllChecked }) => {
  const cart = useStoreState(state =>
    state.commercePage.cartId
      ? state.entities.commerce_carts[state.commercePage.cartId]
      : null,
  );
  const { updateMyCart } = React.useContext(CartHandlerContext);

  const handleSelectAllChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const status = e.currentTarget.checked;
      if (cart) {
        const simpleItems = flattenCartSellerItem(cart.items).map(item => ({
          sellerId: item.sellerId,
          items: item.items.map(x => ({ ...x, checked: status })),
        }));

        updateMyCart(simpleItems);
      }
    },
    [cart, updateMyCart],
  );

  const handleSelectDeleteClick = React.useCallback(() => {
    if (cart) {
      const simpleItems = flattenCartSellerItem(cart.items)
        .map(item => {
          const newItems = item.items.filter(x => !x.checked);
          if (newItems.length === 0) {
            return null;
          }

          return {
            sellerId: item.sellerId,
            items: newItems,
          };
        })
        .filter((item): item is Moim.Commerce.IFlattenedCartSellerItem =>
          Boolean((item?.items?.length ?? 0) > 0),
        );
      updateMyCart(simpleItems);
    }
  }, [cart, updateMyCart]);

  return (
    <Wrapper>
      <AllSelectContainer>
        <Checkbox
          id="all"
          checked={isAllChecked}
          onChange={handleSelectAllChange}
        />
        <AllSelectLabel htmlFor="all">
          <FormattedMessage
            id="cart/select_all"
            values={{ count: totalItemCount }}
          />
        </AllSelectLabel>
      </AllSelectContainer>

      <TextButton onClick={handleSelectDeleteClick}>
        <FormattedMessage id="cart/delete_selected_item" />
      </TextButton>
      <DeleteAutoButton />
    </Wrapper>
  );
};

export default ControlHead;
