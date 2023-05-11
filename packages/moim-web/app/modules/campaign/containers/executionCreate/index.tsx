import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";
import { selectCampaignProject } from "app/selectors/campaign";
import { useStoreState, useActions } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import useOpenState from "common/hooks/useOpenState";
import useCancelToken from "common/hooks/useCancelToken";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import { removeStoreRedirectBlocks } from "app/actions/referenceBlock/cookieHelper";
import {
  setPaymentRedirectLastSeen,
  setPaymentRedirectRequest,
  removePaymentRedirectLastSeen,
  removePaymentRedirectRequest,
} from "app/modules/commerce/components/checkoutRedirectDialog/helpers";
import {
  createExecution as createExecutionAction,
  fetchExecutionRules as fetchExecutionRulesAction,
  ActionCreators as CampaignActionCreators,
} from "app/actions/campaign";
import ExecutionShowDialog from "app/modules/campaign/components/executions/dialog";
import AlertDialog from "common/components/alertDialog";
import ExecutionCreateComponent from "../../components/executions/create";

const ExecutionCreateContainer: React.FC = ({}) => {
  const hubSeller = useHubSeller();
  const theme = React.useContext(ThemeContext);
  const [rules, setRules] = React.useState<
    Moim.Campaign.ISimpleExecutionRule[]
  >([]);
  const [isCreateLoading, setCreateLoadStatus] = React.useState(false);
  const [isRuleLoading, setRuleLoadStatus] = React.useState(false);
  const [isRuleFetched, setRuleFetchStatus] = React.useState(false);
  const createCancelTokenSource = useCancelToken();
  const storeSecondaryPanelPath = useStoreSecondaryView();
  const {
    isOpen: leaveAlertOpen,
    open: handleLeaveAlertOpen,
    close: handleLeaveAlertClose,
  } = useOpenState(false);

  const { isOpen, campaignId, campaignData } = useStoreState(state => ({
    campaignId: state.campaignPage.currentCampaignId,
    isOpen: state.campaignPage.openExecutionCreateDialog,
    campaignData: state.campaignPage.currentCampaignId
      ? selectCampaignProject(state, state.campaignPage.currentCampaignId)
      : undefined,
  }));

  const { close, fetchExecutionRules, createExecution } = useActions({
    close: CampaignActionCreators.closeExecutionCreateDialog,
    fetchExecutionRules: fetchExecutionRulesAction,
    createExecution: createExecutionAction,
  });

  const leaveAlertButtons = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="button_cancel" />,
        textColor: theme.colorV2.colorSet.grey600,
        onClick: handleLeaveAlertClose,
      },
      {
        text: <FormattedMessage id="button_ok" />,
        onClick: () => {
          handleLeaveAlertClose();
          close();
        },
      },
    ],
    [theme.colorV2.colorSet.grey600, handleLeaveAlertClose, close],
  );

  const handleSubmit = React.useCallback(
    (payload: {
      title: string;
      contents: Moim.Blockit.Blocks[];
      ruleId: number;
      amount: number;
    }) => {
      if (campaignId && !isCreateLoading) {
        const { title, contents, amount, ruleId } = payload;
        setCreateLoadStatus(true);

        setPaymentRedirectRequest(true);
        setPaymentRedirectLastSeen();
        storeSecondaryPanelPath();
        createExecution(
          campaignId,
          {
            title,
            amount,
            transferCodeId: ruleId,
            redirectUrl: location.href,
          },
          contents,
          createCancelTokenSource.current.token,
        )
          .catch(() => {
            removePaymentRedirectLastSeen();
            removePaymentRedirectRequest();
            removeStoreRedirectBlocks();
          })
          .finally(() => {
            setCreateLoadStatus(false);
            close();
          });
      }
    },
    [
      campaignId,
      close,
      createCancelTokenSource,
      createExecution,
      isCreateLoading,
      storeSecondaryPanelPath,
    ],
  );
  const handleCancel = React.useCallback(() => {
    close();
  }, [close]);

  React.useEffect(() => {
    if (!isOpen) {
      setCreateLoadStatus(false);
      setRuleLoadStatus(false);
      setRuleFetchStatus(false);
      setRules([]);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (
      isOpen &&
      campaignData &&
      rules.length === 0 &&
      !isRuleLoading &&
      !isRuleFetched
    ) {
      setRuleLoadStatus(true);

      fetchExecutionRules(campaignData.communityAccount)
        .then(res => {
          setRules(
            res.map(i => ({
              id: i.code_id,
              voteDuration: i.vote_duration,
              passRule: i.pass_rule,
            })),
          );
        })
        .catch(() => {
          setRules(campaignData.codes.transferFund);
        })
        .finally(() => {
          setRuleFetchStatus(true);
          setRuleLoadStatus(false);
        });
    }
  }, [
    isOpen,
    campaignData,
    fetchExecutionRules,
    isRuleFetched,
    isRuleLoading,
    rules.length,
  ]);

  return (
    <>
      <ExecutionShowDialog open={isOpen} onClose={handleLeaveAlertOpen}>
        <ExecutionCreateComponent
          campaignId={campaignId}
          isSubmitLoading={isCreateLoading}
          token={campaignData?.token}
          rules={rules}
          currency={hubSeller?.currency ?? "KRW"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </ExecutionShowDialog>
      <AlertDialog
        key="leave_alert"
        open={leaveAlertOpen}
        content={<FormattedMessage id="dialog_funding_proposal_leave_alert" />}
        rightButtons={leaveAlertButtons}
        onClose={handleLeaveAlertClose}
      />
    </>
  );
};

export default ExecutionCreateContainer;
