import * as React from "react";
import { Route, Switch } from "react-router";
import { IRouteComponentProps } from "app/routes/client";
import { MoimURL } from "common/helpers/url";
// containers
import WalletContainer from "./containers/wallet";

const Treasury: React.FC<IRouteComponentProps> = ({}) => (
  <Switch>
    <Route
      exact={true}
      path={MoimURL.TreasuryShow.pattern}
      component={WalletContainer}
    />
  </Switch>
);

export default Treasury;
