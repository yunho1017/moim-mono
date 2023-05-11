import * as React from "react";
import LoadingIcon from "./index";
import { px2rem } from "common/helpers/rem";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const { storiesOf } = require("@storybook/react");
const { select: selectKnob } = require("@storybook/addon-knobs");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Loading/Icon`, module).add(
  "Default",
  () => (
    <div
      style={{
        backgroundColor: "gray",
        width: "100%",
        height: px2rem(570),
      }}
    >
      <LoadingIcon
        color={selectKnob("Color", {
          default: "red",
          gray: "gray",
          white: "white",
        })}
      />
    </div>
  ),
);
