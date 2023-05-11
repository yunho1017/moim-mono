import * as React from "react";
// components
import CoinHistoryItem from "./components/item";
import { Spacer } from "common/components/designSystem/spacer";

interface PropsType {
  coin: Moim.Community.Coin.ICoin;
  list: Moim.Community.Coin.ICoinHistory[];
}
const CoinHistoryList: React.FC<PropsType> = ({ coin, list }) => {
  return (
    <div>
      {list.map(item => (
        <CoinHistoryItem key={item.id} coin={coin} item={item} />
      ))}
      <Spacer value={16} />
    </div>
  );
};

export default React.memo(CoinHistoryList);
