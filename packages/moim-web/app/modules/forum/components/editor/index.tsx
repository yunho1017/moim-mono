import * as React from "react";
import { Prompt } from "react-router-dom";
import Popper from "@material-ui/core/Popper";
import ProductSelectDialog from "common/components/productSelectDialog";
// import CreateMeetingIcon from "@icon/24-video-chat.svg";
import { TopBannerContext } from "common/components/topBanner/context";
// components
import RichEditor from "common/components/blockitEditorBase";
import DragHere from "common/components/richEditor/components/dragHere";
import EmojiPopover from "common/components/emojiPopover";
import FilterDialog from "app/modules/forum/components/forumThreadList/components/filterBox/components/filterDialog";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import DiscardAlertDialog from "./components/discardAlertDialog";
import UploadLoadingDialog from "./components/uploadLoadingDialog";
import HeaderBar from "./components/headerBar";
import TagItemList from "./components/tagItemList";
import {
  RootWrapper,
  Container,
  TitleWrapper,
  TitleInput,
  ToolBoxContainer,
  ToolBox,
  ResponsiveWrapper,
  EditorContainer,
  EditorWrapper,
  EditorInnerBottomSpacer,
  HandleButton,
  SelectedTagsCountBadge,
  FileAttachmentIcon,
  ImageFileAttachmentIcon,
  MentionIcon,
  EmojiIcon,
  TagSetIcon,
  ProductEmbedIcon,
} from "./styledComponents";
import MarkButton from "./components/markButtons";
import { DefaultDivider } from "common/components/divider";
import { Spacer } from "common/components/designSystem/spacer";

import { useProps, IProps, IRef } from "./useHook";

const MAX_TITLE_LENGTH = 300;

