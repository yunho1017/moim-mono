import * as React from "react";

const { storiesOf } = require("@storybook/react");
import { Tab, TabItem } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const mockMenus = [
  { id: 1, name: "Menu 1" },
  { id: 2, name: "Menu 2" },
  { id: 3, name: "Menu 3" },
];

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Tab`, module).add(
  "Default",
  () => {
    const [activeIndex, setActiveIndex] = React.useState(mockMenus[0].id);
    return (
      <Tab>
        {mockMenus.map(menu => (
          <TabItem
            key={menu.id}
            onClick={() => setActiveIndex(menu.id)}
            active={activeIndex === menu.id}
          >
            {menu.name}
          </TabItem>
        ))}
      </Tab>
    );
  },
);
