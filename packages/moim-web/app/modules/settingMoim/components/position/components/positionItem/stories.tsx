import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import PositionItemBase from "./item/base";
import PositionItemBasic from "./item/basic";
import PositionEditItem from "./item/edit";
import styled from "styled-components";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob, color: colorKnob } = require("@storybook/addon-knobs");

const POSITION_ID = "P1234";
const Wrapper = styled.div`
  max-width: 320px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/PositionItem`)
  .add("Base", () => (
    <Wrapper>
      <PositionItemBase
        positionId={POSITION_ID}
        name={textKnob("name", "Position Name01")}
        color={colorKnob("color", "#FF7100")}
        onClick={action("onClick")}
      />
    </Wrapper>
  ))
  .add("Basic", () => (
    <Wrapper>
      <PositionItemBasic
        positionId={POSITION_ID}
        name={textKnob("name", "Position Name01")}
        color={colorKnob("color", "#FF7100")}
        onClick={action("onClick")}
      />
    </Wrapper>
  ))
  .add("Edit", () => (
    <Wrapper>
      <PositionEditItem
        positionId={POSITION_ID}
        name={textKnob("name", "Position Name01")}
        color={colorKnob("color", "#FF7100")}
        onClick={action("onClick")}
        onClickUpButton={action("onClickUpButton")}
        onClickDownButton={action("onClickDownButton")}
      />
    </Wrapper>
  ));
