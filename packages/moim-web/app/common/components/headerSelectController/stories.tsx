import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import HeaderSelectController from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/HeaderSelectController`,
  module,
).add("Default", () => {
  const [isAllSelected, setAllSelected] = React.useState(false);
  const handleAllClick = React.useCallback(status => {
    setAllSelected(status);
    action("onAllClick")(status);
  }, []);

  return (
    <HeaderSelectController
      isSelectAllChecked={isAllSelected}
      selectAllLabel="전체선택"
      selectDeleteLabel="선택삭제"
      onAllClick={handleAllClick}
      onSelectDeleteClick={action("onSelectDeleteClick")}
    />
  );
});
