import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
// components
import {
  InfoIcon,
  MoreIcon,
  RightWrapper,
  MoreMenuWrapper,
  TitleWrapper,
  Title,
  Desc,
  Wrapper,
} from "./styledComponents";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import PermissionChecker from "common/components/permissionChecker";
import ThreadWriteButton from "app/modules/forum/components/forumThreadList/components/threadWriteButton";
import { Spacer } from "common/components/designSystem/spacer";
// enums
import { PermissionDeniedFallbackType } from "app/enums";
// hooks
import { useForumProps as useEditPinnedPostDialogProps } from "common/components/editPinnedItemDialog";
import { IProps, useHooks } from "./hooks";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import useSuperPermission from "common/hooks/useSuperPermission";
import ForumNotiSettingButton from "app/modules/forum/components/forumNotiSettingButton";

const ChannelInfoAppBar: React.FC<IProps> = props => {
  const {
    forumId,
    isMobile,
    refMenuButton,
    minHeight,
    forumData,
    openForumMember,
    isMoreMenuOpen,
    isForumShowRoute,
    isForumEditorRoute,
    hasWritePostPermission,
    isPermissionLoading,
    handleResize,
    handleClickMenu,
    handleCloseRequestMenu,
    handleShareChannelClick,
  } = useHooks(props);
  const { handleOpen: openEditPinnedPostDialog } = useEditPinnedPostDialogProps(
    forumId,
  );
  const { hasPermission: hasPinPermission } = useSuperPermission();

  const handleOpenEditPinnedPostDialog = React.useCallback(() => {
    openEditPinnedPostDialog();
    handleCloseRequestMenu();
  }, [handleCloseRequestMenu, openEditPinnedPostDialog]);

  if ((isForumEditorRoute || isForumShowRoute) && isMobile) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <NativeEmojiSafeText value={forumData?.name || ""} />
          </Title>
          <Spacer value={4} />
          <Desc>
            <NativeEmojiSafeText value={forumData?.purpose?.content || ""} />
          </Desc>
        </TitleWrapper>
        <RightWrapper>
          <PermissionChecker
            fallbackType={PermissionDeniedFallbackType.ALERT}
            hasPermission={hasWritePostPermission}
            isLoading={isPermissionLoading}
          >
            <ThreadWriteButton
              forumId={forumId}
              visibleTopTabNavigation={false}
            />
          </PermissionChecker>
          <ForumNotiSettingButton />
          <InfoIcon onClick={openForumMember} />
          <MoreMenuWrapper ref={refMenuButton}>
            <MoreIcon onClick={handleClickMenu} />
          </MoreMenuWrapper>
        </RightWrapper>
      </Wrapper>

      <ResponsiveMenu
        open={isMoreMenuOpen}
        anchorElement={refMenuButton.current}
        onCloseRequest={handleCloseRequestMenu}
        minHeight={minHeight}
      >
        <MenuWrapper>
          <ReactResizeDetector handleHeight={true} onResize={handleResize}>
            <MenuItem onClick={handleShareChannelClick}>
              <FormattedMessage id="menu_share_forum_channel" />
            </MenuItem>
          </ReactResizeDetector>
          {hasPinPermission && (
            <MenuItem onClick={handleOpenEditPinnedPostDialog}>
              <FormattedMessage id="pinned_post_page_title" />
            </MenuItem>
          )}
        </MenuWrapper>
      </ResponsiveMenu>
    </>
  );
};

export default React.memo(ChannelInfoAppBar);
