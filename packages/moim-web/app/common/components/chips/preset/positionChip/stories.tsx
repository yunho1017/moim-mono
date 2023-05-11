import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");

import PositionChip from ".";
import { STORY_BOOK_PATH } from "../../stories";

storiesOf(`${STORY_BOOK_PATH}/Preset/Position Chip`, module).add(
  "Default",
  () => {
    const name = textKnob("Name", "Forum Master");
    const showDeleteButton = booleanKnob("Show deleteButton", false);
    return (
      <div>
        <div>
          <h1>Large Size</h1>
          <div>
            <PositionChip
              id="P123"
              size="large"
              color="#CC31C6"
              name={name}
              showDeleteButton={showDeleteButton}
              onClick={action("onClick")}
              onDeleteClick={action("onDeleteClick")}
            />
          </div>
        </div>
        <div>
          <h1>Medium Size</h1>
          <div>
            <PositionChip
              id="P123"
              size="medium"
              color="#CC31C6"
              name={name}
              showDeleteButton={showDeleteButton}
              onClick={action("onClick")}
              onDeleteClick={action("onDeleteClick")}
            />
          </div>
        </div>
        <div>
          <h1>Small Size</h1>
          <div>
            <PositionChip
              id="P123"
              size="small"
              color="#CC31C6"
              name={name}
              showDeleteButton={showDeleteButton}
              onClick={action("onClick")}
              onDeleteClick={action("onDeleteClick")}
            />
          </div>
        </div>
      </div>
    );
  },
);
