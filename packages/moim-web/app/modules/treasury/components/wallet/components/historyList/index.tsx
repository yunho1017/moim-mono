import * as React from "react";
import moment from "moment";

import { Spacer } from "common/components/designSystem/spacer";

import HistoryItem from "../historyItem";

import { DateTimeLabel, Divider } from "./styled";

interface IProps {
  dateTimeLabel: string;
  items: Moim.Treasury.ITransaction[];
  treasuryAddress: string;
  exchangeRates: Moim.Treasury.ExchangeRatesType;
}

const HistoryList: React.FC<IProps> = ({
  items,
  dateTimeLabel,
  treasuryAddress,
  exchangeRates,
}) => (
  <>
    <Spacer value={32} />
    <DateTimeLabel>{dateTimeLabel}</DateTimeLabel>
    <Divider />
    {items.map((item, index) => {
      const transactionType =
        item.data.from === treasuryAddress ? "expense" : "income";

      const userId =
        transactionType === "income"
          ? item.data.fromUser?.userId
          : item.data.toUser?.userId;

      const userWallet =
        transactionType === "income" ? item.data.from : item.data.to;

      return (
        <>
          <HistoryItem
            key={item.transactionHash}
            currency={item.currency ?? ""}
            userId={userId}
            userWallet={userWallet}
            transactionType={transactionType}
            createAt={moment.utc(item.createdAt).valueOf()}
            amount={item.data.amount}
            exchangeRates={exchangeRates}
          />
          {index < items.length - 1 && <Divider />}
        </>
      );
    })}
    <Spacer value={24} />
  </>
);

export default HistoryList;
