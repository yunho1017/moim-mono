import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
import { Message, MessageMode } from "common/components/threadV2";
import ResponsiveMenu from "common/components/responsiveMenu";
import NoRightAlert from "common/components/feedBack/components/noRight/alert";
import { useProps, useHandlers } from "./useHooks";
import { ResponsiveMenuWrapper, MoreMenuItem } from "./styled";

export interface IProps {
  channelId: Moim.Id;
  message: Moim.Conversations.IMessage;
  mode: MessageMode;
  isMine?: boolean;
  autoFocus?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  enableRightOrderForMine?: boolean;
  onLike?: (message: Moim.Conversations.IMessage) => void;
  onReport?: (message: Moim.Conversations.IMessage) => void;
  onRetry?: (message: Moim.Conversations.IMessage) => void;
  onDelete?: (message: Moim.Conversations.IMessage) => void;
}

const MIN_MENU_HEIGHT = 200;
function MessageItem(props: IProps) {
  const [minHeight, setMinHeight] = React.useState<number | undefined>(
    MIN_MENU_HEIGHT,
  );

  const handleResponsiveMenuWrapperResize = React.useCallback(
    (_width: number, height: number) => {
      if (height > MIN_MENU_HEIGHT) {
        setMinHeight(height);
      }
    },
    [],
  );

  const {
    menus,
    enableRightOrderForMine,
    refMoreMenu,
    refNoRightAlert,
    messageRef,
    message,
    mode,
    isMine,
    isHover,
    messageEditState,
    mediaProps,
    linkPreviewProps,
    isOpenResponsiveMenu,
    blockitProps,
    handleCloseMenu,
    handleClickDelete,
    handleClickEditMessage,
    handleSubmitEditMessage,
    handleCancelEditMessage,
    handleClickReportMessage,
    deletePermission,
    editPermission,
    isDMChannel,
  } = useHandlers(useProps(props));

  const mainElement = React.useMemo(
    () => (
      <Message
        mode={mode}
        ref={messageRef}
        messageId={message.id}
        title={message.user.name}
        userId={message.user.id}
        avatar={{
          userId: message.user.id,
          src: message.user.avatar_url || "",
          title: message.user.name,
          role: "button",
          isOnline: message.user.presence === "ACTIVE",
        }}
        createdAt={message.created_at}
        contents={message.blocks}
        media={mediaProps}
        linkPreview={linkPreviewProps}
        reverse={enableRightOrderForMine && isMine}
        blockit={blockitProps}
        menus={menus}
        hover={isHover}
        editState={{
          isEditMode: messageEditState?.messageId === message.id,
          onEnter: handleSubmitEditMessage,
          onCancel: handleCancelEditMessage,
        }}
      />
    ),
    [
      mode,
      messageRef,
      message.id,
      message.user.name,
      message.user.id,
      message.user.avatar_url,
      message.user.presence,
      message.created_at,
      message.blocks,
      mediaProps,
      linkPreviewProps,
      enableRightOrderForMine,
      isMine,
      blockitProps,
      menus,
      isHover,
      messageEditState,
      handleSubmitEditMessage,
      handleCancelEditMessage,
    ],
  );

  return (
    <>
      {mainElement}
      <ResponsiveMenu
        open={isOpenResponsiveMenu}
        anchorElement={refMoreMenu.current}
        onCloseRequest={handleCloseMenu}
        minHeight={minHeight}
      >
        <ResponsiveMenuWrapper>
          <ReactResizeDetector
            handleHeight={true}
            onResize={handleResponsiveMenuWrapperResize}
          >
            {(isDMChannel ? isMine : deletePermission) && (
              <MoreMenuItem onClick={handleClickDelete}>
                <FormattedMessage id="delete_button" />
              </MoreMenuItem>
            )}
            {(isDMChannel ? isMine : editPermission) && (
              <MoreMenuItem onClick={handleClickEditMessage}>
                <FormattedMessage id="edit_button" />
              </MoreMenuItem>
            )}
            {!isMine && (
              <MoreMenuItem onClick={handleClickReportMessage}>
                <FormattedMessage id="more_menu_report" />
              </MoreMenuItem>
            )}
          </ReactResizeDetector>
        </ResponsiveMenuWrapper>
      </ResponsiveMenu>
      <NoRightAlert ref={refNoRightAlert} />
    </>
  );
}

export default React.memo(MessageItem);
