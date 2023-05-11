import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Section } from "../common";
import CurrencyFormatter from "common/components/currencyFormatter";
import { useStoreState } from "app/store";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RefundedAmount = styled.span`
  margin-left: ${px2rem(4)};
`;

const RefundedCardAmount = styled.span`
  span + span {
    &::before {
      content: "/";
      margin: 0 ${px2rem(4)};
    }
  }
`;

function RefundedCoin({
  coinId,
  amount,
  price,
}: {
  coinId: string;
  amount: number;
  price: number;
}) {
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  const currencyExchangeConfig = coin?.currencyExchangeConfigs?.[0];
  if (!coin || !currencyExchangeConfig) {
    return null;
  }
  return (
    <span>
      {`${coin?.name ?? ""} `}

      <CurrencyFormatter
        currency={currencyExchangeConfig.currency.symbol}
        value={price}
      />
      {currencyExchangeConfig.currency.symbol !== coin.symbol ? (
        <RefundedAmount>
          (<CurrencyFormatter currency={coin.symbol} value={amount} />)
        </RefundedAmount>
      ) : (
        undefined
      )}
    </span>
  );
}

const AdditionalFee: React.FC<{
  additionalFee: Moim.Commerce.IProductAdditionalFee;
}> = ({ additionalFee }) => {
  const coinId = additionalFee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }

  return (
    <span>
      {coin?.name} {additionalFee.amount} {coin?.symbol}
    </span>
  );
};
interface IProps {
  currency: string;
  refundedCardName?: string;
  refundedCoins?: { coinId: string; amount: number; price: number }[];
  refundedAmount?: number;
  refundBankMethod?: {
    name: string;
    account: string;
    bankCode: string;
  };
  additionalFees?: Moim.Commerce.IProductAdditionalFee[];
}

export default function RefundMethod({
  refundedCoins,
  refundBankMethod,
  refundedCardName,
  refundedAmount,
  currency,
  additionalFees,
}: IProps) {
  const { nicepayBanks } = useStoreState(state => ({
    nicepayBanks: state.commerce.info.nicepayBankCodes,
  }));
  const bankName = nicepayBanks.find(
    item => item.code === refundBankMethod?.bankCode,
  )?.name;

  return (
    <>
      <Section
        title={
          <FormattedMessage id="my_shopping_purchase_cancel_details_refund_method" />
        }
        contents={
          <Wrapper>
            {refundedAmount ? (
              refundBankMethod ? (
                <span>
                  ({bankName}) {refundBankMethod.account}{" "}
                  <CurrencyFormatter
                    currency={currency}
                    value={refundedAmount}
                  />
                </span>
              ) : refundedCardName ? (
                <RefundedCardAmount>
                  <span>{refundedCardName}</span>
                  <CurrencyFormatter
                    currency={currency}
                    value={refundedAmount}
                  />
                </RefundedCardAmount>
              ) : null
            ) : null}

            {refundedCoins?.map(refundedCoin => (
              <RefundedCoin
                key={refundedCoin.coinId}
                coinId={refundedCoin.coinId}
                amount={refundedCoin.amount}
                price={refundedCoin.price}
              />
            ))}

            {additionalFees?.map(fee => (
              <AdditionalFee
                key={`${fee.resourceId}_${fee.amount}`}
                additionalFee={fee}
              />
            ))}
          </Wrapper>
        }
        contentsOption={{ textAlign: "right" }}
      />
    </>
  );
}
