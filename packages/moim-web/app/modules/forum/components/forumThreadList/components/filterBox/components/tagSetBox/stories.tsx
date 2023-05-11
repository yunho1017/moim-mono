import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { NORMALIZED } from "app/__mocks__";
import { tagSetListDenormalizer } from "app/models/tagset/denormalizer";

import TagSetBox from ".";

const DENORMALIZED_TAG_SET = tagSetListDenormalizer(NORMALIZED.TAG_SET.result, {
  ...NORMALIZED.TAG_SET.entities,
});

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/FilterBox/Components/TagSetBox`,
  module,
).add("Default", () => {
  return (
    <div style={{ width: "320px", height: "100%" }}>
      <TagSetBox
        tagSets={DENORMALIZED_TAG_SET.data}
        selectedTagSetItems={[]}
        onChangeSelectedTags={action("onChangesSelectedTags")}
      />
    </div>
  );
});
