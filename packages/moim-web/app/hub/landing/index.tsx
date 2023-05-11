import * as React from "react";
import { Redirect } from "react-router";

import { IRouteComponentProps } from "app/routes/client";
// helpers
import { MoimURL } from "common/helpers/url";
import { getCryptoBadgeToken } from "common/helpers/cryptoBadgeHandlerWithInMemory";
// components
import { Wrapper } from "./styled";
import JoinGroup from "app/hub/joinGroup";
// actions
import { SmallModalLayout } from "common/components/modalLayout/small";

export default function HubLanding({}: IRouteComponentProps) {
  const cryptoBadgeAccessToken = getCryptoBadgeToken();
  return (
    <Wrapper>
      <SmallModalLayout>
        <GroupHomeRenderer cryptoBadgeAccessToken={cryptoBadgeAccessToken} />
        <SignInRenderer cryptoBadgeAccessToken={cryptoBadgeAccessToken} />
      </SmallModalLayout>
    </Wrapper>
  );
}

function GroupHomeRenderer({
  cryptoBadgeAccessToken,
}: {
  cryptoBadgeAccessToken: string | null;
}) {
  if (!cryptoBadgeAccessToken) {
    return null;
  }

  return <JoinGroup />;
}

export function SignInRenderer({
  cryptoBadgeAccessToken,
}: {
  cryptoBadgeAccessToken: string | null;
}) {
  if (cryptoBadgeAccessToken) {
    return null;
  }

  const signInUrl = new MoimURL.HubSignIn().toString();
  return <Redirect to={signInUrl} />;
}
