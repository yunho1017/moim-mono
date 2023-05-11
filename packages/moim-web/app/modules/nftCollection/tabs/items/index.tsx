import * as React from "react";
import { useIntl } from "react-intl";
// components
import { TabLoadingWrapper } from "..";
import NftItemsTabShowComponents from "./components/show";

interface IProps {
  contractId: Moim.Id | undefined;
}

const ItemsTab: React.FC<IProps> = React.memo(({ contractId }) => (
  <NftItemsTabShowComponents resourceId={contractId} />
));

export default function useItemsTab(
  isLoading?: boolean | null,
  contractId?: Moim.Id,
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "items",
      title: (
        <>
          {intl.formatMessage({
            id: "nft_collection_show_tab_title_items",
          })}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <ItemsTab contractId={contractId} />
        </TabLoadingWrapper>
      ),
    }),
    [contractId, intl, isLoading],
  );
}
