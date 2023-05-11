import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import PositionForm from "./index";
import styled from "styled-components";
import { FORM_MODE } from "common/constants/form";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
// const { text: textKnob } = require("@storybook/addon-knobs");

const Wrapper = styled.div``;

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/PositionForm`)
  .add("Create", () => (
    <Wrapper>
      <PositionForm mode={FORM_MODE.CREATE} onSubmit={action("onSubmit")} />
    </Wrapper>
  ))
  .add("Edit", () => (
    <Wrapper>
      <PositionForm
        mode={FORM_MODE.EDIT}
        name="ForumMaster"
        description="ForumMaster Description"
        color="#6D31CC"
        onSubmit={action("onSubmit")}
      />
    </Wrapper>
  ));
