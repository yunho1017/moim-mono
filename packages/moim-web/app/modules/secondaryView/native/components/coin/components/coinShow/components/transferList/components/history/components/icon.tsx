import UserProfileImage from "common/components/userProfileImage";
import * as React from "react";
import {
  RecieveCoinIcon,
  // WalletCoinIcon,
  // SwapCoinIcon,
  SendCoinIcon,
  SmallRecieveCoinIcon,
  SmallSendCoinIcon,
  TypeIconWrapper,
  OverImageIcon,
} from "./styled";

interface PropsType {
  type: Moim.Community.Coin.CoinHistoryEventType;
  amount: number;
  granterAvatarUrl?: string;
  receiverAvatarUrl?: string;
}
const TypeIcon: React.FC<PropsType> = ({
  type,
  amount,
  granterAvatarUrl,
  receiverAvatarUrl,
}) => {
  switch (type) {
    case "used":
    case "expired":
      return (
        <TypeIconWrapper>
          <SendCoinIcon />
        </TypeIconWrapper>
      );
    case "received":
    case "returned":
      return (
        <TypeIconWrapper hasBlueBackgroundColor={true}>
          <RecieveCoinIcon />
        </TypeIconWrapper>
      );
    case "transferred":
      return (
        <TypeIconWrapper
          isUserType={true}
          hasBlueBackgroundColor={amount < 0 ? false : true}
        >
          <UserProfileImage
            size="l"
            src={amount < 0 ? receiverAvatarUrl : granterAvatarUrl}
            canOpenProfileDialog={false}
          />
          <OverImageIcon>
            {amount < 0 ? <SmallSendCoinIcon /> : <SmallRecieveCoinIcon />}
          </OverImageIcon>
        </TypeIconWrapper>
      );
    default: {
      return null;
    }
  }
};

export default React.memo(TypeIcon);
