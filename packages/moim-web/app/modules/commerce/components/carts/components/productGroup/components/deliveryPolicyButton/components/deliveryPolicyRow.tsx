import React from "react";

import { DeliveryPolicyPriceRow } from "../styled";
import CurrencyFormatter from "common/components/currencyFormatter";

import { useIntlShort } from "common/hooks/useIntlShort";

interface IProps {
  isLast: boolean;
  isFirst: boolean;
  currency: string;
  price: { lt?: number; gte?: number; price: number };
}
const DeliveryPolicyRow: React.FC<IProps> = ({
  isLast,
  isFirst,
  price,
  currency,
}) => {
  const intl = useIntlShort();
  let left: React.ReactNode = null;

  if (isLast && price.lt === undefined) {
    left = intl("shipping_price_dialog_column_title_product_price_last", {
      product_price: (
        <CurrencyFormatter currency={currency} value={price.gte ?? 0} />
      ),
    });
  } else if (isFirst && (price.gte ?? 0) === 0) {
    left = intl("shipping_price_dialog_column_title_product_price_first", {
      product_price: (
        <CurrencyFormatter currency={currency} value={price.lt ?? 0} />
      ),
    });
  } else {
    left = intl("shipping_price_dialog_column_title_product_price_middle", {
      product_price_1: (
        <CurrencyFormatter currency={currency} value={price.gte ?? 0} />
      ),
      product_price_2: (
        <CurrencyFormatter currency={currency} value={price.lt ?? 0} />
      ),
    });
  }

  return (
    <DeliveryPolicyPriceRow>
      <span className="left">{left}</span>
      <span className="right">
        <CurrencyFormatter currency={currency} value={price.price} />
      </span>
    </DeliveryPolicyPriceRow>
  );
};

export default React.memo(DeliveryPolicyRow);
