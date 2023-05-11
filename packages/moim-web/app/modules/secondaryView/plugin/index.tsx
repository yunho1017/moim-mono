import * as React from "react";
import { Switch, Route, Router } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useEffects, useProps } from "./hooks";
import { MoimURL } from "common/helpers/url";
// components
import { SlideTransitionGroup, TRANSITION_DURATION } from "../styled";
import PluginPanel from "./components/plugin";
import PluginPanelContextProvider from "./context";

export default function() {
  const hookProps = useProps();
  useEffects(hookProps);

  const { history } = hookProps;

  if (!history) {
    return null;
  }

  return (
    <PluginPanelContextProvider>
      <Router history={history}>
        <SlideTransitionGroup>
          <CSSTransition
            unmountOnExit={true}
            timeout={TRANSITION_DURATION}
            classNames="slide"
          >
            <Switch>
              <Route path={MoimURL.PluginRightPanel.pattern}>
                <PluginPanel />
              </Route>
            </Switch>
          </CSSTransition>
        </SlideTransitionGroup>
      </Router>
    </PluginPanelContextProvider>
  );
}
