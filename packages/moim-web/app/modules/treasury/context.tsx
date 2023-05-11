import React from "react";
import { CommonInstance } from "./services/common";

export const TreasuryContext = React.createContext<
  Moim.Treasury.ITreasuryContext
>({} as Moim.Treasury.ITreasuryContext);
export const TreasuryProvider: React.FC = props => {
  const [exchangeRates, setExchangeRates] = React.useState<
    Moim.Treasury.ExchangeRatesType | undefined
  >(undefined);

  const handleGetExchangeRates = React.useCallback(async () => {
    const rates = (await CommonInstance.getExchangeRates()).rates;
    setExchangeRates(rates);
  }, []);

  React.useEffect(() => {
    handleGetExchangeRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!exchangeRates) {
    return null;
  }

  return (
    <TreasuryContext.Provider
      value={{
        exchangeRates,
        refreshCurrency: handleGetExchangeRates,
      }}
    >
      {props.children}
    </TreasuryContext.Provider>
  );
};
