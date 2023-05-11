import * as React from "react";
import debounce from "lodash/debounce";
import { useEffectOnce } from "react-use";
import { RouteComponentProps } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useActions, useStoreState } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import useCurrentUser from "common/hooks/useCurrentUser";
import useOpenState from "common/hooks/useOpenState";
import useCurrentUserPositionCheck from "common/hooks/useCurrentUserPositionCheck";
import AlertDialog from "common/components/alertDialog";
import {
  fetchCampaign as fetchCampaignAction,
  ActionCreators as CampaignActionCreators,
} from "app/actions/campaign";
import { selectCampaignProject } from "app/selectors/campaign";
import ExecutionListComponent from "../../components/executions/list";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ExecutionsContainer: React.FC<IProps> = ({ match }) => {
  const { campaignId } = match.params;
  const intl = useIntl();
  const [isLoading, setLoadStatus] = React.useState(true);
  const [isFetched, setFetchStatus] = React.useState(false);
  const hubSeller = useHubSeller();
  const currentUser = useCurrentUser();
  const { campaignData } = useStoreState(state => ({
    campaignData: campaignId
      ? selectCampaignProject(state, campaignId)
      : undefined,
  }));
  const { fetchCampaign, openExecutionCreateDialog } = useActions({
    fetchCampaign: fetchCampaignAction,
    openExecutionCreateDialog: CampaignActionCreators.openExecutionCreateDialog,
  });

  const positionCheck = useCurrentUserPositionCheck();

  const {
    isOpen: createPermissionAlertOpenStatus,
    open: openCreatePermissionAlert,
    close: closeCreatePermissionAlert,
  } = useOpenState();

  const handleClickCreateExecutionButton = React.useCallback(() => {
    if (
      campaignId &&
      campaignData &&
      campaignData.positions &&
      campaignData.positions.executor &&
      positionCheck([campaignData.positions.executor.moim])
    ) {
      openExecutionCreateDialog({
        campaignId,
      });
    } else {
      openCreatePermissionAlert();
    }
  }, [
    campaignData,
    campaignId,
    openCreatePermissionAlert,
    openExecutionCreateDialog,
    positionCheck,
  ]);

  const createPermissionAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "button_ok" }),
        onClick: closeCreatePermissionAlert,
      },
    ],
    [closeCreatePermissionAlert, intl],
  );

  const debounceFetch = React.useCallback(
    debounce(() => {
      if (campaignId) {
        setLoadStatus(true);
        fetchCampaign(campaignId).finally(() => {
          setLoadStatus(false);
          setFetchStatus(true);
        });
      }
    }, 300),
    [campaignId, fetchCampaign],
  );

  useEffectOnce(() => {
    if (campaignId && !isFetched) {
      debounceFetch();
    }
  });

  return (
    <>
      <ExecutionListComponent
        isLoading={isLoading}
        campaignData={campaignData}
        currency={hubSeller?.currency ?? "KRW"}
        disableCreateButton={currentUser === null}
        onClickExecutionCreateButton={handleClickCreateExecutionButton}
      />
      <AlertDialog
        open={createPermissionAlertOpenStatus}
        content={<FormattedMessage id="dialog_apply_funding_no_rights_body" />}
        rightButtons={createPermissionAlertButtons}
        onClose={closeCreatePermissionAlert}
      />
    </>
  );
};

export default ExecutionsContainer;
