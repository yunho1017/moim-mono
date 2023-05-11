import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
// components
import TimeStamp from "./components/timeStamp";
import CoinHistoryList from "./components/history";
import { DefaultLoader as Loader } from "common/components/loading";
// styled
import { EmptyCase } from "./styled";
import InfiniteScroller from "common/components/infiniteScroller";

interface IProps {
  isLoading: boolean;
  coin?: Moim.Community.Coin.ICoin;
  histories?: Moim.Community.Coin.ICoinHistory[];
  historiesPaging?: Moim.IPaging;
  onLoadMore(pagingKey: keyof Moim.IPaging): void;
}

const CoinTransferList: React.FC<IProps> = ({
  isLoading,
  coin,
  histories,
  historiesPaging,
  onLoadMore,
}) => {
  const groupedTransferListByDate = React.useMemo(
    () =>
      (histories ?? []).reduce<
        Record<string, Moim.Community.Coin.ICoinHistory[]>
      >((acc, cur) => {
        const date = moment(cur.createdAt).format("YYYY.MM");
        if (acc?.[date]) acc[date].push(cur);
        else acc[date] = [cur];
        return acc;
      }, {}),
    [histories],
  );

  if (!coin) return null;

  return (
    <div>
      {groupedTransferListByDate &&
      Object.keys(groupedTransferListByDate).length ? (
        <InfiniteScroller
          useInitialScroll={true}
          paging={historiesPaging}
          isLoading={isLoading}
          itemLength={histories?.length ?? 0}
          loader={<Loader />}
          loadMore={onLoadMore}
        >
          {Object.keys(groupedTransferListByDate).map(key => (
            <div key={key}>
              <TimeStamp date={key} />
              <CoinHistoryList
                coin={coin}
                list={groupedTransferListByDate[key]}
              />
            </div>
          ))}
        </InfiniteScroller>
      ) : (
        <EmptyCase>
          <FormattedMessage
            id="candy_history_list_empty"
            values={{ candy_name: coin.name ?? "" }}
          />
        </EmptyCase>
      )}
    </div>
  );
};

export default React.memo(CoinTransferList);
