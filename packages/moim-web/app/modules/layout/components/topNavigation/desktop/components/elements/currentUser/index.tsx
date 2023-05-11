import * as React from "react";
import { MoimURL } from "common/helpers/url";

import UserProfileImage from "common/components/userProfileImage";
import ProfileMenu from "../../../../components/profileMenu";
import ParentProfileMenu from "../../../../components/parentProfileMenu";
import PeriodPopover from "../../../../components/periodPopover";
import NotiAlertBadge from "common/components/alertBadge/preset/notification";
import DMAlertBadge from "common/components/alertBadge/preset/directMessage";
import CartAlertBadge from "common/components/alertBadge/preset/cartBadge";
import MobileSearchButton from "app/modules/search/container/searchInput/mobile";

import {
  Wrapper,
  ItemWrapper,
  IconWrapper,
  NotiIcon,
  DMIcon,
  PeriodIcon,
  DownArrowIcon,
  MyCartIcon,
  CurrentUserWrapper,
  UserProfileWrapper,
  NotiAlertBadgeStyle,
  SignInButton,
  SignUpButton,
} from "./styled";

import useOpenState from "common/hooks/useOpenState";
import useCurrentUser from "common/hooks/useCurrentUser";
import useNotificationsDialog from "common/hooks/useNotificationsDialog";
import useParentMoimUser from "common/hooks/useParentMoimUser";
import { useHandleSignIn, useHandleSignUp } from "common/hooks/useHandleSign";
import DirectMessageList from "../../../../components/directMessageList";
import {
  useVisibleSideNavigation,
  useVisibleTopNavigation,
} from "app/modules/layout/components/controller/hooks";
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useVisibleMyCart from "../../../../hooks/useVisibleMyCart";
import { TopNavigationContext } from "../../../../context";
import { ActionCreators } from "app/actions/secondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";

export default function CurrentUser() {
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const parentUser = useParentMoimUser();
  const visibleSideNavigation = useVisibleSideNavigation();
  const visibleTopNavigation = useVisibleTopNavigation();
  const { redirect } = useNativeSecondaryView();
  const { visibleSimpSearch } = React.useContext(TopNavigationContext);
  const { signUpButtonScale, currentUserId } = useStoreState(state => ({
    signUpButtonScale: state.group.theme.element.topArea.others.scale,
    currentUserId: state.app.currentUserId,
  }));
  const handleSignIn = useHandleSignIn();
  const handleSignUp = useHandleSignUp();
  const signInText = useGroupTexts("button_login");
  const signUpText = useGroupTexts("button_signup");
  const visiblePeriodIcon = React.useMemo(
    () => currentGroup?.is_hub && currentGroup?.status_config?.type !== "none",
    [currentGroup],
  );

  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });

  const visibleMyCartIcon = useVisibleMyCart();
  const visibleUser = React.useMemo(() => currentUser ?? parentUser, [
    currentUser,
    parentUser,
  ]);
  const visibleNotiIcon = React.useMemo(() => Boolean(currentUser), [
    currentUser,
  ]);

  const visibleDMIcon = React.useMemo(
    () =>
      Boolean(currentUser) && !visibleSideNavigation && visibleTopNavigation,
    [currentUser, visibleSideNavigation, visibleTopNavigation],
  );

  const profileRef = React.useRef<HTMLDivElement>(null);
  const notiRef = React.useRef<HTMLDivElement>(null);
  const dmRef = React.useRef<HTMLDivElement>(null);
  const periodRef = React.useRef<HTMLDivElement>(null);
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
    isOpen: isDirectMessageListDialogOpen,
    open: openDirectMessageListDialog,
    close: closeDirectMessageListDialog,
  } = useOpenState();
  const {
    isOpen: isPeriodDialogOpen,
    open: openPeriodDialog,
    close: closePeriodDialog,
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

  const handleMyCartClick = React.useCallback(() => {
    openFromProfile(true);
    redirect(new MoimURL.CommerceMyCarts().toString());
  }, [redirect]);

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

  const inner = React.useMemo(() => {
    if (currentUserId === undefined) {
      return null;
    }

    if (parentUser || currentUserId) {
      return (
        <>
          <IconWrapper>
            {visibleSimpSearch && (
              <ItemWrapper selected={false}>
                <MobileSearchButton
                  elementPaletteProps={{ type: "topArea", key: "others" }}
                />
              </ItemWrapper>
            )}
            {visiblePeriodIcon && (
              <ItemWrapper
                ref={periodRef}
                selected={isPeriodDialogOpen}
                onClick={openPeriodDialog}
              >
                <PeriodIcon />
              </ItemWrapper>
            )}

            {visibleDMIcon && (
              <ItemWrapper
                ref={dmRef}
                selected={isDirectMessageListDialogOpen}
                onClick={openDirectMessageListDialog}
              >
                <DMIcon />
                <DMAlertBadge overrideStyle={NotiAlertBadgeStyle} />
              </ItemWrapper>
            )}

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
          </IconWrapper>

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
        </>
      );
    }

    return (
      <>
        {visiblePeriodIcon && (
          <ItemWrapper
            ref={periodRef}
            selected={isPeriodDialogOpen}
            onClick={openPeriodDialog}
          >
            <PeriodIcon />
          </ItemWrapper>
        )}
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
    visiblePeriodIcon,
    isPeriodDialogOpen,
    openPeriodDialog,
    handleSignIn,
    signUpButtonScale,
    handleSignUp,
    visibleSimpSearch,
    visibleDMIcon,
    isDirectMessageListDialogOpen,
    openDirectMessageListDialog,
    visibleNotiIcon,
    isNotificationsDialogOpen,
    handleNotificationClick,
    visibleMyCartIcon,
    handleMyCartClick,
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
      <DirectMessageList
        open={isDirectMessageListDialogOpen}
        anchorElement={dmRef.current}
        onCloseRequest={closeDirectMessageListDialog}
        onClickMenuButton={closeDirectMessageListDialog}
      />
      <PeriodPopover
        open={isPeriodDialogOpen}
        anchorElement={periodRef.current}
        onCloseRequest={closePeriodDialog}
        onClickMenuButton={closePeriodDialog}
      />
    </Wrapper>
  );
}
