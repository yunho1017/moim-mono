import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// helpers
import {
  clearExternalCookieToken,
  getCommunityId,
  getExternalCookieToken,
  getUserToken,
  setExternalCookieToken,
} from "./helper";
import { MoimURL } from "common/helpers/url";
// components
import UserProfileShow from "./modules/components/profile";
import UserNFTs from "./modules/components/NFTList";
import NFTshow from "./modules/components/NFTshow";
import NFTMinting from "./modules/components/NFTMinting";
import CoinShow from "./modules/components/coinShow";
// styled
import { GlobalStyles } from "./styled";

const ExternalMoimComponent: React.FC = () => {
  const history = createBrowserHistory({ basename: "/communities" });

  React.useEffect(() => {
    const communityId = getCommunityId();
    const userToken = getUserToken();
    const externalCookieToken = getExternalCookieToken(communityId);
    if (communityId && userToken && userToken !== externalCookieToken) {
      clearExternalCookieToken(communityId);
      setExternalCookieToken(communityId, userToken);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router history={history}>
        <Switch>
          <Route
            path={MoimURL.EXUserShow.pattern}
            exact={true}
            component={UserProfileShow}
          />
          <Route
            path={MoimURL.EXUserNFTList.pattern}
            exact={true}
            component={UserNFTs}
          />
          <Route
            path={MoimURL.EXNFTUserMinting.pattern}
            exact={true}
            component={NFTMinting}
          />
          <Route
            path={MoimURL.EXNFTShow.pattern}
            exact={true}
            component={NFTshow}
          />
          <Route
            path={MoimURL.EXCoinShow.pattern}
            exact={true}
            component={CoinShow}
          />
        </Switch>
      </Router>
    </>
  );
};

export default ExternalMoimComponent;
