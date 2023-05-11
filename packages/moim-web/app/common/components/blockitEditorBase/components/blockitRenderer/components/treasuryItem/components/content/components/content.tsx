import React from "react";
import styled from "styled-components";
import _ from "lodash";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

import { DefaultDivider } from "common/components/divider";
import TreasuryItemBalance from "./balance";
import TreasuryItemWallets from "./wallets";
import TreasuryItemStatement from "./statement";
import { TreasuryDivider } from "../../../styled";

export const CONSTANT_TOTAL_KEY = "TOTAL";

export interface WalletBalanceType {
  balance?: number;
  price?: number;
  currency?: string;
  network?: string;
}

export type CurrencyRecordType = Record<string, WalletBalanceType>;

const getTotalBalance = (
  balances: Moim.Treasury.IBalance[],
  exchangeRates: Moim.Treasury.ExchangeRatesType,
) => {
  const total = balances?.reduce<CurrencyRecordType>((acc, cur) => {
    const rate = _.find(exchangeRates, (_val, key) => key === cur.currency);
    acc[CONSTANT_TOTAL_KEY] = {
      price:
        (acc[CONSTANT_TOTAL_KEY]?.price ?? 0) +
        (rate ? cur.balance / Number(rate) : 0),
    };
    acc[`${cur.network}-${cur.currency}`] = {
      currency: cur.currency,
      balance: cur.balance,
      price: rate ? cur.balance / Number(rate) : 0,
      network: cur.network,
    };
    return acc;
  }, {});
  return total;
};

const TotalStatementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  margin: ${px2rem(20)} ${px2rem(16)} ${px2rem(24)} ${px2rem(16)};
  border-radius: ${px2rem(4)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    flex-direction: row;
  }
`;

interface IProps {
  item: Moim.Treasury.ITreasury;
  showConfig?: Moim.Treasury.ITreasuryShowConfig;
  exchangeRates: Moim.Treasury.ExchangeRatesType;
  isMobile: boolean;
}

const TreasuryItemContent: React.FC<IProps> = ({
  showConfig,
  item,
  exchangeRates,
  isMobile,
}: IProps) => {
  const totalBalances = React.useMemo(
    () => getTotalBalance(item.balances, exchangeRates),
    [exchangeRates, item.balances],
  );

  const totalIncomes = React.useMemo(
    () =>
      getTotalBalance(
        item.incomes.map(value => ({
          balance: value.income,
          network: value.network,
          currency: value.currency,
        })),
        exchangeRates,
      ),
    [exchangeRates, item.incomes],
  );

  const totalOutcomes = React.useMemo(
    () =>
      getTotalBalance(
        item.outcomes.map(value => ({
          balance: value.outcome,
          network: value.network,
          currency: value.currency,
        })),
        exchangeRates,
      ),
    [exchangeRates, item.outcomes],
  );

  const totalBalancesMap = Object.entries(totalBalances).map(([k, v]) => ({
    key: k,
    currency: v.currency,
    balance: v.balance,
    price: v.price,
    network: v.network,
  }));

  return (
    <>
      <TreasuryItemBalance
        mainBalance={totalBalances?.[CONSTANT_TOTAL_KEY].price ?? 0}
        subBalance={totalBalances?.[CONSTANT_TOTAL_KEY].price ?? 0}
        mainCurrency="USDC"
        subCurrency="USD"
        showSubBalance={showConfig?.showValue}
      />
      {(showConfig?.showTotalIncome || showConfig?.showTotalExpense) && (
        <TotalStatementWrapper>
          {showConfig?.showTotalIncome && (
            <TreasuryItemStatement
              titleKey="treasury_block_total_income_title"
              mainBalance={totalIncomes?.[CONSTANT_TOTAL_KEY].price ?? 0}
              subBalance={totalIncomes?.[CONSTANT_TOTAL_KEY].price ?? 0}
              mainCurrency="USDC"
              subCurrency="USD"
              showSubBalance={showConfig?.showValue}
            />
          )}
          {isMobile &&
            showConfig?.showTotalIncome &&
            showConfig?.showTotalExpense && <DefaultDivider />}
          {showConfig?.showTotalExpense && (
            <TreasuryItemStatement
              titleKey="treasury_block_total_expense_title"
              mainBalance={totalOutcomes?.[CONSTANT_TOTAL_KEY].price ?? 0}
              subBalance={totalOutcomes?.[CONSTANT_TOTAL_KEY].price ?? 0}
              mainCurrency="USDC"
              subCurrency="USD"
              showSubBalance={showConfig?.showValue}
            />
          )}
        </TotalStatementWrapper>
      )}
      {showConfig?.showWallets && (
        <>
          <TreasuryDivider />
          <TreasuryItemWallets
            wallets={totalBalancesMap}
            treasury={item}
            showSubBalance={showConfig?.showValue}
          />
        </>
      )}
    </>
  );
};

export default React.memo(TreasuryItemContent);
