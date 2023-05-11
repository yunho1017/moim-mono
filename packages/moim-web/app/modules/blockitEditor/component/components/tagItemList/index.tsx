import * as React from "react";
import TagChip from "common/components/chips/preset/tagChip";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { useStoreState } from "app/store";
import {
  Wrapper,
  TagSetTitle,
  TagSetWrapper,
  ChipList,
  ChipWrapper,
} from "./styled";

interface IProps {
  tagSets: Moim.TagSet.ITagSet[];
  tagItemIds: Moim.Id[];
  readonly?: boolean;
  onClickTagItem?(tagItem: Moim.TagSet.ITagItem): void;
}

const TagItemList: React.FC<IProps> = ({
  tagSets,
  tagItemIds,
  readonly,
  onClickTagItem,
}) => {
  const tagEntities = useStoreState(state => state.entities.tagset);
  const tagSetHash = React.useMemo(() => {
    if (tagItemIds.length === 0) return {};
    const tagSetHeap = tagSets.reduce<{
      [key: string]: Moim.TagSet.ITagItem[];
    }>((heap, set) => {
      const includedIds = tagItemIds.filter(id => set.items?.includes(id));
      heap[set.set] = includedIds.map(
        id => tagEntities[id] as Moim.TagSet.ITagItem,
      );
      return heap;
    }, {});

    return tagSetHeap;
  }, [tagItemIds, tagSets, tagEntities]);

  const itemElements = React.useMemo(() => {
    const keys = Object.keys(tagSetHash);
    return keys.map(key => {
      const items = tagSetHash[key];
      if (!items.length) return null;
      return (
        <TagSetWrapper key={key}>
          <TagSetTitle>
            <NativeEmojiSafeText value={key} />
          </TagSetTitle>
          <ChipList>
            {items.map(item => (
              <ChipWrapper key={item.id}>
                <TagChip
                  tagItem={item}
                  size="medium"
                  readonly={readonly}
                  selected={true}
                  onClick={onClickTagItem}
                />
              </ChipWrapper>
            ))}
          </ChipList>
        </TagSetWrapper>
      );
    });
  }, [onClickTagItem, readonly, tagSetHash]);

  if (!tagItemIds.length) {
    return null;
  }

  return <Wrapper>{itemElements}</Wrapper>;
};

export default TagItemList;
