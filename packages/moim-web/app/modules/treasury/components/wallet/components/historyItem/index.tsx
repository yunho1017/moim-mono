import * as React from "react";
import _ from "lodash";
import moment from "moment-timezone";
import { useIntl } from "react-intl";

import useUserDataWithAutoBatch from "common/hooks/useUserDataWithAutoBatch";
import CurrencyFormatter from "common/components/currencyFormatter";
import UserProfileImage from "common/components/userProfileImage";
import {
  AvatarContainer,
  InfoContainer,
  Inner,
  PriceContainer,
  Wrapper,
} from "./styled";

const getPrice = (
  currency: string,
  amount: number,
  exchangeRates: Moim.Treasury.ExchangeRatesType,
) => {
  const rate = _.find(exchangeRates, (_val, key) => key === currency);
  return rate ? amount / Number(rate) : 0;
};

interface IProps {
  userId?: string;
  userWallet?: string;
  createAt: number;
  amount: number;
  currency: string;
  transactionType: "income" | "expense";
  exchangeRates: Moim.Treasury.ExchangeRatesType;
}

const HistoryItem: React.FC<IProps> = ({
  userId,
  userWallet,
  createAt,
  amount,
  currency,
  transactionType,
  exchangeRates,
}) => {
  const intl = useIntl();
  const price = getPrice(currency, amount, exchangeRates);
  const userData = useUserDataWithAutoBatch(userId, undefined, undefined);

  if (!userData && !userWallet) {
    return <>EMPTY</>;
  }

  return (
    <Wrapper>
      <Inner>
        <AvatarContainer>
          <UserProfileImage
            size="l"
            src={userData?.avatar_url}
            canOpenProfileDialog={false}
          />
        </AvatarContainer>
        <InfoContainer>
          <div className="name">{userData?.name || userWallet || "-"}</div>
          <div className="timestamp">
            {moment(createAt).format(
              intl.formatMessage({ id: "datetime_format_full_time_date" }),
            )}
          </div>
        </InfoContainer>
        <PriceContainer>
          <div
            className={
              transactionType === "income" ? "price-plus" : "price-minus"
            }
          >
            {transactionType === "income" ? "+" : "-"}
            <CurrencyFormatter currency={currency} value={amount} />
          </div>
          <div className="token">{`${price.toFixed(2)} USD`}</div>
        </PriceContainer>
      </Inner>
    </Wrapper>
  );
};

export default HistoryItem;
