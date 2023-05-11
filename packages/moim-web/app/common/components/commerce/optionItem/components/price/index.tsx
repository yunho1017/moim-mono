import * as React from "react";
import styled from "styled-components";
import CurrencyFormatter from "common/components/currencyFormatter";
import {
  AdditionalFeeWithPreview,
  PriceWithAdditionalFees,
} from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";
import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "common/components/designSystem/typos";

interface IProps {
  price: Moim.Commerce.IProductPrice;
  originPrice: Moim.Commerce.IProductPrice;
  rawPrice: number;
  rawOriginPrice: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

const DiscountPercentage = styled.span`
  margin-left: ${px2rem(8)};
  color: ${props => props.theme.color.red700};
  ${B4RegularStyle}
  font-weight: ${props => props.theme.font.medium};
`;

const OriginalPrice = styled.span`
  margin-left: ${px2rem(4)};
  text-decoration: line-through;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
  font-weight: ${props => props.theme.font.medium};
`;

export default function Price({
  price,
  originPrice,
  rawPrice,
  rawOriginPrice,
  additionalFees,
}: IProps) {
  const isOnSale = Boolean(rawOriginPrice) && rawPrice !== rawOriginPrice;

  return (
    <>
      <PriceWithAdditionalFees
        currency={price?.currency}
        price={price?.value}
        additionalFees={additionalFees}
        AdditionalFeeComponent={AdditionalFeeWithPreview}
      />

      {isOnSale && (
        <span>
          <DiscountPercentage>
            {((1 - rawPrice / rawOriginPrice) * 100).toFixed(0)}%
          </DiscountPercentage>
          <OriginalPrice>
            <CurrencyFormatter
              currency={originPrice.currency}
              value={originPrice.value}
            />
          </OriginalPrice>
        </span>
      )}
    </>
  );
}
