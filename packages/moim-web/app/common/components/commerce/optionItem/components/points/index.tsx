import * as React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import { px2rem } from "common/helpers/rem";
import ChipBase from "common/components/chips";
import CoinIconBase from "@icon/18-coin.svg";
import CurrencyFormatter from "common/components/currencyFormatter";

interface IProps {
  disabled: boolean;
  creditAmount?: Moim.Commerce.IProductPrice;
}

const CoinIcon = styled(CoinIconBase).attrs({ size: "xs" })`
  margin-right: ${px2rem(2)};
`;

export default function Points({ disabled, creditAmount }: IProps) {
  const PointChipStyle = React.useMemo(
    () => css`
      color: ${props => props.theme.colorV2.colorSet.grey800};
      background-color: ${props => props.theme.colorV2.colorSet.grey50};
      border-radius: ${px2rem(15)};
      text-transform: uppercase;
      margin: ${px2rem(4)} 0;

      ${disabled &&
        css`
          opacity: 0.4;
        `}
    `,
    [disabled],
  );

  if (creditAmount === undefined || !Number(creditAmount.value)) {
    return null;
  }
  return (
    <ChipBase shape="round" size="small" overrideStyle={PointChipStyle}>
      <CoinIcon />
      <FormattedMessage
        id="credit_earning"
        values={{
          price_text: (
            <CurrencyFormatter
              currency={creditAmount.currency}
              value={creditAmount.value}
            />
          ),
        }}
      />
    </ChipBase>
  );
}
