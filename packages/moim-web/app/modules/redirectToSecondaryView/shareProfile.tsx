import * as React from "react";
import { Redirect } from "react-router";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";

const ShareProfileRedirector: React.FC<IRouteComponentProps> = props => {
  const { redirect } = useNativeSecondaryView();
  if (props.match.params.userId) {
    redirect(
      new MoimURL.Members({
        userId: props.match.params.userId,
      }).toString(),
    );
  }
  return <Redirect to="/" />;
};

export default ShareProfileRedirector;
