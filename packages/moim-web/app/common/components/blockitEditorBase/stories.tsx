import * as React from "react";
const { storiesOf } = require("@storybook/react");

import RichEditor from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/RichEditor`, module).add(
  "Default",
  () => (
    <RichEditor
      id="1234"
      contents={[
        {
          type: "reference",
          botId: "B8PBQSHWZ",
          blockId: "T3B0aW9uOnVOYU1ZMnRPMENxZHJmTVZKTER0VQ==",
          replaceId: "options",
          params: { id: "T3B0aW9uOnVOYU1ZMnRPMENxZHJmTVZKTER0VQ==" },
        },
      ]}
    />
  ),
);
