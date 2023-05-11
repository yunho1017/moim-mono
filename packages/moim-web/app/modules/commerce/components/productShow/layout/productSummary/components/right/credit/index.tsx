import React from "react";

import { FormattedMessage } from "react-intl";
import { PointContainer, CoinIcon } from "./styled";
import CurrencyFormatter from "common/components/currencyFormatter";
import { ProductShowHeaderContext } from "../../../../../context";

interface IProps {
  currency: string;
  points?: string;
  productType: Moim.Commerce.PRODUCT_TYPE;
  block: Moim.Component.ProductShow.ICredit;
}
const Points = React.memo(
  ({ currency, points, productType, block }: IProps) => {
    if (points === undefined || productType !== "normal") {
      return null;
    }

    return (
      <PointContainer
        hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}
      >
        <CoinIcon />
        <span>
          <FormattedMessage
            id="credit_earning"
            values={{
              price_text: (
                <CurrencyFormatter currency={currency} value={points} />
              ),
            }}
          />
        </span>
      </PointContainer>
    );
  },
);

export default function PointsContainer({
  block,
}: {
  block: Moim.Component.ProductShow.ICredit;
}) {
  const { product } = React.useContext(ProductShowHeaderContext);
  const onlyHasAdditionalFees = Boolean(
    product.price === 0 && product.additionalFees?.length,
  );
  if (
    !product.creditAmount_price ||
    product.creditAmount_price.value === "0" ||
    onlyHasAdditionalFees
  ) {
    return null;
  }

  return (
    <Points
      block={block}
      currency={product.creditAmount_price.currency}
      points={product.creditAmount_price.value}
      productType={product?.type}
    />
  );
}
