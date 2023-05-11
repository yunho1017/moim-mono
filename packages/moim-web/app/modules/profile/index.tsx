import * as React from "react";
import { useRouteMatch } from "react-router";
// component
import ProfileShowBlockedUserChecker from "./components/blockedUserChecker";
import ProfileComponent from "./components/profileComponent";
import SecondaryViewLayout from "./components/profileLayout/secondaryView";
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";

import { getProfile } from "app/actions/profile";
import { getProfileBlocks } from "app/actions/user";

const Profile: React.FC = () => {
  const match = useRouteMatch<Moim.IMatchParams>();
  const cancelToken = useCancelToken();
  const targetUser = useStoreState(
    state => state.entities.users[state.profileData.targetUserId],
  );

  const { dispatchGetProfile, dispatchGetProfileBlocks } = useActions({
    dispatchGetProfile: getProfile,
    dispatchGetProfileBlocks: getProfileBlocks,
  });

  const userId = match.params.userId?.split("?")[0];
  React.useEffect(() => {
    if (userId) {
      dispatchGetProfile({ userId, cancelToken: cancelToken.current.token });
      dispatchGetProfileBlocks(userId, "show");
    }
  }, [userId]);

  return (
    <SecondaryViewLayout user={targetUser}>
      {targetUser && (
        <ProfileShowBlockedUserChecker userId={targetUser?.id ?? ""}>
          <ProfileComponent
            userData={targetUser}
            positions={targetUser?.positions}
          />
        </ProfileShowBlockedUserChecker>
      )}
    </SecondaryViewLayout>
  );
};

export default Profile;
