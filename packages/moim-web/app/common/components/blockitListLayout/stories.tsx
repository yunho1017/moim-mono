import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { fill } from "lodash";
const { storiesOf } = require("@storybook/react");
import {
  DimmedRightArrow,
  DimmedLeftArrow,
  PortalRightArrow,
  PortalLeftArrow,
} from "common/components/horizontalScroll/arrows";

const {
  number: numberKnob,
  boolean: booleanKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import BlockitListLayout from ".";

const PotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MOCK_ITEM = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: cyan;
  border-radius: 8px;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/blockitListLayout`, module)
  .add("Grid", () => {
    const itemLength = numberKnob("item length", 20);
    return (
      <BlockitListLayout
        element={{
          itemStackDirection: "horizontal",
          itemStackDirection_web: "horizontal",
          scrollDirection: "vertical",
          scrollDirection_web: "vertical",
          scrollable: false,
          scrollable_web: false,

          rowCount: numberKnob("rowCount", 2),
          columnCount: numberKnob("columnCount", 2),
          rowCount_web: numberKnob("rowCount_web", 2),
          columnCount_web: numberKnob("columnCount_web", 4),
          maxDisplayedItemsCount: booleanKnob("Enable Max Display Item", false)
            ? numberKnob("maxDisplayedItemsCount", 6)
            : undefined,
          maxDisplayedItemsCount_web: booleanKnob(
            "Enable Max Display Item web",
            false,
          )
            ? numberKnob("maxDisplayedItemsCount_web", 8)
            : undefined,
          itemGutterSize: numberKnob("itemGutterSize", 8),
          itemGutterSize_web: numberKnob("itemGutterSize_web", 12),
        }}
      >
        {fill(Array(itemLength), "A").map((_, idx) => (
          <MOCK_ITEM key={idx}>Hello Item {idx}</MOCK_ITEM>
        ))}
      </BlockitListLayout>
    );
  })
  .add("Scroll", () => {
    const itemLength = numberKnob("item length", 55);
    const customArrow = selectKnob(
      "Arrow type",
      {
        Dimmed: "Dimmed",
        Portal: "Portal",
      },
      "Dimmed",
    );
    return (
      <>
        <PotalContainer id="blockit-area"></PotalContainer>
        <BlockitListLayout
          element={{
            itemStackDirection: "horizontal",
            itemStackDirection_web: "horizontal",
            scrollDirection: "horizontal",
            scrollDirection_web: "horizontal",
            scrollable: true,
            scrollable_web: true,

            rowCount: numberKnob("rowCount", 2),
            columnCount: numberKnob("columnCount", 2),
            rowCount_web: numberKnob("rowCount_web", 2),
            columnCount_web: numberKnob("columnCount_web", 4),
            maxDisplayedItemsCount: booleanKnob(
              "Enable Max Display Item",
              false,
            )
              ? numberKnob("maxDisplayedItemsCount", 6)
              : undefined,
            maxDisplayedItemsCount_web: booleanKnob(
              "Enable Max Display Item web",
              false,
            )
              ? numberKnob("maxDisplayedItemsCount_web", 8)
              : undefined,
            itemGutterSize: numberKnob("itemGutterSize", 8),
            itemGutterSize_web: numberKnob("itemGutterSize_web", 12),
          }}
          rightArrow={
            customArrow === "Dimmed" ? DimmedRightArrow : PortalRightArrow
          }
          leftArrow={
            customArrow === "Dimmed" ? DimmedLeftArrow : PortalLeftArrow
          }
          arrowPortalTargetId="blockit-area"
        >
          {fill(Array(itemLength), "A").map((_, idx) => (
            <MOCK_ITEM key={idx}>Hello Item {idx}</MOCK_ITEM>
          ))}
        </BlockitListLayout>
      </>
    );
  });
