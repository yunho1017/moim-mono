import * as React from "react";
import useOpenState from "common/hooks/useOpenState";
import useCurrentUser from "common/hooks/useCurrentUser";

import UserProfileImage from "common/components/userProfileImage";
import ProfileMenu from "app/modules/layout/components/topNavigation/components/profileMenu";

import { Wrapper, CurrentUserWrapper, UserProfileWrapper } from "./styled";

interface IProps {}

const Profile: React.FC<IProps> = ({}) => {
  const currentUser = useCurrentUser();
  const profileRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isProfileMenuOpen,
    open: openProfileMenu,
    close: closeProfileMenu,
  } = useOpenState();

  const handleProfileClick = React.useCallback(() => {
    if (currentUser) {
      // NOTE: temporary disable.
      // openProfileMenu();
    }
  }, [currentUser, openProfileMenu]);

  if (!currentUser) {
    return null;
  }

  return (
    <Wrapper>
      <CurrentUserWrapper
        ref={profileRef}
        selected={isProfileMenuOpen}
        onClick={handleProfileClick}
      >
        <UserProfileWrapper>
          <UserProfileImage
            src={currentUser?.avatar_url || ""}
            size="s"
            isOnline={true}
          />
        </UserProfileWrapper>
      </CurrentUserWrapper>
      <ProfileMenu
        open={isProfileMenuOpen}
        anchorElement={profileRef.current}
        onCloseRequest={closeProfileMenu}
        onClickMenuButton={closeProfileMenu}
      />
    </Wrapper>
  );
};

export default React.memo(Profile);
