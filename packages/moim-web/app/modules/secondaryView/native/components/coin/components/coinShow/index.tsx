import * as React from "react";
// components
import CoinHeader from "./components/header";
import CoinTransferList from "./components/transferList";

interface IProps {
  isLoading: boolean;
  coin: Moim.Community.Coin.ICoin;
  balance?: number;
  toBeExpiredCoinBalance?: number;
  histories?: Moim.Community.Coin.ICoinHistory[];
  historiesPaging?: Moim.IPaging;
  onLoadMore(pagingKey: keyof Moim.IPaging): void;
}

const CoinShow: React.FC<IProps> = ({
  isLoading,
  coin,
  balance,
  toBeExpiredCoinBalance,
  histories,
  historiesPaging,
  onLoadMore,
}) => (
  <>
    <CoinHeader
      coin={coin}
      balance={balance}
      toBeExpiredCoinBalance={toBeExpiredCoinBalance}
    />
    {/* // TBD */}
    {/* <CoinFilter /> */}
    <CoinTransferList
      isLoading={isLoading}
      coin={coin}
      histories={histories}
      historiesPaging={historiesPaging}
      onLoadMore={onLoadMore}
    />
  </>
);

export default React.memo(CoinShow);
