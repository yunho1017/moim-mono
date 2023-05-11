import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import { AppBarModalLayout, SmallModalLayout } from ".";
import NavigationModal from "common/components/navigationModal";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ModalLayout`, module)
  .add("App", () => (
    <NavigationModal>
      <AppBarModalLayout title="Title/h3">
        <div style={{ height: 1000 }}>body</div>
      </AppBarModalLayout>
    </NavigationModal>
  ))
  .add("Small", () => <SmallModalLayout />);
