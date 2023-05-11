import * as React from "react";
import { IBaseProps } from "..";
// hooks
import { useCommonFactoryProps } from "../hooks";
import { useMessageThreadInput } from "../components/threadInput/hooks";
// components
import Factory, { Row } from "../components/factory";
import { TextBodyBubble } from "../components/textBody";

export type MessageMode = "normal" | "simple";

interface IMessageProps extends IBaseProps {
  mode: MessageMode;
  messageId: Moim.Id;
  selected?: boolean;
}

const Message = React.forwardRef<HTMLDivElement | null, IMessageProps>(
  ({ mode, messageId, ...baseProps }, ref) => {
    const isSimpleMode = mode === "simple";
    const hookProps = useMessageThreadInput.useProps();
    const {
      handleEditMessage: handleEditMessageBase,
    } = useMessageThreadInput.useHandlers(hookProps);
    const {
      size = "m",
      headerProps: baseHeaderProps,
      avatarProps: baseAvatarProps,
      linkPreviewProps,
      mediaProps,
      hover,
      contents,
      menus,
      selected,
      reverse,
      editState,
      blockitElement,
    } = useCommonFactoryProps(baseProps);

    const handleEditMessage = React.useCallback(
      (newContents: Moim.Blockit.Blocks[]) => {
        handleEditMessageBase(newContents);
        editState?.onEnter();
      },
      [editState, handleEditMessageBase],
    );
    const headerProps: React.ReactNode = React.useMemo(
      () => !isSimpleMode && baseHeaderProps,
      [baseHeaderProps, isSimpleMode],
    );

    const avatarProps: React.ReactNode = React.useMemo(
      () => !isSimpleMode && !reverse && baseAvatarProps,
      [baseAvatarProps, isSimpleMode, reverse],
    );

    const textBodyProps: React.ReactNode = React.useMemo(() => {
      const { isEditMode, onCancel } = editState;
      return (
        <TextBodyBubble
          id={messageId}
          isSimpleMode={isSimpleMode}
          contents={contents}
          editState={{
            isEditMode: Boolean(isEditMode),
            onEnter: handleEditMessage,
            onCancel,
          }}
          reverse={reverse}
        />
      );
    }, [
      contents,
      editState,
      handleEditMessage,
      isSimpleMode,
      messageId,
      reverse,
    ]);

    return (
      <Factory
        ref={ref}
        type="message"
        size={size}
        hover={hover}
        menus={menus}
        reverse={reverse}
        selected={selected}
        header={headerProps}
        avatar={avatarProps}
      >
        {textBodyProps && (
          <Row key="message-text-row" reverse={reverse}>
            {textBodyProps}
          </Row>
        )}
        {!editState.isEditMode && mediaProps && (
          <Row key="message-media-row" reverse={reverse}>
            {mediaProps}
          </Row>
        )}
        {linkPreviewProps && (
          <Row key="message-linkpreview-row" reverse={reverse}>
            {linkPreviewProps}
          </Row>
        )}
        {blockitElement && (
          <Row key="message-blockit-row" reverse={reverse}>
            {blockitElement}
          </Row>
        )}
      </Factory>
    );
  },
);

export default Message;
