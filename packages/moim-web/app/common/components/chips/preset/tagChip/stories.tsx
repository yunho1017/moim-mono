import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");
import { NORMALIZED } from "app/__mocks__";
import { tagSetListDenormalizer } from "app/models/tagset/denormalizer";

import TagChip from ".";
import { STORY_BOOK_PATH } from "../../stories";

const DENORMALIZED_TAG_SET = (tagSetListDenormalizer(
  NORMALIZED.TAG_SET.result,
  {
    ...NORMALIZED.TAG_SET.entities,
  },
) as unknown) as Moim.IPaginatedListResponse<
  Moim.TagSet.ITagSet & { items: Moim.TagSet.ITagItem[] }
>;

storiesOf(`${STORY_BOOK_PATH}/Preset/Tag Chip`, module).add("Default", () => {
  const name = textKnob("Name", "Forum Master");
  const TAG_ITEM = {
    ...(DENORMALIZED_TAG_SET.data[0].items as Moim.TagSet.ITagItem[])[0],
    value: name,
  };
  return (
    <div style={{ backgroundColor: "white", height: "100%", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Large Size</h1>
        <div>
          <TagChip
            size="large"
            tagItem={TAG_ITEM}
            onClick={action("onClick")}
          />
          <TagChip
            size="large"
            tagItem={TAG_ITEM}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Medium Size</h1>
        <div>
          <TagChip
            size="medium"
            tagItem={TAG_ITEM}
            onClick={action("onClick")}
          />
          <TagChip
            size="medium"
            tagItem={TAG_ITEM}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Small Size</h1>
        <div>
          <TagChip
            size="small"
            tagItem={TAG_ITEM}
            onClick={action("onClick")}
          />
          <TagChip
            size="small"
            tagItem={TAG_ITEM}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
    </div>
  );
});
