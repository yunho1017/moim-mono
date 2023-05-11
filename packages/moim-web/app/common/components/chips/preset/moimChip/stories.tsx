import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

import MoimTag from ".";
import { STORY_BOOK_PATH } from "../../stories";

storiesOf(`${STORY_BOOK_PATH}/Preset/Moim Chip`, module).add("Default", () => {
  const name = textKnob("Name", "TAG01");
  return (
    <div style={{ backgroundColor: "white", height: "100%", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Large Size</h1>
        <div>
          <MoimTag
            size="large"
            label={{
              id: "123h",
              priority: 1,
              text: name,
            }}
            onClick={action("onClick")}
          />
          <MoimTag
            size="large"
            label={{
              id: "123h",
              priority: 1,
              text: name,
            }}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Medium Size</h1>
        <div>
          <MoimTag
            size="medium"
            label={{
              id: "123h",
              priority: 1,
              text: name,
            }}
            onClick={action("onClick")}
          />
          <MoimTag
            size="medium"
            label={{
              id: "123h",
              priority: 1,
              text: name,
            }}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Small Size</h1>
        <div>
          <MoimTag
            size="small"
            label={{
              id: "123h",
              priority: 1,
              text: textKnob("Label name", "TAG01"),
            }}
            onClick={action("onClick")}
          />
          <MoimTag
            size="small"
            label={{
              id: "123h",
              priority: 1,
              text: textKnob("Label name", "TAG01"),
            }}
            selected={true}
            onClick={action("onClick")}
          />
        </div>
      </div>
    </div>
  );
});
