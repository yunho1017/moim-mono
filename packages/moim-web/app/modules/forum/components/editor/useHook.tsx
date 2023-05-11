import * as React from "react";
import keycode from "keycode";
import { isEqual } from "lodash";
import { Location } from "history";
import { BaseEmoji } from "emoji-mart";
import { useDebounce } from "react-use";
import { useActions, useStoreState } from "app/store";
import { useIntl } from "react-intl";
import useCreateMeetingPermission from "common/hooks/useCreateMeetingPermission";
import useOpenState from "common/hooks/useOpenState";
import useIsMobile from "app/common/hooks/useIsMobile";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { fileListSelector } from "app/selectors/file";
import { IRefHandler } from "common/components/blockitEditorBase";
import { isiOS, isMobileAgent } from "common/helpers/browserDetect";
import {
  IFilterOption,
  IRefHandler as IFilterDialogRefHandler,
} from "app/modules/forum/components/forumThreadList/components/filterBox/components/filterDialog";
import getForceRedirect from "./helpers/getForceRedirect";
import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";
import { openCreateMeetingDialog } from "common/components/createMeetingDialog/action";
import { getTagByIds } from "app/selectors/tagSet";

export interface IRef {
  refEditor: IRefHandler | null;
}

export interface IProps {
  id: Moim.Id;
  title: string;
  contents: Moim.Blockit.Blocks[];
  isPosting: boolean;
  hasContent: boolean;
  isDraftSaving: boolean;
  isDraftPost: boolean;
  visibleDraftButton?: boolean;
  isNewPost: boolean;
  tagSets: Moim.TagSet.ITagSet[];
  selectedTagSetItemIds: Moim.Id[];
  preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null;
  hasError?: boolean;
  contentPlaceholder?: string;
  titlePlaceholder?: string;
  isModal?: boolean;
  draftCount?: number;
  onOpenDraftList(): void;
  onSaveDraft(param: { title: string; content: Moim.Blockit.Blocks[] }): void;
  onSave(param: {
    title: string;
    content: Moim.Blockit.Blocks[];
    uploadFileIds?: Moim.Id[];
  }): void;
  onDiscard(): void;
  onChange(params: { title?: string; content?: Moim.Blockit.Blocks[] }): void;
}

