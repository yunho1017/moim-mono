import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { IRouteConfig } from "./client";

const renderRoutes = (routes: IRouteConfig[], switchProps: any = {}) => (
  <Switch {...switchProps}>
    {routes.map((route, index) => {
      const path =
        route.def &&
        (Array.isArray(route.def)
          ? route.def.map(def => def.pattern)
          : route.def.pattern);
      return (
        <Route
          key={Array.isArray(path) ? path.join("|") : path || index}
          path={path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            if (route.component) {
              return <route.component {...props} routes={route.routes} />;
            }
          }}
        />
      );
    })}
  </Switch>
);

export default renderRoutes;
