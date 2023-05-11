import React from "react";
import CurrencyFormatter from "common/components/currencyFormatter";

import { HorizontalStackContainer, Percentage, Price } from "./styled";
import { getTextComponent } from "common/components/designSystem/typos";

interface IProps {
  originPrice?: Moim.Commerce.IProductPrice;
  rawOriginPrice?: number;
  rawPrice: number;
  block: Moim.Component.ProductShow.IDiscountPrice;
}
export default function DiscountPrice({
  originPrice,
  rawPrice,
  rawOriginPrice,
  block,
}: IProps) {
  if (!(rawOriginPrice && rawOriginPrice !== rawPrice)) {
    return null;
  }

  const Text = getTextComponent(block.textStyle ?? "body3");

  return (
    <HorizontalStackContainer
      hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
    >
      <Text>
        <Percentage>
          {((1 - rawPrice / rawOriginPrice) * 100).toFixed(0)}%
        </Percentage>
        <Price>
          <CurrencyFormatter
            currency={originPrice?.currency}
            value={originPrice?.value}
          />
        </Price>
      </Text>
    </HorizontalStackContainer>
  );
}
