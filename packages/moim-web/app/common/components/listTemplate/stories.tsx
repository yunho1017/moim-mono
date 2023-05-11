import * as React from "react";

const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  number: numberKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "app/common/constants/storybook";
import ListTemplate from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/List Template`, module).add(
  "Default",
  () => {
    const count = numberKnob("Count", 0);
    return (
      <ListTemplate
        title={textKnob("Title", "title")}
        count={booleanKnob("Count visible", false) ? count : undefined}
      >
        <div>item 1</div>
        <div>item 2</div>
        <div>item 3</div>
        <div>item 4</div>
        <div>item 5</div>
      </ListTemplate>
    );
  },
);