export function useProps(props: IProps) {
  const {
    id,
    title: propTitle,
    contents: propContents,
    isPosting,
    hasError,
    hasContent,
    selectedTagSetItemIds,
    onChange,
    onSave,
    onDiscard,
    onSaveDraft,
    preLinkMeeting,
  } = props;
  const refEditor = React.useRef<IRefHandler>(null);
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refTagSetButton = React.useRef<HTMLButtonElement>(null);
  const refFilterDialog = React.useRef<IFilterDialogRefHandler>(null);
  const redirect = useRedirect();
  const intl = useIntl();
  const { dispatchOpenCreateMeetingDialog, dispatchOpenSnackBar } = useActions({
    dispatchOpenCreateMeetingDialog: openCreateMeetingDialog,
    dispatchOpenSnackBar: SnackBarActionCreators.openSnackbar,
  });
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState<
    "up" | "down" | null
  >(null);
  const [isOpenDiscardAlert, setDiscardAlertOpenState] = React.useState(false);
  const [title, setTitle] = React.useState(propTitle);
  const [isOpenEmojiPopover, setEmojiOpenState] = React.useState(false);
  const [titleHasFocus, setTitleFocusState] = React.useState(false);
  const [editorHasFocus, setEditorFocusState] = React.useState(false);
  const [currentCursorFormat, setCurrentCursorFormat] = React.useState<{
    [key: string]: boolean;
  }>({});
  const {
    isOpen: isUploadLoadingAlert,
    open: openUploadLoadingAlert,
    close: closeUploadLoadingAlert,
  } = useOpenState();

  const [isDragOver, setDragOver] = React.useState(false);
  const refDisablePageLeaveAlert = React.useRef(true);
  const refContentChanged = React.useRef(false);
  const [nextLocation, setNextLocation] = React.useState<Location<any> | null>(
    null,
  );
  const isMobile = useIsMobile();
  const visibleTopNavigation = useVisibleTopNavigation();
  const {
    hasPermission: hasCreateMeetingPermission,
  } = useCreateMeetingPermission();
  const { storeState } = useStoreState(s => ({ storeState: s }));
  const selectedTagSetItemEntities = useStoreState(
    state =>
      getTagByIds(state, selectedTagSetItemIds) as Moim.TagSet.ITagItem[],
  );
  const [selectedTagItems, setSelectedTagItems] = React.useState<
    Moim.TagSet.ITagItem[]
  >(selectedTagSetItemEntities);
  const {
    isOpen: isOpenProductSelectDialog,
    open: openProductSelectDialog,
    close: closeProductSelectDialog,
  } = useOpenState(false);
  const currentGroup = useCurrentGroup();

  const canEmbedProduct = React.useMemo(
    () => Boolean(currentGroup?.seller_id),
    [currentGroup?.seller_id],
  );

  const canSave = React.useMemo(() => !isPosting, [isPosting]);
  const isFocused = React.useMemo(() => titleHasFocus || editorHasFocus, [
    titleHasFocus,
    editorHasFocus,
  ]);

  const checkTitleIsEmpty = React.useCallback(() => {
    if (!title) {
      dispatchOpenSnackBar({
        textKey: "post_editor/error_no_title",
        type: "error",
      });
      return true;
    }
    return false;
  }, [dispatchOpenSnackBar, title]);

  const scrollTop = React.useMemo(() => {
    if (isFocused && isMobileAgent() && isiOS() && visibleTopNavigation) {
      return scrollHeight - TOP_NAVIGATION_HEIGHT;
    }

    return scrollHeight;
  }, [isFocused, visibleTopNavigation, scrollHeight]);

  const emojiAnchor = React.useRef(null);

  const titleChanged = React.useMemo(() => title !== propTitle, [
    title,
    propTitle,
  ]);
  const refOnSaveClicked = React.useRef(false);
  const alertPageLeave =
    refOnSaveClicked.current || refDisablePageLeaveAlert.current
      ? false
      : titleChanged || refContentChanged.current;

  const leaveMessage = React.useCallback(
    (paramNextLocation: Location<any>) => {
      setNextLocation(paramNextLocation);

      const isForceRedirection = getForceRedirect(paramNextLocation);
      if (isForceRedirection) return true;

      if (alertPageLeave && !isOpenDiscardAlert) {
        setDiscardAlertOpenState(true);
        return false;
      }

      return true;
    },
    [alertPageLeave, isOpenDiscardAlert],
  );

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

  const handleFocus = React.useCallback(() => {
    setTitleFocusState(true);
  }, []);
  const handleBlur = React.useCallback(() => {
    setTitleFocusState(false);
  }, []);

  const handleEditorFocus = React.useCallback(() => {
    setEditorFocusState(true);
  }, []);
  const handleEditorBlur = React.useCallback(() => {
    setEditorFocusState(false);
  }, []);

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

  const handleClickTagSetButton = React.useCallback(() => {
    refFilterDialog.current?.open();
  }, []);

  const handleFilterDialogResetClick = React.useCallback(() => {
    setSelectedTagItems([]);
  }, []);
  const handleFilterDialogApplyClick = React.useCallback(
    (option: IFilterOption) => {
      setSelectedTagItems([...option.selectedTags]);
      refFilterDialog.current?.close();
    },
    [],
  );
  const handleFilterDialogClose = React.useCallback((option: IFilterOption) => {
    setSelectedTagItems([...option.selectedTags]);
  }, []);

  const handleTitleKeyDown: React.KeyboardEventHandler = React.useCallback(
    e => {
      const ctrlKey = e.ctrlKey || e.metaKey;
      if (
        !ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        e.keyCode === keycode("tab")
      ) {
        refEditor.current?.focus();
      }
    },
    [refEditor],
  );

  const handleChangeTitle = React.useCallback(
    (value: string) => {
      const trimmedText = value.trimLeft();
      setTitle(trimmedText);
      onChange({ title: trimmedText });
      refDisablePageLeaveAlert.current = title === trimmedText;
    },
    [title, onChange],
  );

  const handleTitleMaxLength = React.useCallback(() => {
    window.alert(
      intl.formatMessage({
        id: "input_field_maximum_characters_toast_message",
      }),
    );
  }, [intl]);

  const handleChangeContent = React.useCallback(
    (content: Moim.Blockit.Blocks[]) => {
      const isSameContent = isEqual(content, propContents);
      if (!refOnSaveClicked.current) {
        refDisablePageLeaveAlert.current = isSameContent;
        refContentChanged.current = !isSameContent;
      }

      onChange({
        content,
      });
    },
    [onChange, propContents],
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

  const handleSaveClick = React.useCallback(() => {
    if (!checkTitleIsEmpty()) {
      const allUploadDone = checkUploadDone();
      if (!allUploadDone) {
        openUploadLoadingAlert();
        return;
      }

      refOnSaveClicked.current = true;
      refDisablePageLeaveAlert.current = true;
      refContentChanged.current = false;
      const content = refEditor.current?.getContent() || [];

      selectedTagItems.forEach(tagItem => {
        content.push({
          type: "tagSet",
          setId: tagItem.parentId,
          valueId: tagItem.id,
          content: `${tagItem.set}:${tagItem.value}`,
        });
      });

      onSave({
        title,
        content,
      });

      setTimeout(() => {
        refOnSaveClicked.current = false;
      }, 100);
    }
  }, [
    checkTitleIsEmpty,
    checkUploadDone,
    selectedTagItems,
    onSave,
    title,
    openUploadLoadingAlert,
  ]);

  const handleDiscardAlertPositiveClick = React.useCallback(() => {
    refDisablePageLeaveAlert.current = true;
    refContentChanged.current = false;

    refEditor.current?.clear();
    if (nextLocation) {
      redirect(nextLocation);
      setNextLocation(null);
    } else {
      onDiscard();
    }
  }, [redirect, nextLocation, onDiscard]);

  const handleDiscardAlertClose = React.useCallback(() => {
    setDiscardAlertOpenState(false);
    setNextLocation(null);
  }, []);

  const handleDiscardClick = React.useCallback(() => {
    if (canSave || hasContent) {
      setDiscardAlertOpenState(true);
    } else {
      handleDiscardAlertPositiveClick();
    }
  }, [canSave, hasContent, handleDiscardAlertPositiveClick]);

  const handleSaveDraft = React.useCallback(() => {
    if (!checkTitleIsEmpty()) {
      const allUploadDone = checkUploadDone();
      if (!allUploadDone) {
        openUploadLoadingAlert();
        return;
      }
      refDisablePageLeaveAlert.current = true;
      refContentChanged.current = false;

      const content = refEditor.current?.getContent() || [];
      selectedTagItems.forEach(tagItem => {
        content.push({
          type: "tagSet",
          setId: tagItem.parentId,
          valueId: tagItem.id,
          content: `${tagItem.set}:${tagItem.value}`,
        });
      });

      onSaveDraft({
        title,
        content,
      });
    }
  }, [
    checkTitleIsEmpty,
    checkUploadDone,
    onSaveDraft,
    openUploadLoadingAlert,
    selectedTagItems,
    title,
  ]);

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

  const handleClickCreateMeeting = React.useCallback(() => {
    dispatchOpenCreateMeetingDialog();
  }, [dispatchOpenCreateMeetingDialog]);

  const handleProductSelectSaveClick = React.useCallback(
    (productIds: Moim.Id[]) => {
      refEditor.current?.addEmbedProduct(productIds);
      closeProductSelectDialog();
    },
    [],
  );

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  React.useEffect(() => {
    setTitle(propTitle);
  }, [propTitle]);

  React.useEffect(() => {
    if (scrollDirection === "up") {
      setTimeout(() => {
        setScrollDirection("down");
      }, 500);
    }
  }, [scrollDirection]);
  React.useLayoutEffect(() => {
    if (hasError) {
      refContainer.current?.blur();
    }
  }, [hasError]);

  React.useEffect(() => {
    if (preLinkMeeting) {
      refEditor.current?.prependPreLinkMeeting(
        preLinkMeeting.id,
        preLinkMeeting.name,
      );
    }
  }, [preLinkMeeting]);

  React.useEffect(() => {
    refDisablePageLeaveAlert.current = true;
    refContentChanged.current = false;
    refOnSaveClicked.current = false;
  }, [id]);

  return {
    ...props,
    title,
    refEditor,
    refContainer,
    refTagSetButton,
    refFilterDialog,
    titleHasFocus,
    editorHasFocus,
    isMobile,
    canSave,
    scrollTop,
    scrollDirection,
    isOpenEmojiPopover,
    isOpenDiscardAlert,
    isDragOver,
    emojiAnchor,
    selectedTagItems,
    leaveMessage,
    handleFocus,
    handleBlur,
    handleEditorFocus,
    handleEditorBlur,
    addMention,
    addFile,
    addImageFile,
    addLink,
    alertPageLeave,
    isOpenProductSelectDialog,
    openProductSelectDialog,
    closeProductSelectDialog,
    hasCreateMeetingPermission,
    currentCursorFormat,
    setCurrentCursorFormat,
    isUploadLoadingAlert,
    openUploadLoadingAlert,
    closeUploadLoadingAlert,
    canEmbedProduct,
    handleOpenEmojiPopover,
    handleCloseEmojiPopover,
    handleSelectEmoji,
    handleChangeTitle,
    handleChangeContent,
    handleTitleKeyDown,
    handleTitleMaxLength,
    handleSaveClick,
    handleDiscardClick,
    handleDiscardAlertPositiveClick,
    handleDiscardAlertClose,
    cancelDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleScroll,
    handleClickTagSetButton,
    handleFilterDialogResetClick,
    handleFilterDialogApplyClick,
    handleFilterDialogClose,
    handleSaveDraft,
    handleClickCreateMeeting,
    handleProductSelectSaveClick,
  };
}
