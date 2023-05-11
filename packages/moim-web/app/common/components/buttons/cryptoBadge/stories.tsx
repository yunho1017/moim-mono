import * as React from "react";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import CryptoBadgeButton from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/buttons/CryptoBadge`,
  module,
).add("Default", () => (
  <CryptoBadgeButton
    onClick={action("onClick")}
    baseTheme={selectKnob("Theme", {
      Yellow: "yellow",
      White: "white",
      "White-Outline": "white-outline",
    })}
  >
    {textKnob("Text", "Login with Crypto Badge")}
  </CryptoBadgeButton>
));
