import * as React from "react";
import RichEditor, { IRefHandler } from "common/components/richEditor";

interface IProps {
  id: Moim.Id;
  contents: Moim.Blockit.Blocks[];
  autoFocus?: boolean;
  placeholder?: string;
  disableMention?: boolean;
  disableMentionPortal?: boolean;
  disableImageBlockUpload?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  editorRef?: React.RefObject<IRefHandler>;
  isMultiline?: boolean;
  maxAttachmentCount?: number;
  groupId?: string;
  disableEditor?: boolean;
  onEnter: VoidFunction;
  onFileChange(fileId: string, file: Moim.Upload.IUploadFileMeta): void;
  onChange(contents: Moim.Blockit.Blocks[]): void;
  onChangeCursorFormat?(format: {}): void;
  onFocus?(): void;
  onBlur?(): void;
  onCancel?(): void;
}

interface IState {
  hasError: boolean;
}

export default class RichEditorFallback extends React.Component<
  IProps,
  IState
> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public render() {
    const {
      id,
      groupId,
      editorRef,
      contents,
      autoFocus,
      placeholder,
      disableMention,
      disableMentionPortal,
      disableImageBlockUpload,
      mentionPortalContainer,
      isMultiline,
      maxAttachmentCount = 1,
      disableEditor,
      onEnter,
      onFileChange,
      onChange,
      onChangeCursorFormat,
      onFocus,
      onBlur,
      onCancel,
    } = this.props;

    return (
      <RichEditor
        id={id}
        ref={editorRef}
        groupId={groupId}
        autofocus={autoFocus}
        enableSingleLine={!isMultiline}
        onceUploadLimitCount={maxAttachmentCount}
        disableFileUploadShortcut={true}
        disableMention={disableMention}
        disableMentionPortal={disableMentionPortal}
        disableImageBlockUpload={disableImageBlockUpload}
        mentionPortalContainer={mentionPortalContainer}
        contents={contents}
        placeholder={placeholder}
        disableEditor={disableEditor}
        onFileChange={onFileChange}
        onSingleLineEnter={onEnter}
        onChange={onChange}
        onChangeCursorFormat={onChangeCursorFormat}
        onFocus={onFocus}
        onBlur={onBlur}
        onCancel={onCancel}
      />
    );
  }
}
