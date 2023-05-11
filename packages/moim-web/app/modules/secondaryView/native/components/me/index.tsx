import * as React from "react";
// component
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

import { getProfile } from "app/actions/profile";
import { getProfileBlocks } from "app/actions/user";
import SecondaryViewLayout from "app/modules/profile/components/profileLayout/secondaryView";
import ProfileShowBlockedUserChecker from "app/modules/profile/components/blockedUserChecker";
import ProfileComponent from "app/modules/profile/components/profileComponent";
import UnsignedChecker from "common/components/unsiginedChecker";
import { PermissionDeniedFallbackType } from "app/enums";
import ProfileUnsignedFeedback from "common/components/feedBack/components/unsigned/customFeedbackTemplates/profile";
import { CURRENT_USER_KEY } from "common/constants/keys";

const ProfileMe: React.FC = () => {
  const cancelToken = useCancelToken();
  const { targetUser, userId } = useStoreState(state => {
    const userId =
      localStorage.getItem(CURRENT_USER_KEY) ?? state.app.currentUserId;
    return {
      userId,
      targetUser: userId ? state.entities.users[userId] : undefined,
    };
  });

  const { dispatchGetProfile, dispatchGetProfileBlocks } = useActions({
    dispatchGetProfile: getProfile,
    dispatchGetProfileBlocks: getProfileBlocks,
  });
  React.useEffect(() => {
    if (userId) {
      dispatchGetProfile({ userId, cancelToken: cancelToken.current.token });
      dispatchGetProfileBlocks(userId, "show");
    }
  }, [userId]);

  return (
    <SecondaryViewLayout user={targetUser}>
      <UnsignedChecker
        fallbackType={PermissionDeniedFallbackType.CUSTOM}
        unsignedCustomElement={<ProfileUnsignedFeedback />}
      >
        {targetUser ? (
          <ProfileShowBlockedUserChecker userId={targetUser?.id ?? ""}>
            <ProfileComponent
              userData={targetUser}
              positions={targetUser?.positions ?? []}
            />
          </ProfileShowBlockedUserChecker>
        ) : null}
      </UnsignedChecker>
    </SecondaryViewLayout>
  );
};

export default ProfileMe;
