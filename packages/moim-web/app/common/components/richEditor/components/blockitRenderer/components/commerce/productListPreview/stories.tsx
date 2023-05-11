import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const {
  number: numberKnob,
  // select,
  // boolean: booleanKnob,
} = require("@storybook/addon-knobs");

import ProductListPreview from ".";
import { STORY_BOOK_PATH } from "../../..";

const DEFAULT_LIST_ELEMENT = {
  maxDisplayedItemsCount_web: 10,
  columnCount: 2,
  itemStackDirection_web: "vertical",
  scrollDirection: "horizontal",
  type: "scroll",
  maxDisplayedItemsCount: 4,
  scrollDirection_web: "horizontal",
  scrollable_web: true,
  rowCount_web: 1,
  itemStackDirection: "vertical",
  type_web: "scroll",
  itemGutterSize: 12,
  rowCount: 2,
  columnCount_web: 6,
  itemGutterSize_web: 12,
  scrollable: true,
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

storiesOf(
  `${STORY_BOOK_PATH}/Components/Commerce/ProductListPreview`,
  module,
).add("Default", () => {
  return (
    <Wrapper>
      <ProductListPreview
        maxDisplayedItemsCount={numberKnob("maxDisplayedItemsCount", 4)}
        maxDisplayedItemsCount_web={numberKnob("maxDisplayedItemsCount_web", 4)}
        title={`바다맛보기&가격인하`}
        resourceId="FYRPNB4AGQ"
        resourceType="productSet"
        listElement={DEFAULT_LIST_ELEMENT as Moim.Blockit.IListStyleElement}
      />
    </Wrapper>
  );
});
