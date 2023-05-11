import * as React from "react";

const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "app/common/constants/storybook";
import InputForm from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Inputs/Input form`,
  module,
).add("Default", () => (
  <InputForm
    title={textKnob("Title", "title title")}
    titleType={selectKnob("Title Type", { Grey: "GREY", White: "WHITE" })}
    description={textKnob("Description", "description")}
  >
    <button>Button elm 1</button>
    <button>Button elm 2</button>
  </InputForm>
));
