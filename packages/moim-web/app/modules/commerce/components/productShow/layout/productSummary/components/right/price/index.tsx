import React from "react";
import styled from "styled-components";

import { px2rem } from "common/helpers/rem";

import ProductSummaryElementWrapper from "../../wrapper";
import {
  AdditionalFeeWithLargePreview,
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "./additionalFee";

import { getTextStyle } from "common/components/designSystem/typos";

const Wrapper = styled(ProductSummaryElementWrapper)<{
  textStyle: Moim.Blockit.TEXT_SUB_TYPE;
}>`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  display: flex;
  flex-wrap: wrap;
  ${props => getTextStyle(props.textStyle)}
`;

interface IProps {
  price: Moim.Commerce.IProductPrice;
  block: Moim.Component.ProductShow.IPrice;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

export default function Price({ price, block, additionalFees }: IProps) {
  const textStyle = block.textStyle ?? "h2";

  return (
    <Wrapper
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
      textStyle={textStyle}
    >
      <PriceWithAdditionalFees
        currency={price?.currency}
        price={price?.value}
        additionalFees={additionalFees}
        AdditionalFeeComponent={
          textStyle === "h1" || textStyle === "h2"
            ? AdditionalFeeWithLargePreview
            : AdditionalFeeWithPreview
        }
      />
    </Wrapper>
  );
}
