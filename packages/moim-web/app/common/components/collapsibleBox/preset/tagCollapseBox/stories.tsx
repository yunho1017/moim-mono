import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");
import { NORMALIZED } from "app/__mocks__";
import { tagSetListDenormalizer } from "app/models/tagset/denormalizer";

import { STORY_BOOK_PATH } from "../../stories";
import TagCollapseBox from ".";

const DENORMALIZED_TAG_SET = (tagSetListDenormalizer(
  NORMALIZED.TAG_SET.result,
  {
    ...NORMALIZED.TAG_SET.entities,
  },
) as unknown) as Moim.IPaginatedListResponse<
  Moim.TagSet.ITagSet & { items: Moim.TagSet.ITagItem[] }
>;

const Showcase = ({ itemRepeat = 1 }: { itemRepeat?: number }) => {
  const [selectedTag, setSelectedTag] = React.useState<Moim.Id[]>([]);

  const handleClickItem = React.useCallback(
    (tagItem: Moim.TagSet.ITagItem) => {
      action("onClickItem")(tagItem);
      if (selectedTag.includes(tagItem.id)) {
        setSelectedTag(selectedTag.filter(id => id !== tagItem.id));
      } else {
        setSelectedTag(selectedTag.concat([tagItem.id]));
      }
    },
    [selectedTag],
  );
  let tags: Moim.TagSet.ITagItem[] = [];
  for (let i = 0; i < itemRepeat; i++) {
    tags = [
      ...tags,
      ...(DENORMALIZED_TAG_SET.data[0].items as Moim.TagSet.ITagItem[]),
    ];
  }

  return (
    <TagCollapseBox
      title={textKnob("Title", "Tag Set 1")}
      tags={tags}
      selectedTags={selectedTag}
      onClickItem={handleClickItem}
    />
  );
};

storiesOf(`${STORY_BOOK_PATH}/Preset/Tag CollapseBox`, module)
  .add("Default", () => <Showcase itemRepeat={10} />)
  .add("Multi Box", () => (
    <div>
      <Showcase itemRepeat={2} />
      <Showcase itemRepeat={10} />
      <Showcase itemRepeat={5} />
    </div>
  ));
