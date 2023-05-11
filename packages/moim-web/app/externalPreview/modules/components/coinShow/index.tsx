import * as React from "react";
import { useRouteMatch } from "react-router";
import { getCoin, getCommunityCoinHistories } from "../../../api/coin";
// components
import { DefaultLayout } from "../secondaryView/native/layout";
import AppBar from "common/components/appBar";
import CoinShow from "app/modules/secondaryView/native/components/coin/components/coinShow";
import { CoinShowSkeleton } from "app/modules/secondaryView/native/components/coin/skeleton";
// styled
import {
  Wrapper,
  ArrowIcon,
  getCoinTopWrapperStyle,
} from "app/modules/secondaryView/native/components/coin/styled";

const DEFAULT_LIMIT = 30;

function UserCoin() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { communityId, coinId } = match.params;

  const [coin, setCoin] = React.useState<Moim.Community.Coin.ICoin | undefined>(
    undefined,
  );
  const [histories, setHistories] = React.useState<
    Moim.Community.Coin.ICoinHistory[] | undefined
  >(undefined);
  const [paging, setPaging] = React.useState<Moim.IPaging>({});
  const [balance, setBalance] = React.useState<number | undefined>(undefined);
  const [isLoading, setLoadingStatus] = React.useState<
    boolean | null | undefined
  >(undefined);

  const appBarProps = React.useMemo(
    () =>
      ({
        leftElement: <ArrowIcon />,
        rightElement: <ArrowIcon />,
        enableScrollParallax: true,
        wrapperStyle: getCoinTopWrapperStyle(coin?.preview?.hexCode),
      } as React.ComponentProps<typeof AppBar>),
    [coin?.preview?.hexCode],
  );

  const handleGetHistoryData = React.useCallback(
    async (_paging?: Moim.IPaging) => {
      if (coinId) {
        const historiesData = await getCommunityCoinHistories(coinId, {
          includeTotalAmount: true,
          limit: DEFAULT_LIMIT,
          ...(_paging?.after && {
            after: _paging?.after,
          }),
        });
        if (!historiesData) {
          return;
        }
        setBalance(historiesData?.totalAmount ?? 0);
        setPaging(historiesData?.paging ?? {});
        if (_paging?.after) {
          setHistories(base => [...(base ?? []), ...historiesData.data]);
        } else {
          setHistories(historiesData.data);
        }
      }
    },
    [coinId],
  );

  const handleGetLoadMore = React.useCallback(
    async (pagingKey: keyof Moim.IPaging) => {
      try {
        setLoadingStatus(true);
        await handleGetHistoryData({ [pagingKey]: paging?.[pagingKey] });
        setLoadingStatus(false);
      } catch {
        setLoadingStatus(null);
      }
    },
    [handleGetHistoryData, paging],
  );

  const getCoinItem = React.useCallback(async () => {
    if (coinId && !coin) {
      await getCoin(coinId).then(result => {
        if (result) {
          setCoin({ ...result, transferrable: false, expirable: false });
        }
      });
    }
  }, [coinId, coin]);

  React.useEffect(() => {
    Promise.all([getCoinItem(), handleGetHistoryData()])
      .then(() => {
        setLoadingStatus(false);
      })
      .catch(() => {
        setLoadingStatus(null);
      });
  }, [coinId, communityId]);

  return (
    <DefaultLayout appBar={appBarProps}>
      <Wrapper>
        {coin === undefined ||
        histories === undefined ||
        balance === undefined ? (
          <CoinShowSkeleton />
        ) : (
          <CoinShow
            isLoading={Boolean(isLoading)}
            coin={coin}
            balance={balance}
            histories={histories}
            historiesPaging={paging}
            onLoadMore={handleGetLoadMore}
          />
        )}
      </Wrapper>
    </DefaultLayout>
  );
}

export default React.memo(UserCoin);
