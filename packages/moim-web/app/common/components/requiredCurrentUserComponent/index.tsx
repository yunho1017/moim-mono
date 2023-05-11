import * as React from "react";
import { useIntl } from "react-intl";

import FeedbackBase from "common/components/feedBack/components/base";
import { GhostButton } from "common/components/designSystem/buttons";

import { useActions } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";

import popupWindow from "common/helpers/popupWindow";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import { getAuthentication } from "common/helpers/authentication/actions";

const PROVIDER: Moim.AuthenticationProvider = "cryptobadge";

export default function RequiredCurrentUserComponent({
  children,
}: React.PropsWithChildren<{}>) {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const signInText = useGroupTexts("button_login");
  const storeSecondaryViewHandler = useStoreSecondaryView();

  const { dispatchGetAuthentication } = useActions({
    dispatchGetAuthentication: getAuthentication,
  });

  const handleSignInClick = React.useCallback(() => {
    storeSecondaryViewHandler();
    dispatchGetAuthentication({
      provider: PROVIDER,
      authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
    });
  }, [storeSecondaryViewHandler, dispatchGetAuthentication]);

  if (!currentUser) {
    return (
      <FeedbackBase
        icon="✋"
        title={intl.formatMessage({
          id: "no_right_common_full_page_dialog_title",
        })}
        description={intl.formatMessage({
          id: "no_right_common_full_page_dialog_body",
        })}
        buttons={[
          <GhostButton size="m" onClick={handleSignInClick}>
            {signInText?.singular}
          </GhostButton>,
        ]}
      />
    );
  }

  return <>{children}</>;
}
