import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import RemovableChip from "common/components/removableChip/index";
import { RAW } from "app/__mocks__";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/RemovableChip`)
  .add("Default", () => (
    <RemovableChip
      id={"U123"}
      name={textKnob("name", "Vingle")}
      image={textKnob("profileSrc", RAW.MEMBER.avatar_url)}
      onClick={action("onClick")}
      onClickRemoveButton={action("onClickRemoveButton")}
    />
  ))
  .add("No Image", () => (
    <RemovableChip
      id={"U123"}
      name={textKnob("name", "Vingle")}
      onClick={action("onClick")}
      onClickRemoveButton={action("onClickRemoveButton")}
    />
  ));
