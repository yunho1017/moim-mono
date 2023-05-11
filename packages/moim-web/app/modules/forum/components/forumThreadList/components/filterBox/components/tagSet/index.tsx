import * as React from "react";
import TagCollapseBox from "common/components/collapsibleBox/preset/tagCollapseBox";
import { useStoreState } from "app/store";
import { getTagByIds } from "app/selectors/tagSet";

export interface IRefHandler {
  clear(): void;
}

export type ChangeType = "add" | "remove";
export type onChangeSelectedTagType = (
  type: ChangeType,
  item: Moim.TagSet.ITagItem,
  tagItems: Moim.TagSet.ITagItem[],
) => void;

interface IProps {
  tagSet: Moim.TagSet.ITagSet;
  initialOpen?: boolean;
  selectedTags?: Moim.Id[];
  currentSelectedTotalTagCount?: number;
  maxSelectedTagCount?: number;
  onChangeSelectedTag: onChangeSelectedTagType;
}

const TagSet = React.forwardRef<IRefHandler, IProps>(
  (
    {
      tagSet,
      initialOpen,
      selectedTags,
      currentSelectedTotalTagCount,
      maxSelectedTagCount,
      onChangeSelectedTag,
    },
    ref,
  ) => {
    const tagItems = useStoreState(
      state => getTagByIds(state, tagSet.items ?? []) as Moim.TagSet.ITagItem[],
    );
    const [selectedTagIds, setSelectedTagIds] = React.useState<Moim.Id[]>(
      selectedTags ?? [],
    );
    const [open] = React.useState(
      initialOpen || Boolean(selectedTagIds?.length),
    );

    const handleClickItem = React.useCallback(
      (tagItem: Moim.TagSet.ITagItem) => {
        let type: ChangeType = "add";
        let newArray: Moim.Id[] = Array.from(
          new Set(selectedTagIds.concat([tagItem.id])),
        );
        if (selectedTagIds.includes(tagItem.id)) {
          type = "remove";
          newArray = selectedTagIds.filter(id => id !== tagItem.id);
        }

        if (
          currentSelectedTotalTagCount !== undefined &&
          maxSelectedTagCount !== undefined
        ) {
          const newSelectedCount =
            type === "add"
              ? currentSelectedTotalTagCount + 1
              : currentSelectedTotalTagCount;
          if (newSelectedCount > maxSelectedTagCount) {
            return;
          }
          onChangeSelectedTag(
            type,
            tagItem,
            tagItems.filter(item => newArray.includes(item.id)) ?? [],
          );
          setSelectedTagIds(newArray);
        } else {
          onChangeSelectedTag(
            type,
            tagItem,
            tagItems.filter(item => newArray.includes(item.id)) ?? [],
          );
          setSelectedTagIds(newArray);
        }
      },
      [
        currentSelectedTotalTagCount,
        maxSelectedTagCount,
        onChangeSelectedTag,
        selectedTagIds,
        tagItems,
      ],
    );

    const clear = React.useCallback(() => {
      setSelectedTagIds([]);
    }, []);

    React.useImperativeHandle(ref, () => ({ clear }));

    return (
      <TagCollapseBox
        initialOpen={open}
        title={tagSet.set}
        tags={tagItems}
        selectedTags={selectedTagIds}
        onClickItem={handleClickItem}
      />
    );
  },
);

export default React.memo(TagSet);
