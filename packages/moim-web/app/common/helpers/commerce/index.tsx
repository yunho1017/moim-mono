import React from "react";
import { FormattedMessage } from "react-intl";
import useGroupTexts from "common/hooks/useGroupTexts";
import convertCamel2Snake from "../convertCamel2Snake";

export const usePaymentStatusDisplay = (
  status: Moim.Commerce.PurchaseStatusType,
  options?: {
    shippingRequired?: boolean;
    isBlockchainCurrency?: boolean;
  },
) => {
  const text = useGroupTexts(
    `purchase_item_status_${convertCamel2Snake(status)}${
      status === "preparingForDelivery" && options?.shippingRequired === false
        ? "_without_shipping"
        : ""
    }` as any,
  );
  if (status === "vbankPending" && options?.isBlockchainCurrency) {
    return <FormattedMessage id="status_crypto_transaction_unconfirmed" />;
  }

  return text?.singular;
};
