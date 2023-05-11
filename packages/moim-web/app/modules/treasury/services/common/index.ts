import { fetchCoinbaseAPI } from "common/api/treasury";

class CommonService {
  public async getPriceByCurrency(currency_pair: string) {
    return fetchCoinbaseAPI(`/v2/prices/${currency_pair}/spot`, {
      method: "GET",
    });
  }

  // currencyBalance(ex: MATIC) / rate(this result value) = standardCurrencyBalance(ex: USD)
  public async getExchangeRates(
    standardCurrency?: string,
  ): Promise<Moim.Treasury.ITreasuryExchangeRates> {
    return (
      await fetchCoinbaseAPI(
        `/v2/exchange-rates?currency=${standardCurrency ?? "USD"}`,
        {
          method: "GET",
        },
      )
    ).data;
  }
}

export const CommonInstance = new CommonService();
