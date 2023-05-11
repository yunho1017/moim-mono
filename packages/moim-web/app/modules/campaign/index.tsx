import * as React from "react";
import { Route, Switch } from "react-router";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";
// containers
import ParticipantsContainer from "./containers/participants";
import WalletContainer from "./containers/wallet";
import ExecutionsContainer from "./containers/executions";
import ExecutionShowRedirect from "./containers/executionShow/redirect";
import ExecutionVoteResultRedirect from "./containers/voteList/redirect";

const Test = () => <div>hello</div>;

const Commerce: React.FC<IRouteComponentProps> = ({}) => {
  return (
    <Switch>
      <Route
        exact={true}
        path={MoimURL.CampaignWallet.pattern}
        component={WalletContainer}
      />
      <Route
        exact={true}
        path={MoimURL.CampaignParticipants.pattern}
        component={ParticipantsContainer}
      />
      <Route
        exact={true}
        path={MoimURL.CampaignFunds.pattern}
        component={Test}
      />
      <Route
        exact={true}
        path={MoimURL.CampaignExecutionVoteResult.pattern}
        component={ExecutionVoteResultRedirect}
      />
      <Route
        exact={true}
        path={MoimURL.CampaignExecutionView.pattern}
        component={ExecutionShowRedirect}
      />
      <Route
        exact={true}
        path={MoimURL.CampaignExecutions.pattern}
        component={ExecutionsContainer}
      />
    </Switch>
  );
};

export default Commerce;
