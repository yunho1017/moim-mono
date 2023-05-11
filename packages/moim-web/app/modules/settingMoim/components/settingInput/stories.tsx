import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { text: textKnob } = require("@storybook/addon-knobs");
import SettingInput from "./index";
import { Switch } from "common/components/designSystem/inputs";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Setting/SettingInput`, module)
  .add("Horizontal", () => (
    <SettingInput
      input={<Switch />}
      direction="horizontal"
      title={textKnob("Title", "Channel Description(Optional)")}
      description={textKnob("Description", "Channel Description(Optional)")}
    />
  ))
  .add("Vertical", () => (
    <SettingInput
      input={<textarea cols={30} rows={10} />}
      direction="vertical"
      title={textKnob("Title", "Channel Description(Optional)")}
      description={textKnob("Description", "Channel Description(Optional)")}
    />
  ));
