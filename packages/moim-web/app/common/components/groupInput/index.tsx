import * as React from "react";
import ReactResizeDetector from "react-resize-detector";

// components
import { IRefHandler } from "common/components/richEditor";
import { InputActionContainer, InputWrapper } from "./styledComponent";

import RichEditorFallback from "./component";
export { default as SimpleDialogGroupInput } from "./preset/simpleDialogGroupInput";
export { default as ReviewDialogGroupInput } from "./preset/reviewDialogGroupInput";

import DesktopGroupInput from "./components/desktop";
import MobileGroupInput from "./components/mobile";
import AttachmentElement from "./components/attachmentElement";

import GroupInputContext from "./context";
import GroupInputTypes from "./type";
import { useProps, useEffects, useHandlers } from "./hooks";
import useContextValue from "./hooks/useContextValue";

export type IForwardRef = IRefHandler & { groupInputClear(): void };

const GroupInput: React.RefForwardingComponent<
  IForwardRef | null,
  GroupInputTypes.IProps
> = (props, ref) => {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);
  const {
    id,
    isMobile,
    groupId,
    autoFocus,
    editorRef,
    defaultContents,
    disableMentionPortal,
    disableImageBlockUpload,
    mentionPortalContainer,
    isMultiline,
    placeholder,
    resizeDetectWidth,
    resizeDetectHeight,
    maxAttachmentCount,
    minInputLine,
    emojiDialog,
    hasContent,
    hasFileContent,
    hasMeetingFileContent,
    currentCursorFormat,
    useSaveButton,
    useFileAttachButton,
    disableCreateMeeting,
    isMaxUploaded,
    disableEditor,
    disableMention,
    files,
    imageBlocks,
    setCurrentCursorFormat,
    onResize,
    onFocus,
    onBlur,
    onCancel,
    setFiles,
    setImageBlocks,
    setImageFileIds,
  } = hookProps;
  const {
    clear,
    handleEnter,
    handleFileChange,
    handleChange,
    handleClickFileAttachment,
  } = hookHandlers;

  const values = useContextValue({
    editorRef,
    emojiDialog,
    hasContent,
    hasFile: hasFileContent,
    isMaxUploaded,
    useSaveButton,
    currentCursorFormat,
    useFileAttachButton,
    disableMention,
    disableCreateMeeting,
    onEnter: handleEnter,
    onClickFileAttachment: handleClickFileAttachment,
  });

  React.useImperativeHandle<IForwardRef | null, IForwardRef | null>(ref, () =>
    editorRef.current ? { ...editorRef.current, groupInputClear: clear } : null,
  );

  const WithToolbar = React.useMemo(
    () => (isMobile ? MobileGroupInput : DesktopGroupInput),
    [isMobile],
  );

  return (
    <>
      <GroupInputContext.Provider value={values}>
        <ReactResizeDetector
          handleWidth={resizeDetectWidth}
          handleHeight={resizeDetectHeight}
          onResize={onResize}
        >
          <WithToolbar
            id={id}
            hasMeetingFileContent={hasMeetingFileContent}
            hasFileContent={hasFileContent}
            isExpand={(props.minInputLine ?? 0) > 1}
          >
            <AttachmentElement
              files={files}
              imageBlocks={imageBlocks}
              setFiles={setFiles}
              setImageBlocks={setImageBlocks}
              setImageFileIds={setImageFileIds}
            />
            <InputActionContainer>
              <InputWrapper minInputLine={minInputLine}>
                <RichEditorFallback
                  id={id}
                  groupId={groupId}
                  disableEditor={disableEditor}
                  autoFocus={autoFocus}
                  editorRef={editorRef}
                  contents={defaultContents}
                  placeholder={placeholder}
                  isMultiline={isMultiline}
                  disableMention={disableMention}
                  disableMentionPortal={disableMentionPortal}
                  disableImageBlockUpload={disableImageBlockUpload}
                  mentionPortalContainer={mentionPortalContainer}
                  maxAttachmentCount={maxAttachmentCount}
                  onFileChange={handleFileChange}
                  onEnter={handleEnter}
                  onChange={handleChange}
                  onChangeCursorFormat={setCurrentCursorFormat}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onCancel={onCancel}
                />
              </InputWrapper>
            </InputActionContainer>
          </WithToolbar>
        </ReactResizeDetector>
      </GroupInputContext.Provider>
      {emojiDialog.emojiDialogElement}
    </>
  );
};

export default React.forwardRef(GroupInput);
