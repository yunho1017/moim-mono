// vendor
import * as React from "react";
import { Route, Switch } from "react-router";
import { TopBannerContext } from "common/components/topBanner/context";
// component
import ConversationShow from "./containers/conversationShow";
import DirectMessageShow from "./containers/directMessageShow";
import WithParamsWrapper from "common/components/withParamsWrapper";
import RequiredCurrentUserComponent from "common/components/requiredCurrentUserComponent";

import { MoimURL } from "common/helpers/url";
import useIsMobile from "common/hooks/useIsMobile";

function Conversation() {
  const isMobile = useIsMobile();
  const [, setTopBannerContext] = React.useContext(TopBannerContext);

  React.useLayoutEffect(() => {
    if (isMobile) {
      setTopBannerContext(state => ({
        ...state,
        forceHidden: true,
      }));

      return () => {
        setTopBannerContext(state => ({
          ...state,
          forceHidden: false,
        }));
      };
    }
  }, [isMobile, setTopBannerContext]);

  return (
    <Switch>
      <Route path={MoimURL.ConversationShow.pattern}>
        <WithParamsWrapper paramKeys={[{ key: "conversationId" }]}>
          {([channelId]) => <ConversationShow channelId={channelId} />}
        </WithParamsWrapper>
      </Route>
      <Route path={MoimURL.DirectMessageShow.pattern}>
        <RequiredCurrentUserComponent>
          <WithParamsWrapper paramKeys={[{ key: "directMessageId" }]}>
            {([channelId]) => <DirectMessageShow channelId={channelId} />}
          </WithParamsWrapper>
        </RequiredCurrentUserComponent>
      </Route>
    </Switch>
  );
}

export default Conversation;
