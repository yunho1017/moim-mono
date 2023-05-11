import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  number: numberKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");

import Component from "./component";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/FilterBox`, module).add(
  "Component",
  () => {
    const [filterActive, setFilterActiveStatus] = React.useState<boolean>(
      false,
    );

    const handleFilterActiveStatusChange = React.useCallback(() => {
      setFilterActiveStatus(!filterActive);
      action("FilterSetClick");
    }, [filterActive]);

    return (
      <div style={{ backgroundColor: "white" }}>
        <Component
          separateTagFilter={false}
          menus={{
            filterSet: {
              enable: booleanKnob("Filter Menu Enable", true),
              active: filterActive,
              selectedTagCount: numberKnob("Selected Tag Count", 0),
              onClick: handleFilterActiveStatusChange,
            },
            order: {
              enable: booleanKnob("Order Menu Enable", true),
              currentValue: 1,
              onClick: action("OrderClick"),
            },
          }}
        />
      </div>
    );
  },
);
