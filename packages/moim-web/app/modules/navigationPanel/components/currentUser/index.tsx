// vendor
import * as React from "react";
// hook
import { useHandlers, useProps } from "./hooks";
// component
import ProfileMenu from "app/modules/layout/components/topNavigation/components/profileMenu";
import { BaseItemCell } from "common/components/itemCell";
import UserProfileImage from "common/components/userProfileImage";
import {
  ButtonWrapper,
  NotiIcon,
  MyCartIcon,
  Username,
  Wrapper,
  NotiAlertBadgeStyle,
} from "./styledComponents";
// type
import { MarginSize } from "app/enums";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import NotiAlertBadge from "common/components/alertBadge/preset/notification";
import CartAlertBadge from "common/components/alertBadge/preset/cartBadge";

export interface IProps {
  currentUser: Moim.User.INormalizedUser;
  isOnline?: boolean;
}

function CurrentUser(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    currentUser,
    notiCount,
    isOnline,
    wrapperRef,
    notiButtonRef,
    isOpenProfileMenu,
    closeProfileMenu,
    visibleMyCartIcon,
  } = hookProps;
  const {
    handleClickCurrentUser,
    handleNotificationButtonClick,
    handleMyCartClick,
  } = hookHandlers;

  return (
    <Wrapper ref={wrapperRef}>
      <BaseItemCell
        disableRightPadding={true}
        size="s"
        title={
          <Username onClick={handleClickCurrentUser}>
            <NativeEmojiSafeText value={currentUser.name} />
          </Username>
        }
        leftElement={{
          element: (
            <UserProfileImage
              src={currentUser.avatar_url || ""}
              size="s"
              isOnline={isOnline}
              onClick={handleClickCurrentUser}
              canOpenProfileDialog={true}
              elementPaletteProps={{ type: "sideArea", key: "menuText" }}
            />
          ),
          props: {
            leftContentsSize: "s",
            margin: {
              left: MarginSize.SIXTEEN,
              right: MarginSize.ZERO,
            },
          },
        }}
        rightElement={
          <>
            {visibleMyCartIcon && (
              <ButtonWrapper onClick={handleMyCartClick}>
                <MyCartIcon />
                <CartAlertBadge overrideStyle={NotiAlertBadgeStyle} />
              </ButtonWrapper>
            )}
            <ButtonWrapper
              ref={notiButtonRef}
              onClick={handleNotificationButtonClick}
            >
              {notiCount ? <NotiAlertBadge /> : <NotiIcon />}
            </ButtonWrapper>
          </>
        }
      />
      <ProfileMenu
        open={isOpenProfileMenu}
        anchorElement={wrapperRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onCloseRequest={closeProfileMenu}
        onClickMenuButton={closeProfileMenu}
      />
    </Wrapper>
  );
}

export default CurrentUser;
