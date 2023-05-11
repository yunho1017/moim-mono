import * as React from "react";
import styled from "styled-components";

import {
  ProductItemCellBuyNowButton,
  useBuyNowButtonVisible,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/purchaseGloveBox/components/buttons/buyNow";

import { useStoreState } from "app/store";
import useBuyNowAction from "common/hooks/commerce/useBuyNowAction";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useOpenProductOptionInventoryDialog } from "../optionInventoryDialog/hooks";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
`;

interface IProps {
  className?: string;
  product: Moim.Commerce.IProduct;
  block: Moim.Component.ProductItem.IBuyNowButton;
  onSelect?(): void;
}

const BuyNowButton = ({ className, product, onSelect }: IProps) => {
  const currentUserId = useStoreState(state => state.app.currentUserId);
  const buyNowAction = useBuyNowAction();
  const dispatchSignIn = useHandleSignIn();
  const openOptionInventoryDialog = useOpenProductOptionInventoryDialog(
    product.id,
  );
  const productType = product.type;
  const productStatus = product.status;
  const stockCount = product.stockCount;

  const buyNowButtonVisible = useBuyNowButtonVisible();

  const handleClickBuyNow = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (!currentUserId) {
        dispatchSignIn();
        return;
      }

      if (!product.options?.length) {
        buyNowAction([
          {
            sellerId: product.sellerId,
            items: [
              {
                type: product.shippingRequired
                  ? product.deliveryGroupId
                    ? "deliveryGroup"
                    : "deliveryAlone"
                  : "noDelivery",
                id: product.deliveryGroupId,
                items: [
                  {
                    productId: product.id,
                    quantity: 1,
                    checked: true,
                    disabled: false,
                  },
                ],
              },
            ],
          },
        ]);
      } else {
        openOptionInventoryDialog();
      }

      onSelect?.();
    },
    [
      dispatchSignIn,
      openOptionInventoryDialog,
      product.id,
      product.sellerId,
      product.options,
    ],
  );

  if (!buyNowButtonVisible) {
    return null;
  }
  return (
    <Wrapper key="button_buy_now" className={className}>
      <ProductItemCellBuyNowButton
        buttonSize="s"
        productType={productType}
        productStatus={productStatus}
        productStockCount={stockCount}
        onClick={handleClickBuyNow}
      />
    </Wrapper>
  );
};

export default React.memo(BuyNowButton);
