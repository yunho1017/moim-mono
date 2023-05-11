import * as React from "react";
import { IProps, IRefHandler, useProps, useHandlers } from "./useHooks";
// components
import QuillEditor from "common/components/blockitEditorBase/component";
import { FileAttachment } from "./styled";

const ACCEPTABLE_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/tiff",
  "image/gif",
  "image/svg+xml",
];

const RichEditor = React.forwardRef<IRefHandler, IProps>((props, ref) => {
  const {
    id,
    readonly,
    autofocus,
    placeholder,
    enableSingleLine,
    refQuillEditor,
    fileInputRef,
    imageFileInputRef,
    disableFileUploadShortcut,
    disableEditor,
    onceUploadLimitCount,
    contents,
    disableMention,
    disableMentionPortal,
    mentionPortalContainer,
    groupId,
    addFiles,
    addImageFiles,
    containerStyle,
    onBlur,
    onCancel,
    onChange,
    onChangeCursorFormat,
    getMoimDown,
    fileUpload,
    handleSaveSelection,
    handleFocus,
    handleSingleLineEnter,
    handleFileRetry,
    handleFileDelete,
    handleFileChange,
    handleImageFileChange,
    handleImageFileDelete,
    handleToolBoxLinkClick,
    handleInsertMention,
    handleSelectEmoji,
    handleEditorClear,
    handleEditorFocus,
    handleEditorBlur,
    handlePrependPreLinkMeeting,
    handleAddEmbedProduct,
    getUploadQueue,
  } = useHandlers(useProps(props));

  const bindKeyBoard = React.useMemo(
    () => ({
      link: handleToolBoxLinkClick,
      mention: handleInsertMention,
      file: Boolean(disableFileUploadShortcut) ? undefined : addFiles,
    }),
    [
      addFiles,
      disableFileUploadShortcut,
      handleInsertMention,
      handleToolBoxLinkClick,
    ],
  );

  React.useImperativeHandle(ref, () => ({
    addFiles,
    addImageFiles,
    addLink: handleToolBoxLinkClick,
    addMention: handleInsertMention,
    addEmoji: handleSelectEmoji,
    addEmbedProduct: handleAddEmbedProduct,
    prependPreLinkMeeting: handlePrependPreLinkMeeting,
    getContent: getMoimDown,
    clear: handleEditorClear,
    focus: handleEditorFocus,
    blur: handleEditorBlur,
    fileUpload,
    containerElement: refQuillEditor.current?.getQuill()?.root,
    getUploadQueue,
    setContent: refQuillEditor.current?.setContent,
  }));

  return (
    <>
      <QuillEditor
        key={`moim_editor_${id}_old`}
        id={id}
        ref={refQuillEditor}
        contents={contents}
        readonly={readonly}
        autofocus={autofocus}
        placeholder={placeholder}
        enableSingleLine={enableSingleLine}
        bindKeyboard={bindKeyBoard}
        containerStyle={containerStyle}
        disableMention={disableMention}
        disableMentionPortal={disableMentionPortal}
        mentionPortalContainer={mentionPortalContainer}
        groupId={groupId}
        disableEditor={disableEditor}
        onSingleLineEnter={handleSingleLineEnter}
        onFileUpload={fileUpload}
        onFileRetry={handleFileRetry}
        onFileDelete={handleFileDelete}
        onImageFileDelete={handleImageFileDelete}
        onFocus={handleFocus}
        onBlur={onBlur}
        onCancel={onCancel}
        onChange={onChange}
        onChangeCursorFormat={onChangeCursorFormat}
        onChangeSelection={handleSaveSelection}
        callbackMechanicalFocus={handleEditorFocus}
      />
      <FileAttachment
        ref={fileInputRef}
        multiple={onceUploadLimitCount > 1}
        type="file"
        onChange={handleFileChange}
      />
      <FileAttachment
        ref={imageFileInputRef}
        multiple={onceUploadLimitCount > 1}
        type="file"
        accept={ACCEPTABLE_MIME.join(",")}
        onChange={handleImageFileChange}
      />
    </>
  );
});

// JPEG, PNG, WebP, AVIF, TIFF, GIF and SVG

export default React.memo(RichEditor);
export { IRefHandler };
