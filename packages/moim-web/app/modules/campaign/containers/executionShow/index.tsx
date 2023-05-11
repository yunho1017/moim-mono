import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStoreState, useActions } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import useOpenState from "common/hooks/useOpenState";
import useCurrentUserPositionCheck from "common/hooks/useCurrentUserPositionCheck";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import {
  selectCampaignExecution,
  selectCampaignProject,
} from "app/selectors/campaign";
import AlertDialog from "common/components/alertDialog";
import { DefaultLoader } from "common/components/loading";
import ExecutionShowComponent from "../../components/executions/view";
import ExecutionShowDialog from "../../components/executions/dialog";

interface IProps {}

const ExecutionShowContainer: React.FC<IProps> = ({}) => {
  const intl = useIntl();
  const hubSeller = useHubSeller();
  const {
    isOpen,
    campaignId,
    executionId,
    campaignData,
    execution,
  } = useStoreState(state => {
    const cId = state.campaignPage.currentCampaignId;
    const exeId = state.campaignPage.currentExecutionId;
    return {
      isOpen: state.campaignPage.openExecutionShow,
      campaignId: cId,
      executionId: exeId,
      campaignData: cId ? selectCampaignProject(state, cId) : undefined,
      execution: exeId ? selectCampaignExecution(state, exeId) : undefined,
    };
  });
  const { closeDialog, openVoteDialog, openVoteResultDialog } = useActions({
    closeDialog: CampaignActionCreators.closeExecutionViewDialog,
    openVoteDialog: CampaignActionCreators.openExecutionVoteDialog,
    openVoteResultDialog: CampaignActionCreators.openExecutionVoteListDialog,
  });

  const positionCheck = useCurrentUserPositionCheck();

  const {
    isOpen: votePermissionAlertOpenStatus,
    open: openVotePermissionAlert,
    close: closeVotePermissionAlert,
  } = useOpenState();

  const createPermissionAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "button_ok" }),
        onClick: closeVotePermissionAlert,
      },
    ],
    [closeVotePermissionAlert, intl],
  );

  const voteDenyHandler = React.useCallback(() => {
    if (
      campaignId &&
      executionId &&
      execution?.voterPositions &&
      positionCheck(execution.voterPositions.map(p => p.moim))
    ) {
      openVoteDialog({
        campaignId,
        executionId,
        flag: "deny",
      });
    } else {
      openVotePermissionAlert();
    }
  }, [
    campaignId,
    execution,
    executionId,
    openVoteDialog,
    openVotePermissionAlert,
    positionCheck,
  ]);
  const voteAgreeHandler = React.useCallback(() => {
    if (
      campaignId &&
      executionId &&
      execution?.voterPositions &&
      positionCheck(execution.voterPositions.map(p => p.moim))
    ) {
      openVoteDialog({
        campaignId,
        executionId,
        flag: "agree",
      });
    } else {
      openVotePermissionAlert();
    }
  }, [
    campaignId,
    execution,
    executionId,
    openVoteDialog,
    openVotePermissionAlert,
    positionCheck,
  ]);

  const handleClickResult = React.useCallback(() => {
    if (campaignId && executionId) {
      openVoteResultDialog({ campaignId, executionId });
    }
  }, [campaignId, executionId, openVoteResultDialog]);

  return (
    <>
      <ExecutionShowDialog open={isOpen} onClose={closeDialog}>
        {!execution ? (
          <DefaultLoader />
        ) : (
          <ExecutionShowComponent
            currency={hubSeller?.currency ?? "KRW"}
            token={campaignData?.token}
            execution={execution}
            onClickAgree={voteAgreeHandler}
            onClickDeny={voteDenyHandler}
            onClickResult={handleClickResult}
          />
        )}
      </ExecutionShowDialog>
      <AlertDialog
        open={votePermissionAlertOpenStatus}
        content={
          <FormattedMessage id="dialog_vote_for_funding_proposal_no_rights_body" />
        }
        rightButtons={createPermissionAlertButtons}
        onClose={closeVotePermissionAlert}
      />
    </>
  );
};

export default ExecutionShowContainer;
