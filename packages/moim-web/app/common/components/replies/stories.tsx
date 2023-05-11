import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import Replies from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Replies`, module).add(
  "Default",
  () => {
    return (
      <Replies
        open={true}
        rootId="RootID"
        parentId="ParenTID"
        paging={{
          after: "XEQDASDAW",
        }}
        leftItemCount={13}
        onClickLoadMore={action("onClickLoadMore")}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </Replies>
    );
  },
);
