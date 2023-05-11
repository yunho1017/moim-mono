import * as React from "react";
import styled from "styled-components";

import {
  ProductItemCellAddCartButton,
  useAddCartButtonVisible,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/purchaseGloveBox/components/buttons/addCart";
import { useStoreState } from "app/store";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useOpenProductOptionInventoryDialog } from "../optionInventoryDialog/hooks";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
`;

interface IProps {
  product: Moim.Commerce.IProduct;
  block: Moim.Component.ProductItem.ICartButton;
  className?: string;
  onSelect?(): void;
}

const AddCartButton = ({ className, product, onSelect }: IProps) => {
  const currentUserId = useStoreState(state => state.app.currentUserId);
  const dispatchSignIn = useHandleSignIn();
  const openOptionInventoryDialog = useOpenProductOptionInventoryDialog(
    product.id,
  );
  const productType = product.type;
  const productStatus = product.status;
  const stockCount = product.stockCount;

  const addCartButtonVisible = useAddCartButtonVisible();

  const handleClickAddToCard = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (!currentUserId) {
        dispatchSignIn();
        return;
      }

      openOptionInventoryDialog();
      onSelect?.();
    },
    [currentUserId, dispatchSignIn, onSelect, openOptionInventoryDialog],
  );
  if (!addCartButtonVisible) {
    return null;
  }
  return (
    <Wrapper key="button_buy_now" className={className}>
      <ProductItemCellAddCartButton
        key="button_add_to_cart"
        className={className}
        buttonSize="s"
        productType={productType}
        productStatus={productStatus}
        productStockCount={stockCount}
        onClick={handleClickAddToCard}
      />
    </Wrapper>
  );
};

export default React.memo(AddCartButton);
