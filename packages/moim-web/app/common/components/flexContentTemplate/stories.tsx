import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { FlexContentFormTemplate, Header, Content, Footer } from ".";
import { px2rem } from "common/helpers/rem";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/FlexContentTemplate`, module)
  .add(px2rem(570), () => (
    <div
      style={{
        width: "100%",
        height: px2rem(570),
      }}
    >
      <FlexContentFormTemplate>
        <Header>LOGO HERE!</Header>
        <Content>
          <div> hello0</div>
          <div> hello1</div>
          <div> hello2</div>
          <div> hello3</div>
          <div> hello4</div>
          <div> hello5</div>
        </Content>
        <Footer>Copyright 2019</Footer>
      </FlexContentFormTemplate>
    </div>
  ))
  .add(px2rem(1920), () => (
    <div
      style={{
        width: "100%",
        height: px2rem(1920),
      }}
    >
      <FlexContentFormTemplate>
        <Header>LOGO HERE!</Header>
        <Content>
          <div> hello0</div>
          <div> hello1</div>
          <div> hello2</div>
          <div> hello3</div>
          <div> hello4</div>
          <div> hello5</div>
        </Content>
        <Footer>Copyright 2019</Footer>
      </FlexContentFormTemplate>
    </div>
  ));
