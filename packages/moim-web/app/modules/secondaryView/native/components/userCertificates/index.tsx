import React from "react";

import { Route, Switch } from "react-router";

import WithParamsWrapper from "common/components/withParamsWrapper";
import NormalType from "./templates/normal";
import CardType from "./templates/card";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";

const UserCertificates: React.FC = () => {
  const { history } = useNativeSecondaryView();

  if (!history) {
    return null;
  }

  return (
    <Switch>
      <Route path={MoimURL.ProfileBadgeCardList.pattern}>
        <WithParamsWrapper paramKeys={[{ key: "userId" }]}>
          {([userId]) => <CardType userId={userId} />}
        </WithParamsWrapper>
      </Route>
      <Route path={MoimURL.ProfileBadgeList.pattern}>
        <WithParamsWrapper paramKeys={[{ key: "userId" }]}>
          {([userId]) => <NormalType userId={userId} />}
        </WithParamsWrapper>
      </Route>
    </Switch>
  );
};

export default UserCertificates;
