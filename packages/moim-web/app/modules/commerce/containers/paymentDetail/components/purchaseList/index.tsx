import React from "react";
import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
import ProductGroup from "./productGroup";

import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
`;
const SellerName = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(6)} 0;
`;
interface IProps {
  purchase: Moim.Commerce.IPurchase;
}

const PurchaseSellerItem: React.FC<IProps> = ({ purchase }) => {
  const seller = useStoreState(
    state => state.entities.commerce_seller[purchase.sellerId],
  );

  const productGroupListElement = React.useMemo(
    () =>
      purchase.items?.map((item, index) => {
        const price = item.totalPrice ?? 0;
        const deliveryFee = item.deliveryFee ?? 0;

        return (
          <>
            {index !== 0 && <Spacer key={`spacer_${index}`} value={12} />}
            <ProductGroup
              key={`${item.type}_${index}`}
              deliveryType={item.type}
              purchaseItems={item.items}
              status={purchase.status}
              currency={purchase.currency}
              price={price}
              deliveryFee={deliveryFee}
              additionalFees={item.totalAdditionalFees}
            />
          </>
        );
      }),
    [purchase],
  );
  return (
    <Wrapper>
      <SellerName>{seller?.name}</SellerName>
      <Spacer value={8} />
      {productGroupListElement}
    </Wrapper>
  );
};

export default PurchaseSellerItem;
