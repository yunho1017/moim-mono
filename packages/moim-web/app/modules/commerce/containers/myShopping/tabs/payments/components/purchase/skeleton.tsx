import React from "react";
import { Divider } from "../../styled";
import PurchaseItemSkeleton from "../purchaseItem/skeleton";
import { ListTitle, SellerSkeleton, Wrapper } from "./styled";

const PurchaseSkeleton: React.FC = () => {
  return (
    <Wrapper>
      <ListTitle>
        <SellerSkeleton />
      </ListTitle>
      <Divider />
      <PurchaseItemSkeleton />
      <Divider />
      <PurchaseItemSkeleton />
      <Divider />
      <PurchaseItemSkeleton />
      <Divider />
      <PurchaseItemSkeleton />
    </Wrapper>
  );
};

export default PurchaseSkeleton;
