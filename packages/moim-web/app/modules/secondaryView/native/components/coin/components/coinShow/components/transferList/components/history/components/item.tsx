import * as React from "react";
import moment from "moment";
import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";
// components
import { Spacer } from "common/components/designSystem/spacer";
import TypeIcon from "./icon";
import CoinHistoryTitle from "./title";
import CoinHistoryDescription from "./description";
import TransactionHashExternalLink from "app/modules/community/coin/components/transactionHashExternalLink";
// styled
import {
  CoinHistoryItemWrapper,
  HistoryItemRightContainer,
  ItemContainer,
  SubText,
  Value,
  MemoBubbleWrapper,
  MemoText,
  HistoryItemCurrency,
} from "./styled";

interface PropsType {
  coin: Moim.Community.Coin.ICoin;
  item: Moim.Community.Coin.ICoinHistory;
}
const CoinHistoryItem: React.FC<PropsType> = ({ coin, item }) => {
  const granter = useStoreState(state =>
    item.from?.userId ? state.entities.users[item.from.userId] : undefined,
  );
  const receiver = useStoreState(state =>
    item.to?.userId ? state.entities.users[item.to.userId] : undefined,
  );

  const [spreadSendMessage, setSendMessageStatus] = React.useState<boolean>(
    true,
  );

  const isPositive =
    item.event === "received" ||
    item.event === "returned" ||
    (item.event === "transferred" && item.amount > 0);

  const hasExpirationDate =
    coin.expirable && item.event !== "used" && item.event !== "expired";

  return (
    <>
      <CoinHistoryItemWrapper>
        <ItemContainer>
          <TypeIcon
            type={item.event}
            amount={item.amount}
            granterAvatarUrl={granter?.avatar_url}
            receiverAvatarUrl={receiver?.avatar_url}
          />
          <HistoryItemRightContainer>
            <CoinHistoryTitle
              event={item.event}
              sourceType={item.sourceType}
              customTitle={item.customTitle}
              amount={item.amount}
              coinName={coin.name}
            />
            <Value isPositive={isPositive}>
              {item.amount !== undefined ? (
                <HistoryItemCurrency
                  prefix={isPositive ? "+" : ""}
                  currency={coin.symbol ?? ""}
                  value={item.amount}
                />
              ) : null}
            </Value>
            <CoinHistoryDescription
              event={item.event}
              description={item.description ?? ""}
              amount={item.amount}
              createdAt={item.createdAt}
              granterName={granter?.name}
              receiverName={receiver?.name}
            />
            <SubText>
              {hasExpirationDate ? (
                <FormattedMessage
                  id="candy_history_expriation_dates"
                  values={{ date: moment(item.expireAt).format("YY.MM.DD") }}
                />
              ) : (
                item.transactionHash &&
                coin.network && (
                  <TransactionHashExternalLink
                    key={`${item.createdAt}_transactionHash`}
                    network={coin.network}
                    transactionHash={item.transactionHash}
                    titleTextKey="candy_show_candy_history_transaction_hash"
                  />
                )
              )}
            </SubText>
          </HistoryItemRightContainer>
        </ItemContainer>
        {item.event === "transferred" && item.senderMessage?.length && (
          <>
            <MemoBubbleWrapper
              role="button"
              onClick={() => setSendMessageStatus(prev => !prev)}
            >
              <MemoText isShaved={spreadSendMessage}>
                {item.senderMessage}
              </MemoText>
            </MemoBubbleWrapper>
            <Spacer value={12} />
          </>
        )}
      </CoinHistoryItemWrapper>
    </>
  );
};

export default React.memo(CoinHistoryItem);
