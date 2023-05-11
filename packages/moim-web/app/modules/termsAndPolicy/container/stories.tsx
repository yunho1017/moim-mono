import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MoimGlobalTermsAndPolicy from "./moimGlobal";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Site Terms&Policy`,
  module,
).add("Vingle", () => <MoimGlobalTermsAndPolicy />);
