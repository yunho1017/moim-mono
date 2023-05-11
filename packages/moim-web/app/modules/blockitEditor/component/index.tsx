import * as React from "react";
import keycode from "keycode";
import { useIntl } from "react-intl";
import { Prompt } from "react-router-dom";
import { Location } from "history";
import getForceRedirect from "./helpers/getForceRedirect";
import useOpenState from "common/hooks/useOpenState";
import useRedirect from "common/hooks/useRedirect";
import TopNavBar from "./components/topNavbar";
import TopToolBar from "./components/topToolbar";
import { DefaultDivider } from "common/components/divider";
import TagItemList from "./components/tagItemList";

import {
  Wrapper,
  Head,
  Body,
  EditorContainer,
  TitleContainer,
  TitleInput,
} from "./styled";

import BlockitEditorBase, {
  IRefHandler as IEditorRef,
} from "common/components/blockitEditorBase";
import isEmpty from "common/components/blockitEditorBase/helpers/isEmpty";
import { Spacer } from "common/components/designSystem/spacer";
import DiscardAlertDialog from "./components/discardAlertDialog";
import DragHere from "common/components/blockitEditorBase/components/dragHere";
import { DefaultLoader } from "common/components/loading";

const MAX_TITLE_LENGTH = 300;

interface IProps {
  id: Moim.Id;
  from?: Moim.Id;
  isLoading: boolean;
  isEditMode: boolean;
  title?: string;
  contents: Moim.Blockit.Blocks[];
  draftCount: number;
  tagSets: Moim.TagSet.ITagSet[];
  selectedTagSetItemIds: Moim.Id[];
  disableDraftButton: boolean;
  disableTitleInput: boolean;
  disableMention?: boolean;
  disableProfile?: boolean;
  disableChannelSelect?: boolean;
  onClickSaveDraft(
    content: Moim.Blockit.Blocks[],
    title: string,
  ): Promise<void>;
  onClickDraftDialog(): void;
  onClickSave(content: Moim.Blockit.Blocks[], title: string): Promise<void>;
  onClickClose(): void;
  onChangeSelectChannel(channelId: Moim.Id): void;
  onChangeTagItem(tagItem: Moim.TagSet.ITagItem[]): void;
}

export interface IRefHandler {
  editorRef: IEditorRef | null;
}

