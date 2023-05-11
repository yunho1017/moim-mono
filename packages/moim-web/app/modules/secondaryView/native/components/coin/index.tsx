import * as React from "react";
import { useActions, useStoreState } from "app/store";
// actions
import {
  getCoin,
  getCommunityCoinHistories,
  getToBeExpiredCoins,
} from "app/actions/community/coin";
// components
import { DefaultLayout } from "../../layout";
import AppBar from "common/components/appBar";
import CoinShow from "./components/coinShow";
import { CoinShowSkeleton } from "./skeleton";
// styled
import { Wrapper, ArrowIcon, getCoinTopWrapperStyle } from "./styled";
import UnsignedChecker from "common/components/unsiginedChecker";
import { PermissionDeniedFallbackType } from "app/enums";

const DEFAULT_LIMIT = 30;

interface IProps {
  coinId: string;
}

const UserCoin: React.FC<IProps> = ({ coinId }) => {
  const { currentUserId, coin, toBeExpiredCoinBalance } = useStoreState(
    state => ({
      currentUserId: state.app.currentUserId,
      coin: state.entities.community_coins[coinId],
      toBeExpiredCoinBalance: state.communityCoin.toBeExpiredCoin[
        coinId
      ]?.data?.reduce((result, current) => result + current.amount, 0),
    }),
  );
  const [histories, setHistories] = React.useState<
    Moim.Community.Coin.ICoinHistory[] | undefined
  >(undefined);
  const [paging, setPaging] = React.useState<Moim.IPaging>({});
  const [balance, setBalance] = React.useState<number | undefined>(undefined);

  const [isLoading, setLoadingStatus] = React.useState<
    boolean | null | undefined
  >(undefined);

  const {
    dispatchGetCoin,
    dispatchGetCommunityCoinHistories,
    dispatchGetToBeExpiredCoins,
  } = useActions({
    dispatchGetCoin: getCoin,
    dispatchGetCommunityCoinHistories: getCommunityCoinHistories,
    dispatchGetToBeExpiredCoins: getToBeExpiredCoins,
  });

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
        const historiesData = await dispatchGetCommunityCoinHistories(coinId, {
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
    [coinId, dispatchGetCommunityCoinHistories],
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
      await dispatchGetCoin(coinId);
    }
  }, [coinId, coin, dispatchGetCoin]);

  const handleGetToBeExpiredCoins = React.useCallback(async () => {
    if (coinId && toBeExpiredCoinBalance === undefined) {
      await dispatchGetToBeExpiredCoins({ coinId });
    }
  }, [coinId, toBeExpiredCoinBalance, dispatchGetToBeExpiredCoins]);

  React.useEffect(() => {
    if (currentUserId) {
      Promise.all([
        getCoinItem(),
        handleGetHistoryData(),
        handleGetToBeExpiredCoins(),
      ])
        .then(() => {
          setLoadingStatus(false);
        })
        .catch(() => {
          setLoadingStatus(null);
        });
    }
  }, [currentUserId, coinId]);

  return (
    <DefaultLayout appBar={appBarProps}>
      <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
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
              toBeExpiredCoinBalance={toBeExpiredCoinBalance}
              histories={histories}
              historiesPaging={paging}
              onLoadMore={handleGetLoadMore}
            />
          )}
        </Wrapper>
      </UnsignedChecker>
    </DefaultLayout>
  );
};

export default React.memo(UserCoin);
