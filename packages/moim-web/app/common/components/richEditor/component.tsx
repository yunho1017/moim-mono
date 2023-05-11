import * as React from "react";
import Quill, {
  QuillOptionsStatic,
  RangeStatic,
  StringMap,
  Sources,
} from "quill";
import { FlattenInterpolation } from "styled-components";
import Delta from "quill-delta";
import defer from "lodash/defer";
import map from "lodash/map";
import debounce from "lodash/debounce";
// components
import { Container } from "./styled";
// module
import MentionHelper from "common/components/blockitEditorBase/components/mention";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import usePrevious from "common/hooks/usePrevious";
// quill utils
import moimDownConvert from "common/components/blockitEditorBase/utils/moimDownConvert";
import quillToServer from "common/components/blockitEditorBase/utils/quillToServerContent";
import {
  FileCellBlot,
  ImageCellBlot,
  EmojiBlot,
  LinkPreviewBlot,
  LinkPreviewLoaderBlot,
  BlockitRenderBlot,
  Bold,
  Italic,
  Mark,
  Link,
  Mention,
  FontStyle,
} from "common/components/blockitEditorBase/components/blots";
import MoimKeyboardModule from "./components/modules/keyboard";
import MoimUploaderModule from "./components/modules/uploader";
import Clipboard from "./utils/clipboard";
import { REGEXP_WITH_PRECEDING_WS, linkify } from "./utils/link";
import focusAndScrollIntoSelection from "./utils/focusIntoSelection";
import { deleteLinkPreview } from "app/common/components/richEditor/utils/linkpreview";

type NetTypeQuillConfig = QuillOptionsStatic & Record<string, any>;

interface IProps {
  id: Moim.Id;
  contents: Moim.Blockit.Blocks[];
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  enableSingleLine?: boolean;
  bindKeyboard?: {
    [key: string]:
      | ((range: RangeStatic, context: StringMap) => void)
      | undefined;
  };
  disableMentionPortal?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  containerStyle?: FlattenInterpolation<any>;
  groupId?: string;
  onFileUpload(
    fileParams: FileList | File[],
    retryObject?: { fileId: Moim.Id },
  ): Promise<void>;
  onFileRetry(fileId: Moim.Id, file: File): void;
  onFileDelete(fileId: Moim.Id): void;
  onImageFileDelete(payload: { fileId?: Moim.Id; UId?: Moim.Id }): void;
  onSingleLineEnter?(): boolean;
  onChange?(changes: Moim.Blockit.Blocks[]): void;
  onChangeSelection?(range: RangeStatic): void;
  onChangeCursorFormat?(format: Record<string, unknown>): void;
  onFocus?(): void;
  onBlur?(): void;
  onCancel?(): void;
  callbackMechanicalFocus?(): void;
}

export interface IRef {
  getQuill(): Quill | null;
  getContents(): Moim.Blockit.Blocks[];
  clear(): void;
  setContent(content: Moim.Blockit.Blocks[]): void;
}