const ForumEditor = React.forwardRef<IRef, IProps>((props, ref) => {
  const {
    id,
    refEditor,
    refContainer,
    refTagSetButton,
    refFilterDialog,
    hasError,
    scrollTop,
    scrollDirection,
    title,
    contents,
    titlePlaceholder,
    contentPlaceholder,
    titleHasFocus,
    emojiAnchor,
    leaveMessage,
    isOpenEmojiPopover,
    isOpenDiscardAlert,
    isPosting,
    isDragOver,
    isModal,
    isDraftSaving,
    isDraftPost,
    visibleDraftButton,
    isNewPost,
    isMobile,
    canSave,
    tagSets,
    selectedTagItems,
    isUploadLoadingAlert,
    closeUploadLoadingAlert,
    handleFocus,
    handleBlur,
    handleEditorFocus,
    handleEditorBlur,
    addMention,
    addFile,
    addImageFile,
    addLink,
    alertPageLeave,
    currentCursorFormat,
    setCurrentCursorFormat,
    draftCount,
    handleChangeContent,
    handleOpenEmojiPopover,
    handleCloseEmojiPopover,
    handleSelectEmoji,
    handleTitleKeyDown,
    handleTitleMaxLength,
    handleChangeTitle,
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
    handleProductSelectSaveClick,
    onOpenDraftList,
    isOpenProductSelectDialog,
    openProductSelectDialog,
    closeProductSelectDialog,
    canEmbedProduct,
  } = useProps(props);
  const [, setTopBannerContext] = React.useContext(TopBannerContext);

  React.useImperativeHandle(ref, () => ({ refEditor: refEditor.current }));

  const selectedTagItemIds = React.useMemo(
    () => selectedTagItems.map(item => item.id),
    [selectedTagItems],
  );

  const toolElement = React.useMemo(
    () => (
      <ToolBoxContainer scrollTop={scrollTop} scrollDirection={scrollDirection}>
        <ToolBox id={`${id}_toolbar`} visible={!titleHasFocus}>
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
          {canEmbedProduct && (
            <HandleButton>
              <ProductEmbedIcon
                size="s"
                role="button"
                onClick={openProductSelectDialog}
              />
            </HandleButton>
          )}

          {/* {hasCreateMeetingPermission && (
            <HandleButton
              className="ql-create-meeting"
              onClick={handleClickCreateMeeting}
            >
              <CreateMeetingIcon size="s" />
            </HandleButton>
          )} */}

          {tagSets.length > 0 ? (
            <HandleButton ref={refTagSetButton}>
              <TagSetIcon
                size="s"
                role="button"
                onClick={handleClickTagSetButton}
              />
              <Popper
                open={!titleHasFocus && Boolean(selectedTagItems.length)}
                disablePortal={true}
                anchorEl={refTagSetButton.current}
                placement="right"
              >
                <SelectedTagsCountBadge>
                  {selectedTagItems.length}
                </SelectedTagsCountBadge>
              </Popper>
            </HandleButton>
          ) : null}
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
      emojiAnchor,
      handleClickTagSetButton,
      handleOpenEmojiPopover,
      id,
      canEmbedProduct,
      openProductSelectDialog,
      refTagSetButton,
      scrollDirection,
      scrollTop,
      selectedTagItems.length,
      tagSets.length,
      titleHasFocus,
    ],
  );

  React.useLayoutEffect(() => {
    if (isMobile) {
      setTopBannerContext(state => ({
        ...state,
        forceHidden: true,
      }));

      return () => {
        setTopBannerContext(state => ({
          ...state,
          forceHidden: false,
        }));
      };
    }
  }, [isMobile, setTopBannerContext]);

  return (
    <RootWrapper
      onDragEnter={cancelDragEnter}
      onDragOver={handleDragOver}
      onDragExit={handleDragLeave}
      onDrop={handleDrop}
    >
      <Prompt when={alertPageLeave} message={leaveMessage} />
      <HeaderBar
        isPosting={isPosting}
        isNewPost={isNewPost}
        isDraftPost={isDraftPost}
        isDraftSaving={isDraftSaving}
        canSave={canSave}
        draftCount={draftCount}
        visibleDraftButton={visibleDraftButton}
        contentStickyPosition={scrollTop}
        contentScrollDirection={scrollDirection}
        onSave={handleSaveClick}
        onDiscard={handleDiscardClick}
        onSaveDraft={handleSaveDraft}
        onOpenDraftList={onOpenDraftList}
      />

      <DragHere visible={isDragOver} onDragLeave={handleDragLeave} />
      <ResponsiveWrapper>
        <Container>
          {isMobile ? (
            <TopNaviPortalContainer>{toolElement}</TopNaviPortalContainer>
          ) : (
            toolElement
          )}
          <EditorContainer
            ref={refContainer}
            isModal={isModal}
            onScroll={handleScroll}
          >
            <TitleWrapper>
              <TitleInput
                autoFocus={!hasError}
                value={title}
                placeholder={titlePlaceholder}
                onChange={handleChangeTitle}
                onKeyDown={handleTitleKeyDown}
                maxLength={MAX_TITLE_LENGTH}
                onMaxLength={handleTitleMaxLength}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </TitleWrapper>
            <Spacer value={16} />
            <DefaultDivider />
            <Spacer value={8} />
            <EditorWrapper>
              <EditorInnerBottomSpacer>
                <RichEditor
                  id={id}
                  ref={refEditor}
                  readonly={false}
                  contents={contents}
                  placeholder={contentPlaceholder}
                  onChange={handleChangeContent}
                  onFocus={handleEditorFocus}
                  onBlur={handleEditorBlur}
                  onChangeCursorFormat={setCurrentCursorFormat}
                />
                <TagItemList
                  readonly={true}
                  tagSets={tagSets}
                  tagItems={selectedTagItems}
                />
              </EditorInnerBottomSpacer>
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
      <DiscardAlertDialog
        open={isOpenDiscardAlert}
        onPositiveClick={handleDiscardAlertPositiveClick}
        onNegativeClick={handleDiscardAlertClose}
        onClose={handleDiscardAlertClose}
      />
      <UploadLoadingDialog
        open={isUploadLoadingAlert}
        onPositiveClick={closeUploadLoadingAlert}
        onClose={closeUploadLoadingAlert}
      />
      <FilterDialog
        ref={refFilterDialog}
        tagSet={tagSets}
        selectedTagItems={selectedTagItemIds}
        enableTagSetFilterOnly={true}
        onResetClick={handleFilterDialogResetClick}
        onApplyClick={handleFilterDialogApplyClick}
        onClose={handleFilterDialogClose}
      />
      <ProductSelectDialog
        open={isOpenProductSelectDialog}
        onSaveClick={handleProductSelectSaveClick}
        onCancelClick={closeProductSelectDialog}
      />
    </RootWrapper>
  );
});

export default ForumEditor;
export { IRef };
