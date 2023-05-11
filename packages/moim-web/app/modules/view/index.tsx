// vendor
import * as React from "react";
import { Route } from "react-router";
import WithParamsWrapper from "common/components/withParamsWrapper";

import { MoimURL } from "common/helpers/url";
import ViewContainer from "./containers";

function View() {
  return (
    <Route path={MoimURL.ViewShow.pattern}>
      <WithParamsWrapper paramKeys={[{ key: "viewId" }]}>
        {([channelId]) => <ViewContainer channelId={channelId} />}
      </WithParamsWrapper>
    </Route>
  );
}

export default View;
