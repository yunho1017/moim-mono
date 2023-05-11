import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { SmallUpDown, LargeUpDown } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { VoteStatus } from "app/enums";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Engage/UpDown`, module)
  .add("large", () => (
    <LargeUpDown
      threadId="T1234"
      upCount={100}
      downCount={100}
      status={VoteStatus.POSITIVE}
      handler={action("button Click")}
    />
  ))
  .add("small", () => (
    <SmallUpDown
      threadId="T1234"
      upCount={100}
      downCount={100}
      status={VoteStatus.POSITIVE}
      handler={action("button Click")}
    />
  ));
