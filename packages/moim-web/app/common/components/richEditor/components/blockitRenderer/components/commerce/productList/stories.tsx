import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { text: textKnob } = require("@storybook/addon-knobs");

import ProductList from ".";
import { STORY_BOOK_PATH } from "../../..";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

storiesOf(`${STORY_BOOK_PATH}/Components/Commerce/ProductList`, module).add(
  "Default",
  () => {
    return (
      <Wrapper>
        <ProductList
          title={textKnob("Title", `바다맛보기&가격인하`)}
          description={textKnob("Description", "")}
          resourceId="FYRPNB4AGQ"
          resourceType="productSet"
        />
      </Wrapper>
    );
  },
);
