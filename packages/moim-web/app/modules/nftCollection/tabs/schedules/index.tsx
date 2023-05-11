import * as React from "react";
import { useIntl } from "react-intl";
// components
import NftSchedulesTabShowComponents from "./components/show";
import { TabLoadingWrapper } from "..";

interface IProps {
  contractId: Moim.Id | undefined;
}

const ScheduleTab: React.FC<IProps> = React.memo(({ contractId }) => (
  <NftSchedulesTabShowComponents resourceId={contractId} />
));

export default function useSchedulesTab(
  isLoading: boolean | null | undefined,
  contractId: Moim.Id | undefined,
) {
  const intl = useIntl();

  return React.useMemo(
    () => ({
      id: "schedules",
      title: (
        <>
          {intl.formatMessage({
            id: "nft_collection_show_tab_title_schedules",
          })}
        </>
      ),
      content: (
        <TabLoadingWrapper isLoading={isLoading}>
          <ScheduleTab contractId={contractId} />
        </TabLoadingWrapper>
      ),
    }),
    [contractId, intl, isLoading],
  );
}
