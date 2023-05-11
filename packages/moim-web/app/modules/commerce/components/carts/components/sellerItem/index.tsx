import React from "react";
import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
import ProductGroup from "../productGroup";

import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: ${px2rem(16)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;
const SellerName = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(6)} 0;
`;
interface IProps {
  sellerId: string;
  currency: string;
  items: Moim.Commerce.ICartProductGroup[];
  calcResponse: Moim.Commerce.IPaymentCalcItemProductGroup[];
}

const CartSellerItem: React.FC<IProps> = ({
  sellerId,
  currency,
  items,
  calcResponse,
}) => {
  const seller = useStoreState(
    state => state.entities.commerce_seller[sellerId],
  );

  const productGroupListElement = React.useMemo(
    () =>
      items.map((item, index) => {
        const calcResponseItem = calcResponse.find(calcItem =>
          item.type === "noDelivery"
            ? calcItem.type === "noDelivery"
            : item.id === calcItem.id,
        );
        const shippingFee = calcResponseItem?.deliveryFee ?? 0;
        const price = calcResponseItem?.totalPrice ?? 0;

        return (
          <>
            {index !== 0 && <Spacer key={`spacer_${index}`} value={12} />}
            <ProductGroup
              key={item.id ?? "no_delivery"}
              productGroup={item}
              sellerId={sellerId}
              currency={currency}
              price={price}
              shippingFee={shippingFee}
              additionalFees={calcResponseItem?.totalAdditionalFees}
            />
          </>
        );
      }),
    [items, currency, calcResponse],
  );

  return (
    <Wrapper>
      <SellerName>{seller?.name}</SellerName>
      <Spacer value={8} />
      {productGroupListElement}
    </Wrapper>
  );
};

export default CartSellerItem;
