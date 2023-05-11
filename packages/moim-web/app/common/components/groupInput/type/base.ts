export interface IProps {
  id: Moim.Id;
  groupId?: string;
  autoFocus?: boolean;
  value?: Moim.Blockit.Blocks[];
  placeholder?: string;
  resizeDetectWidth?: boolean;
  resizeDetectHeight?: boolean;
  useSaveButton?: boolean;
  useFileAttachButton?: boolean;
  useImageFileAttachButton?: boolean;
  disableMention?: boolean;
  disableMentionPortal?: boolean;
  disableCreateMeeting?: boolean;
  disableImageBlockUpload?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  isMultiline?: boolean;
  fileBlocks?: Moim.Blockit.IFileBlock[];
  imageBlocks?: Moim.Blockit.IImageBlock[];
  maxAttachmentCount?: number;
  minInputLine?: number;
  disableEditor?: boolean;
  onEnter?(
    contents: Moim.Blockit.Blocks[],
    preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
  ): void;
  onResize?(width: number, height: number): void;
  onChange?(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onFocus?(): void;
  onBlur?(): void;
  onCancel?(): void;
}

export type FileStatusImageBlock = Moim.Blockit.IImageBlock & {
  status?: Moim.Upload.IStatus;
  fileId?: Moim.Id;
};

export interface IToolButtonValue {
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
  className?: string;
  visible: boolean;
  isActive?: boolean;
  disabled?: boolean;
  onClick(): void;
}
export interface IGroupInputContextValue {
  focusEditor: () => void;
  tools: Record<Exclude<ToolButtonType, "textStyle">, IToolButtonValue>;
}

export type ToolButtonType =
  | "bold"
  | "italic"
  | "link"
  | "mention"
  | "meeting"
  | "file"
  | "image"
  | "emoji"
  | "send"
  | "textStyle";
