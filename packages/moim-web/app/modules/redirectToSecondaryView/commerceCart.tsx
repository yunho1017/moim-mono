import * as React from "react";
import { Redirect } from "react-router";
import { IRouteComponentProps } from "app/routes/client";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";

const CommerceCartsRedirector: React.FC<IRouteComponentProps> = ({}) => {
  const { redirect } = useNativeSecondaryView();
  React.useLayoutEffect(() => {
    setTimeout(() => {
      redirect(new MoimURL.CommerceMyCarts().toString());
    }, 500);
  }, [redirect]);

  return <Redirect to="/" />;
};

export default CommerceCartsRedirector;
