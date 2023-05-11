import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  number: numberKnob,
} = require("@storybook/addon-knobs");

import TagSetChip from ".";
import { STORY_BOOK_PATH } from "../../stories";

storiesOf(`${STORY_BOOK_PATH}/Preset/TagSet Chip`, module).add(
  "Default",
  () => {
    const name = textKnob("Name", "TAG01");
    const selectedCount = numberKnob("Select count", 0);
    return (
      <div
        style={{ backgroundColor: "white", height: "100%", padding: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1>Large Size</h1>
          <div>
            <TagSetChip
              size="large"
              label={{
                id: "123h",
                priority: 1,
                text: name,
                selectedTagsCount: selectedCount,
              }}
              onClick={action("onClick")}
            />
            <TagSetChip
              size="large"
              label={{
                id: "123h",
                priority: 1,
                text: name,
                selectedTagsCount: selectedCount,
              }}
              selected={true}
              onClick={action("onClick")}
            />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Medium Size</h1>
          <div>
            <TagSetChip
              size="medium"
              label={{
                id: "123h",
                priority: 1,
                text: name,
                selectedTagsCount: selectedCount,
              }}
              onClick={action("onClick")}
            />
            <TagSetChip
              size="medium"
              label={{
                id: "123h",
                priority: 1,
                text: name,
                selectedTagsCount: selectedCount,
              }}
              selected={true}
              onClick={action("onClick")}
            />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Small Size</h1>
          <div>
            <TagSetChip
              size="small"
              label={{
                id: "123h",
                priority: 1,
                text: textKnob("Label name", "TAG01"),
                selectedTagsCount: selectedCount,
              }}
              onClick={action("onClick")}
            />
            <TagSetChip
              size="small"
              label={{
                id: "123h",
                priority: 1,
                text: textKnob("Label name", "TAG01"),
                selectedTagsCount: selectedCount,
              }}
              selected={true}
              onClick={action("onClick")}
            />
          </div>
        </div>
      </div>
    );
  },
);
