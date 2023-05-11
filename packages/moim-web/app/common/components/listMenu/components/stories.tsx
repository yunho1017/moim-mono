import * as React from "react";

const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "app/common/constants/storybook";
import { SubMenu, SubMenuItem } from "./subMenu";
import { Accordion } from "./accordion";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/List Menu/Sub Menu`,
  module,
).add("Default", () => (
  <SubMenu>
    <SubMenuItem active={true}>item 1</SubMenuItem>
    <SubMenuItem>item 2</SubMenuItem>
    <SubMenuItem>item 3</SubMenuItem>
    <SubMenuItem>item 4</SubMenuItem>
    <SubMenuItem>item 5</SubMenuItem>
  </SubMenu>
));

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/List Menu/Accordion `,
  module,
).add("Default", () => (
  <div>
    <Accordion>item 1</Accordion>
    <Accordion>item 2</Accordion>
    <Accordion>item 3</Accordion>
    <Accordion>item 4</Accordion>
    <Accordion>item 5</Accordion>
  </div>
));
