import React from "react";
import { FormattedMessage } from "react-intl";

import { useStoreState } from "app/store";
import { TextWrap } from "../styled";
import CurrencyFormatter from "common/components/currencyFormatter";

interface IProps {
  usedCoins?: Moim.Commerce.ICalculateUsedCoin[];
}

const UsedCoinItem: React.FC<{
  usedCoin: Moim.Commerce.ICalculateUsedCoin;
}> = ({ usedCoin }) => {
  const coinId = usedCoin.coinId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));
  const currencyExchangeConfig = coin?.currencyExchangeConfigs?.[0];

  if (!coin || !currencyExchangeConfig || !usedCoin.usedPrice) {
    return null;
  }
  return (
    <TextWrap>
      <span className="left">
        <FormattedMessage
          id="price_candy_total"
          values={{ candy_name: coin?.name }}
        />
      </span>
      <span className="right">
        -{" "}
        <CurrencyFormatter
          currency={currencyExchangeConfig.currency.symbol}
          value={usedCoin.usedPrice}
        />
      </span>
    </TextWrap>
  );
};
export default function UsedCoins({ usedCoins }: IProps) {
  if (!usedCoins?.length) {
    return null;
  }
  return (
    <>
      {usedCoins?.map(usedCoin => (
        <UsedCoinItem
          key={`${usedCoin.coinId}_${usedCoin.usedPrice}`}
          usedCoin={usedCoin}
        />
      ))}
    </>
  );
}
