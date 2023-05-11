import * as React from "react";
// hooks
import { useIntlShort } from "common/hooks/useIntlShort";
// components
import ShavedText from "common/components/shavedText";
// styled
import { Title } from "./styled";

interface PropsType {
  event: Moim.Community.Coin.CoinHistoryEventType;
  sourceType: Moim.Community.Coin.CoinHistorySourceType;
  customTitle: string;
  amount: number;
  coinName: string;
}
const CoinHistoryTitle: React.FC<PropsType> = ({
  event,
  sourceType,
  customTitle,
  amount,
  coinName = "",
}) => {
  const intl = useIntlShort();

  const titleText = React.useMemo(() => {
    switch (event) {
      case "received": {
        switch (sourceType) {
          case "signUp": {
            return intl("candy_history_recieved_signup_title");
          }
          case "purchaseItem": {
            return intl("candy_history_recieved_purchaseitem_title");
          }
          case "productReview": {
            return intl("candy_history_recieved_review_title");
          }
          default: {
            return customTitle;
          }
        }
      }
      case "used": {
        switch (sourceType) {
          case "payment": {
            return intl("candy_history_used_payment_title");
          }
          default: {
            return customTitle;
          }
        }
      }
      case "returned": {
        switch (sourceType) {
          case "refund": {
            return intl("candy_history_returned_refund_title");
          }
          default: {
            return customTitle;
          }
        }
      }
      case "expired": {
        return intl("candy_history_expired_title", {
          candy_name: coinName,
        });
      }
      case "transferred": {
        return intl(
          amount < 0
            ? "candy_history_token_transferred_title"
            : "candy_history_token_received_title",
        );
      }
      default: {
        return customTitle;
      }
    }
  }, [event, sourceType, intl, customTitle, coinName, amount]);

  return (
    <Title>
      <ShavedText line={2} value={titleText} />
    </Title>
  );
};

export default React.memo(CoinHistoryTitle);
