import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import MobileTop from "./mobile";
import DesktopTop from "./desktop";
import Skeleton from "./skeleton";

import { NFTCollectionShowContext } from "../../context";

const OWNERS_TAB_ID = "owners";
const ITEMS_TAB_ID = "items";

interface IProps {
  isLoading: boolean | null | undefined;
  contractAddress?: Moim.Id;
  contractName?: string;
  symbol?: string;
  name?: string;
  createdBy?: Moim.NFT.IContractOwner;
  ownedByAddress?: string;
  banner?: Moim.NFT.IResource;
  representResources?: Moim.NFT.IResource[];
  network?: Moim.Community.IBlockchainType;
}

const Top: React.FC<IProps> = ({
  isLoading,
  contractAddress,
  contractName,
  symbol,
  name,
  createdBy,
  ownedByAddress,
  banner,
  representResources,
  network,
}) => {
  const {
    contract,
    totalOwnersCnt,
    totalItemsCnt,
    setSelectedTabId,
  } = React.useContext(NFTCollectionShowContext);
  const isMobile = useIsMobile();

  const handleSetOwnersTab = React.useCallback(() => {
    setSelectedTabId(OWNERS_TAB_ID);
  }, [setSelectedTabId]);

  const handleSetItemsTab = React.useCallback(() => {
    setSelectedTabId(ITEMS_TAB_ID);
  }, [setSelectedTabId]);

  if (!contract || isLoading !== false) {
    return <Skeleton />;
  }

  if (isMobile) {
    return (
      <MobileTop
        contract={contract}
        totalOwnersCnt={totalOwnersCnt}
        totalItemsCnt={totalItemsCnt}
        onSelectOwnersTab={handleSetOwnersTab}
        onSelectItemsTab={handleSetItemsTab}
        contractAddress={contractAddress}
        contractName={contractName}
        symbol={symbol}
        name={name}
        ownedByAddress={ownedByAddress}
        createdBy={createdBy}
        banner={banner}
        representResources={representResources}
        network={network}
      />
    );
  }

  return (
    <DesktopTop
      totalOwnersCnt={totalOwnersCnt}
      totalItemsCnt={totalItemsCnt}
      onSelectOwnersTab={handleSetOwnersTab}
      onSelectItemsTab={handleSetItemsTab}
      contractAddress={contractAddress}
      contractName={contractName}
      symbol={symbol}
      name={name}
      ownedByAddress={ownedByAddress}
      createdBy={createdBy}
      banner={banner}
      representResources={representResources}
      network={network}
    />
  );
};

export default Top;
