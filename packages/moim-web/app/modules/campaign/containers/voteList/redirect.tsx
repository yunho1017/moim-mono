import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useActions } from "app/store";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import { MoimURL } from "common/helpers/url";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ExecutionVoteResultRedirect: React.FC<IProps> = ({ match }) => {
  const { campaignId, executionId } = match.params;
  const { open } = useActions({
    open: CampaignActionCreators.openExecutionVoteListDialog,
  });

  React.useLayoutEffect(() => {
    if (campaignId && executionId) {
      open({
        campaignId,
        executionId,
      });
    }
  }, []);

  if (campaignId) {
    return (
      <Redirect
        to={new MoimURL.CampaignExecutions({ campaignId }).toString()}
      />
    );
  }

  return <Redirect to={new MoimURL.NotFound().toString()} />;
};

export default ExecutionVoteResultRedirect;
