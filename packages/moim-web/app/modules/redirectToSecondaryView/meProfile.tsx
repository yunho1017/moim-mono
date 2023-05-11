import * as React from "react";
import { Redirect } from "react-router";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";

const MeProfileRedirector: React.FC<IRouteComponentProps> = () => {
  const { redirect } = useNativeSecondaryView();

  redirect(new MoimURL.Me().toString());
  return <Redirect to="/" />;
};

export default MeProfileRedirector;
