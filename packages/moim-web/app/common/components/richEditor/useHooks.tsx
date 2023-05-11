import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { RangeStatic } from "quill";
import { useIntl } from "react-intl";
import { BaseEmoji } from "emoji-mart";
import { WHITE_LIST_IMAGE_MIME_REGEX } from "common/constants/mimeTypes";
// actions
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import {
  fileUpload as fileUploadAction,
  ActionCreators as fileUploadActionCreators,
} from "app/actions/fileUpload";
// helpers
import useIsMobile from "common/hooks/useIsMobile";
import {
  isConsentRequired,
  isAcceptableSize,
} from "common/helpers/fileUploader/utils";
// editor utils
import {
  insertFile,
  deleteFile,
  changeFilePayload,
  getFileContent,
} from "./utils/file";
import {
  insertImageFile,
  deleteImageFileImageUID,
  deleteImageFileByFileId,
} from "./utils/imageFile";
import { insertUserMentionDenotation } from "./utils/mention";
import { insertLink } from "./utils/link";
import { insertEmoji } from "./utils/emoji";
import { getSelection, restoreSelection } from "./utils/focusIntoSelection";
import { makeOrderedFiles } from "./utils/orderedUploadQueue";
// component
import { IRef as IRefQuillEditor } from "common/components/blockitEditorBase/component";

const DEFAULT_CONTENT_FILE_ATTACHMENT_COUNT = 50;
const DEFAULT_ONCE_UPLOAD_LIMIT_COUNT = 50;

let uploadQueue: Record<string, { fileId: Moim.Id; file: File } | null> = {};

export interface IRefHandler {
  containerElement: HTMLDivElement | undefined | null;
  addLink(): void;
  addFiles(): void;
  addImageFiles(): void;
  addMention(): void;
  prependPreLinkMeeting(id: Moim.Id, name: string): void;
  addEmoji(emoji: BaseEmoji): void;
  addEmbedProduct(productIds: Moim.Id[]): void;
  fileUpload(
    filesParams: FileList | File[],
    retryObject?: {
      fileId: string;
    },
  ): void;
  getContent(): Moim.Blockit.Blocks[];
  getUploadQueue(): Moim.Id[];
  clear(): void;
  focus(): void;
  blur(): void;
  setContent?(content: Moim.Blockit.Blocks[]): void;
}

export interface IProps {
  id: Moim.Id;
  contents: Moim.Blockit.Blocks[];
  containerStyle?: FlattenInterpolation<any>;
  maxContentFileCount?: number;
  onceUploadLimitCount?: number;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  enableSingleLine?: boolean;
  disableFileUploadShortcut?: boolean;
  forceFullWidthFiles?: boolean;
  disableMention?: boolean;
  disableMentionPortal?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  disableImageBlockUpload?: boolean;
  groupId?: string;
  disableEditor?: boolean;
  onFocus?(): void;
  onBlur?(): void;
  onCancel?(): void;
  onSingleLineEnter?(): void;
  onFileChange?(fileId: Moim.Id, file: Moim.Upload.IUploadFileMeta): void;
  onChange?(contents: Moim.Blockit.Blocks[]): void;
  onChangeCursorFormat?(format: {}): void;
}

