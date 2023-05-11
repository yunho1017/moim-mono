import * as React from "react";
import Popper from "@material-ui/core/Popper";
import { BaseEmoji } from "emoji-mart";
import EmojiPopover from "common/components/emojiPopover";
import ProductSelectDialog from "common/components/productSelectDialog";
import { IRefHandler as IEditorRef } from "common/components/blockitEditorBase";
import FilterDialog, {
  IFilterOption,
  IRefHandler as IFilterDialogRefHandler,
} from "app/modules/forum/components/forumThreadList/components/filterBox/components/filterDialog";
import DownloadableCouponSelectDialog from "common/components/downloadableCouponSelectDialog";
import { getTagByIds } from "app/selectors/tagSet";
import { useStoreState } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { FONT_SIZE_ALIAS_OPTIONS, IFontSizeOption } from "./constants";
import ChipSelection from "common/components/designSystem/selection/base/chip";
import MarkButtons from "./markButtons";
import { FontColorPicker, BackgroundColorPicker } from "./colorPicker";
import {
  Wrapper,
  Sep,
  HandleButton,
  FileAttachmentIcon,
  ImageFileAttachmentIcon,
  DownloadableCouponIcon,
  MentionIcon,
  EmojiIcon,
  TagSetIcon,
  SelectedTagsCountBadge,
  ProductEmbedIcon,
  FontSizeWrapper,
  SelectOptionContainer,
  InlineCodeIcon,
  FontSizeOption,
  FontSizeInnerWrapperStyle,
} from "./styled";

interface IProps {
  id: Moim.Id;
  tagSets: Moim.TagSet.ITagSet[];
  selectedTagSetItemIds: Moim.Id[];
  inactive: boolean;
  currentCursorFormat: Record<string, any>;
  editorRef: React.RefObject<IEditorRef>;
  disableMention?: boolean;
  onChangeTagItem(tagItem: Moim.TagSet.ITagItem[]): void;
}

