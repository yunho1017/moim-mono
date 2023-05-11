import useCurrentUser from "common/hooks/useCurrentUser";
import * as React from "react";

import NotificationMarketingComponent from "./components/marketing";

export default function NotificationContainer() {
  const currentUser = useCurrentUser();
  const hasEmail = Boolean(currentUser?.email);

  const adAgreementSetting = React.useMemo(
    () => ({
      sms: Boolean(
        currentUser?.adAgreementV2?.sms?.dayTime.agreement === "accepted",
      ),
      email: Boolean(
        currentUser?.adAgreementV2?.email?.dayTime.agreement === "accepted",
      ),
      appPush: Boolean(
        currentUser?.adAgreementV2?.appPush?.dayTime.agreement === "accepted",
      ),
    }),
    [currentUser?.adAgreementV2],
  );

  if (!currentUser?.adAgreementV2) {
    return null;
  }

  return (
    <NotificationMarketingComponent
      adAgreementSetting={adAgreementSetting}
      hasEmail={hasEmail}
    />
  );
}
