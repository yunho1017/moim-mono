import * as React from "react";
import { Redirect, useRouteMatch } from "react-router";
import { useActions, useStoreState } from "app/store";
// action
import { getItem, getTokenTransferList } from "app/actions/nft";
// helper
import { MoimURL } from "common/helpers/url";
// component
import NFTShowComponent from "./components";
import { NFTShowSkeleton } from "./skeleton";

function NFTShow() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { dispatchGetItem, dispatchGetTokenTransferList } = useActions({
    dispatchGetItem: getItem,
    dispatchGetTokenTransferList: getTokenTransferList,
  });
  const { nftItemId } = match.params;
  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);

  const [transferList, setTransferList] = React.useState<
    Moim.NFT.IGetTokenTransferListResponseBody | undefined | null
  >(undefined);

  const item = useStoreState(state =>
    nftItemId ? state.entities.nftItems[nftItemId] : undefined,
  );
  const contract = useStoreState(state =>
    item?.contractId ? state.entities.nftContracts[item.contractId] : undefined,
  );
  const schedule = useStoreState(state =>
    item?.scheduleId ? state.entities.nftSchedules[item.scheduleId] : undefined,
  );

  const handleGetData = React.useCallback(async () => {
    try {
      if (!item && nftItemId) {
        await dispatchGetItem(nftItemId);
      }
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [dispatchGetItem, item, nftItemId]);

  const handleGetTransferList = React.useCallback(
    async (paging?: Moim.IPaging) => {
      if (!nftItemId) {
        setTransferList(null);
        return;
      }

      try {
        setTransferList(undefined);
        const transferHistory = await dispatchGetTokenTransferList(nftItemId);

        if (paging) {
          setTransferList(_base => ({
            data: _base?.data.concat(transferHistory?.data ?? []) ?? [],
            paging: transferHistory?.paging ?? {},
          }));
        } else {
          setTransferList(transferHistory ?? null);
        }
      } catch {
        setTransferList(null);
      }
    },
    [dispatchGetTokenTransferList, nftItemId],
  );

  React.useEffect(() => {
    setLoadingStatus(true);
    handleGetData();
    handleGetTransferList();
  }, [handleGetData, handleGetTransferList]);

  if (isLoading) {
    return <NFTShowSkeleton />;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <NFTShowComponent
      token={item}
      contract={contract}
      schedule={schedule}
      transferList={transferList}
      onLoadMoreTransferList={handleGetTransferList}
    />
  );
}

export default NFTShow;
