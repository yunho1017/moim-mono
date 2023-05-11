import * as React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import useIsMobile from "common/hooks/useIsMobile";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader } from "common/components/loading";
import { Spacer } from "common/components/designSystem/spacer";
import WalletInformation from "./components/walletInformation";
import LogItem from "./components/logItem";
import { Wrapper, Inner, PageTitle, DateTimeLabel, Divider } from "./styled";

interface IProps {
  isLoading: boolean;
  totalLogCount: number;
  paging: string;
  logs: Moim.Campaign.IWalletHistoryDatum[];
  campaignData?: Moim.Campaign.IDenormalizedCampaign;
  onLoadMore(): void;
}

const WalletComponent: React.FC<IProps> = ({
  isLoading,
  paging,
  logs,
  campaignData,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const hubSeller = useHubSeller();
  const monthlyGroupingLogs = React.useMemo(() => {
    const dateGroup: Record<string, Moim.Campaign.IWalletHistoryDatum[]> = {};
    logs.forEach(log => {
      const dateKey = moment.utc(log.timestamp).format("YYYY-MM");
      if (dateGroup[dateKey]) {
        dateGroup[dateKey].push(log);
      } else {
        dateGroup[dateKey] = [log];
      }
    });

    return dateGroup;
  }, [logs]);

  const resolveElements = React.useMemo(
    () =>
      Object.entries(monthlyGroupingLogs).map(([key, items]) => (
        <>
          <Spacer value={32} />
          <DateTimeLabel>{key}</DateTimeLabel>
          <Divider />
          {items.map((item, index) => (
            <>
              <LogItem
                key={`${item.block}_${item.transaction_id}`}
                currency={hubSeller?.currency ?? "KRW"}
                canUsername={
                  item.data.to === (campaignData?.communityAccount ?? "")
                    ? item.data.memo.split("-")[1]
                    : item.data.to
                }
                createAt={moment.utc(item.timestamp).valueOf()}
                amount={item.data.amount}
                transactionType={
                  item.data.to === (campaignData?.communityAccount ?? "")
                    ? "donate"
                    : "transfer"
                }
                token={campaignData?.token}
              />
              {index < items.length - 1 && <Divider />}
            </>
          ))}
          <Spacer value={24} />
        </>
      )),
    [campaignData, hubSeller, monthlyGroupingLogs],
  );

  return (
    <Wrapper>
      <Inner>
        <Spacer value={isMobile ? 20 : 40} />
        <PageTitle>
          <FormattedMessage id="project_manager_project_wallet_page_title" />
        </PageTitle>
        <Spacer value={23} />
        <WalletInformation
          currency={hubSeller?.currency ?? "KRW"}
          token={campaignData?.token}
          usedAmount={campaignData?.usedAmount}
          raisedAmount={campaignData?.raisedAmount}
        />
        <InfiniteScroller
          isLoading={isLoading}
          paging={{ after: paging }}
          itemLength={logs.length}
          loader={
            <>
              <Spacer value={24} />
              <DefaultLoader />
            </>
          }
          loadMore={onLoadMore}
        >
          {resolveElements}
        </InfiniteScroller>
        <Spacer value={isMobile ? 24 : 120} />
      </Inner>
    </Wrapper>
  );
};

export default WalletComponent;