export function useProps(props: IProps) {
  const intl = useIntl();
  const fileUploadCancelToken = useCancelToken();
  const refQuillEditor = React.useRef<IRefQuillEditor>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageFileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadFileIdQueue, setUploadFileQueue] = React.useState<Moim.Id[]>([]);
  const [storedRange, saveRange] = React.useState<RangeStatic | undefined>(
    undefined,
  );
  const [windowSelection, saveWindowSelection] = React.useState<Range | null>(
    null,
  );
  const isMobile = useIsMobile();

  const { dispatchFileUpload, dispatchDeleteFile } = useActions({
    dispatchFileUpload: fileUploadAction,
    dispatchDeleteFile: fileUploadActionCreators.deleteFile,
  });

  return {
    ...props,
    intl,
    refQuillEditor,
    fileUploadCancelToken,
    fileInputRef,
    imageFileInputRef,
    isMobile,
    storedRange,
    saveRange,
    windowSelection,
    saveWindowSelection,
    uploadFileIdQueue,
    setUploadFileQueue,
    dispatchFileUpload,
    dispatchDeleteFile,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    intl,
    id,
    readonly,
    enableSingleLine,
    refQuillEditor,
    fileInputRef,
    imageFileInputRef,
    isMobile,
    disableImageBlockUpload,
    storedRange,
    forceFullWidthFiles,
    onceUploadLimitCount = DEFAULT_ONCE_UPLOAD_LIMIT_COUNT,
    maxContentFileCount = DEFAULT_CONTENT_FILE_ATTACHMENT_COUNT,
    fileUploadCancelToken,
    uploadFileIdQueue,
    setUploadFileQueue,
    saveRange,
    windowSelection,
    saveWindowSelection,
    dispatchFileUpload,
    dispatchDeleteFile,
    onSingleLineEnter,
    onFocus,
    onFileChange,
  } = props;

  // #region About files
  const handleFileDelete = React.useCallback(
    (fileId: Moim.Id) => {
      const quill = refQuillEditor.current?.getQuill();
      if (quill) {
        setUploadFileQueue(state => state.filter(i => i !== fileId));
        deleteFile(quill, fileId);
      }
    },
    [refQuillEditor, setUploadFileQueue],
  );

  const handleImageFileDelete = React.useCallback(
    (payload: { fileId?: Moim.Id; UId?: Moim.Id }) => {
      const quill = refQuillEditor.current?.getQuill();
      if (quill) {
        if (payload.UId) {
          if (payload.fileId) {
            setUploadFileQueue(state =>
              state.filter(i => i !== payload.fileId),
            );
          }
          deleteImageFileImageUID(quill, payload.UId);
        } else if (payload.fileId) {
          setUploadFileQueue(state => state.filter(i => i !== payload.fileId));
          deleteImageFileByFileId(quill, payload.fileId);
        }
      }
    },
    [refQuillEditor, setUploadFileQueue],
  );

  // NOTE: Don't change variable type.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let handleFileRetry = React.useCallback((_fileId: Moim.Id, _file: File) => {},
  []);

  const bufferedFiles = React.useCallback(() => {
    const quill = refQuillEditor.current?.getQuill();
    if (quill) {
      // Note: wht using Reverse, cuz inserted editor cursor unknown
      Object.entries(uploadQueue)
        .reverse()
        .forEach(([, data]) => {
          if (data) {
            if (
              data.file.type.match(WHITE_LIST_IMAGE_MIME_REGEX) &&
              !disableImageBlockUpload
            ) {
              insertImageFile(
                quill,
                {
                  imageFileGroupName: id,
                  forceFullWidthFiles,
                  onFileRetry: handleFileRetry,
                  onFileDelete: handleImageFileDelete,
                },
                {
                  fileData: { fileId: data.fileId, file: data.file },
                },
                storedRange,
              );
            } else {
              insertFile(
                quill,
                {
                  imageFileGroupName: id,
                  forceFullWidthFiles,
                  onFileRetry: handleFileRetry,
                  onFileDelete: handleFileDelete,
                },
                {
                  fileId: data.fileId,
                  file: data.file,
                },
                storedRange,
              );
            }
          }
        });
    }
    uploadQueue = {};
  }, [
    disableImageBlockUpload,
    forceFullWidthFiles,
    handleFileDelete,
    handleFileRetry,
    id,
    refQuillEditor,
    storedRange,
    handleImageFileDelete,
  ]);

  const handleAfterGetFileId = React.useCallback(
    (fileId: Moim.Id, file: Moim.Upload.IUploadFileMeta) => {
      if (!enableSingleLine) {
        uploadQueue[file.file.name] = {
          fileId,
          file: file.file,
        };

        if (!Object.entries(uploadQueue).some(([, data]) => data === null)) {
          bufferedFiles();
        }
      }
      onFileChange?.(fileId, file);
      setUploadFileQueue(tmpState => tmpState.concat(fileId));
    },
    [bufferedFiles, enableSingleLine, onFileChange, setUploadFileQueue],
  );

  const getFileIdListener = React.useCallback(
    (file: Moim.Upload.IUploadFileMeta, retryObject?: { fileId: Moim.Id }) => (
      fileId: Moim.Id,
    ) => {
      if (retryObject && !enableSingleLine) {
        dispatchDeleteFile(retryObject.fileId);
        const quill = refQuillEditor.current?.getQuill();
        if (quill) {
          changeFilePayload(quill, retryObject.fileId, fileId);
        }
      } else {
        handleAfterGetFileId(fileId, file);
      }
    },
    [
      dispatchDeleteFile,
      enableSingleLine,
      handleAfterGetFileId,
      refQuillEditor,
    ],
  );

  const upload = React.useCallback(
    async (
      file: Moim.Upload.IUploadFileMeta,
      retryObject?: { fileId: Moim.Id },
    ) => {
      if (!file) return;
      const filename = file.file.name;
      await dispatchFileUpload(
        {
          title: filename,
          name: filename,
          file: file.file,
          cancelToken: fileUploadCancelToken.current.token,
        },
        getFileIdListener(file, retryObject),
      );
    },
    [dispatchFileUpload, fileUploadCancelToken, getFileIdListener],
  );

  const fileUpload = React.useCallback(
    async (
      filesParams: FileList | File[],
      retryObject?: { fileId: Moim.Id },
    ) => {
      const orderedFiles = makeOrderedFiles(filesParams);
      uploadQueue = orderedFiles.reduce<Record<string, null>>(
        (accHolder, file) => {
          accHolder[file.file.name] = null;
          return accHolder;
        },
        {},
      );
      const maxSizeFile = orderedFiles.sort((left, right) => {
        if (left.file.size > right.file.size) return -1;
        if (left.file.size < right.file.size) return 1;
        return 0;
      })[0];

      const fileNodeCount = getFileContent(refQuillEditor.current?.getQuill())
        .length;

      if (
        fileNodeCount + orderedFiles.length > maxContentFileCount ||
        fileNodeCount >= maxContentFileCount ||
        orderedFiles.length > onceUploadLimitCount
      ) {
        window.alert(
          intl.formatMessage(
            {
              id: "input_field_file_maximum_number_toast_message",
            },
            { plain_count: maxContentFileCount },
          ),
        );
        return;
      }
      if (isMobile && isConsentRequired(maxSizeFile.file)) {
        const userConsent = window.confirm(
          intl.formatMessage({
            id: "input_field_file_upload_mobile_web_dialog_body",
          }),
        );
        if (!userConsent) {
          return;
        }
      }

      if (!(await isAcceptableSize(maxSizeFile.file))) {
        window.alert(
          intl.formatMessage(
            {
              id: "input_field_file_maximum_size_toast_message",
            },
            { plain_count: 1 },
          ),
        );
        return;
      }

      const promises: Promise<void>[] = [];
      for (
        let i = 0;
        i <
        (orderedFiles.length < onceUploadLimitCount
          ? orderedFiles.length
          : onceUploadLimitCount);
        i++
      ) {
        promises.push(upload(orderedFiles[i], retryObject));
      }

      await Promise.all(promises);
    },
    [
      intl,
      isMobile,
      maxContentFileCount,
      onceUploadLimitCount,
      refQuillEditor,
      upload,
    ],
  );

  handleFileRetry = React.useCallback(
    (fileId: Moim.Id, file: File) => {
      fileUpload([file], { fileId });
    },
    [fileUpload],
  );

  const handleFileChange: React.ReactEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const filesParam = e.currentTarget.files;
      if (filesParam) {
        fileUpload(filesParam);
      }
      e.currentTarget.files = null;
      e.currentTarget.value = "";
    },
    [fileUpload],
  );

  const handleImageFileChange: React.ReactEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const filesParam = e.currentTarget.files;
      if (filesParam) {
        fileUpload(filesParam);
      }
      e.currentTarget.files = null;
      e.currentTarget.value = "";
    },
    [fileUpload],
  );

  // #endregion

  const handleFocus = React.useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const handleSingleLineEnter = React.useCallback(() => {
    if (!isMobile && enableSingleLine) {
      onSingleLineEnter?.();
      return false;
    }
    return true;
  }, [isMobile, enableSingleLine, onSingleLineEnter]);

  const handleEditorClear = React.useCallback(() => {
    refQuillEditor.current?.clear();
  }, [refQuillEditor]);

  const handleEditorFocus = React.useCallback(() => {
    const editor = refQuillEditor.current?.getQuill();

    if (!readonly && editor && windowSelection) {
      requestAnimationFrame(() => {
        if (!editor.hasFocus()) {
          restoreSelection(windowSelection);
        }
        editor.root.focus();
      });
    }
  }, [readonly, refQuillEditor, windowSelection]);

  const handleEditorBlur = React.useCallback(() => {
    refQuillEditor.current?.getQuill()?.blur();
  }, [refQuillEditor]);

  const getMoimDown = React.useCallback(
    () => refQuillEditor.current?.getContents() || [],
    [refQuillEditor],
  );

  const addFiles = React.useCallback(() => {
    fileInputRef.current?.click();
    handleEditorFocus();
  }, [fileInputRef, handleEditorFocus]);

  const addImageFiles = React.useCallback(() => {
    imageFileInputRef.current?.click();
    handleEditorFocus();
  }, [imageFileInputRef, handleEditorFocus]);

  const handleInsertMention = React.useCallback(() => {
    insertUserMentionDenotation(
      refQuillEditor.current?.getQuill(),
      storedRange,
    );
  }, [refQuillEditor, storedRange]);

  const handleToolBoxLinkClick = React.useCallback(() => {
    insertLink(
      refQuillEditor.current?.getQuill(),
      intl.formatMessage({ id: "post_editor/link_input_field_dialog_title" }),
      storedRange,
    );
  }, [refQuillEditor, intl, storedRange]);

  const handleSelectEmoji = React.useCallback(
    (emoji: BaseEmoji) => {
      insertEmoji(
        refQuillEditor.current?.getQuill(),
        emoji.colons,
        storedRange,
      );
    },
    [refQuillEditor, storedRange],
  );

  const handleSaveSelection = React.useCallback(
    (range: RangeStatic) => {
      saveRange(range);
      saveWindowSelection(getSelection());
    },
    [saveRange, saveWindowSelection],
  );

  const handlePrependPreLinkMeeting = React.useCallback(
    (meetingId: Moim.Id, name: string) => {
      const preLinkMeetingBlock: Moim.Blockit.IMeetingBlock = {
        type: "meeting",
        name,
        previewAttendees: [],
        attendeesCount: 0,
        status: "open",
        meetingId,
        blocks: [],
      };
      const quill = refQuillEditor.current?.getQuill();
      if (quill) {
        quill.insertEmbed(0, "blockit-render", { block: preLinkMeetingBlock });
      }
    },
    [refQuillEditor],
  );

  const getUploadQueue = React.useCallback(() => uploadFileIdQueue, [
    uploadFileIdQueue,
  ]);

  const handleAddEmbedProduct = React.useCallback(
    (productIds: Moim.Id[]) => {
      const quill = refQuillEditor.current?.getQuill();
      if (quill) {
        const currentSelection = quill.getSelection() ??
          storedRange ?? { index: 1, length: 0 };
        quill.insertEmbed(currentSelection.index, "blockit-render", {
          block: { type: "embed-product-list", productIds },
        });
      }
    },
    [refQuillEditor, storedRange],
  );

  return {
    ...props,
    addFiles,
    addImageFiles,
    getMoimDown,
    onceUploadLimitCount,
    fileUpload,
    handleSaveSelection,
    handleSingleLineEnter,
    handleFocus,
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
    getUploadQueue,
    handleAddEmbedProduct,
  };
}
