import * as React from "react";

import { CoinItemSkeleton } from "../item/skeleton";
import CoinItem from "../item";

import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { Spacer } from "common/components/designSystem/spacer";
import { TokenEmpty } from "../../../empty";
import { MoimURL } from "common/helpers/url";

interface IProps {
  coins: Moim.Community.Coin.ICoin[] | undefined | null;
  coinGroupBalance: Moim.Community.Coin.ICoinGroupBalance | undefined;
}
const CoinItemList: React.FC<IProps> = ({ coins, coinGroupBalance }) => {
  const { redirect } = useNativeSecondaryView();

  const handleClickCoin: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      const coinId = e.currentTarget.dataset.coinId;
      if (coinId) {
        redirect(new MoimURL.CoinShow({ coinId }).toString());
      }
    },
    [redirect],
  );

  if (coins === null || coins?.length === 0) {
    return <TokenEmpty />;
  }

  if (coins === undefined || coins.every(position => position === undefined)) {
    return <CoinItemSkeleton />;
  }

  return (
    <>
      {coins
        .filter(item => Boolean(item))
        .map(coin => (
          <>
            <Spacer key={`${coin.id}_spacer_1`} value={4} />
            <CoinItem
              key={coin.id}
              coin={coin}
              totalAmount={coinGroupBalance?.[coin.id]?.balance}
              onClick={handleClickCoin}
            />
            <Spacer key={`${coin.id}_spacer_2`} value={4} />
          </>
        ))}
    </>
  );
};

export default CoinItemList;
