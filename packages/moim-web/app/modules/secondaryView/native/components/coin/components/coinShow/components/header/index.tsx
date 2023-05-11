import * as React from "react";
// hooks
import useOpenState from "common/hooks/useOpenState";
// components
import CoinHeaderButton from "./components/buttons";
import CoinPolicyDialog from "../policyDialog";
// styled
import {
  CoinHeaderWrapper,
  CoinIconWrapper,
  CoinInfoText,
  CoinInfoWrapper,
  CoinPrice,
  ExchangePrice,
  InfoIcon,
  TopWrapper,
} from "./styled";
import CurrencyFormatter from "common/components/currencyFormatter";

interface IProps {
  coin: Moim.Community.Coin.ICoin;
  balance?: number;
  toBeExpiredCoinBalance?: number;
}
const CoinHeader: React.FC<IProps> = ({
  coin,
  balance = 0,
  toBeExpiredCoinBalance = 0,
}) => {
  const { isOpen, open, close } = useOpenState(false);
  const currencyExchangeConfig = coin.currencyExchangeConfigs?.[0];
  return (
    <>
      <CoinHeaderWrapper>
        <TopWrapper
          hexCode={coin?.preview?.hexCode}
          hasBottomBorderRadius={!coin?.transferrable && !coin?.expirable}
        >
          <CoinInfoWrapper>
            <CoinIconWrapper>
              <img src={coin?.preview?.S ?? coin?.imageUrl} />
            </CoinIconWrapper>
            <CoinInfoText>{coin?.name}</CoinInfoText>
            {(coin?.policy ||
              currencyExchangeConfig?.visualRatio ||
              coin.policyTitle) && <InfoIcon onClick={open} />}
          </CoinInfoWrapper>
          <CoinPrice>
            <CurrencyFormatter currency={coin.symbol} value={balance} />
          </CoinPrice>
          {currencyExchangeConfig &&
            currencyExchangeConfig.showTotalValue !== false &&
            currencyExchangeConfig.currency.symbol !== coin.symbol && (
              <ExchangePrice>
                {
                  <CurrencyFormatter
                    currency={currencyExchangeConfig.currency.symbol}
                    value={balance * currencyExchangeConfig.ratio}
                  />
                }
              </ExchangePrice>
            )}
        </TopWrapper>
        {(coin?.expirable || coin?.transferrable) && (
          <CoinHeaderButton coin={coin} balance={toBeExpiredCoinBalance} />
        )}
      </CoinHeaderWrapper>
      <CoinPolicyDialog coin={coin} isOpen={isOpen} onClose={close} />
    </>
  );
};

export default React.memo(CoinHeader);
