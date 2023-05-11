// vendor
import * as React from "react";
// component
import CreateGroup from "./createGroup";
import HubHome from "./landing";
import HubSignIn from "./signIn";
import HubThemeProvider from "./themeProvider";

// helper
import { MoimURL } from "common/helpers/url";
import renderRoutes from "app/routes/helpers";

import { IRouteConfig, IRouteComponentProps } from "app/routes/client";

const hubRoutes: IRouteConfig[] = [
  {
    def: MoimURL.HubSignIn,
    component: () => <HubSignIn />,
    exact: true,
  },
  {
    def: MoimURL.HubHome,
    component: (routeProps: IRouteComponentProps) => (
      <HubHome {...routeProps} />
    ),
    exact: true,
  },
  {
    def: MoimURL.CreateGroup,
    component: () => <CreateGroup />,
    exact: true,
  },
];

export default function Hub() {
  return <HubThemeProvider>{renderRoutes(hubRoutes)}</HubThemeProvider>;
}
