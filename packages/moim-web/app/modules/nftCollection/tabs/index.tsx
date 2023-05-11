import * as React from "react";
import { FormattedMessage } from "react-intl";
// helper
import { px2rem } from "common/helpers/rem";
// components
import CollectionTab from "../components/collectionTab";
import useInformationTab from "./information";
import useItemsTab from "./items";
import useOwnersTab from "./owners";
import useSchedulesTab from "./schedules";
// style
import { SkeletonBox } from "common/components/skeleton";
import { EmptyBoxText, EmptyBoxWrapper } from "../styled";
import { useStoreState } from "app/store";

export const TabEmptyCase: React.FC = () => (
  <EmptyBoxWrapper>
    <EmptyBoxText>
      <FormattedMessage id="nft_collection_sale_schedule_empty" />
    </EmptyBoxText>
  </EmptyBoxWrapper>
);

export const TabLoadingWrapper = React.memo(
  ({
    isLoading,
    children,
  }: React.PropsWithChildren<{
    isLoading: boolean | null | undefined;
  }>) => {
    if (isLoading === undefined) {
      return <SkeletonBox width="100%" height={px2rem(440)} />;
    }

    return <>{children}</>;
  },
);

interface IProps {
  contractId: string;
  isLoading: boolean | null | undefined;
  isFetched: boolean | undefined;
}

export const defaultPagingListValue: Moim.IIndexedPagingList<string> = {
  items: [],
  total: 0,
  currentIndex: 0,
};

function CollectionTabContainer({ isLoading, isFetched, contractId }: IProps) {
  const contract = useStoreState(state =>
    contractId ? state.entities.nftContracts[contractId] : undefined,
  );

  const informationTabContent = useInformationTab(
    isLoading,
    isFetched,
    contractId,
  );

  const itemsTabContent = useItemsTab(isLoading, contractId);
  const schedulesTabContent = useSchedulesTab(isLoading, contractId);
  const ownersTabContent = useOwnersTab(isLoading, contractId);

  const tabs = React.useMemo(
    () =>
      contract?.imported
        ? [informationTabContent, itemsTabContent, ownersTabContent]
        : [
            informationTabContent,
            itemsTabContent,
            schedulesTabContent,
            ownersTabContent,
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      contract,
      informationTabContent,
      itemsTabContent,
      ownersTabContent,
      schedulesTabContent,
    ],
  );

  return <CollectionTab tabs={tabs} contractId={contractId} />;
}
export default React.memo(CollectionTabContainer);
