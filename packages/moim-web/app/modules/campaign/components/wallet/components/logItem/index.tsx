import * as React from "react";
import useUserDataWithAutoBatch from "common/hooks/useUserDataWithAutoBatch";
import UserProfileImage from "common/components/userProfileImage";
import { Spacer } from "common/components/designSystem/spacer";
import CurrencyFormatter from "common/components/currencyFormatter";
import { useIntl } from "react-intl";
import moment from "moment-timezone";
import {
  Wrapper,
  Inner,
  AvatarContainer,
  InfoContainer,
  PriceContainer,
  Message,
} from "./styled";

interface IProps {
  canUsername: string;
  createAt: number;
  amount: number;
  transactionType: "donate" | "transfer";
  currency: string;
  message?: string;
  token?: Moim.Campaign.IToken;
}

const LogItem: React.FC<IProps> = ({
  canUsername,
  createAt,
  amount,
  currency,
  token = {
    code: "",
    symbol: "",
    price: 1000,
    decimal: "6",
  },
  transactionType,
  message,
}) => {
  const intl = useIntl();
  const userData = useUserDataWithAutoBatch(undefined, undefined, canUsername);

  if (!userData) {
    return <>EMPTY</>;
  }

  return (
    <Wrapper>
      <Inner>
        <AvatarContainer>
          <UserProfileImage
            size="l"
            src={userData.avatar_url}
            canOpenProfileDialog={false}
          />
        </AvatarContainer>
        <InfoContainer>
          <div className="name">{userData.name}</div>
          <div className="timestamp">
            {moment(createAt).format(
              intl.formatMessage({ id: "datetime_format_full_time_date" }),
            )}
          </div>
        </InfoContainer>
        <PriceContainer>
          <div
            className={
              transactionType === "donate" ? "price-plus" : "price-minus"
            }
          >
            {transactionType === "donate" ? "+" : "-"}

            <CurrencyFormatter
              currency={currency}
              value={amount * token.price}
            />
          </div>
          <div className="token">
            ({amount}
            {token.symbol})
          </div>
        </PriceContainer>
      </Inner>
      {message && (
        <>
          <Spacer value={12} />
          <Message>{message}</Message>
        </>
      )}
    </Wrapper>
  );
};

export default LogItem;
