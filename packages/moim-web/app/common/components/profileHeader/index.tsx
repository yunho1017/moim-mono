import * as React from "react";
import styled from "styled-components";
// hooks
import { useProps, useHandlers } from "./useHooks";
// components
import {
  Wrapper,
  ProfileContainer,
  ProfileImageHolder,
  MenuButtonWrapper,
  IconBox,
  MessageIcon,
  OpenProfileShowIcon,
  MoreIcon,
  ContentsBoxIcon,
} from "./styled";
import UserProfileImage from "common/components/userProfileImage";
import ProfileMenu from "./components/profileMenu";
import ContentsBoxMenu from "./components/contentsBoxMenu";
import UnsignedChecker from "../unsiginedChecker";
import UserUnblockDialog from "./components/userUnblockDialog";
import UserBlockDialog from "./components/userBlockDialog";

import { PermissionDeniedFallbackType } from "app/enums";
import useOpenState from "common/hooks/useOpenState";

const StyledUnsignedChecker = styled(UnsignedChecker)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface IProps {
  type: "show" | "preview";
  userId: Moim.Id;
  avatar: string;
  isOnline: boolean;
  onCloseRequest?(): void;
}

const ProfileHeader: React.FC<IProps> = props => {
  const {
    intl,
    type,
    userId,
    avatar,
    isOnline,
    avatarSize,
    refMoreButton,
    refContentsBoxButton,
    isOpenMoreMenu,
    isMyProfile,
    isOpenContentsBoxMenu,
    blockedUser,
    handleOpenContentsBoxMenu,
    handleCloseContentsBoxMenu,
    handleOpenMoreMenu,
    handleCloseMoreMenu,
    containerBottomPadSize,
    handleClickAvatar,
    handleProfileShowOpenClick,
    handleDirectMessageClick,
  } = useHandlers(useProps(props));

  const {
    open: openUserBlockDialog,
    isOpen: isUserBlockDialogOpen,
    close: closeUserBlockDialog,
  } = useOpenState();
  const {
    open: openUserUnblockDialog,
    isOpen: isUserUnblockDialogOpen,
    close: closeUserUnblockDialog,
  } = useOpenState();

  const rightMenuButtons = React.useMemo(() => {
    const buttons: React.ReactNode[] = [];

    if (!blockedUser) {
      buttons.push(
        <IconBox
          key="send_dm"
          title={intl.formatMessage({ id: "profile_show/send_dm" })}
          onClick={handleDirectMessageClick}
        >
          <StyledUnsignedChecker
            fallbackType={PermissionDeniedFallbackType.ALERT}
          >
            <MessageIcon />
          </StyledUnsignedChecker>
        </IconBox>,
      );
    }

    if (isMyProfile) {
      buttons.unshift(
        <IconBox
          key="open_content_box"
          ref={refContentsBoxButton}
          onClick={handleOpenContentsBoxMenu}
        >
          <ContentsBoxIcon />
        </IconBox>,
      );
    }
    if (type === "preview") {
      buttons.push(
        <IconBox
          key="go_profile"
          title={intl.formatMessage({ id: "profile_show/go_profile" })}
          onClick={handleProfileShowOpenClick}
        >
          <OpenProfileShowIcon />
        </IconBox>,
      );
    } else {
      buttons.push(
        <IconBox key="more" ref={refMoreButton} onClick={handleOpenMoreMenu}>
          <MoreIcon />
        </IconBox>,
      );
    }
    return buttons;
  }, [
    intl,
    type,
    refMoreButton,
    refContentsBoxButton,
    isMyProfile,
    blockedUser,
    handleOpenMoreMenu,
    handleOpenContentsBoxMenu,
    handleDirectMessageClick,
    handleProfileShowOpenClick,
  ]);

  return (
    <Wrapper>
      <ProfileContainer bottomSpace={containerBottomPadSize}>
        <ProfileImageHolder type={type} onClick={handleClickAvatar}>
          <UserProfileImage
            size={avatarSize}
            shape="round"
            src={avatar}
            userId={userId}
            isOnline={isOnline}
            canOpenProfileDialog={false}
            enableBlockedPlaceholder={true}
          />
        </ProfileImageHolder>
        {userId ? (
          <MenuButtonWrapper>{rightMenuButtons}</MenuButtonWrapper>
        ) : null}
      </ProfileContainer>

      <ProfileMenu
        open={isOpenMoreMenu}
        userId={userId}
        anchorElement={refMoreButton.current}
        onCloseRequest={handleCloseMoreMenu}
        openUserUnblockDialog={openUserUnblockDialog}
        openUserBlockDialog={openUserBlockDialog}
      />
      <ContentsBoxMenu
        open={isOpenContentsBoxMenu}
        userId={userId}
        anchorElement={refContentsBoxButton.current}
        onCloseRequest={handleCloseContentsBoxMenu}
      />
      <UserUnblockDialog
        userId={userId}
        open={isUserUnblockDialogOpen}
        onClose={closeUserUnblockDialog}
      />
      <UserBlockDialog
        userId={userId}
        open={isUserBlockDialogOpen}
        onClose={closeUserBlockDialog}
      />
    </Wrapper>
  );
};

export default ProfileHeader;
