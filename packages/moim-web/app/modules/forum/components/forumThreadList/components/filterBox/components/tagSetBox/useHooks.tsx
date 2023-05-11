import * as React from "react";
import { ILabel } from "common/components/horizontalLabelList";
import {
  IRefHandler as IFilterDialogRefHandler,
  IFilterOption,
} from "../filterDialog";
import { IProps } from ".";
import { useStoreState } from "app/store";

export function useProps(props: IProps) {
  const { tagSets, selectedTagSetItems } = props;
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refFilterDialog = React.useRef<IFilterDialogRefHandler>(null);
  const [clickedTagSet, setClickedTagSet] = React.useState<Moim.Id>("");
  const [open, setOpen] = React.useState<{
    status: boolean;
    anchor: HTMLElement | null | undefined;
  }>({ status: false, anchor: null });
  const [renderTagItems, setRenderTagItems] = React.useState<
    Moim.TagSet.ITagItem[]
  >([]);
  const [selectedLabels, setSelectedLabels] = React.useState<ILabel[]>([]);
  const [selectedTagItems, setSelectedTagItems] = React.useState<
    Moim.TagSet.ITagItem[]
  >(selectedTagSetItems);
  const tagsetEntities = useStoreState(state => state.entities.tagset);

  const isSingleTagSet = React.useMemo(() => tagSets.length === 1, [tagSets]);

  const getTagSetItems = React.useCallback(
    (ids: Moim.Id[]) =>
      ids.map(id => tagsetEntities[id] ?? undefined).filter(i => Boolean(i)),
    [tagsetEntities],
  );

  const labels = React.useMemo(() => {
    let tagSetLabels: ILabel[] = [];
    if (isSingleTagSet) {
      tagSetLabels =
        (getTagSetItems(tagSets[0].items ?? []) as Moim.TagSet.ITagItem[]).map(
          set => ({
            id: set.id,
            text: set.value,
            priority: parseInt(set.sortKey, 10),
            selectedTagsCount: 0,
          }),
        ) ?? [];
      setSelectedLabels(
        tagSetLabels.filter(label =>
          selectedTagItems.find(item => item.id === label.id),
        ),
      );
    } else {
      tagSetLabels = tagSets.map(set => ({
        id: set.id,
        text: set.set,
        priority: parseInt(set.sortKey, 10),
        selectedTagsCount: selectedTagItems.filter(
          item => item.parentId === set.id,
        ).length,
      }));
      setSelectedLabels(
        tagSetLabels.filter(label => label.selectedTagsCount > 0),
      );
    }

    return tagSetLabels;
  }, [getTagSetItems, isSingleTagSet, selectedTagItems, tagSets]);

  const popoverPosition = React.useMemo(() => {
    const anchorRect = open.anchor?.getBoundingClientRect() || {
      top: 0,
      height: 0,
    };
    return {
      top: anchorRect.top + anchorRect.height,
      left: refContainer.current?.getBoundingClientRect().left || 0,
    };
  }, [open.anchor, refContainer]);

  return {
    ...props,
    getTagSetItems,
    refContainer,
    refFilterDialog,
    isSingleTagSet,
    clickedTagSet,
    labels,
    popoverPosition,
    open,
    setOpen,
    renderTagItems,
    setRenderTagItems,
    selectedLabels,
    setSelectedLabels,
    selectedTagItems,
    setSelectedTagItems,
    setClickedTagSet,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    getTagSetItems,
    refFilterDialog,
    isSingleTagSet,
    tagSets,
    labels,
    selectedTagItems,
    selectedLabels,
    setOpen,
    setSelectedLabels,
    setSelectedTagItems,
    setClickedTagSet,
    setRenderTagItems,
    onChangeSelectedTags,
  } = props;

  const handleOpenDialog = React.useCallback(() => {
    setClickedTagSet("");
    refFilterDialog.current?.open();
  }, [refFilterDialog, setClickedTagSet]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDialogEmptyClick = React.useCallback(() => {}, []);

  const handleDialogApplyClick = React.useCallback(
    (option: IFilterOption) => {
      onChangeSelectedTags(option);
      refFilterDialog.current?.close();
    },
    [onChangeSelectedTags, refFilterDialog],
  );

  const handleMenuClose = React.useCallback(() => {
    setOpen({
      status: false,
      anchor: null,
    });
  }, [setOpen]);

  const handleClickSingleTagItem = React.useCallback(
    (label: ILabel) => {
      const parentTagSetItems: Moim.Id[] = tagSets[0].items ?? [];
      const newLabels = selectedLabels.find(item => item.id === label.id)
        ? selectedLabels.filter(item => item.id !== label.id)
        : selectedLabels.concat([label]);
      const selectedTagItemIds = parentTagSetItems.filter(itemId =>
        newLabels.find(x => x.id === itemId),
      );

      const tagItems = getTagSetItems(
        selectedTagItemIds,
      ) as Moim.TagSet.ITagItem[];

      setSelectedLabels(newLabels);
      setSelectedTagItems(tagItems);
      onChangeSelectedTags({
        selectedTags: tagItems,
      });
    },
    [
      getTagSetItems,
      onChangeSelectedTags,
      selectedLabels,
      setSelectedLabels,
      setSelectedTagItems,
      tagSets,
    ],
  );

  const handleClickTagChip = React.useCallback(
    (tagItem: Moim.TagSet.ITagItem) => {
      const targetTagSetId = tagItem.parentId;
      const newTagItems = selectedTagItems.filter(
        item =>
          item.parentId !== targetTagSetId ||
          (item.parentId === targetTagSetId && item.id !== tagItem.id),
      );
      if (!selectedTagItems.find(item => item.id === tagItem.id)) {
        newTagItems.push(tagItem);
      }
      if (newTagItems.length > 10) return;

      const selectedSets = newTagItems.reduce(
        (sets: Moim.Id, item: Moim.TagSet.ITagItem) => {
          if (sets.includes(item.parentId)) {
            return sets;
          } else {
            return [...sets, item.parentId];
          }
        },
        [],
      );
      setSelectedLabels(
        labels.filter(label => selectedSets.includes(label.id)),
      );
      setSelectedTagItems(newTagItems);
      onChangeSelectedTags({
        selectedTags: newTagItems,
      });
    },
    [
      labels,
      onChangeSelectedTags,
      selectedTagItems,
      setSelectedLabels,
      setSelectedTagItems,
    ],
  );

  const handleLabelClick = React.useCallback(
    (label: ILabel, e) => {
      if (isSingleTagSet) {
        handleClickSingleTagItem(label);
      } else {
        setRenderTagItems(
          getTagSetItems(
            tagSets.find(set => set.id === label.id)?.items ?? [],
          ) as Moim.TagSet.ITagItem[],
        );

        setOpen({
          status: true,
          anchor: e.currentTarget,
        });
      }
    },
    [
      getTagSetItems,
      handleClickSingleTagItem,
      isSingleTagSet,
      setOpen,
      setRenderTagItems,
      tagSets,
    ],
  );

  return {
    ...props,
    handleOpenDialog,
    handleDialogEmptyClick,
    handleDialogApplyClick,
    handleLabelClick,
    handleMenuClose,
    handleClickTagChip,
  };
}
