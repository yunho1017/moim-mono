import * as React from "react";
import styled from "styled-components";

import SalesStatusChip from "./components/salesStatusChip";
import Stock from "./components/stock";
import SalesDuration from "./components/salesDuration";
import ProductSummaryElementWrapper from "../../wrapper";

import { px2rem } from "common/helpers/rem";

const SalesInformationContainer = styled(ProductSummaryElementWrapper)`
  padding: ${px2rem(4)} ${px2rem(16)};
  display: flex;
  align-items: center;

  gap: ${px2rem(16)};
`;

interface IProps {
  block: Moim.Component.ProductShow.ISalesInformation;
  productType: Moim.Commerce.PRODUCT_TYPE;
  productStatus: Moim.Commerce.PRODUCT_STATUS;

  soldCount: number;
  stockCount?: number;

  startDateTime?: number;
  endDateTime?: number;
}
const SalesInformation: React.FC<IProps> = ({
  block,
  productType,
  productStatus,

  soldCount,
  stockCount,

  startDateTime,
  endDateTime,
}) => {
  return (
    <SalesInformationContainer
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <SalesStatusChip
        productType={productType}
        productStatus={productStatus}
      />

      <Stock soldCount={soldCount} stockCount={stockCount} />
      <SalesDuration startDateTime={startDateTime} endDateTime={endDateTime} />
    </SalesInformationContainer>
  );
};

export default React.memo(SalesInformation);
