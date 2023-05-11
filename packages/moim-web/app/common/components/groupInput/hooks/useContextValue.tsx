import useCreateMeetingPermission from "common/hooks/useCreateMeetingPermission";
import { IRefHandler } from "common/components/richEditor";
import GroupInputTypes from "../type";
import { useCallback, useMemo } from "react";
import useEmojiDialog from "./useEmojiDialog";
import { useActions } from "app/store";
import { openCreateMeetingDialog } from "common/components/createMeetingDialog/action";

export default function useContextValue({
  editorRef,
  emojiDialog,
  hasContent,
  isMaxUploaded,
  currentCursorFormat,
  useSaveButton = true,
  useFileAttachButton = true,
  disableMention = false,
  disableCreateMeeting = false,
  onEnter,
  onClickFileAttachment,
}: {
  editorRef: React.RefObject<IRefHandler>;
  emojiDialog: ReturnType<typeof useEmojiDialog>;
  currentCursorFormat: { [key: string]: boolean };
  hasContent: boolean;
  hasFile: boolean;
  isMaxUploaded: boolean;
  useSaveButton?: boolean;
  useFileAttachButton?: boolean;
  disableMention?: boolean;
  disableCreateMeeting?: boolean;
  onEnter: () => void;
  onClickFileAttachment: () => void;
}) {
  const { dispatchOpenCreateMeetingDialog } = useActions({
    dispatchOpenCreateMeetingDialog: openCreateMeetingDialog,
  });
  const {
    hasPermission: hasCreateMeetingPermission,
  } = useCreateMeetingPermission();

  const setEditorFocus = useCallback(() => {
    editorRef.current?.focus();
  }, [editorRef]);

  const handleAddUserMention = useCallback(() => {
    editorRef.current?.addMention();
  }, [editorRef]);

  const addLink = useCallback(() => {
    editorRef.current?.addLink();
  }, [editorRef]);

  const handleClickImageFileAttachment = useCallback(() => {
    editorRef.current?.addImageFiles();
  }, [editorRef]);

  const contextValue: GroupInputTypes.IGroupInputContextValue = useMemo(
    () => ({
      tools: {
        bold: {
          visible: true,
          className: "ql-bold",
          isActive: Boolean(currentCursorFormat.bold),
          onClick: setEditorFocus,
        },
        italic: {
          visible: true,
          className: "ql-italic",
          isActive: Boolean(currentCursorFormat.italic),
          onClick: setEditorFocus,
        },
        link: {
          visible: true,
          className: "ql-add-link",
          isActive: Boolean(currentCursorFormat.link),
          onClick: addLink,
        },
        meeting: {
          visible: !disableCreateMeeting && hasCreateMeetingPermission,
          onClick: dispatchOpenCreateMeetingDialog,
        },
        mention: { visible: !disableMention, onClick: handleAddUserMention },
        file: {
          visible: useFileAttachButton,
          disabled: isMaxUploaded,
          onClick: onClickFileAttachment,
        },
        image: {
          visible: true,
          disabled: isMaxUploaded,
          onClick: handleClickImageFileAttachment,
        },

        emoji: {
          ref: emojiDialog.emojiAnchor,
          visible: true,
          onClick: emojiDialog.open,
        },
        send: {
          visible: useSaveButton,
          onClick: onEnter,
          isActive: hasContent,
        },
      },
      focusEditor: setEditorFocus,
    }),
    [
      disableMention,
      currentCursorFormat.bold,
      currentCursorFormat.italic,
      currentCursorFormat.link,
      setEditorFocus,
      addLink,
      disableCreateMeeting,
      hasCreateMeetingPermission,
      dispatchOpenCreateMeetingDialog,
      handleAddUserMention,
      useFileAttachButton,
      isMaxUploaded,
      onClickFileAttachment,
      handleClickImageFileAttachment,
      emojiDialog.emojiAnchor,
      emojiDialog.open,
      useSaveButton,
      onEnter,
      hasContent,
    ],
  );

  return contextValue;
}
