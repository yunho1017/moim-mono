import * as React from "react";
import { Provider } from "react-redux";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { boolean: booleanKnob } = require("@storybook/addon-knobs");

import PurchaseReadyItem from ".";
import { initialState } from "app/rootReducer";
import { generateMockStore } from "app/__mocks__/mockStore";
import { RAW, NORMALIZED } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Commerce/PurchaseReadyItem`,
  module,
).add("Default", () => {
  const mockStore = generateMockStore({
    ...initialState,
    entities: {
      ...initialState.entities,
      ...NORMALIZED.COMMERCE.productShow.entities,
      commerce_product: {
        ...NORMALIZED.COMMERCE.productShow.entities.commerce_product,
      },
    },
  });

  const variantId = booleanKnob("Has option", false) ? "FZ7GU35BG5" : undefined;

  return (
    <Provider store={mockStore}>
      <PurchaseReadyItem
        productId={NORMALIZED.COMMERCE.productShow.result}
        variantId={variantId}
        sellerId={RAW.COMMERCE.productShow.sellerId}
        qty={1}
        onChangeProperty={action("onChange")}
      />
    </Provider>
  );
});
