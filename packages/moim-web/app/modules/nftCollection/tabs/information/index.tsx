import * as React from "react";
import { useIntl } from "react-intl";

// components
import { TabLoadingWrapper } from "..";
import Layout from "./components/layout";

interface IProps {
  contractId: Moim.Id;
  isLoading: boolean | null | undefined;
  isFetched: boolean | undefined;
}

const InformationTab: React.FC<IProps> = React.memo(
  ({ contractId, isLoading, isFetched }) => (
    <Layout
      contractId={contractId}
      isLoading={isLoading}
      isFetched={isFetched}
    />
  ),
);

export default function useInformationTab(
  isLoading: boolean | null | undefined,
  isFetched: boolean | undefined,
  contractId: Moim.Id,
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "information",
      title: (
        <>
          {intl.formatMessage({
            id: "nft_collection_show_tab_title_information",
          })}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <InformationTab
            contractId={contractId}
            isLoading={isLoading}
            isFetched={isFetched}
          />
        </TabLoadingWrapper>
      ),
    }),
    [contractId, intl, isFetched, isLoading],
  );
}
