import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog/index";
import { AppBarModalLayout } from "common/components/modalLayout";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/BasicResponsiveDialog`).add(
  "Default",
  () => (
    <BasicResponsiveDialog open={true} onClose={action("onClose")}>
      <AppBarModalLayout title={"Title"} actionButton={"Action"}>
        {textKnob("Content", "Hello BasicResponsiveDialog")}
      </AppBarModalLayout>
    </BasicResponsiveDialog>
  ),
);
