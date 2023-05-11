import * as React from "react";

const { action } = require("@storybook/addon-actions");
const { storiesOf } = require("@storybook/react");
const {
  number: numberKnob,
  select: selectKnob,
  date: dateKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import TimeSelector from "./";
import { GhostButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: ${px2rem(30)};
`;

function myDateKnob(name: string, date: Date) {
  const stringTimestamp = dateKnob(name, date);
  return new Date(stringTimestamp);
}

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/TimeSelector`, module).add(
  "Default",
  () => (
    <Wrapper>
      <TimeSelector
        onSelect={action("onSelect")}
        start={myDateKnob("start", new Date("December 17, 1995 00:00:00"))}
        end={myDateKnob("end", new Date("December 18, 1995 23:59:59"))}
        format={selectKnob("format", { 12: 12, 24: 24 }, 12)}
        intervalMinute={numberKnob("intervalMinute", 30)}
      >
        {({ triggerRef, toggle, text }) => (
          <div ref={triggerRef}>
            <GhostButton size="s" onClick={toggle}>
              {text}
            </GhostButton>
          </div>
        )}
      </TimeSelector>
    </Wrapper>
  ),
);
