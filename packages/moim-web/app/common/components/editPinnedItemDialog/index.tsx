import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DynamicHeightResponsiveDialog } from "common/components/modalLayout";
import { H8Bold } from "common/components/designSystem/typos";
import Droppable from "common/components/dragAndDrop/droppable";
import { CloseButton, NextButton, Wrapper } from "./styled";
import PinnedItem from "./item";
import { DefaultLoader as Loader } from "common/components/loading";
import Empty from "./empty";

import useForumProps from "./hooks/useForum";

export { useForumProps };

const MAIN_DROPPABLE_ID = "MAIN_DROPPABLE_ID";

export interface PinnedItemType {
  id: Moim.Id;
  title: Moim.Id;
}

interface IProps {
  open: boolean;
  isActive: boolean;
  pinnedItems: PinnedItemType[];
  isLoading: boolean;
  isLoadingGetPinnedPostList: boolean | undefined;
  onSave(pinned: PinnedItemType[]): void;
  onClose(): void;
}

export default function EditPinnedPostDialog({
  open,
  isActive,
  isLoading,
  isLoadingGetPinnedPostList,
  pinnedItems: pinnedItemsBase,
  onSave,
  onClose,
}: IProps) {
  const [pinnedItems, setPinnedItems] = React.useState<PinnedItemType[]>([]);
  const [unPinnedItems, setUnPinnedItems] = React.useState<Moim.Id[]>([]);
  const handleDragEnd = React.useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination) {
        return;
      }

      const newChannels = [...pinnedItems];

      const [removed] = newChannels.splice(source.index, 1);
      newChannels.splice(destination.index, 0, removed);

      setPinnedItems(newChannels);
    },
    [pinnedItems],
  );

  const handleClose = React.useCallback(() => {
    onClose();
    setUnPinnedItems([]);
    setPinnedItems([]);
  }, [onClose]);

  const handleSave = React.useCallback(async () => {
    await onSave(pinnedItems.filter(item => !unPinnedItems.includes(item.id)));
    handleClose();
  }, [handleClose, onSave, pinnedItems, unPinnedItems]);

  const handlePin = React.useCallback(
    (id: Moim.Id) => {
      setUnPinnedItems(unPinnedItems.filter(item => item !== id));
    },
    [unPinnedItems],
  );

  const handleUnPin = React.useCallback(
    (id: Moim.Id) => {
      setUnPinnedItems([...unPinnedItems, id]);
    },
    [unPinnedItems],
  );

  React.useEffect(() => {
    if (open) {
      setPinnedItems(pinnedItemsBase);
    }
  }, [open]);

  const contentsElement = React.useMemo(() => {
    if (
      isLoadingGetPinnedPostList ||
      isLoadingGetPinnedPostList === undefined
    ) {
      return <Loader />;
    }

    if (!isLoadingGetPinnedPostList && pinnedItems.length === 0) {
      return <Empty />;
    }
    return (
      <Wrapper>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={MAIN_DROPPABLE_ID}>
            {pinnedItems.map(({ id, title }, index) => {
              const unPinned = unPinnedItems.includes(id);

              return (
                <PinnedItem
                  key={id}
                  id={id}
                  index={index}
                  title={title}
                  pinned={!unPinned}
                  onPin={handlePin}
                  onUnPin={handleUnPin}
                />
              );
            })}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    );
  }, [
    handleDragEnd,
    handlePin,
    handleUnPin,
    isLoadingGetPinnedPostList,
    pinnedItems,
    unPinnedItems,
  ]);

  return (
    <DynamicHeightResponsiveDialog
      open={open}
      onCloseRequest={handleClose}
      titleElement={
        <H8Bold>
          <FormattedMessage id="pinned_post_page_title" />
        </H8Bold>
      }
      leftButton={<CloseButton onClick={handleClose} />}
      rightButton={
        <NextButton
          onClick={handleSave}
          isActive={isActive}
          isLoading={isLoading}
        >
          <FormattedMessage id="save_button" />
        </NextButton>
      }
      titleAlignment="Center"
      useBottomSheetHeader={true}
    >
      {contentsElement}
    </DynamicHeightResponsiveDialog>
  );
}