const QuillEditor = React.forwardRef<IRef, IProps>(
  (
    {
      id,
      contents,
      placeholder,
      readonly,
      autofocus,
      enableSingleLine,
      bindKeyboard,
      disableMentionPortal,
      mentionPortalContainer,
      containerStyle,
      groupId,
      onFileUpload,
      onFileRetry,
      onFileDelete,
      onImageFileDelete,
      onSingleLineEnter,
      onChange,
      onChangeSelection,
      onChangeCursorFormat,
      onFocus,
      onBlur,
      onCancel,
      callbackMechanicalFocus,
    },
    ref,
  ) => {
    const refSingleLineEnter = React.useRef<(() => boolean) | null>(null);
    const refEditorChange = React.useRef<
      ((changes: Moim.Blockit.Blocks[]) => void) | null
    >(null);
    const refSelectionChange = React.useRef<
      ((range: RangeStatic) => void) | null
    >(null);
    const refCursorFormatChange = React.useRef<
      ((format: Record<string, unknown>) => void) | null
    >(null);

    const refFileUpload = React.useRef<
      | ((
          fileParams: FileList | File[],
          retryObject?: { fileId: Moim.Id },
        ) => Promise<void>)
      | null
    >(null);
    const refFocus = React.useRef<(() => void) | null>(null);
    const refBlur = React.useRef<(() => void) | null>(null);
    const refCancel = React.useRef<(() => void) | null>(null);

    const prevId = usePrevious(id);
    const prevPlaceholder = usePrevious(placeholder);
    const userEntities = useStoreState(state => state.entities.users);
    const isMobile = useIsMobile();
    const editor = React.useRef<Quill | null>(null);
    const refEditor = React.useRef<HTMLDivElement>(null);
    const [placeholderVisibility, setPlaceholderVisibility] = React.useState(
      true,
    );
    const refTmpContentDelta = React.useRef<Delta>(new Delta());
    const [embedBlots, setEmbedBlots] = React.useState<Record<string, any>>({});

    const getQuill = React.useCallback(() => editor.current, []);
    const getContents = React.useCallback(
      () => (editor.current ? quillToServer(editor.current.getContents()) : []),
      [],
    );
    const clear = React.useCallback(
      () => editor.current?.setContents(new Delta()),
      [],
    );
    const handleFocus = React.useCallback(() => {
      onFocus?.();
    }, [onFocus]);
    const handleBlur = React.useCallback(() => {
      const range = editor.current?.getSelection();
      if (range) {
        onChangeSelection?.(range);
      }
      onBlur?.();
    }, [onChangeSelection, onBlur]);

    const focusAndScrollToSelection = React.useCallback(() => {
      if (isMobile) {
        focusAndScrollIntoSelection();
      }
    }, [isMobile]);

    const toggleFormat = React.useCallback(
      (format: string) => {
        const edt = editor.current;
        if (edt && !readonly) {
          const selection = edt.getSelection();
          if (selection) {
            const currentFormats = edt.getFormat(selection);
            const currentFormat = selection
              ? currentFormats[format] || false
              : false;
            edt.format(format, !currentFormat, "user");
            refCursorFormatChange.current?.({
              ...currentFormats,
              [format]: !currentFormat,
            });

            focusAndScrollIntoSelection();
          }
        }
      },
      [readonly],
    );

    const handleInput = React.useCallback(() => {
      setPlaceholderVisibility(false);
    }, []);

    const handleEnter = React.useCallback(() => {
      focusAndScrollToSelection();
      return true;
    }, [focusAndScrollToSelection]);

    const handleSingleLineEnter = React.useCallback(
      () => (refSingleLineEnter.current ? refSingleLineEnter.current() : true),
      [],
    );

    const handleBold = React.useCallback(() => {
      toggleFormat("bold");
    }, [toggleFormat]);

    const handleItalic = React.useCallback(() => {
      toggleFormat("italic");
    }, [toggleFormat]);

    const handleLinkify = React.useCallback(
      (range: RangeStatic, context: StringMap) => {
        if (editor.current) linkify(editor.current, range, context);
        return true;
      },
      [],
    );

    const handleBlotMount = React.useCallback((...blots: any[]) => {
      setEmbedBlots(state =>
        blots.reduce(
          (memo, blot) => {
            memo[blot.id] = blot;
            return memo;
          },
          { ...state },
        ),
      );
    }, []);
    const handleBlotUnMount = React.useCallback((unmountedBlot: any) => {
      setEmbedBlots(state => {
        const { [unmountedBlot.id]: _, ...restBlots } = state;
        return restBlots;
      });
    }, []);

    const handleBackspaceLinkPreview = React.useCallback(
      (_: RangeStatic, context: StringMap) => {
        const prevBlot = context.line.prev;
        if (
          editor.current &&
          prevBlot &&
          prevBlot.statics.blotName === "link-preview"
        ) {
          const placeId = prevBlot.placeId;
          deleteLinkPreview(editor.current, placeId, true);
        }

        return true;
      },
      [],
    );

    const handleDeleteLinkPreview = React.useCallback(
      (_: RangeStatic, context: StringMap) => {
        const nextBlot = context.line.next;
        if (
          editor.current &&
          nextBlot &&
          nextBlot.statics.blotName === "link-preview"
        ) {
          const placeId = nextBlot.placeId;
          deleteLinkPreview(editor.current, placeId);
          return false;
        }

        return true;
      },
      [],
    );

    const debouncedSetContent = React.useCallback(
      debounce((_content?: Moim.Blockit.Blocks[]) => {
        const edt = editor.current;
        if (edt) {
          const newDelta = moimDownConvert({
            id,
            userEntities,
            contents: _content ?? contents,
            onFileRetry,
            onFileDelete,
            onImageFileDelete,
          });

          const diffDelta = refTmpContentDelta.current.diff(newDelta);
          if (Boolean(diffDelta.length())) {
            edt.updateContents(diffDelta, "api");
            refTmpContentDelta.current = newDelta;
          }
        }
      }, 300),
      [
        id,
        contents,
        onFileDelete,
        onFileRetry,
        onImageFileDelete,
        userEntities,
      ],
    );

    const setDefaultContent = React.useCallback(
      (_content?: Moim.Blockit.Blocks[]) => {
        debouncedSetContent(_content);
      },
      [],
    );

    const handleFileUpload = React.useCallback(
      (fileParams: FileList | File[], retryObject?: { fileId: Moim.Id }) => {
        return refFileUpload.current?.(fileParams, retryObject);
      },
      [],
    );

    const debouncedChange = React.useMemo(
      () =>
        debounce((editorDelta: Delta) => {
          refEditorChange.current?.(quillToServer(editorDelta));
        }, 100),
      [],
    );

    const handlePassChange = React.useCallback(() => {
      if (editor.current) {
        debouncedChange(editor.current.getContents());
      }
    }, [debouncedChange]);

    const handleEditorTextChange = React.useCallback(
      (_: Delta, _2: Delta, source: Sources) => {
        const edt = editor.current;
        if (!edt) return;
        setPlaceholderVisibility(true);
        if (source !== "silent") {
          handlePassChange();
        }
      },
      [handlePassChange],
    );
    const handleEditorSelectionChange = React.useCallback(
      (range: RangeStatic) => {
        const edt = editor.current;
        if (!edt || !range) return;
        refSelectionChange.current?.(range);
        refCursorFormatChange.current?.(edt.getFormat(range));
      },
      [],
    );

    React.useImperativeHandle(ref, () => ({
      getQuill,
      getContents,
      clear,
      setContent: setDefaultContent,
    }));

    React.useLayoutEffect(() => {
      Quill.register(
        {
          "formats/imageCell": ImageCellBlot,
          "formats/fileCell": FileCellBlot,
          "formats/emoji": EmojiBlot,
          "formats/link-preview": LinkPreviewBlot,
          "formats/link-preview-loader": LinkPreviewLoaderBlot,
          "formats/bold": Bold,
          "formats/italic": Italic,
          "formats/mark": Mark,
          "formats/link": Link,
          "formats/mention": Mention,
          "formats/fontStyle": FontStyle,
          "formats/blockit-render": BlockitRenderBlot,
          "modules/clipboard": Clipboard,
          "modules/keyboard": MoimKeyboardModule,
          "modules/uploader": MoimUploaderModule,
        },
        true,
      );
      const targetElement = refEditor.current;
      if (targetElement) {
        const edt = new Quill(targetElement, {
          readOnly: readonly,
          placeholder,
          isSingleLine: Boolean(enableSingleLine),
          formats: [
            "fileCell",
            "emoji",
            "link-preview",
            "link-preview-loader",
            "bold",
            "italic",
            "mark",
            "codeBlock",
            "inlineBlock",
            "link",
            "mention",
          ],
          modules: {
            history: {
              delay: 1000,
              maxStack: 500,
              userOnly: true,
            },
            uploader: { customUploader: handleFileUpload },
            toolbar: !readonly && {
              container: `#${id}_toolbar`,
              handlers: {
                bold: handleBold,
                italic: handleItalic,
              },
            },
            keyboard: {
              bindings: {
                "link enter": {
                  key: "Enter",
                  collapsed: true,
                  prefix: REGEXP_WITH_PRECEDING_WS,
                  handler: handleLinkify,
                },
                "link-trigger-space": {
                  key: 32,
                  collapsed: true,
                  prefix: REGEXP_WITH_PRECEDING_WS,
                  handler: handleLinkify,
                },

                Enter: !enableSingleLine && {
                  key: "Enter",
                  handler: handleEnter,
                },

                "singleLine Enter": enableSingleLine && {
                  key: "Enter",
                  shortKey: false,
                  shiftKey: false,
                  handler: handleSingleLineEnter,
                },

                cancel: onCancel && {
                  key: "Escape",
                  shortKey: false,
                  shiftKey: false,
                  handler: refCancel.current,
                },

                link: bindKeyboard?.link && {
                  key: "k",
                  shortKey: true,
                  shiftKey: false,
                  handler: bindKeyboard.link,
                },
                mention: bindKeyboard?.mention && {
                  key: "m",
                  shortKey: true,
                  shiftKey: false,
                  handler: bindKeyboard.mention,
                },
                underline: {
                  key: "u",
                  shortKey: true,
                  shiftKey: false,
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  handler: bindKeyboard?.file ? bindKeyboard.file : () => {},
                },
                backspace: {
                  key: "Backspace",
                  handler: handleBackspaceLinkPreview,
                },
                delete: {
                  key: "Delete",
                  handler: handleDeleteLinkPreview,
                },
              },
            },
          },
        } as NetTypeQuillConfig);

        edt.on("text-change", handleEditorTextChange);
        edt.on("selection-change", handleEditorSelectionChange);
        if (autofocus) {
          edt.focus();
        }
        editor.current = edt;
      }
      if (editor.current) {
        let blots: any[] = [];
        (editor.current as any).emitter.on("blot-mount", (blot: any) => {
          blots.push(blot);
          defer(() => {
            if (blots.length > 0) {
              handleBlotMount(...blots);
              blots = [];
            }
          });
        });
        (editor.current as any).emitter.on("blot-unmount", handleBlotUnMount);
      }
      clear();
      setDefaultContent();
    }, [id, readonly]);

    React.useEffect(() => {
      if (readonly) {
        setDefaultContent(contents);
      }
    }, [contents, readonly]);

    React.useCallback(() => {
      if (id !== prevId) {
        clear();
      }
    }, [id, prevId]);

    React.useCallback(() => {
      if (placeholder !== prevPlaceholder) {
        setPlaceholderVisibility(true);
      }
    }, [placeholder, prevPlaceholder]);

    React.useEffect(() => {
      editor.current?.root.setAttribute(
        "data-placeholder",
        placeholderVisibility ? placeholder ?? "" : "",
      );
    }, [placeholderVisibility, placeholder]);

    // #region "on<> Event ref mapper"
    React.useEffect(() => {
      if (onSingleLineEnter) {
        refSingleLineEnter.current = onSingleLineEnter;
      }
    }, [onSingleLineEnter]);

    React.useEffect(() => {
      if (onChange) {
        refEditorChange.current = onChange;
      }
    }, [onChange]);

    React.useEffect(() => {
      if (onChangeSelection) {
        refSelectionChange.current = onChangeSelection;
      }
    }, [onChangeSelection]);

    React.useEffect(() => {
      if (onChangeCursorFormat) {
        refCursorFormatChange.current = onChangeCursorFormat;
      }
    }, [onChangeCursorFormat]);

    React.useEffect(() => {
      if (onFileUpload) {
        refFileUpload.current = onFileUpload;
      }
    }, [onFileUpload]);

    React.useEffect(() => {
      if (onFocus) {
        refFocus.current = onFocus;
      }
    }, [onFocus]);

    React.useEffect(() => {
      if (onBlur) {
        refBlur.current = onBlur;
      }
    }, [onBlur]);

    React.useEffect(() => {
      if (onCancel) {
        refCancel.current = onCancel;
      }
    }, [onCancel]);

    // #endregion "on<> Event ref mapper"

    return (
      <Container
        readonly={Boolean(readonly)}
        enableSingleLine={Boolean(enableSingleLine)}
        containerStyle={containerStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div ref={refEditor} onInput={handleInput}>
          {map(embedBlots, (blot: any) => blot.renderPortal(blot.id))}
          {editor.current && !readonly && (
            <MentionHelper
              quill={editor.current}
              groupId={groupId}
              enableSingleLine={enableSingleLine}
              disablePortal={disableMentionPortal}
              mentionPortalContainer={mentionPortalContainer}
              callbackEditorFocus={callbackMechanicalFocus}
            />
          )}
        </div>
      </Container>
    );
  },
);

export default React.memo(QuillEditor);
