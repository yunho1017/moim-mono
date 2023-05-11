import React from "react";
import {
  DeliveryPolicyPriceTitleRow,
  DeliveryPolicyTitle,
  DeliveryPolicyDescription,
} from "../styled";
import DeliveryPolicyRow from "./deliveryPolicyRow";
import { Spacer } from "common/components/designSystem/spacer";

import { useIntlShort } from "common/hooks/useIntlShort";

interface IProps {
  currency: string;
  deliveryPolicy: Moim.Commerce.DeliveryPolicy;
}

const DeliveryPolicyItem: React.FC<IProps> = ({ currency, deliveryPolicy }) => {
  const intl = useIntlShort();

  const description = React.useMemo(() => {
    switch (deliveryPolicy.type) {
      case "max":
        return (
          deliveryPolicy.description ??
          intl("shipping_price_dialog_policy_type1_body")
        );
      case "custom":
        return (
          deliveryPolicy.description ??
          intl("shipping_price_dialog_policy_custom_body")
        );
      case "priceList":
      default:
        return deliveryPolicy.description;
    }
  }, [deliveryPolicy]);
  const inner = React.useMemo(() => {
    switch (deliveryPolicy.type) {
      case "priceList":
        return (
          <>
            <DeliveryPolicyPriceTitleRow>
              <span className="left">
                {intl("shipping_price_dialog_column_title_product_price")}
              </span>
              <span className="right">
                {intl("shipping_price_dialog_column_title_shipping_price")}
              </span>
            </DeliveryPolicyPriceTitleRow>
            <Spacer value={8} />
            {deliveryPolicy.priceList.map((price, index) => (
              <DeliveryPolicyRow
                key={`price_range_${index}`}
                isLast={index === deliveryPolicy.priceList.length - 1}
                isFirst={index === 0}
                price={price}
                currency={currency}
              />
            ))}
          </>
        );
      case "max":
      case "custom":
      default:
        return null;
    }
  }, [deliveryPolicy]);
  return (
    <>
      <DeliveryPolicyTitle>{deliveryPolicy.name}</DeliveryPolicyTitle>
      {description ? (
        <DeliveryPolicyDescription>{description}</DeliveryPolicyDescription>
      ) : null}
      {inner && <Spacer value={8} />}
      {inner}
    </>
  );
};

export default React.memo(DeliveryPolicyItem);
