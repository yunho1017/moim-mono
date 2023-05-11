import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { MoimURL } from "common/helpers/url";
import { useActions, useStoreState } from "app/store";
import {
  getTreasuryHistory as getTreasuryHistoryAction,
  getTreasuryItem as getTreasuryItemAction,
} from "app/actions/treasury";
import { TreasuryProvider } from "../../context";
import WalletComponent from "../../components/wallet";

const DEFAULT_LIMIT = 10;

const WalletContainer: React.FC<RouteComponentProps<Moim.IMatchParams>> = ({
  match,
}) => {
  const { treasuryId } = match.params;
  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [histories, setHistories] = React.useState<
    Moim.Treasury.ITransaction[]
  >([]);
  const [paging, setPaging] = React.useState<Moim.IPaging>({});

  const { dispatchGetItem, dispatchGetHistory } = useActions({
    dispatchGetItem: getTreasuryItemAction,
    dispatchGetHistory: getTreasuryHistoryAction,
  });

  const treasuryItem = useStoreState(state =>
    treasuryId ? state.entities.treasuryItems[treasuryId] : undefined,
  );

  const getTreasuryItem = React.useCallback(async () => {
    try {
      if (treasuryId) {
        await dispatchGetItem(treasuryId);
      }
    } catch {
      setLoadingStatus(null);
    } finally {
      setLoadingStatus(false);
    }
  }, [dispatchGetItem, treasuryId]);

  const handleGetHistoryData = React.useCallback(
    async (_paging?: Moim.IPaging) => {
      try {
        if (treasuryId) {
          const historiesData = await dispatchGetHistory(
            treasuryId,
            _paging,
            DEFAULT_LIMIT,
          );
          if (!historiesData) {
            return;
          }

          setPaging(historiesData?.paging ?? {});
          if (_paging?.after) {
            setHistories(base => [...(base ?? []), ...historiesData.data]);
          } else if (_paging?.before) {
            setHistories(base => [...historiesData.data, ...(base ?? [])]);
          } else {
            setHistories(historiesData.data);
          }
        }
      } finally {
        setLoadingStatus(false);
      }
    },
    [dispatchGetHistory, treasuryId],
  );

  const handleGetLoadMore = React.useCallback(
    async (pagingKey: keyof Moim.IPaging) => {
      await handleGetHistoryData({ [pagingKey]: paging?.[pagingKey] });
    },
    [handleGetHistoryData, paging],
  );
  React.useEffect(() => {
    getTreasuryItem();
    handleGetHistoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treasuryId]);

  if (isLoading || !treasuryItem) {
    return null;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <TreasuryProvider>
      <WalletComponent
        isLoading={isLoading ? true : false}
        treasuryItem={treasuryItem}
        paging={paging}
        histories={histories}
        onRetry={handleGetHistoryData}
        onLoadMore={handleGetLoadMore}
      />
    </TreasuryProvider>
  );
};

export default WalletContainer;
