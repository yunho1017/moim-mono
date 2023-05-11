import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import { NORMALIZED } from "app/__mocks__";
import { tagSetListDenormalizer } from "app/models/tagset/denormalizer";

import Component, { IRefHandler } from ".";

const DENORMALIZED_TAG_SET = tagSetListDenormalizer(NORMALIZED.TAG_SET.result, {
  ...NORMALIZED.TAG_SET.entities,
});

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/FilterBox/Components/Filter Dialog`,
  module,
).add("Default", () => {
  const refThis = React.useRef<IRefHandler>(null);
  const handleClick = React.useCallback(() => {
    refThis.current?.open();
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Open Dialog</button>
      <Component
        ref={refThis}
        tagSet={DENORMALIZED_TAG_SET.data}
        selectedTagItems={[]}
        onApplyClick={action("onApplyClick")}
        onResetClick={action("onResetClick")}
        onClose={action("onClose")}
      />
    </div>
  );
});
