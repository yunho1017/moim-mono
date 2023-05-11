import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import EditPinnedPostDialog from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/EditPinnedItemDialog`,
  module,
).add("default", () => {
  return (
    <div style={{ height: "1920px" }}>
      <EditPinnedPostDialog
        open={true}
        isActive={true}
        isLoading={false}
        isLoadingGetPinnedPostList={false}
        pinnedItems={new Array(10).fill(0).map((_, index) => ({
          id: `item${index}`,
          title: `item${index} title`,
        }))}
        onSave={action("onSave")}
        onClose={action("close")}
      />
    </div>
  );
});
