import React from "react";
import styled from "styled-components";
import FundTimerBase from "../../../../../components/timer/fundTimer";

import ProductSummaryElementWrapper from "../../wrapper";

const TimerWrapper = styled(ProductSummaryElementWrapper)``;

interface IProps {
  block: Moim.Component.ProductShow.IFundingStatus;
  productType: Moim.Commerce.PRODUCT_TYPE;
  startDateTime?: number;
  endDateTime?: number;
}
export default function FundTimer({
  block,
  productType,
  startDateTime,
  endDateTime,
}: IProps) {
  if (productType !== "fund" || !endDateTime) return null;

  return (
    <TimerWrapper
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <FundTimerBase startDateTime={startDateTime} endDateTime={endDateTime} />
    </TimerWrapper>
  );
}
