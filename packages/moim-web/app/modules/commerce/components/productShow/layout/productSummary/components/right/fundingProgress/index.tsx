import { useStoreState } from "app/store";
import React from "react";
import FundProgress from "../../../../../components/fundProgress";
import ProductSummaryElementWrapper from "../../wrapper";

interface IProps {
  block: Moim.Component.ProductShow.IProgressBar;
  currency: string;
  productStatus: Moim.Commerce.PRODUCT_STATUS;
  soldAmount?: number;
  goalAmount?: number;
  buyersCount?: number;
  productId: string;
}
export default function FundingProgress({
  block,
  productId,
  buyersCount,
  currency,
  goalAmount,
  productStatus,
  soldAmount,
}: IProps) {
  const { participants } = useStoreState(state => ({
    participants: state.commerce.productParticipants[productId],
  }));
  if (!goalAmount) {
    return null;
  }

  return (
    <ProductSummaryElementWrapper
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <FundProgress
        status={productStatus}
        goalAmount={goalAmount}
        soldAmount={soldAmount ?? 0}
        buyersCount={buyersCount ?? 0}
        currency={currency}
        buyers={participants?.data ?? []}
      />
    </ProductSummaryElementWrapper>
  );
}
