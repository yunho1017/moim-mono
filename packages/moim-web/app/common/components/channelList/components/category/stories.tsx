// vendor
import * as React from "react";
import styled from "styled-components";

const { storiesOf } = require("@storybook/react");
const { actions } = require("@storybook/addon-actions");

import Category from "./";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const Wrapper = styled.div`
  width: 320px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Category`, module)
  .add("Default", () => (
    <Wrapper>
      <Category
        categoryName="Vingle"
        useCollapse={true}
        isCollapsed={false}
        showChannelAddButton={true}
        onClickCategory={actions("onClickCategory")}
        onClickChannelAddButton={actions("onClickChannelAddButton")}
      />
      <Category
        categoryName="Vingle Vingle Vingle Vingle Vingle Vingle Vingle"
        useCollapse={true}
        isCollapsed={false}
        showChannelAddButton={true}
        onClickCategory={actions("onClickCategory")}
        onClickChannelAddButton={actions("onClickChannelAddButton")}
      />
    </Wrapper>
  ))
  .add("Collapsed", () => (
    <Wrapper>
      <Category
        categoryName="Vingle"
        useCollapse={true}
        isCollapsed={true}
        showChannelAddButton={true}
        onClickCategory={actions("onClickCategory")}
        onClickChannelAddButton={actions("onClickChannelAddButton")}
      />
    </Wrapper>
  ))
  .add("No Collapse Category", () => (
    <Wrapper>
      <Category
        categoryName="Vingle"
        useCollapse={false}
        showChannelAddButton={true}
        onClickChannelAddButton={actions("onClickChannelAddButton")}
      />
    </Wrapper>
  ))
  .add("No Channel Add Button", () => (
    <Wrapper>
      <Category
        categoryName="Vingle"
        useCollapse={false}
        showChannelAddButton={false}
        onClickChannelAddButton={actions("onClickChannelAddButton")}
      />
    </Wrapper>
  ));
