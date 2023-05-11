// vendor
import * as React from "react";
import { Redirect } from "react-router";
import * as queryString from "querystring";
// helper
import { URLDefinition } from "common/helpers/url/definition";

interface IProps {
  to: URLDefinition | string;
  qs?: { [key: string]: string | string[] };
}

function MoimRedirect({ to, qs }: IProps) {
  const pathname = to.toString();
  const search = qs && queryString.stringify(qs);
  const toObject = React.useMemo(
    () => ({
      pathname,
      search,
    }),
    [pathname, search],
  );
  return <Redirect to={toObject} />;
}

export default MoimRedirect;
