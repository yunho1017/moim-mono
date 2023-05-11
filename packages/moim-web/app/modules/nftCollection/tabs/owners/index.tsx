import * as React from "react";
import { useIntl } from "react-intl";
// components
import NftOwnersTabShowComponents from "./components/show";
import { TabLoadingWrapper } from "..";

interface IProps {
  contractId: Moim.Id | undefined;
}

const OwnerTab: React.FC<IProps> = React.memo(({ contractId }) => (
  <NftOwnersTabShowComponents resourceId={contractId} />
));

export default function useOwnersTab(
  isLoading: boolean | null | undefined,
  contractId: Moim.Id | undefined,
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "owners",
      title: (
        <>
          {intl.formatMessage({
            id: "nft_collection_show_tab_title_owners",
          })}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <OwnerTab contractId={contractId} />
        </TabLoadingWrapper>
      ),
    }),
    [contractId, intl, isLoading],
  );
}
