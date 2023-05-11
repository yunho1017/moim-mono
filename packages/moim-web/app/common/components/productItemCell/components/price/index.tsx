import React from "react";
import styled from "styled-components";

import {
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";
import { getTextStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { getHorizontalAlignStyle } from "../wrapper/styled";

export const PriceWrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
  textStyle: Moim.Blockit.TEXT_SUB_TYPE;
}>`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  flex-direction: column;
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
  ${props => getTextStyle(props.textStyle)}
`;

interface IProps {
  className?: string;
  price: Moim.Commerce.IProductPrice;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
  block: Moim.Component.ProductItem.IPrice;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Price = ({
  className,
  price,
  additionalFees,
  block,
  horizontalAlign,
}: IProps) => {
  if (!price) {
    return null;
  }

  return (
    <PriceWrapper
      className={className}
      horizontalAlign={horizontalAlign}
      textStyle={block.textStyle ?? "h7"}
    >
      <PriceWithAdditionalFees
        currency={price?.currency}
        price={price?.value}
        additionalFees={additionalFees}
        AdditionalFeeComponent={AdditionalFeeWithPreview}
      />
    </PriceWrapper>
  );
};

export default React.memo(Price);
