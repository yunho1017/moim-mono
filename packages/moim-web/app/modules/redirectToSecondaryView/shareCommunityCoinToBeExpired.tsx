import * as React from "react";
import { Redirect } from "react-router";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";

const shareCommunityCoinsToBeExpiredRedirectors: React.FC<IRouteComponentProps> = props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { redirect } = useNativeSecondaryView();
  if (props.match.params.coinId) {
    setTimeout(() => {
      redirect(
        new MoimURL.CoinToBeExpired({
          coinId: props.match.params.coinId ?? "",
        }).toString(),
      );
    }, 500);
  }
  return <Redirect to="/" />;
};

export default shareCommunityCoinsToBeExpiredRedirectors;
