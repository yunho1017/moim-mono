import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { MessageStartFromChannel, MessageStartFromDirectMessage } from "./";
import { RAW } from "app/__mocks__";

const { storiesOf } = require("@storybook/react");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Talk/MessageStart`)
  .add("FromChannel", () => (
    <MessageStartFromChannel
      channel={
        {
          name: "BTS",
          created_at: "October 25th, 2019.",
        } as any
      }
    />
  ))
  .add("FromUser(DM)", () => (
    <MessageStartFromDirectMessage user={RAW.MEMBER} />
  ));