const TopToolbar: React.FC<IProps> = ({
  id,
  tagSets,
  selectedTagSetItemIds,
  inactive,
  currentCursorFormat,
  editorRef,
  disableMention,
  onChangeTagItem,
}) => {
  const currentGroup = useCurrentGroup();
  const emojiAnchor = React.useRef(null);
  const refTagSetButton = React.useRef<HTMLButtonElement>(null);
  const refFilterDialog = React.useRef<IFilterDialogRefHandler>(null);
  const [isOpenEmojiPopover, setEmojiOpenState] = React.useState(false);

  const {
    isOpen: isOpenProductSelectDialog,
    open: openProductSelectDialog,
    close: closeProductSelectDialog,
  } = useOpenState(false);
  const {
    isOpen: isOpenDownloadableCouponSelectDialog,
    open: openDownloadableCouponSelectDialog,
    close: closeDownloadableCouponSelectDialog,
  } = useOpenState(false);

  const selectedTagSetItemEntities = useStoreState(
    state =>
      getTagByIds(state, selectedTagSetItemIds) as Moim.TagSet.ITagItem[],
  );

  const [selectedTagItems, setSelectedTagItems] = React.useState<
    Moim.TagSet.ITagItem[]
  >(selectedTagSetItemEntities);

  const hasHubSeller = React.useMemo(() => Boolean(currentGroup?.seller_id), [
    currentGroup?.seller_id,
  ]);

  const handleOpenEmojiPopover = React.useCallback(() => {
    setEmojiOpenState(true);
  }, []);
  const handleCloseEmojiPopover = React.useCallback(() => {
    setEmojiOpenState(false);
    editorRef.current?.focus();
  }, []);

  const handleSelectEmoji = React.useCallback(
    (emoji: BaseEmoji) => {
      handleCloseEmojiPopover();
      editorRef.current?.addEmoji(emoji);
    },
    [handleCloseEmojiPopover],
  );

  const handleClickTagSetButton = React.useCallback(() => {
    refFilterDialog.current?.open();
  }, []);

  const selectedTagItemIds = React.useMemo(
    () => selectedTagItems.map(item => item.id),
    [selectedTagItems],
  );

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

  const handleProductSelectSaveClick = React.useCallback(
    (productIds: Moim.Id[]) => {
      editorRef.current?.addEmbedProduct(productIds);
      closeProductSelectDialog();
    },
    [],
  );

  const handleDownloadableCouponDialogSaveClick = React.useCallback(
    (ids: Moim.Id[]) => {
      editorRef.current?.addDownloadCoupon(ids);
      closeDownloadableCouponSelectDialog();
    },
    [],
  );

  const addMention = React.useCallback(() => {
    editorRef.current?.addMention();
  }, [editorRef]);
  const addFile = React.useCallback(() => {
    editorRef.current?.addFiles();
  }, [editorRef]);
  const addImageFile = React.useCallback(() => {
    editorRef.current?.addImageFiles();
  }, [editorRef]);
  const addLink = React.useCallback(() => {
    editorRef.current?.addLink();
  }, [editorRef]);

  const handleChangeFontSize = React.useCallback(
    (index: number) => {
      editorRef.current?.updateTextFormat({
        fontSize: FONT_SIZE_ALIAS_OPTIONS[index].value,
      });
    },
    [editorRef],
  );

  const selectedFontSizeOptionIndex: number = React.useMemo(() => {
    const fontSizeAlias = currentCursorFormat.fontSize ?? "16";
    return FONT_SIZE_ALIAS_OPTIONS.findIndex(
      opt => opt.value === fontSizeAlias,
    );
  }, [currentCursorFormat.fontSize]);

  const handleChangeFontColor = React.useCallback(
    (color: string) => {
      editorRef.current?.updateTextFormat({
        color,
      });
    },
    [editorRef],
  );

  const handleChangeBackgroundColor = React.useCallback(
    (color: string) => {
      editorRef.current?.updateTextFormat({
        background: color,
      });
    },
    [editorRef],
  );

  const handleEditorFocus = React.useCallback(() => {
    editorRef.current?.focus();
  }, []);

  React.useEffect(() => {
    setSelectedTagItems(selectedTagSetItemEntities);
  }, [selectedTagSetItemEntities]);

  React.useEffect(() => {
    onChangeTagItem(selectedTagItems);
  }, [selectedTagItems]);

  return (
    <>
      <Wrapper id={`${id}_toolbar`} inactive={inactive}>
        {/* NOTE: Temporary disable
        import Texts from "common/components/blockitEditorBase/components/blockitRenderer/components/texts";
        <ChipSelection
          size="s"
          id="font-style-selector"
          key="font-style-selector"
          className="ql-fontStyle"
          disabled={inactive}
          placeholder="Font style"
          initialSelectOptionPosition={selectedFontStyleOptionIndex}
          options={FONT_STYLE_ALIAS_OPTIONS}
          overrideWrapperStyle={FontStyleWrapper}
          alwaysShowDownArrow={true}
          onChangeSelect={handleChangeFontStyle}
        >
          {(option: IFontStyleOption) => (
            <SelectFontStyleOptionContainer>
              <Texts
                key={`option_${option.value}`}
                fontStyle={option.value}
                content={option.label}
              />
            </SelectFontStyleOptionContainer>
          )}
        </ChipSelection> */}

        <ChipSelection
          size="s"
          id="font-size-selector"
          key="font-size-selector"
          className="ql-fSize"
          disabled={inactive}
          placeholder="Font size"
          initialSelectOptionPosition={selectedFontSizeOptionIndex}
          options={FONT_SIZE_ALIAS_OPTIONS}
          overrideWrapperStyle={FontSizeWrapper}
          overrideInnerWrapperStyle={FontSizeInnerWrapperStyle}
          onChangeSelect={handleChangeFontSize}
          onOpenOption={handleEditorFocus}
          onCloseOption={handleEditorFocus}
        >
          {(option: IFontSizeOption) => (
            <SelectOptionContainer>
              <FontSizeOption key={`option_${option.value}`}>
                {option.label}
              </FontSizeOption>
            </SelectOptionContainer>
          )}
        </ChipSelection>

        <Sep />

        <HandleButton
          className="ql-bold"
          isActive={Boolean(currentCursorFormat.bold) && !inactive}
        >
          <MarkButtons
            type="bold"
            touch={30}
            isActive={Boolean(currentCursorFormat.bold)}
            disabled={inactive}
          />
        </HandleButton>
        <HandleButton
          className="ql-italic"
          isActive={Boolean(currentCursorFormat.italic) && !inactive}
        >
          <MarkButtons
            type="italic"
            touch={30}
            isActive={Boolean(currentCursorFormat.italic)}
            disabled={inactive}
          />
        </HandleButton>

        <FontColorPicker
          key="tool-font-color"
          className="ql-fontColor"
          color={currentCursorFormat.color}
          disabled={inactive || currentCursorFormat.code}
          onEditorFocus={handleEditorFocus}
          onChangeColor={handleChangeFontColor}
        />

        <BackgroundColorPicker
          key="tool-bg-color"
          className="ql-bgColor"
          color={currentCursorFormat.background}
          disabled={inactive || currentCursorFormat.code}
          onEditorFocus={handleEditorFocus}
          onChangeColor={handleChangeBackgroundColor}
        />

        <Sep />

        <HandleButton
          className="ql-add-code"
          isActive={Boolean(currentCursorFormat.code) && !inactive}
        >
          <InlineCodeIcon
            role="button"
            inactive={inactive}
            isActive={Boolean(currentCursorFormat.code) && !inactive}
          />
        </HandleButton>

        <HandleButton
          className="ql-add-link"
          isActive={Boolean(currentCursorFormat.link) && !inactive}
          onClick={addLink}
        >
          <MarkButtons
            type="link"
            touch={30}
            isActive={Boolean(currentCursorFormat.link)}
            disabled={inactive}
          />
        </HandleButton>

        <Sep />

        <HandleButton
          inactive={inactive}
          title="파일첨부(CTRL or ⌘ + U)"
          onClick={addFile}
        >
          <FileAttachmentIcon role="button" inactive={inactive} />
        </HandleButton>

        <HandleButton inactive={inactive} onClick={addImageFile}>
          <ImageFileAttachmentIcon role="button" inactive={inactive} />
        </HandleButton>
        {!disableMention && (
          <HandleButton
            inactive={inactive}
            title="유저멘션"
            onClick={addMention}
          >
            <MentionIcon role="button" inactive={inactive} />
          </HandleButton>
        )}
        <HandleButton
          inactive={inactive}
          ref={emojiAnchor}
          onClick={handleOpenEmojiPopover}
        >
          <EmojiIcon role="button" inactive={inactive} />
        </HandleButton>

        {hasHubSeller && (
          <HandleButton inactive={inactive} onClick={openProductSelectDialog}>
            <ProductEmbedIcon role="button" inactive={inactive} />
          </HandleButton>
        )}
        {hasHubSeller && (
          <HandleButton
            inactive={inactive}
            onClick={openDownloadableCouponSelectDialog}
          >
            <DownloadableCouponIcon role="button" inactive={inactive} />
          </HandleButton>
        )}

        {tagSets.length > 0 ? (
          <HandleButton
            inactive={inactive}
            ref={refTagSetButton}
            onClick={handleClickTagSetButton}
          >
            <TagSetIcon role="button" inactive={inactive} />
            <Popper
              open={Boolean(selectedTagItems.length)}
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
      </Wrapper>
      <EmojiPopover
        anchorElement={emojiAnchor.current}
        open={isOpenEmojiPopover}
        onSelected={handleSelectEmoji}
        onClose={handleCloseEmojiPopover}
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
      <DownloadableCouponSelectDialog
        open={isOpenDownloadableCouponSelectDialog}
        onSaveClick={handleDownloadableCouponDialogSaveClick}
        onCancelClick={closeDownloadableCouponSelectDialog}
      />
    </>
  );
};

export default React.memo(TopToolbar);
