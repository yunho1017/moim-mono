// vendor
import * as React from "react";
// hook
import useHooks from "./useHooks";
// component
import { MenuWrapper } from "./styled";
import Menus from "./menus";
import ResponsiveMenu from "common/components/responsiveMenu";

export interface IProps
  extends Pick<React.ComponentProps<typeof ResponsiveMenu>, "anchorElement"> {
  open: boolean;
  userId: Moim.Id;
  onCloseRequest: () => void;
  openUserBlockDialog(): void;
  openUserUnblockDialog(): void;
}

function ProfileMenu(props: IProps) {
  const {
    open,
    userId,
    isMyProfile,
    shareUrl,
    anchorElement,
    onCloseRequest,
    openUserBlockDialog,
    openUserUnblockDialog,
  } = useHooks(props);

  return (
    <ResponsiveMenu
      anchorElement={anchorElement}
      open={open}
      onCloseRequest={onCloseRequest}
    >
      <MenuWrapper>
        <Menus
          userId={userId}
          isSameUser={isMyProfile}
          shareUrl={shareUrl}
          requestClose={onCloseRequest}
          openUserBlockDialog={openUserBlockDialog}
          openUserUnblockDialog={openUserUnblockDialog}
        />
      </MenuWrapper>
    </ResponsiveMenu>
  );
}

export default ProfileMenu;
