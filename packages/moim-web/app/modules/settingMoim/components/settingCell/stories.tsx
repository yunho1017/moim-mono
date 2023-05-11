import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { text: textKnob } = require("@storybook/addon-knobs");
import SettingCell from "./index";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Setting/SettingCell`, module)
  .add("Title", () => (
    <SettingCell title={textKnob("Title", "Do Not Disturb")} />
  ))
  .add("With Description", () => (
    <SettingCell
      title={textKnob("Title", "Do Not Disturb")}
      description={textKnob(
        "Description",
        "When Do Not Disturb is turned on, Moim won't send you any..",
      )}
    />
  ))
  .add("With Children", () => (
    <SettingCell
      title={textKnob("Title", "Do Not Disturb")}
      description={textKnob(
        "Description",
        "When Do Not Disturb is turned on, Moim won't send you any..",
      )}
    >
      <div>{textKnob("Children", "Hello Children")}</div>
    </SettingCell>
  ));
