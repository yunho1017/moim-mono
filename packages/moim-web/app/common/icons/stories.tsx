import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import Icon from "@icon/24-close-b";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Icon`, module)
  .add("default", () => <Icon />)
  .add("Size", () => <Icon size="s" />)
  .add("Size & Touch", () => <Icon size="s" touch={42} />);
