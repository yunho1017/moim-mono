import * as React from "react";
import { useIntl } from "react-intl";
// actions
import { getAuthentication } from "common/helpers/authentication/actions";

// helper
import popupWindow from "common/helpers/popupWindow";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
// hooks
import { useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
// components
import CoverComponent from "common/components/coverPage";
import FreezeView from "common/components/freezeView";
import useRedirectDefaultChannel from "common/hooks/useRedirectDefaultChannel";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";

const PROVIDER: Moim.AuthenticationProvider = "cryptobadge";

interface IProps {
  isModal: boolean;
  onClose(): void;
}

export default function DefaultCoverPage({ onClose, isModal }: IProps) {
  const intl = useIntl();
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const joinText = useGroupTexts("join_button");
  const redirectDefaultChannel = useRedirectDefaultChannel();
  const storeSecondaryViewHandler = useStoreSecondaryView();
  const { dispatchGetAuthentication } = useActions({
    dispatchGetAuthentication: getAuthentication,
  });

  const handlePreviewMoimButtonClick = React.useCallback(() => {
    redirectDefaultChannel();
  }, [redirectDefaultChannel]);

  const handleSignUpClick = React.useCallback(() => {
    storeSecondaryViewHandler();
    dispatchGetAuthentication({
      provider: PROVIDER,
      authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
      afterWorkHandler: handlePreviewMoimButtonClick,
    });
  }, [
    storeSecondaryViewHandler,
    dispatchGetAuthentication,
    handlePreviewMoimButtonClick,
  ]);

  const buttons = React.useMemo(
    () =>
      currentUser
        ? [
            {
              text: intl.formatMessage({ id: "moim/cover/button_preview" }),
              onClick: handlePreviewMoimButtonClick,
            },
          ]
        : [
            {
              text: intl.formatMessage({ id: "moim/cover/button_preview" }),
              onClick: handlePreviewMoimButtonClick,
            },
            {
              text:
                joinText?.singular ??
                intl.formatMessage({ id: "moim/cover/button_join" }),
              active: true,
              onClick: handleSignUpClick,
            },
          ],
    [
      currentUser,
      intl,
      handlePreviewMoimButtonClick,
      joinText,
      handleSignUpClick,
    ],
  );

  if (!currentGroup) {
    return null;
  }

  return (
    <FreezeView isFreeze={false}>
      <CoverComponent
        name={currentGroup.name}
        domain={currentGroup.domain}
        url={currentGroup.url}
        memberCount={currentGroup.users_count}
        description={currentGroup.description}
        profileImage={currentGroup.icon}
        banner={currentGroup.banner}
        tags={currentGroup.tags}
        period={currentGroup.period}
        status={currentGroup.status}
        statusConfig={currentGroup.status_config}
        onClose={isModal ? onClose : undefined}
        buttons={buttons}
      />
    </FreezeView>
  );
}
