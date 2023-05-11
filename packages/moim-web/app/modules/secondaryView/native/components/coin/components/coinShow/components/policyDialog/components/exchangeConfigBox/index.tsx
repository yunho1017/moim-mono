import React from "react";

import { Wrapper, Box, EqualIcon, RatioItem, Ratio, Currency } from "./styled";

const ExchangeConfigBox: React.FC<{
  currencyExchangeConfig: Moim.Community.Coin.ICurrencyExchangeConfig;
  coinSymbol: string;
}> = ({ currencyExchangeConfig, coinSymbol: coinCurrency }) => {
  const visualRatio = currencyExchangeConfig?.visualRatio;
  const coinRatio = visualRatio?.split(":")[0];
  const currencyRatio = visualRatio?.split(":")[1];
  return (
    <Wrapper>
      <Box>
        <RatioItem>
          <Ratio>{coinRatio}</Ratio>
          <Currency>{coinCurrency}</Currency>
        </RatioItem>
        <EqualIcon />
        <RatioItem>
          <Ratio>{currencyRatio}</Ratio>
          <Currency>{currencyExchangeConfig?.currency.symbol}</Currency>
        </RatioItem>
      </Box>
    </Wrapper>
  );
};

export default ExchangeConfigBox;
