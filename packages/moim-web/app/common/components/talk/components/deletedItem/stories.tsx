import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import DeletedItem from ".";

const { storiesOf } = require("@storybook/react");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Talk/DeletedItem`).add(
  "Index",
  () => <DeletedItem />,
);
