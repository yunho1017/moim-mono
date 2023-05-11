import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { InactiveSearchInput, SelectableSearchInput } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Inputs/SearchInput`, module)
  .add("Inactive", () => <InactiveSearchInput />)
  .add("Selectable", () => (
    <div style={{ width: 300 }}>
      <SelectableSearchInput
        selected={[
          {
            id: "1",
            name: "Aarav Alfaro",
            image: RAW.MEMBER.avatar_url,
          },

          {
            id: "2",
            name: "Princess Villarreal",
          },

          {
            id: "3",
            name: "Kyran Mcdonald",
          },

          {
            id: "4",
            name: "Leyla Gibson",
          },
        ]}
        value="username 1"
        onChange={action("onchange")}
      />
    </div>
  ));
