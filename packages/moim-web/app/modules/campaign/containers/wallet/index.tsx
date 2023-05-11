import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useActions, useStoreState } from "app/store";
import { getWalletHistory } from "app/actions/campaign";
import { selectCampaignProject } from "app/selectors/campaign";
import WalletComponent from "../../components/wallet";

/**
 * 히스토리상 입금인지 출금인지 구분법
 * IWalletHistoryDatum.data.to === campaign.communityAccount
 *  -> 입금, 표시할 유저(canUsername)이름은 username = data.memo.split("-")[1]
 * else:
 *  -> 출금, 표시할 유저(canUsername)이름은 username = IWalletHistoryDatum.data.to
 */

const WalletContainer: React.FC<RouteComponentProps<Moim.IMatchParams>> = ({
  match,
}) => {
  const { campaignId } = match.params;
  const [isLoading, setLoadStatus] = React.useState(false);
  const [totalLogCount, setTotalLogCount] = React.useState(0);
  const [paging, setPage] = React.useState("");
  const [logs, setLogs] = React.useState<Moim.Campaign.IWalletHistoryDatum[]>(
    [],
  );
  const { campaignData } = useStoreState(state => ({
    campaignData: campaignId
      ? selectCampaignProject(state, campaignId)
      : undefined,
  }));
  const { dispatchGetWalletHistory } = useActions({
    dispatchGetWalletHistory: getWalletHistory,
  });

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && campaignData && paging) {
      setLoadStatus(true);
      dispatchGetWalletHistory(
        campaignData.token.code,
        campaignData.communityAccount,
        paging,
      )
        .then(res => {
          setLogs(tmpState => [...tmpState, ...res.simple_actions.slice(1)]);
          if (res.total.value > 1) {
            setPage(
              res.simple_actions[res.simple_actions.length - 1].timestamp,
            );
          } else {
            setPage("");
          }
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  }, [campaignData, dispatchGetWalletHistory, isLoading, paging]);

  useEffectOnce(() => {
    if (!isLoading && campaignData) {
      setLoadStatus(true);
      dispatchGetWalletHistory(
        campaignData.token.code,
        campaignData.communityAccount,
      )
        .then(res => {
          setTotalLogCount(res.total.value);
          setLogs(res.simple_actions);
          if (logs.length + res.simple_actions.length < res.total.value) {
            setPage(
              res.simple_actions[res.simple_actions.length - 1].timestamp,
            );
          }
        })
        .finally(() => {
          setLoadStatus(false);
        });
    }
  });

  return (
    <WalletComponent
      isLoading={isLoading}
      totalLogCount={totalLogCount}
      campaignData={campaignData}
      paging={paging}
      logs={logs}
      onLoadMore={handleLoadMore}
    />
  );
};

export default WalletContainer;
