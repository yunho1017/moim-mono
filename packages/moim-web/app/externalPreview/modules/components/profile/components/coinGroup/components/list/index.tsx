import * as React from "react";

import { CoinItemSkeleton } from "app/modules/profile/components/coinGroup/components/item/skeleton";
import CoinItem from "app/modules/profile/components/coinGroup/components/item";

import { Spacer } from "common/components/designSystem/spacer";
import { TokenEmpty } from "app/modules/profile/components/empty";

interface IProps {
  communityId: string;
  coins: Moim.Community.Coin.ICoin[] | undefined | null;
  coinGroupBalance: Moim.Community.Coin.ICoinGroupBalance | undefined;
}
const CoinItemList: React.FC<IProps> = ({
  communityId,
  coins,
  coinGroupBalance,
}) => {
  const handleClickCoin: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      const coinId = e.currentTarget.dataset.coinId;
      if (coinId) {
        window.location.href = `/communities/${communityId}/coins/${coinId}${window.location.search}`;
      }
    },
    [],
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
