import * as React from "react";
import { FormattedMessage } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";

interface IProps {
  fee?: Moim.Commerce.IProductPrice;
}
export default function ShippingFee({ fee }: IProps) {
  return fee ? (
    <>
      <FormattedMessage
        id="shipping_fee"
        values={{
          price_text: (
            <CurrencyFormatter currency={fee.currency} value={fee.value} />
          ),
        }}
      />
    </>
  ) : (
    <FormattedMessage id="shipping_free" />
  );
}
