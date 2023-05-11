import * as React from "react";
import TagChip from "common/components/chips/preset/tagChip";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import {
  Wrapper,
  TagSetTitle,
  TagSetWrapper,
  ChipList,
  ChipWrapper,
} from "./styled";

interface IProps {
  tagSets: Moim.TagSet.ITagSet[];
  tagItems: Moim.TagSet.ITagItem[];
  readonly?: boolean;
  onClickTagItem?(tagItem: Moim.TagSet.ITagItem): void;
}

const TagItemList: React.FC<IProps> = ({
  tagSets,
  tagItems,
  readonly,
  onClickTagItem,
}) => {
  const tagSetHash = React.useMemo(() => {
    if (tagItems.length === 0) return {};
    const tagSetHeap = tagSets.reduce<{
      [key: string]: Moim.TagSet.ITagItem[];
    }>((heap, set) => {
      heap[set.set] = tagItems.filter(tag => set.items?.includes(tag.id));
      return heap;
    }, {});

    return tagSetHeap;
  }, [tagItems, tagSets]);

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

  if (!tagItems.length) {
    return null;
  }

  return <Wrapper>{itemElements}</Wrapper>;
};

export default TagItemList;
