import * as React from "react";
// hook
import useIsMobile from "common/hooks/useIsMobile";
// components
import { Spacer } from "common/components/designSystem/spacer";
import ScheduleList from "app/modules/nftCollection/components/scheduleList";
import NftCollectionItemList from "app/modules/nftCollection/components/list/itemList";
import Description from "app/modules/nftCollection/components/description";
import HolderList from "app/modules/nftCollection/components/holderList";
import { NFTCollectionSkeleton } from "./skeleton";
// style
import { InformationWrapper, Left, Right } from "../styled";

import { NFTCollectionShowContext } from "app/modules/nftCollection/context";

interface IProps {
  contractId: Moim.Id;
  isLoading: boolean | null | undefined;
  isFetched: boolean | undefined;
}

const Layout: React.FC<IProps> = ({ isLoading, isFetched }: IProps) => {
  const {
    contract,
    availableScheduleIdsByContract,
    items,
    setSelectedTabId,
  } = React.useContext(NFTCollectionShowContext);

  const isMobile = useIsMobile();

  if (!contract || isLoading !== false) {
    return <NFTCollectionSkeleton />;
  }

  if (isMobile) {
    return (
      <>
        <ScheduleList
          scheduleIds={availableScheduleIdsByContract}
          setSelectedTabId={setSelectedTabId}
        />
        <NftCollectionItemList
          items={items}
          contract={contract}
          isLoading={isLoading}
          isFetched={isFetched}
          setSelectedTabId={setSelectedTabId}
          hasMobileDivider={
            availableScheduleIdsByContract &&
            availableScheduleIdsByContract.length > 0
          }
        />
      </>
    );
  }

  return (
    <InformationWrapper>
      <Left>
        <ScheduleList
          scheduleIds={availableScheduleIdsByContract}
          setSelectedTabId={setSelectedTabId}
        />
        <NftCollectionItemList
          items={items}
          contract={contract}
          isLoading={isLoading}
          isFetched={isFetched}
          setSelectedTabId={setSelectedTabId}
        />
      </Left>
      <Right>
        {contract?.description && (
          <>
            <Description value={contract?.description} />
            <Spacer value={24} />
          </>
        )}
        <HolderList setSelectedTabId={setSelectedTabId} />
      </Right>
    </InformationWrapper>
  );
};

export default React.memo(Layout);
