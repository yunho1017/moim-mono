import { BlockchainCurrencyTypes } from "app/enums";
import { useIntlShort } from "common/hooks/useIntlShort";

const getPriceByBalance = (currencyRate: number | undefined, balance: number) =>
  (balance * (currencyRate ?? 0)).toFixed(2);

export const getBalanceToValue = (props: {
  currency: string;
  balance: number;
  ETH_TO_USD: number | undefined;
  LINK_TO_USD: number | undefined;
  USDT_TO_USD: number | undefined;
  USDC_TO_USD: number | undefined;
  MATIC_TO_USD: number | undefined;
  APE_TO_USD: number | undefined;
  SAND_TO_USD: number | undefined;
  SHIB_TO_USD: number | undefined;
  NEAR_TO_USD: number | undefined;
  AVAX_TO_USD: number | undefined;
  MANA_TO_USD: number | undefined;
}) => {
  const {
    currency,
    balance,
    ETH_TO_USD,
    LINK_TO_USD,
    USDT_TO_USD,
    USDC_TO_USD,
    MATIC_TO_USD,
    APE_TO_USD,
    SAND_TO_USD,
    SHIB_TO_USD,
    NEAR_TO_USD,
    AVAX_TO_USD,
    MANA_TO_USD,
  } = props;

  if (!currency || !balance) return null;
  switch (currency) {
    case BlockchainCurrencyTypes.ETH:
      return getPriceByBalance(ETH_TO_USD, balance);
    case BlockchainCurrencyTypes.LINK:
      return getPriceByBalance(LINK_TO_USD, balance);
    case BlockchainCurrencyTypes.USDT:
      return getPriceByBalance(USDT_TO_USD, balance);
    case BlockchainCurrencyTypes.USDC:
      return getPriceByBalance(USDC_TO_USD, balance);
    case BlockchainCurrencyTypes.MATIC:
      return getPriceByBalance(MATIC_TO_USD, balance);
    case BlockchainCurrencyTypes.APE:
      return getPriceByBalance(APE_TO_USD, balance);
    case BlockchainCurrencyTypes.SAND:
      return getPriceByBalance(SAND_TO_USD, balance);
    case BlockchainCurrencyTypes.SHIB:
      return getPriceByBalance(SHIB_TO_USD, balance);
    case BlockchainCurrencyTypes.NEAR:
      return getPriceByBalance(NEAR_TO_USD, balance);
    case BlockchainCurrencyTypes.AVAX:
      return getPriceByBalance(AVAX_TO_USD, balance);
    case BlockchainCurrencyTypes.MANA:
      return getPriceByBalance(MANA_TO_USD, balance);
  }
};

export const getTreasuryCurrencyOptions = (
  currency: string,
  intl: ReturnType<typeof useIntlShort>,
) => {
  switch (currency) {
    case BlockchainCurrencyTypes.ETH:
      return { value: "ETH", label: intl("cryptocurrency_ethereum") };

    case BlockchainCurrencyTypes.LINK:
      return { value: "LINK", label: intl("cryptocurrency_link") };

    case BlockchainCurrencyTypes.USDT:
      return { value: "USDT", label: intl("cryptocurrency_usdt") };

    case BlockchainCurrencyTypes.USDC:
      return { value: "USDC", label: intl("cryptocurrency_usdc") };

    case BlockchainCurrencyTypes.MATIC:
      return { value: "MATIC", label: intl("cryptocurrency_matic") };

    case BlockchainCurrencyTypes.APE:
      return { value: "APE", label: intl("cryptocurrency_ape") };

    case BlockchainCurrencyTypes.SAND:
      return { value: "SAND", label: intl("cryptocurrency_sand") };

    case BlockchainCurrencyTypes.SHIB:
      return { value: "SHIB", label: intl("cryptocurrency_shib") };

    case BlockchainCurrencyTypes.NEAR:
      return { value: "NEAR", label: intl("cryptocurrency_near") };

    case BlockchainCurrencyTypes.AVAX:
      return { value: "AVAX", label: intl("cryptocurrency_avax") };

    case BlockchainCurrencyTypes.MANA:
      return { value: "MANA", label: intl("cryptocurrency_mana") };
    default:
      return;
  }
};
