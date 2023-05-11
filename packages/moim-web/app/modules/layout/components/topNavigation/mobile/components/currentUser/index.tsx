import * as React from "react";
import { MoimURL } from "common/helpers/url";
import UserProfileImage from "common/components/userProfileImage";
import ProfileMenu from "../../../components/profileMenu";
import ParentProfileMenu from "../../../components/parentProfileMenu";
import NotiAlertBadge from "common/components/alertBadge/preset/notification";
import CartAlertBadge from "common/components/alertBadge/preset/cartBadge";

import {
  Wrapper,
  ItemWrapper,
  NotiIcon,
  MyCartIcon,
  UserProfileWrapper,
  NotiAlertBadgeStyle,
  SignInButton,
} from "./styled";

import useOpenState from "common/hooks/useOpenState";
import useCurrentUser from "common/hooks/useCurrentUser";
import useNotificationsDialog from "common/hooks/useNotificationsDialog";
import useParentMoimUser from "common/hooks/useParentMoimUser";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import useVisibleMyCart from "../../../hooks/useVisibleMyCart";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { useStoreState } from "app/store";
import useGroupTexts from "common/hooks/useGroupTexts";

export default function CurrentUser() {
  const currentUserId = useStoreState(state => state.app.currentUserId);
  const currentUser = useCurrentUser();
  const parentUser = useParentMoimUser();
  const { redirect } = useNativeSecondaryView();

  const handleSignIn = useHandleSignIn();
  const signInText = useGroupTexts("button_login");
  const visibleUser = React.useMemo(() => currentUser ?? parentUser, [
    currentUser,
    parentUser,
  ]);
  const visibleNotiIcon = React.useMemo(() => Boolean(currentUser), [
    currentUser,
  ]);
  const visibleMyCartIcon = useVisibleMyCart();
  const profileRef = React.useRef<HTMLDivElement>(null);
  const notiRef = React.useRef<HTMLDivElement>(null);
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
  const {
    open: isNotificationsDialogOpen,
    openNotificationsDialog,
  } = useNotificationsDialog();

  const handleProfileClick = React.useCallback(() => {
    if (currentUser) {
      openProfileMenu();
    } else if (parentUser) {
      openParentProfileMenu();
    }
  }, [currentUser, openParentProfileMenu, openProfileMenu, parentUser]);

  const handleNotificationClick = React.useCallback(() => {
    openNotificationsDialog({
      anchorElement: notiRef,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }, [openNotificationsDialog]);

  const handleMyCartClick = React.useCallback(() => {
    redirect(MoimURL.CommerceMyCarts.toString());
  }, [redirect]);

  const inner = React.useMemo(() => {
    if (currentUserId === undefined) {
      return null;
    }
    if (parentUser || currentUserId) {
      return (
        <>
          {visibleNotiIcon && (
            <ItemWrapper
              ref={notiRef}
              selected={isNotificationsDialogOpen}
              onClick={handleNotificationClick}
            >
              <NotiIcon />
              <NotiAlertBadge overrideStyle={NotiAlertBadgeStyle} />
            </ItemWrapper>
          )}
          {visibleMyCartIcon && (
            <ItemWrapper selected={false} onClick={handleMyCartClick}>
              <MyCartIcon />
              <CartAlertBadge overrideStyle={NotiAlertBadgeStyle} />
            </ItemWrapper>
          )}
          <ItemWrapper
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
          </ItemWrapper>
        </>
      );
    }

    return (
      <SignInButton size="m" onClick={handleSignIn}>
        {signInText?.singular}
      </SignInButton>
    );
  }, [
    currentUserId,
    handleMyCartClick,
    handleNotificationClick,
    handleProfileClick,
    handleSignIn,
    isNotificationsDialogOpen,
    isParentProfileMenuOpen,
    isProfileMenuOpen,
    parentUser,
    visibleMyCartIcon,
    visibleNotiIcon,
    visibleUser,
    signInText,
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
