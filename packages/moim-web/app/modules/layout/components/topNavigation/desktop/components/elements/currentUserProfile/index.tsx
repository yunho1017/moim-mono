import * as React from "react";

import UserProfileImage from "common/components/userProfileImage";
import ProfileMenu from "../../../../components/profileMenu";
import ParentProfileMenu from "../../../../components/parentProfileMenu";

import {
  Wrapper,
  DownArrowIcon,
  CurrentUserWrapper,
  UserProfileWrapper,
  SignInButton,
  SignUpButton,
} from "./styled";

import useOpenState from "common/hooks/useOpenState";
import useCurrentUser from "common/hooks/useCurrentUser";
import useParentMoimUser from "common/hooks/useParentMoimUser";
import { useHandleSignIn, useHandleSignUp } from "common/hooks/useHandleSign";

import { useStoreState } from "app/store";
import useGroupTexts from "common/hooks/useGroupTexts";

export default function CurrentUserProfile() {
  const currentUser = useCurrentUser();
  const parentUser = useParentMoimUser();
  const { signUpButtonScale, currentUserId } = useStoreState(state => ({
    signUpButtonScale: state.group.theme.element.topArea.others.scale,
    currentUserId: state.app.currentUserId,
  }));
  const handleSignIn = useHandleSignIn();
  const handleSignUp = useHandleSignUp();
  const signInText = useGroupTexts("button_login");
  const signUpText = useGroupTexts("button_signup");
  const visibleUser = React.useMemo(() => currentUser ?? parentUser, [
    currentUser,
    parentUser,
  ]);

  const profileRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isProfileMenuOpen,
    open: openProfileMenu,
    close: closeProfileMenu,
  } = useOpenState();
  const {
    isOpen: isParentProfileMenuOpen,
    open: openParentProfileMenu,
    close: closeParentProfileMenu,
  } = useOpenState();

  const handleProfileClick = React.useCallback(() => {
    if (currentUser) {
      openProfileMenu();
    } else if (parentUser) {
      openParentProfileMenu();
    }
  }, [currentUser, openParentProfileMenu, openProfileMenu, parentUser]);

  const inner = React.useMemo(() => {
    if (currentUserId === undefined) {
      return null;
    }

    if (parentUser || currentUserId) {
      return (
        <CurrentUserWrapper
          ref={profileRef}
          selected={isProfileMenuOpen || isParentProfileMenuOpen}
          onClick={handleProfileClick}
        >
          <UserProfileWrapper>
            <UserProfileImage
              src={visibleUser?.avatar_url || ""}
              size="s"
              isOnline={true}
              elementPaletteProps={{ type: "topArea", key: "others" }}
            />
          </UserProfileWrapper>
          <DownArrowIcon />
        </CurrentUserWrapper>
      );
    }

    return (
      <>
        <SignInButton size="m" onClick={handleSignIn}>
          {signInText?.singular}
        </SignInButton>
        <SignUpButton
          size="m"
          signUpbuttonScale={signUpButtonScale}
          onClick={handleSignUp}
        >
          {signUpText?.singular}
        </SignUpButton>
      </>
    );
  }, [
    parentUser,
    currentUserId,
    handleSignIn,
    signUpButtonScale,
    handleSignUp,
    isProfileMenuOpen,
    isParentProfileMenuOpen,
    handleProfileClick,
    visibleUser,
    signInText,
    signUpText,
  ]);

  return (
    <Wrapper>
      {inner}
      <ProfileMenu
        open={isProfileMenuOpen}
        anchorElement={profileRef.current}
        onCloseRequest={closeProfileMenu}
        onClickMenuButton={closeProfileMenu}
      />
      <ParentProfileMenu
        open={isParentProfileMenuOpen}
        anchorElement={profileRef.current}
        onCloseRequest={closeParentProfileMenu}
        onClickMenuButton={closeParentProfileMenu}
      />
    </Wrapper>
  );
}
