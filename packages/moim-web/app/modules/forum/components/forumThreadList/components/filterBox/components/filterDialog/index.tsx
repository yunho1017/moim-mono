import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
// components
import ResponsiveDialog from "common/components/responsiveDialog";
import { useStoreState } from "app/store";
import TagSet, {
  IRefHandler as ITagSetRefHandler,
  onChangeSelectedTagType,
} from "../tagSet";

import {
  BOTTOM_SHEET_HEADER_HEIGHT,
  DialogTitleWrapper,
  Title,
  Inner,
  ContentHeader,
  ContentContainer,
  ContentFooter,
  ApplyButton,
  ResetButton,
  MobileResetButton,
  MobileApplyButton,
  TitleDivider,
} from "./styled";

const MAX_TAG_SET_ITEM = 10;

export interface IRefHandler {
  open(): void;
  close(): void;
}

export interface IFilterOption {
  selectedTags: Moim.TagSet.ITagItem[];
}

interface IProps {
  tagSet: Moim.TagSet.ITagSet[];
  selectedTagItems: Moim.Id[];
  titleElement?: React.ReactNode;
  initialOpenTagSets?: Moim.Id[];
  enableTagSetFilter?: boolean;
  enableTagSetFilterOnly?: boolean;
  onResetClick(): void;
  onApplyClick(filterOption: IFilterOption): void;
  onClose(filterOption: IFilterOption): void;
}

const FilterDialog = React.forwardRef<IRefHandler, IProps>(
  (
    {
      tagSet,
      titleElement,
      selectedTagItems,
      enableTagSetFilter = true,
      initialOpenTagSets = [],
      onApplyClick,
      onResetClick,
      onClose,
    },
    ref,
  ) => {
    const tagSetRefs = React.useRef<ITagSetRefHandler[]>([]);
    const [open, setOpen] = React.useState(false);
    const [minHeight, setMinHeight] = React.useState(150);
    const [selectedTags, setSelectedTags] = React.useState<
      Moim.TagSet.ITagItem[]
    >([]);
    const tagEntities = useStoreState(state => state.entities.tagset);

    const handleResetClick = React.useCallback(() => {
      tagSetRefs.current.forEach(refInstance => {
        refInstance?.clear();
      });
      setSelectedTags([]);
      onResetClick();
    }, [onResetClick, tagSetRefs]);

    const handleApplyClick = React.useCallback(() => {
      onApplyClick({
        selectedTags,
      });
    }, [onApplyClick, selectedTags]);

    const handleOpen = React.useCallback(() => {
      setOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
      setOpen(false);
      onClose({
        selectedTags,
      });
    }, [onClose, selectedTags]);

    const handleResize = React.useCallback((_width: number, height: number) => {
      setMinHeight(height + (BOTTOM_SHEET_HEADER_HEIGHT - 5));
    }, []);

    const handleChangeSelectedTag: onChangeSelectedTagType = React.useCallback(
      (type, tagItem) => {
        let newTagItems = [...selectedTags];
        switch (type) {
          case "add": {
            newTagItems.push(tagItem);
            break;
          }
          case "remove": {
            newTagItems = newTagItems.filter(item => item.id !== tagItem.id);
            break;
          }
        }
        if (newTagItems.length > MAX_TAG_SET_ITEM) return;
        setSelectedTags(newTagItems);
      },
      [selectedTags],
    );

    const title = React.useMemo(
      () =>
        titleElement ? (
          titleElement
        ) : (
          <FormattedMessage id="post_list/filter_dialog_title" />
        ),
      [titleElement],
    );

    const createSelectedTagIds = React.useCallback(
      (items?: Moim.Id[]) =>
        items?.filter(tagItemId =>
          Boolean(selectedTags.find(i => i.id === tagItemId)),
        ),
      [selectedTags],
    );

    const tagSetElements = React.useMemo(
      () =>
        tagSet.map((item, idx) => (
          <TagSet
            ref={(instance: ITagSetRefHandler) => {
              tagSetRefs.current[idx] = instance;
            }}
            initialOpen={initialOpenTagSets.includes(item.id)}
            key={item.id}
            tagSet={item}
            currentSelectedTotalTagCount={selectedTags.length}
            maxSelectedTagCount={MAX_TAG_SET_ITEM}
            selectedTags={createSelectedTagIds(item.items)}
            onChangeSelectedTag={handleChangeSelectedTag}
          />
        )),
      [
        tagSet,
        initialOpenTagSets,
        selectedTags.length,
        createSelectedTagIds,
        handleChangeSelectedTag,
      ],
    );

    const tagSetSection = React.useMemo(
      () =>
        enableTagSetFilter && tagSet.length > 0 ? <>{tagSetElements}</> : null,
      [enableTagSetFilter, tagSetElements, tagSet],
    );

    React.useEffect(() => {
      if (open) {
        setSelectedTags(
          tagSet.reduce<Moim.TagSet.ITagItem[]>(
            (items, set) =>
              items.concat(
                (set.items ?? [])
                  .filter(tagItemId => selectedTagItems.includes(tagItemId))
                  .map(id => tagEntities[id] as Moim.TagSet.ITagItem),
              ),
            [],
          ),
        );
      }
    }, [open]);

    React.useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    return (
      <ResponsiveDialog
        open={open}
        minHeight={minHeight}
        titleAlignment="Center"
        titleElement={
          <DialogTitleWrapper>
            <Title>{title}</Title>
          </DialogTitleWrapper>
        }
        bottomSheetHeader={
          <ContentHeader>
            <MobileResetButton
              disabled={!selectedTags.length}
              onClick={handleResetClick}
            >
              <FormattedMessage id="post_list/filter_dialog_reset_button" />
            </MobileResetButton>
            <Title>
              <FormattedMessage id="post_list/filter_dialog_title" />
            </Title>
            <MobileApplyButton onClick={handleApplyClick}>
              <FormattedMessage id="post_list/filter_dialog_apply_button" />
            </MobileApplyButton>
          </ContentHeader>
        }
        onCloseRequest={handleClose}
      >
        <Inner>
          <ReactResizeDetector handleHeight={true} onResize={handleResize}>
            <TitleDivider />
            <ContentContainer>{tagSetSection}</ContentContainer>
            <ContentFooter>
              <ResetButton
                disabled={!selectedTags.length}
                onClick={handleResetClick}
              >
                <FormattedMessage id="post_list/filter_dialog_reset_button" />
              </ResetButton>
              <ApplyButton onClick={handleApplyClick}>
                <FormattedMessage id="post_list/filter_dialog_apply_button" />
              </ApplyButton>
            </ContentFooter>
          </ReactResizeDetector>
        </Inner>
      </ResponsiveDialog>
    );
  },
);

export default FilterDialog;
