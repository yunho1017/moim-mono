import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Section } from "../common";
import CurrencyFormatter from "common/components/currencyFormatter";

import { useStoreState } from "app/store";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

interface IProps {
  coinId: string;
  amount: number;
  price: number;
}

const UsedAmount = styled.span`
  margin-left: ${px2rem(4)};
`;

export default function UsedCoinSection({ coinId, amount, price }: IProps) {
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  const currencyExchangeConfig = coin?.currencyExchangeConfigs?.[0];
  if (!coin || !currencyExchangeConfig) {
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
      contents={
        <>
          <CurrencyFormatter
            currency={currencyExchangeConfig.currency.symbol}
            value={price}
          />
          {currencyExchangeConfig.currency.symbol !== coin.symbol ? (
            <UsedAmount>
              (<CurrencyFormatter currency={coin.symbol} value={amount} />)
            </UsedAmount>
          ) : (
            undefined
          )}
        </>
      }
      titleOption={{ maxWidth: 170 }}
      contentsOption={{ textAlign: "right" }}
    />
  );
}
