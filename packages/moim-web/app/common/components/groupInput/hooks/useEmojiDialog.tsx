import * as React from "react";

import { BaseEmoji } from "emoji-mart";
import { IRefHandler } from "common/components/richEditor";
import EmojiPopover from "common/components/emojiPopover";

import useOpenState from "common/hooks/useOpenState";

export default function useEmojiDialog(
  editorRef: React.RefObject<IRefHandler>,
) {
  const emojiAnchor = React.useRef<HTMLButtonElement>(null);
  const { close, isOpen, open } = useOpenState();

  const handleClose = React.useCallback(() => {
    close();
    editorRef.current?.focus();
  }, [close, editorRef]);

  const handleSelectEmoji = React.useCallback(
    (emoji: BaseEmoji) => {
      editorRef.current?.addEmoji(emoji);
      handleClose();
    },
    [editorRef, handleClose],
  );

  const emojiDialogElement = React.useMemo(
    () => (
      <EmojiPopover
        anchorElement={emojiAnchor.current}
        open={isOpen}
        onSelected={handleSelectEmoji}
        onClose={handleClose}
      />
    ),
    [isOpen, handleSelectEmoji, handleClose],
  );
  return {
    emojiDialogElement,
    emojiAnchor,
    close: handleClose,
    isOpen,
    open,
    handleSelectEmoji,
  };
}
