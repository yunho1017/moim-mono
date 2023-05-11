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
import MentionHelper from "./components/mention";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import usePrevious from "common/hooks/usePrevious";
// quill utils
import moimDownConvert from "./utils/moimDownConvert";
import quillToServer from "./utils/quillToServerContent";
import {
  FileCellBlot,
  ImageCellBlot,
  EmojiBlot,
  LinkPreviewBlot,
  LinkPreviewLoaderBlot,
  BlockitRenderBlot,
  Mark,
  Link,
  Mention,
  FontStyle,
  Bold,
  Italic,
  Code,
} from "./components/blots";
import AttrBackgroundStyleAttribute from "./components/attributors/background";
import AttrFontSizeClassAttribute from "./components/attributors/fontSize";

import MoimKeyboardModule from "./components/modules/keyboard";
import MoimUploaderModule from "./components/modules/uploader";
import Clipboard from "./utils/clipboard";
import { REGEXP_WITH_PRECEDING_WS, linkify } from "./utils/link";
import focusAndScrollIntoSelection from "./utils/focusIntoSelection";
import { deleteLinkPreview } from "./utils/linkpreview";

type NetTypeQuillConfig = QuillOptionsStatic & Record<string, any>;

interface IProps {
  id: Moim.Id;
  contents: Moim.Blockit.Blocks[];
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  enableSingleLine?: boolean;
  disableEditor?: boolean;
  bindKeyboard?: {
    [key: string]:
      | ((range: RangeStatic, context: StringMap) => void)
      | undefined;
  };
  disableMention?: boolean;
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
  updateTextFormat(payload: Record<string, any>): void;
  clear(): void;
  setFocus(): void;
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
      disableMention,
      disableMentionPortal,
      mentionPortalContainer,
      containerStyle,
      groupId,
      disableEditor,
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
    const refRange = React.useRef<any>();
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
      () => quillToServer(editor.current?.getContents() ?? new Delta()),
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
        refRange.current = (editor.current as any).selection.getRange();
        onChangeSelection?.(range);
      }
      onBlur?.();
    }, [onChangeSelection, onBlur]);

    const focusAndScrollToSelection = React.useCallback(() => {
      if (isMobile) {
        focusAndScrollIntoSelection();
      }
    }, [isMobile]);

    const handleEditorSelectionFocus = React.useCallback(() => {
      if (refRange.current) {
        const [, range] = refRange.current;
        const docSelection = document.getSelection();
        const docRange = document.createRange();
        docRange.setStart(range.start.node, range.start.offset);
        docRange.setEnd(range.end.node, range.end.offset);
        docSelection?.removeAllRanges();
        docSelection?.addRange(docRange);
      }
    }, []);

    const updateTextFormat = React.useCallback(
      (format: Record<string, any>) => {
        const edt = editor.current;
        if (edt && !readonly) {
          const selection = edt.getSelection();
          if (selection) {
            const currentFormats = edt.getFormat(selection);
            const applyMergedFormat: Record<string, any> = {};

            if (format.color !== undefined && !currentFormats.code) {
              applyMergedFormat.color =
                format.color === "clear" ? undefined : format.color;
              edt.format("color", applyMergedFormat.color, "user");
            }

            if (format.background !== undefined && !currentFormats.code) {
              applyMergedFormat.background =
                format.background === "clear" ? undefined : format.background;
              edt.format("background", applyMergedFormat.background, "user");
            }

            if (format.fontSize !== undefined) {
              applyMergedFormat.fontSize = format.fontSize;
              edt.format("fontSize", format.fontSize, "user");
            }

            if (format.code !== undefined) {
              applyMergedFormat.code = currentFormats?.code ? false : true;
              edt.format("code", applyMergedFormat.code, "user");
            }

            refCursorFormatChange.current?.({
              ...currentFormats,
              ...applyMergedFormat,
            });
          }
        }
      },
      [readonly],
    );

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

    const forceSetContent = React.useCallback(
      debounce((_content?: Moim.Blockit.Blocks[]) => {
        const edt = editor.current;
        if (edt) {
          const newDelta = moimDownConvert({
            id,
            userEntities,
            contents: _content ?? [],
            onFileRetry,
            onFileDelete,
            onImageFileDelete,
          });
          refTmpContentDelta.current = newDelta;
          edt.setContents(newDelta, "api");
        }
      }, 300),
      [id, userEntities],
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
      (_: Delta, oldDelta: Delta, source: Sources) => {
        const edt = editor.current;
        if (!edt) return;
        setPlaceholderVisibility(true);
        if (
          source === "user" &&
          edt
            .getContents()
            .diff(oldDelta)
            .length() > 0
        ) {
          handlePassChange();
        }
      },
      [handlePassChange],
    );
    const handleEditorSelectionChange = React.useCallback(
      (range: RangeStatic) => {
        const edt = editor.current;
        if (!edt || !range) return;
        refRange.current = (edt as any).selection.getRange();
        refSelectionChange.current?.(range);
        refCursorFormatChange.current?.(edt.getFormat(range));
      },
      [],
    );

    const handleArrowEscape = React.useCallback(
      (range: RangeStatic, context: StringMap) => {
        const nextFormat = editor.current?.getFormat(range.index + 1);
        if (context.format.code && !nextFormat?.code && context.collapsed) {
          editor.current?.setSelection(range);
          toggleFormat("code");
          return false;
        }

        return true;
      },
      [toggleFormat],
    );

    const clearMentionContent = React.useCallback(() => {
      const edt = editor.current;
      if (edt) {
        const cts = edt.getContents();
        const newDelta = new Delta(
          cts.map(op => {
            if (op.insert?.hasOwnProperty("mention")) {
              return {
                insert:
                  `@${
                    (op.insert as Record<string, any>).mention?.displayText
                  }` ?? "",
              };
            } else {
              return op;
            }
          }),
        );
        edt.updateContents(cts.diff(newDelta));
      }
    }, []);

    React.useImperativeHandle(ref, () => ({
      getQuill,
      getContents,
      updateTextFormat,
      clear,
      setFocus: handleEditorSelectionFocus,
      setContent: forceSetContent,
    }));

    React.useLayoutEffect(() => {
      Quill.register(AttrBackgroundStyleAttribute, true);
      Quill.register(AttrFontSizeClassAttribute, true);
      Quill.register(
        {
          "formats/imageCell": ImageCellBlot,
          "formats/fileCell": FileCellBlot,
          "formats/emoji": EmojiBlot,
          "formats/link-preview": LinkPreviewBlot,
          "formats/link-preview-loader": LinkPreviewLoaderBlot,
          "formats/mark": Mark,
          "formats/link": Link,
          "formats/bold": Bold,
          "formats/italic": Italic,
          "formats/code": Code,
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
          scrollingContainer: "#blockit-editor-body",
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
            "fontStyle",
            "attr",
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
                bold: () => {
                  toggleFormat("bold");
                },
                italic: () => {
                  toggleFormat("italic");
                },
                ["add-code"]: () => {
                  toggleFormat("code");
                },
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
                inlineEscape: {
                  key: 39,
                  handler: handleArrowEscape,
                },
                inlineCode: {
                  key: "e",
                  shortKey: true,
                  handler: () => {
                    toggleFormat("code");
                  },
                },
                bold: {
                  key: "b",
                  shortKey: true,
                  handler: () => {
                    toggleFormat("bold");
                  },
                },
                italic: {
                  key: "i",
                  shortKey: true,
                  handler: () => {
                    toggleFormat("italic");
                  },
                },
              },
            },
          },
        } as NetTypeQuillConfig);

        if (disableEditor) {
          edt.disable();
        }

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
      const edt = editor.current;
      if (edt && disableEditor !== undefined) {
        if (disableEditor) {
          edt.disable();
        } else {
          edt.enable();
        }
      }
    }, [disableEditor]);

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

    React.useEffect(() => {
      if (disableMention) {
        clearMentionContent();
      }
    }, [disableMention]);

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
          {editor.current && !readonly && !disableMention && (
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
