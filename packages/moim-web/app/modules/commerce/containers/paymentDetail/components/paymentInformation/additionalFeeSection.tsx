import * as React from "react";

import { Section } from "../common";

import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";

interface IProps {
  additionalFee: Moim.Commerce.IProductAdditionalFee;
}

export default function AdditionalFeeSection({ additionalFee }: IProps) {
  const coinId = additionalFee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }
  return (
    <Section
      title={
        <FormattedMessage
          id="my_shopping_purchase_details_use_candy"
          values={{ candy_name: coin?.name }}
        />
      }
      contents={`${additionalFee.amount} ${coin?.symbol}`}
      titleOption={{ maxWidth: 170 }}
      contentsOption={{ textAlign: "right" }}
    />
  );
}
