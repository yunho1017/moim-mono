export function tagSetBlockExtractor(
  tagSets: Moim.TagSet.ITagSet[],
  contents: Moim.Blockit.Blocks[],
): {
  contentsWithoutTagSet: Moim.Blockit.Blocks[];
  selectedTagItemIds: Moim.Id[];
} {
  const flattenTagSetBlockitItemIds = contents
    .filter(block => block.type === "tagSet")
    .map((block: Moim.Blockit.ITagSetBlock) => block.valueId);
  const tagItemIds: Moim.Id[] = [];

  tagSets.forEach(set =>
    set.items?.forEach(itemId => {
      if (flattenTagSetBlockitItemIds.includes(itemId)) {
        tagItemIds.push(itemId);
      }
    }),
  );

  return {
    contentsWithoutTagSet: contents.filter(block => block.type !== "tagSet"),
    selectedTagItemIds: tagItemIds,
  };
}
