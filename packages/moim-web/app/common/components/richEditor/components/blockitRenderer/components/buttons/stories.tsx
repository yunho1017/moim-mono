import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { text: textKnob, select } = require("@storybook/addon-knobs");

import Buttons from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div`
  margin: 1rem;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Buttons`, module).add(
  "Default",
  () => {
    return (
      <div>
        <Wrapper>
          <Buttons
            actionId="form"
            element={{
              content: textKnob("Content", "HI!"),
              type: select(
                "Button Type",
                {
                  Flat: "flat",
                  Ghost: "ghost",
                  Text: "text",
                },
                "flat",
              ),
              style: select(
                "Button Style",
                {
                  Primary: "primary",
                  General: "general",
                  Custom: "custom",
                },
                "primary",
              ),
              size: select(
                "Button Size",
                {
                  Large: "large",
                  Medium: "medium",
                  Small: "small",
                },
                "small",
              ),
              status: select(
                "Status",
                {
                  Enabled: "enabled",
                  Disabled: "disabled",
                  Activated: "activated",
                },
                "enabled",
              ),
              textColor: textKnob("textColor", ""),
              backgroundColor: textKnob("backgroundColor", ""),
              outlineColor: textKnob("outlineColor", ""),
            }}
          />
        </Wrapper>
      </div>
    );
  },
);
