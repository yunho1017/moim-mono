import * as React from "react";
import moment from "moment";
// hooks
import { useIntlShort } from "common/hooks/useIntlShort";
// styled
import { SubText } from "./styled";

interface PropsType {
  event: Moim.Community.Coin.CoinHistoryEventType;
  description: string;
  amount: number;
  createdAt: number;
  granterName?: string;
  receiverName?: string;
}
const CoinHistoryDescription: React.FC<PropsType> = ({
  event,
  description,
  amount,
  createdAt,
  granterName,
  receiverName,
}) => {
  const intl = useIntlShort();

  const descriptionText = React.useMemo(() => {
    switch (event) {
      case "received": {
        return description;
      }
      case "used": {
        return description;
      }
      case "returned": {
        return description;
      }
      case "expired": {
        return intl("candy_history_expired_description");
      }
      case "transferred": {
        return amount < 0
          ? intl("candy_history_token_transferred_description", {
              to_wallet_info: receiverName,
            })
          : intl("candy_history_token_received_description", {
              from_wallet_info: granterName,
            });
      }
      default: {
        return description;
      }
    }
  }, [amount, description, event, granterName, intl, receiverName]);

  return (
    <SubText>
      {moment(createdAt).format("MM.DD")}
      {" | "}
      {descriptionText}
    </SubText>
  );
};

export default React.memo(CoinHistoryDescription);
