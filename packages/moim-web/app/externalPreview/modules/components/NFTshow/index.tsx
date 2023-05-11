import * as React from "react";
import { Redirect, useRouteMatch } from "react-router";
import {
  getCollection,
  getNFTItem,
  getSchedule,
  getTransferList,
} from "../../../api/nft";
import { MoimURL } from "common/helpers/url";
// components
import { NFTShowSkeleton } from "app/modules/nftShow/skeleton";
import NFTShowComponent from "app/modules/nftShow/components";
// style
import { ExternalNFTShow } from "./styled";

function NFTShow() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const { communityId, id } = match.params;

  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [item, setItem] = React.useState<Moim.NFT.INftDetail | undefined>(
    undefined,
  );

  const [collection, setCollection] = React.useState<
    Moim.NFT.IContract | undefined
  >(undefined);
  const [schedule, setSchedule] = React.useState<
    Moim.NFT.ISchedule | undefined
  >(undefined);
  const [transferList, setTransferList] = React.useState<
    Moim.NFT.IGetTokenTransferListResponseBody | undefined | null
  >(undefined);

  const handleGetData = React.useCallback(async () => {
    try {
      if (id) {
        const NFTItem = await getNFTItem(id);
        setItem(NFTItem);
        if (NFTItem) {
          const collectionResponse = await getCollection(NFTItem.contractId);
          setCollection(collectionResponse);
          const scheduleResponse = await getSchedule(
            NFTItem.contractId,
            NFTItem.scheduleId,
          );
          setSchedule(scheduleResponse);
        }
      }
      setLoadingStatus(false);
    } catch {
      setLoadingStatus(null);
    }
  }, [id]);

  const handleGetTransferList = React.useCallback(async () => {
    if (!id) {
      setTransferList(null);
      return;
    }
    try {
      setTransferList(undefined);
      const transferResponse = await getTransferList(id);
      setTransferList(transferResponse);
    } catch {
      setTransferList(null);
    }
  }, [id]);

  React.useEffect(() => {
    setLoadingStatus(true);
    handleGetData();
    handleGetTransferList();
  }, [communityId, id]);

  if (isLoading) {
    return <NFTShowSkeleton />;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <ExternalNFTShow>
      <NFTShowComponent
        token={item}
        contract={collection}
        schedule={schedule}
        transferList={transferList}
        onLoadMoreTransferList={handleGetTransferList}
      />
    </ExternalNFTShow>
  );
}

export default NFTShow;
