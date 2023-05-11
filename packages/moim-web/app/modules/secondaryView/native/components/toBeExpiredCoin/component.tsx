import * as React from "react";
import CurrencyFormatter from "common/components/currencyFormatter";
import { Spacer } from "common/components/designSystem/spacer";
import { CreditGroup } from "./components/creditGroup";
import { Guide, ExpiredCreditAmount } from "./styled";

import { useActions, useStoreState } from "app/store";
import { getToBeExpiredCoins } from "app/actions/community/coin";
import { DefaultDivider } from "common/components/divider";
import { FormattedMessage } from "react-intl";

interface IProps {
  coin?: Moim.Community.Coin.ICoin;
}

function getYearMonth(time: Date): number {
  const year = String(time.getFullYear());
  const month = String(
    time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth(),
  );
  return Number(`${year}${month}`);
}

const ToBeDeletedCreditsComponent: React.FC<IProps> = ({ coin }) => {
  const { toBeExpired } = useStoreState(state => ({
    toBeExpired: coin?.id
      ? state.communityCoin.toBeExpiredCoin[coin?.id]?.data ?? []
      : [],
  }));
  const { getToBeExpiredCoinsAction } = useActions({
    getToBeExpiredCoinsAction: getToBeExpiredCoins,
  });

  const expiredTotalAmount = React.useMemo(
    () =>
      toBeExpired?.reduce((result, current) => result + current.amount, 0) ?? 0,
    [toBeExpired],
  );

  const groupedToBeExpiredCredits = React.useMemo(() => {
    const month_1 = new Date();
    const month_2 = new Date();
    month_2.setMonth(month_2.getMonth() + 1);
    const month_3 = new Date();
    month_3.setMonth(month_3.getMonth() + 2);
    const initialValue: {
      date: number;
      amount: number;
      items: Moim.Community.Coin.IToBeExpiredCoinItem[];
    }[] = [
      {
        date: month_1.getTime(),
        amount: 0,
        items: [],
      },
      { date: month_2.getTime(), amount: 0, items: [] },
      { date: month_3.getTime(), amount: 0, items: [] },
    ];

    return [...(toBeExpired ?? [])]
      ?.sort((a, b) => {
        if (a.expireAt > b.expireAt) return 1;
        else if (a.expireAt === b.expireAt) return 0;
        else return -1;
      })
      .reduce((result, current) => {
        const currentExpiredAtMonth = getYearMonth(new Date(current.expireAt));
        let targetIndex;
        if (currentExpiredAtMonth <= getYearMonth(month_1)) {
          targetIndex = 0;
        } else if (currentExpiredAtMonth <= getYearMonth(month_2)) {
          targetIndex = 1;
        } else if (currentExpiredAtMonth <= getYearMonth(month_3)) {
          targetIndex = 2;
        }

        if (targetIndex !== undefined) {
          const sameDayIndex = result[targetIndex].items.findIndex(
            item =>
              new Date(item.expireAt).getDate() ===
              new Date(current.expireAt).getDate(),
          );

          if (sameDayIndex >= 0) {
            result[targetIndex].items[sameDayIndex] = {
              ...result[targetIndex].items[sameDayIndex],
              amount:
                result[targetIndex].items[sameDayIndex].amount + current.amount,
            };
          } else {
            result[targetIndex].items.push(current);
          }

          result[targetIndex].amount += current.amount;
        }

        return result;
      }, initialValue);
  }, [toBeExpired]);

  React.useEffect(() => {
    if (coin?.id) {
      getToBeExpiredCoinsAction({ coinId: coin?.id });
    }
  }, [coin?.id]);

  return (
    <>
      <Guide>
        <FormattedMessage id="candy_history_candy_to_be_expired_guide" />
      </Guide>
      <ExpiredCreditAmount>
        <span className="title">
          <FormattedMessage
            id="candy_history_candy_to_be_expired_total"
            values={{ candy_name: coin?.name ?? "" }}
          />
        </span>
        <Spacer value={6} />
        <span className="amount">
          <CurrencyFormatter
            currency={coin?.symbol ?? "POINT"}
            value={expiredTotalAmount}
          />
        </span>
      </ExpiredCreditAmount>
      <Spacer value={8} />
      {groupedToBeExpiredCredits?.map(group => (
        <>
          <CreditGroup
            key={group.date}
            amount={group.amount}
            date={group.date}
            items={group.items}
            currency={coin?.symbol ?? "POINT"}
            coinName={coin?.name ?? ""}
          />
          <Spacer key={`${group.date}_spacer_1`} value={8} />
          <DefaultDivider key={`${group.date}_divider`} />
          <Spacer key={`${group.date}_spacer_2`} value={8} />
        </>
      ))}
    </>
  );
};

export default ToBeDeletedCreditsComponent;
