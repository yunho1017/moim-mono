import * as React from "react";
import useHover from "common/hooks/useHover";
import LinkPreviewComponent from "common/components/linkPreview";
import { MediaPreview } from "common/components/designSystem/media";
import { IRefHandler as INoRightRefHandler } from "common/components/feedBack/components/noRight/alert";
import { IBlockitRendererProps } from "common/components/threadV2/components/blockitRenderer";
import { ChannelIdTypes } from "app/enums";

import { IProps } from ".";
import {
  fileCellWrapper,
  HoverMenuItem,
  MoreIcon,
  MessagePreviewContentWrapper,
} from "./styled";

import { ActionCreators as ConversationActionCreators } from "app/actions/conversation";
import { useActions, useStoreState } from "app/store";
import { useOpenPostReportDialog } from "common/components/reportDialog/presets/post/hooks";
import { useResourcePermission } from "common/components/permissionChecker";

export function useProps(props: IProps) {
  const { message, autoFocus, channelId } = props;
  const [messageRef, isHover] = useHover<HTMLDivElement>();
  const refMoreMenu = React.useRef<HTMLDivElement>(null);
  const refNoRightAlert = React.useRef<INoRightRefHandler>(null);
  const [isOpenResponsiveMenu, setResponsiveMenuStatus] = React.useState(false);
  const states = useStoreState(state => ({
    messageEditState: state.conversationPage.messageEditState,
  }));

  const actions = useActions({
    dispatchChangeMessageEditStatus:
      ConversationActionCreators.changeMessageEditState,
  });

  const isDMChannel = React.useMemo(
    () => channelId.startsWith(ChannelIdTypes.DM),
    [channelId],
  );

  const { hasPermission: deletePermission } = useResourcePermission(
    "DELETE_MESSAGE",
    channelId,
    message.user.id,
  );
  const { hasPermission: editPermission } = useResourcePermission(
    "MANAGE_MESSAGE",
    channelId,
    message.user.id,
  );

  const fileContents = React.useMemo(
    () =>
      message.blocks
        ? (message.blocks.filter(
            block => block.type === "file",
          ) as Moim.Blockit.IFileBlock[])
        : [],
    [message],
  );
  const mediaProps = React.useMemo(() => {
    if (fileContents.length && fileContents[0].files.length) {
      const file = fileContents[0].files[0];
      return {
        fileId: file.id,
        readonly: true,
        isSmallDeleteButton: true,
        cellWrapperStyle: fileCellWrapper,
        previewContentWrapperStyle: MessagePreviewContentWrapper,
      } as React.ComponentProps<typeof MediaPreview>;
    }
    return undefined;
  }, [fileContents]);

  const linkPreviewContents = React.useMemo(
    () =>
      message.blocks
        ? (message.blocks.filter(
            block => block.type === "link-preview",
          ) as Moim.Blockit.ILinkPreviewBlock[])
        : [],
    [message],
  );

  const linkPreviewProps:
    | React.ComponentProps<typeof LinkPreviewComponent>
    | undefined = React.useMemo(() => {
    if (linkPreviewContents.length && linkPreviewContents[0]) {
      const data = linkPreviewContents[0];
      return {
        readOnly: true,
        favicon: data.site?.icon,
        siteName: data.site?.name,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.thumb?.url,
        embed: data.embed,
      };
    }
    return undefined;
  }, [linkPreviewContents]);

  const blockitProps: IBlockitRendererProps = React.useMemo(
    () => ({
      type: "message",
      blocks: message.blocks
        ? message.blocks.filter(
            block =>
              block.type !== "file" &&
              block.type !== "text" &&
              block.type !== "link-preview",
          )
        : [],
    }),
    [message.blocks],
  );

  React.useLayoutEffect(() => {
    if (autoFocus) {
      messageRef.current?.scrollIntoView(true);
    }
  }, [autoFocus, messageRef]);

  return {
    ...props,
    ...states,
    ...actions,
    refMoreMenu,
    refNoRightAlert,
    messageRef,
    isDMChannel,
    isHover,
    fileContents,
    mediaProps,
    blockitProps,
    linkPreviewContents,
    linkPreviewProps,
    isOpenResponsiveMenu,
    setResponsiveMenuStatus,
    deletePermission,
    editPermission,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    isDMChannel,
    deletePermission,
    channelId,
    isMine,
    refMoreMenu,
    refNoRightAlert,
    message,
    setResponsiveMenuStatus,
    onDelete,
    dispatchChangeMessageEditStatus,
  } = props;

  const openReportDialog = useOpenPostReportDialog({
    parentId: message.user?.id,
    threadId: message.id,
  });
  const handleOpenMenu = React.useCallback(() => {
    setResponsiveMenuStatus(true);
  }, [setResponsiveMenuStatus]);
  const handleCloseMenu = React.useCallback(() => {
    setResponsiveMenuStatus(false);
  }, [setResponsiveMenuStatus]);

  const handleClickDelete = React.useCallback(() => {
    const hasPermission = isDMChannel ? isMine : deletePermission;
    if (hasPermission) {
      onDelete?.(message);
    } else {
      refNoRightAlert.current?.openHandler();
    }
    handleCloseMenu();
  }, [
    isDMChannel,
    isMine,
    deletePermission,
    handleCloseMenu,
    onDelete,
    message,
    refNoRightAlert,
  ]);

  const menus = React.useMemo(
    () => [
      <HoverMenuItem ref={refMoreMenu} onClick={handleOpenMenu}>
        <MoreIcon />
      </HoverMenuItem>,
    ],
    [handleOpenMenu, isMine, refMoreMenu],
  );

  const handleClickEditMessage = React.useCallback(() => {
    dispatchChangeMessageEditStatus({
      messageId: message.id,
      channelId,
    });
    handleCloseMenu();
  }, [dispatchChangeMessageEditStatus, message.id, channelId, handleCloseMenu]);

  const handleSubmitEditMessage = React.useCallback(() => {
    dispatchChangeMessageEditStatus(undefined);
  }, [dispatchChangeMessageEditStatus]);

  const handleCancelEditMessage = React.useCallback(() => {
    dispatchChangeMessageEditStatus(undefined);
  }, [dispatchChangeMessageEditStatus]);

  const handleClickReportMessage = React.useCallback(() => {
    openReportDialog();
  }, [openReportDialog]);

  return {
    ...props,
    menus,
    handleOpenMenu,
    handleCloseMenu,
    handleClickDelete,
    handleClickEditMessage,
    handleSubmitEditMessage,
    handleCancelEditMessage,
    handleClickReportMessage,
  };
}
