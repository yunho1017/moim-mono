import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import Chip from ".";

export const STORY_BOOK_PATH = `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Chip`;

storiesOf(STORY_BOOK_PATH, module).add("Default", () => {
  return (
    <div>
      <div>
        <h1>Round shape(L/M/S)</h1>
        <div>
          <Chip shape="round" size="large" onClick={action("onClick")}>
            Large
          </Chip>
          <Chip shape="round" size="medium" onClick={action("onClick")}>
            Medium
          </Chip>
          <Chip shape="round" size="small" onClick={action("onClick")}>
            Small
          </Chip>
        </div>
      </div>

      <div>
        <h1>Rectangle shape(L/M/S)</h1>
        <div>
          <Chip shape="rectangle" size="large" onClick={action("onClick")}>
            Large
          </Chip>
          <Chip shape="rectangle" size="medium" onClick={action("onClick")}>
            Medium
          </Chip>
          <Chip shape="rectangle" size="small" onClick={action("onClick")}>
            Small
          </Chip>
        </div>
      </div>
    </div>
  );
});
