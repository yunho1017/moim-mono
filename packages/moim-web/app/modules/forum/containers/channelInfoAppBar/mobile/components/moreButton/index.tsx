// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
// hook
import { useProps, useHandlers } from "./hooks";
import { useForumProps as useEditPinnedPostDialogProps } from "common/components/editPinnedItemDialog";
import useSuperPermission from "common/hooks/useSuperPermission";
// component
import { Button, InfoIcon, MoreIcon, PinIcon, ShareIcon } from "./styled";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuItem,
  MenuWrapper,
} from "common/components/responsiveMenu/components/menu";
import Share from "common/components/share";
import ForumNotiSettingButton from "app/modules/forum/components/forumNotiSettingButton";

export interface IProps {
  forumId: Moim.Id;
  iconSize?: string;
  visibleTopTabNavigation?: boolean;
}

function MoreButton(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  const { handleOpen: openEditPinnedPostDialog } = useEditPinnedPostDialogProps(
    hookProps.forumId,
  );
  const { hasPermission: hasPinPermission } = useSuperPermission();

  const {
    buttonRef,
    menuWrapperRef,
    isOpenMenu,
    shareUrl,
    menuWrapperHeight,
  } = hookProps;
  const {
    handleClickOpenMenu,
    handleClickCloseMenu,
    handleClickChannelInfoButton,
    handleAfterShareChannel,
  } = hookHandlers;
  const handleOpenEditPinnedPostDialog = React.useCallback(() => {
    openEditPinnedPostDialog();
    handleClickCloseMenu();
  }, [handleClickCloseMenu, openEditPinnedPostDialog]);

  return (
    <>
      <Button
        visibleTopTabNavigation={props.visibleTopTabNavigation}
        onClick={handleClickOpenMenu}
        ref={buttonRef}
        isSelected={isOpenMenu}
      >
        <MoreIcon />
      </Button>

      <ResponsiveMenu
        open={isOpenMenu}
        anchorElement={buttonRef.current}
        onCloseRequest={handleClickCloseMenu}
        minHeight={menuWrapperHeight}
      >
        <MenuWrapper ref={menuWrapperRef}>
          <MenuItem onClick={handleClickChannelInfoButton}>
            <InfoIcon /> <FormattedMessage id="menu_channel_info" />
          </MenuItem>

          <Share
            copyValue={shareUrl}
            displayText={
              <MenuItem>
                <ShareIcon /> <FormattedMessage id="menu_share_forum_channel" />
              </MenuItem>
            }
            afterShare={handleAfterShareChannel}
          />
          {props.visibleTopTabNavigation && (
            <ForumNotiSettingButton
              iconSize={props.iconSize}
              visibleTopTabNavigation={props.visibleTopTabNavigation}
              onCloseRequest={handleClickCloseMenu}
            />
          )}

          {hasPinPermission && (
            <MenuItem onClick={handleOpenEditPinnedPostDialog}>
              <PinIcon /> <FormattedMessage id="pinned_post_page_title" />
            </MenuItem>
          )}
        </MenuWrapper>
      </ResponsiveMenu>
    </>
  );
}

export default MoreButton;
