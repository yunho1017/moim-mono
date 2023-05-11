import * as React from "react";
import CurrencyFormatter from "common/components/currencyFormatter";

import { PointChip, CoinIcon, Wrapper } from "./styled";

import { FormattedMessage } from "react-intl";
import { useStoreState } from "app/store";

interface IProps {
  className?: string;
  productId: string;
  block: Moim.Component.ProductItem.ICredit;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Credit = ({ className, productId, horizontalAlign }: IProps) => {
  const { creditAmount, onlyHasAdditionalFees } = useStoreState(state => {
    const product = state.entities.commerce_product[productId];
    return {
      creditAmount: product?.creditAmount_price,
      onlyHasAdditionalFees: Boolean(
        product.price === 0 && product.additionalFees?.length,
      ),
    };
  });
  if (!creditAmount || creditAmount.value === "0" || onlyHasAdditionalFees) {
    return null;
  }

  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      <PointChip>
        <CoinIcon />
        <FormattedMessage
          id="credit_earning"
          values={{
            price_text: (
              <CurrencyFormatter
                currency={creditAmount.currency}
                value={creditAmount.value}
              />
            ),
          }}
        />
      </PointChip>
    </Wrapper>
  );
};

export default React.memo(Credit);