const BlockitEditorComponent = React.forwardRef<IRefHandler, IProps>(
  (
    {
      id,
      from,
      title,
      draftCount,
      contents,
      tagSets,
      isLoading,
      isEditMode,
      selectedTagSetItemIds,
      disableDraftButton,
      disableTitleInput,
      disableMention,
      disableProfile,
      disableChannelSelect,
      onClickSaveDraft,
      onClickDraftDialog,
      onClickSave,
      onClickClose,
      onChangeSelectChannel,
      onChangeTagItem,
    },
    ref,
  ) => {
    const intl = useIntl();
    const redirect = useRedirect();
    const editorRef = React.useRef<IEditorRef>(null);
    const refBody = React.useRef<HTMLDivElement>(null);
    const refBodyContentChanged = React.useRef<boolean>(false);
    const refNextLocation = React.useRef<Location<any> | null>(null);
    const refUserAgreedTemplateChange = React.useRef(false);
    const refUserCloseClick = React.useRef(false);
    const [tmpTitle, setTitle] = React.useState(title ?? "");
    const [hasContent, setHasContent] = React.useState(
      disableTitleInput ? Boolean(contents.length) : Boolean(title),
    );
    const [titleFocused, setTitleFocus] = React.useState(false);
    const [alertPageLeave, setAlertPageLeave] = React.useState(false);
    const [isDragOver, setDragOver] = React.useState(false);
    const [currentCursorFormat, setCurrentCursorFormat] = React.useState<
      Record<string, boolean>
    >({});

    const {
      isOpen: isOpenDiscardDialog,
      open: openDiscardDialog,
      close: closeDiscardDialog,
    } = useOpenState();

    const handleTitleFocus = React.useCallback(() => {
      setTitleFocus(true);
    }, []);
    const handleTitleBlur = React.useCallback(() => {
      setTitleFocus(false);
    }, []);

    const handleEditorChange = React.useCallback(
      (content: Moim.Blockit.Blocks[]) => {
        setAlertPageLeave(true);
        refBodyContentChanged.current = true;
        if (disableTitleInput) {
          const {
            isEmptyText,
            isEmptyFile,
            isEmptyImageFile,
            isEmptyLinkPreview,
          } = isEmpty(content);
          setHasContent(
            !isEmptyText ||
              !isEmptyFile ||
              !isEmptyImageFile ||
              !isEmptyLinkPreview,
          );
        }
      },
      [disableTitleInput],
    );

    const handleTitleKeyDown: React.KeyboardEventHandler = React.useCallback(
      e => {
        const ctrlKey = e.ctrlKey || e.metaKey;
        if (
          !ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          e.keyCode === keycode("tab")
        ) {
          editorRef.current?.focus();
        }
      },
      [],
    );

    const handleChangeTitle = React.useCallback((value: string) => {
      setAlertPageLeave(true);
      const trimmedText = value.trimLeft();
      setTitle(trimmedText);
    }, []);

    const handleTitleMaxLength = React.useCallback(() => {
      window.alert(
        intl.formatMessage({
          id: "input_field_maximum_characters_toast_message",
        }),
      );
    }, [intl]);

    const handleClickSave = React.useCallback(async () => {
      setAlertPageLeave(false);
      await onClickSave(editorRef.current?.getContent() ?? [], tmpTitle);
    }, [onClickSave, tmpTitle]);

    const handleClickClose = React.useCallback(() => {
      refUserCloseClick.current = true;
      onClickClose();
    }, [onClickClose]);

    const handleClickSaveDraft = React.useCallback(async () => {
      setAlertPageLeave(false);
      await onClickSaveDraft(editorRef.current?.getContent() ?? [], tmpTitle);
    }, [onClickSaveDraft, tmpTitle]);

    const cancelDragEnter = React.useCallback(e => {
      e.stopPropagation();
      e.preventDefault();
    }, []);
    const handleDragOver = React.useCallback(e => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";

      setDragOver(true);
    }, []);
    const handleDragLeave = React.useCallback(() => {
      setDragOver(false);
    }, []);

    const handleDrop = React.useCallback(e => {
      e.stopPropagation();
      e.preventDefault();
      setDragOver(false);
      editorRef.current?.fileUpload(Array.from(e.dataTransfer.files));
    }, []);

    const leaveMessage = React.useCallback(
      (paramNextLocation: Location<any>) => {
        refNextLocation.current = paramNextLocation;
        const isForceRedirection = getForceRedirect(paramNextLocation);
        const hasCurrentDraftId = location.search.includes("draft");
        const hasNewDraftId = paramNextLocation.search.includes("draft");

        if (isForceRedirection) return true;
        if (!refUserCloseClick.current && hasCurrentDraftId && !hasNewDraftId) {
          return !refUserAgreedTemplateChange.current ? false : true;
        }
        refUserAgreedTemplateChange.current = false;

        if (
          alertPageLeave &&
          !isOpenDiscardDialog &&
          location.search !== paramNextLocation.search
        ) {
          openDiscardDialog();
          return false;
        }

        return true;
      },
      [alertPageLeave, isOpenDiscardDialog, openDiscardDialog],
    );

    const handleTemplateChangeAlertPositiveClick = React.useCallback(() => {
      refUserAgreedTemplateChange.current = true;
      refBodyContentChanged.current = false;
      if (refNextLocation.current) {
        redirect(refNextLocation.current);
      }
      refNextLocation.current = null;
    }, []);

    const handleDiscardAlertPositiveClick = React.useCallback(() => {
      editorRef.current?.clear();
      setAlertPageLeave(false);
      closeDiscardDialog();
      if (refNextLocation.current) {
        redirect(refNextLocation.current);
      }
      refBodyContentChanged.current = false;
      refNextLocation.current = null;
      refUserCloseClick.current = false;
    }, [closeDiscardDialog, redirect]);

    const handleDiscardAlertClose = React.useCallback(() => {
      refNextLocation.current = null;
      closeDiscardDialog();
    }, []);

    React.useEffect(() => {
      refBodyContentChanged.current = false;
      refNextLocation.current = null;
      refUserAgreedTemplateChange.current = false;
      refUserCloseClick.current = false;
      setCurrentCursorFormat({});
      setHasContent(false);
      setAlertPageLeave(false);
      closeDiscardDialog();
    }, [id]);

    React.useLayoutEffect(() => {
      if (!(refBodyContentChanged.current && contents.length === 0)) {
        editorRef.current?.setContent?.(contents);
        refBodyContentChanged.current = false;

        setTimeout(() => {
          setAlertPageLeave(false);
        }, 100);
      }
    }, [contents]);

    React.useEffect(() => {
      setTitle(title ?? "");
    }, [title]);

    React.useImperativeHandle(ref, () => ({ editorRef: editorRef.current }));

    return (
      <Wrapper>
        <Prompt when={alertPageLeave} message={leaveMessage} />
        <Head>
          <TopNavBar
            from={from}
            isEditMode={isEditMode}
            draftCount={draftCount}
            disableDraftButton={disableDraftButton}
            disableProfile={disableProfile}
            disableChannelSelect={disableChannelSelect}
            hasContent={disableTitleInput ? hasContent : Boolean(tmpTitle)}
            isBodyContentChanged={refBodyContentChanged}
            onClickSaveDraft={handleClickSaveDraft}
            onClickDraftDialog={onClickDraftDialog}
            onClickSave={handleClickSave}
            onClickClose={handleClickClose}
            onChangeSelectChannel={onChangeSelectChannel}
            onTemplateChangeAlertPositiveClick={
              handleTemplateChangeAlertPositiveClick
            }
          />
          <TopToolBar
            id={id}
            tagSets={tagSets}
            editorRef={editorRef}
            inactive={titleFocused}
            selectedTagSetItemIds={selectedTagSetItemIds}
            disableMention={disableMention}
            currentCursorFormat={currentCursorFormat}
            onChangeTagItem={onChangeTagItem}
          />
        </Head>
        <Body
          ref={refBody}
          id="blockit-editor-body"
          onDragEnter={cancelDragEnter}
          onDragOver={handleDragOver}
          onDragExit={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <DefaultLoader />
          ) : (
            <>
              <DragHere
                visible={isDragOver}
                offset={refBody.current?.scrollTop}
                onDragLeave={handleDragLeave}
              />
              <EditorContainer>
                {!disableTitleInput && (
                  <>
                    <TitleContainer>
                      <TitleInput
                        autoFocus={!disableTitleInput}
                        value={tmpTitle}
                        maxLength={MAX_TITLE_LENGTH}
                        placeholder={intl.formatMessage({
                          id: "post_editor/title_input_field_placeholder",
                        })}
                        onChange={handleChangeTitle}
                        onKeyDown={handleTitleKeyDown}
                        onMaxLength={handleTitleMaxLength}
                        onFocus={handleTitleFocus}
                        onBlur={handleTitleBlur}
                      />
                    </TitleContainer>
                    <DefaultDivider />
                    <Spacer value={16} />
                  </>
                )}
                <div>
                  <BlockitEditorBase
                    ref={editorRef}
                    id={id}
                    readonly={false}
                    autofocus={disableTitleInput}
                    contents={contents}
                    placeholder={intl.formatMessage({
                      id: "post_editor/body_input_field_placeholder",
                    })}
                    disableMention={disableMention}
                    onChangeCursorFormat={setCurrentCursorFormat}
                    onChange={handleEditorChange}
                  />
                </div>
                <TagItemList
                  readonly={true}
                  tagSets={tagSets}
                  tagItemIds={selectedTagSetItemIds}
                />
              </EditorContainer>
            </>
          )}
        </Body>
        <DiscardAlertDialog
          open={isOpenDiscardDialog}
          onPositiveClick={handleDiscardAlertPositiveClick}
          onNegativeClick={handleDiscardAlertClose}
          onClose={handleDiscardAlertClose}
        />
      </Wrapper>
    );
  },
);

export default BlockitEditorComponent;
