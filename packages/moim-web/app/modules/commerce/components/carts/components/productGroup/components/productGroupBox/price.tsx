import * as React from "react";

import CurrencyFormatter from "common/components/currencyFormatter";
import { PriceWithAdditionalFees } from "app/modules/commerce/components/productShow/layout/productSummary/components/right/price/additionalFee";
import { useIntlShort } from "common/hooks/useIntlShort";

export const ProductPrice: React.FC<{
  currency: string;
  price: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}> = ({ currency, price, additionalFees }) => {
  const intl = useIntlShort();
  return (
    <>
      {intl("common_text_product_price")}{" "}
      <PriceWithAdditionalFees
        currency={currency}
        price={price}
        additionalFees={additionalFees}
      >
        {prices => ((prices.length ?? 0) > 1 ? <>({prices})</> : prices)}
      </PriceWithAdditionalFees>
    </>
  );
};
export const ShippingFee: React.FC<{
  currency: string;
  shippingFee: number;
}> = ({ currency, shippingFee }) => {
  const intl = useIntlShort();

  return (
    <>
      {intl("common_text_shipping_price")}{" "}
      <CurrencyFormatter currency={currency} value={shippingFee} />
    </>
  );
};

export const TotalPrice: React.FC<{
  currency: string;
  price: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}> = ({ currency, price, additionalFees }) => {
  const intl = useIntlShort();

  return (
    <>
      {intl("common_text_total")}{" "}
      <PriceWithAdditionalFees
        currency={currency}
        price={price}
        additionalFees={additionalFees}
      >
        {prices => ((prices.length ?? 0) > 1 ? <>({prices})</> : prices)}
      </PriceWithAdditionalFees>
    </>
  );
};
export const NoDeliveryTotalPrice: React.FC<{
  currency: string;
  price: number;
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}> = ({ currency, price, additionalFees }) => {
  const intl = useIntlShort();

  return (
    <>
      {intl("cart_shipping_bundle_price_summary_no_shipping", {
        total_price: (
          <PriceWithAdditionalFees
            currency={currency}
            price={price}
            additionalFees={additionalFees}
          >
            {prices => ((prices.length ?? 0) > 1 ? <>({prices})</> : prices)}
          </PriceWithAdditionalFees>
        ),
      })}
    </>
  );
};
