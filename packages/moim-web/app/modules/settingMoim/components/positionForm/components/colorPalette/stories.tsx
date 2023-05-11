import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ColorPalette from "./index";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { color: colorKnobs } = require("@storybook/addon-knobs");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ColorPalette`).add(
  "Default",
  () => (
    <ColorPalette
      selectedColor={colorKnobs("defaultColor", "#FF7100")}
      colorSet={["#FF7100", "#FF0000", "#00FF00", "#0000FF"]}
      onChange={action("onChange")}
    />
  ),
);
