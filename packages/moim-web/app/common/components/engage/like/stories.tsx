import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { LargeLike, SmallLike } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Engage/Like`, module)
  .add("Large default", () => (
    <LargeLike
      threadId="T1234"
      likeCount={100}
      liked={true}
      handleLike={action("button Click")}
    />
  ))
  .add("large non liked", () => (
    <LargeLike
      threadId="T1234"
      likeCount={100}
      liked={false}
      handleLike={action("button Click")}
    />
  ))
  .add("small default", () => (
    <SmallLike
      threadId="T1234"
      likeCount={100}
      liked={true}
      handleLike={action("button Click")}
    />
  ))
  .add("small non liked", () => (
    <SmallLike
      threadId="T1234"
      likeCount={100}
      liked={false}
      handleLike={action("button Click")}
    />
  ));
