import * as React from "react";
import * as queryString from "querystring";
import { IRouteComponentProps } from "app/routes/client";
// hooks
import {
  useProps,
  useHandlers,
  REQUIRED_USERNAME_MESSAGE,
  WRONG_REFERRER_MESSAGE,
} from "./useHooks";
// components
import { LoadingIcon } from "common/components/loading";
import { Container, IFrame } from "./styledComponents";

interface IQueryParams {
  username?: string; // Required Field
}
const signIframeName = "sign-iframe";

const QuickJoin: React.FC<IRouteComponentProps> = ({ location }) => {
  const { username }: IQueryParams = queryString.parse(
    location.search.replace("?", ""),
  );

  const { fetchAuthenticate, isCameFromMoim } = useHandlers(
    useProps({ username }),
  );

  React.useEffect(() => {
    if (!isCameFromMoim) {
      window.opener.postMessage(WRONG_REFERRER_MESSAGE, "*");
      return;
    }

    if (!username) {
      window.opener.postMessage(REQUIRED_USERNAME_MESSAGE, "*");
      return;
    }

    fetchAuthenticate(signIframeName);
  }, [fetchAuthenticate, isCameFromMoim, username]);

  return (
    <Container>
      {!username && <h1>Required username!</h1>}
      <IFrame name={signIframeName} />
      <LoadingIcon />
    </Container>
  );
};

export default QuickJoin;
