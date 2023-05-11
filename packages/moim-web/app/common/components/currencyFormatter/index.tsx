import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CommerceCurrencyTypes } from "app/enums";
import {
  DEFAULT_CURRENCY,
  DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
} from "common/constants/default";
// styled
import { Wrapper } from "./styled";
import { CURRENCIES } from "./currencies";

interface IProps {
  prefix?: string;
  currency?: string;
  value?: number | string;
  className?: string;
}
function formatStringNumber(value: string) {
  if (isNaN(Number(value))) {
    return value;
  }

  const splitValue = value.split(".");
  const intValue = parseInt(splitValue[0]);

  return `${intValue.toLocaleString("fullwide", {
    useGrouping: true,
  })}${splitValue[1] ? `.${splitValue[1]}` : ""}`;
}
const CurrencyFormatter: React.FC<IProps> = ({
  prefix,
  currency = DEFAULT_CURRENCY,
  value = 0,
  className,
}) => {
  // currency symbol
  // value 값
  const intl = useIntl();
  const upperCaseCurrency = currency.toUpperCase();
  const _value =
    typeof value === "number"
      ? Object.keys(CURRENCIES).includes(upperCaseCurrency)
        ? intl
            .formatNumber(value ?? 0, {
              currency: upperCaseCurrency,
              useGrouping: true,
              currencyDisplay: "code",
              style: "currency",
            })
            .replace(upperCaseCurrency, "")
            .trim()
        : value.toLocaleString("fullwide", {
            useGrouping: true,
            maximumSignificantDigits: DEFAULT_MAX_PRICE_DECIMALS_LIMIT,
          })
      : // TODO: 백엔드에서 처리 되면 제거
        formatStringNumber(value);

  return (
    <Wrapper className={className}>
      {Boolean(prefix) && prefix}

      {currency === CommerceCurrencyTypes.KRW ? (
        <FormattedMessage
          id="price_won"
          values={{ n: Number(value) === 0 ? 0 : _value }}
        />
      ) : (
        `${Number(value) === 0 ? 0 : _value} ${currency}`
      )}
    </Wrapper>
  );
};

export default CurrencyFormatter;
