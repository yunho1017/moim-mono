import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import moment from "moment";
import { px2rem } from "common/helpers/rem";
import { useIntlShort } from "common/hooks/useIntlShort";
// componeents
import CurrencyFormatter from "common/components/currencyFormatter";
import { B3Regular, H10Bold } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
// style
import { ToBeExpiredCurrency } from "../styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Total = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(6)} ${px2rem(16)};
  display: flex;
  justify-content: space-between;
  gap: ${px2rem(4)};
`;

const Row = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(6)} ${px2rem(16)};
  display: flex;
  justify-content: space-between;
  gap: ${px2rem(4)};
`;
const Empty = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey500};
  padding: ${px2rem(8)} ${px2rem(16)};
  text-align: center;
`;

export const CreditGroup: React.FC<{
  date: number;
  amount: number;
  items: Moim.Community.Coin.IToBeExpiredCoinItem[];
  currency: string;
  coinName: string;
}> = React.memo(({ amount, date, items, currency, coinName }) => {
  const intl = useIntlShort();
  return (
    <Wrapper>
      <Total>
        <span>
          <FormattedMessage
            id="candy_history_candy_to_be_expired_month"
            values={{ date: moment(date).format("YYYY.MM") }}
          />
        </span>
        <span>
          {intl("price_total", {
            price_text: (
              <ToBeExpiredCurrency value={amount} currency={currency} />
            ),
          })}
        </span>
      </Total>
      {items.length ? (
        items.map(item => (
          <>
            <Spacer key={`${item.id}_spacer`} value={8} />
            <Row key={item.id}>
              <span>
                {intl("candy_history_candy_to_be_expired_day", {
                  date: moment(item.expireAt).format("MM.DD"),
                })}
              </span>
              <span>
                <CurrencyFormatter value={item.amount} currency={currency} />
              </span>
            </Row>
          </>
        ))
      ) : (
        <>
          <Spacer value={8} />
          <Empty>
            <FormattedMessage
              id="candy_history_candy_to_be_expired_list_empty"
              values={{ candy_name: coinName }}
            />
          </Empty>
        </>
      )}
    </Wrapper>
  );
});
