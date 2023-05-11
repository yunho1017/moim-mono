import * as React from "react";
import { Prompt } from "react-router-dom";
import { useDebounce } from "react-use";
import { BaseEmoji } from "emoji-mart";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import { useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import { isiOS } from "common/helpers/browserDetect";
import { fileListSelector } from "app/selectors/file";

// styled
import RichEditor, { IRefHandler } from "common/components/richEditor";
import DragHere from "common/components/richEditor/components/dragHere";
import EmojiPopover from "common/components/emojiPopover";
import UploadLoadingDialog from "app/modules/forum/components/editor/components/uploadLoadingDialog";
import MarkButton from "app/modules/forum/components/editor/components/markButtons";
import {
  TopWrapper,
  RootWrapper,
  ResponsiveWrapper,
  Container,
  EditorContainer,
  EditorWrapper,
  HandleButton,
  ToolBoxContainer,
  ToolBox,
  SendButton,
  FileAttachmentIcon,
  ImageFileAttachmentIcon,
  MentionIcon,
  EmojiIcon,
} from "./styled";

interface IProps {
  id: Moim.Id;
  initialBlocks: Moim.Blockit.Blocks[];
  onSendButton(content: Moim.Blockit.Blocks[]): void;
}

const ExternalMoimBlockitEditorComponent: React.FC<IProps> = ({
  id,
  initialBlocks,
  onSendButton,
}) => {
  const refEditor = React.useRef<IRefHandler>(null);
  const emojiAnchor = React.useRef(null);
  const [isOpenEmojiPopover, setEmojiOpenState] = React.useState(false);
  const [currentCursorFormat, setCurrentCursorFormat] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [isDragOver, setDragOver] = React.useState(false);
  const [contentChanged, setContentChange] = React.useState(false);
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState<
    "up" | "down" | null
  >(null);

  const { storeState } = useStoreState(s => ({ storeState: s }));

  const {
    isOpen: isUploadLoadingAlert,
    open: openUploadLoadingAlert,
    close: closeUploadLoadingAlert,
  } = useOpenState();

  const addMention = React.useCallback(() => {
    refEditor.current?.addMention();
  }, [refEditor]);
  const addFile = React.useCallback(() => {
    refEditor.current?.addFiles();
  }, [refEditor]);
  const addImageFile = React.useCallback(() => {
    refEditor.current?.addImageFiles();
  }, [refEditor]);
  const addLink = React.useCallback(() => {
    refEditor.current?.addLink();
  }, [refEditor]);

  const handleOpenEmojiPopover = React.useCallback(() => {
    setEmojiOpenState(true);
  }, []);
  const handleCloseEmojiPopover = React.useCallback(() => {
    setEmojiOpenState(false);
    refEditor.current?.focus();
  }, [refEditor]);

  const handleSelectEmoji = React.useCallback(
    (emoji: BaseEmoji) => {
      handleCloseEmojiPopover();
      refEditor.current?.addEmoji(emoji);
    },
    [handleCloseEmojiPopover],
  );

  const toolElement = React.useMemo(
    () => (
      <ToolBoxContainer
        scrollTop={scrollHeight}
        scrollDirection={scrollDirection}
      >
        <ToolBox id={`${id}_toolbar`} visible={true}>
          <HandleButton title="파일첨부(CTRL or ⌘ + U)">
            <FileAttachmentIcon onClick={addFile} size="s" role="button" />
          </HandleButton>
          <HandleButton>
            <ImageFileAttachmentIcon
              onClick={addImageFile}
              size="s"
              role="button"
            />
          </HandleButton>
          <HandleButton title="유저멘션">
            <MentionIcon onClick={addMention} size="s" role="button" />
          </HandleButton>
          <HandleButton ref={emojiAnchor}>
            <EmojiIcon
              onClick={handleOpenEmojiPopover}
              size="s"
              role="button"
            />
          </HandleButton>

          <HandleButton className="ql-bold">
            <MarkButton
              type="bold"
              isActive={Boolean(currentCursorFormat.bold)}
            />
          </HandleButton>
          <HandleButton className="ql-italic">
            <MarkButton
              type="italic"
              isActive={Boolean(currentCursorFormat.italic)}
            />
          </HandleButton>
          <HandleButton className="ql-add-link" onClick={addLink}>
            <MarkButton
              type="link"
              isActive={Boolean(currentCursorFormat.link)}
            />
          </HandleButton>
        </ToolBox>
      </ToolBoxContainer>
    ),
    [
      addFile,
      addImageFile,
      addLink,
      addMention,
      currentCursorFormat.bold,
      currentCursorFormat.italic,
      currentCursorFormat.link,
      handleOpenEmojiPopover,
      scrollDirection,
      scrollHeight,
    ],
  );

  const checkUploadDone = React.useCallback(() => {
    const ids = refEditor.current?.getUploadQueue();
    if (!ids) return true;
    const files = fileListSelector(storeState, ids);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeState.entities.files, refEditor]);

  const handleDoneClick = React.useCallback(() => {
    const allUploadDone = checkUploadDone();
    if (!allUploadDone) {
      openUploadLoadingAlert();
      return;
    }
    setContentChange(false);
    const content = refEditor.current?.getContent() || [];
    onSendButton(content);
  }, [checkUploadDone, onSendButton, openUploadLoadingAlert]);

  const handleScroll = React.useCallback(
    (e: any) => {
      if (isiOS()) {
        if (e?.currentTarget?.pageYOffset) {
          setScrollHeight(e.currentTarget?.pageYOffset);
          setScrollDirection(
            scrollHeight - e.currentTarget.pageYOffset >= 0 ? "up" : "down",
          );
        } else {
          setScrollDirection("down");
        }
      }
    },
    [scrollHeight],
  );
  const [] = useDebounce(handleScroll, 80, []);

  const handleChangeContent = React.useCallback(
    (content: Moim.Blockit.Blocks[]) => {
      setContentChange(!isEqual(content, initialBlocks));
    },
    [initialBlocks],
  );

  const cancelDragEnter = React.useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const handleDragOver = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";

      setDragOver(true);
    },
    [setDragOver],
  );
  const handleDragLeave = React.useCallback(() => {
    setDragOver(false);
  }, [setDragOver]);

  const handleDrop = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      setDragOver(false);
      refEditor.current?.fileUpload(Array.from(e.dataTransfer.files));
    },
    [setDragOver, refEditor],
  );

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  React.useEffect(() => {
    refEditor.current?.setContent?.(initialBlocks);
  }, [initialBlocks]);

  return (
    <>
      <Prompt
        when={contentChanged}
        message="작업중이던 결과물이 있습니다.\n정말 닫으시겠습니까?"
      />
      <TopWrapper>
        <div>
          <SendButton onClick={handleDoneClick}>
            <FormattedMessage id="button_save" />
          </SendButton>
        </div>
      </TopWrapper>
      <RootWrapper
        onDragEnter={cancelDragEnter}
        onDragOver={handleDragOver}
        onDragExit={handleDragLeave}
        onDrop={handleDrop}
      >
        <DragHere visible={isDragOver} onDragLeave={handleDragLeave} />

        <ResponsiveWrapper>
          <Container>
            {toolElement}
            <EditorContainer onScroll={handleScroll}>
              <EditorWrapper>
                <RichEditor
                  id={id}
                  ref={refEditor}
                  readonly={false}
                  autofocus={true}
                  contents={initialBlocks}
                  placeholder="placeholder"
                  onChange={handleChangeContent}
                  onChangeCursorFormat={setCurrentCursorFormat}
                />
              </EditorWrapper>
            </EditorContainer>
          </Container>
        </ResponsiveWrapper>
        <EmojiPopover
          anchorElement={emojiAnchor.current}
          open={isOpenEmojiPopover}
          onSelected={handleSelectEmoji}
          onClose={handleCloseEmojiPopover}
        />
      </RootWrapper>
      <UploadLoadingDialog
        open={isUploadLoadingAlert}
        onPositiveClick={closeUploadLoadingAlert}
        onClose={closeUploadLoadingAlert}
      />
    </>
  );
};

export default ExternalMoimBlockitEditorComponent;
