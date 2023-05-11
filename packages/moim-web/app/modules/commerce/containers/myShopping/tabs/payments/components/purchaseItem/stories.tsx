import * as React from "react";
import { Provider } from "react-redux";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState } from "app/rootReducer";

import PurchaseItem from ".";
import { NORMALIZED, RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Payments/components`,
  module,
).add("PurchaseItem", () => {
  const mock = generateMockStore({
    ...initialState,
    entities: {
      ...initialState.entities,
      ...NORMALIZED.COMMERCE.hubSeller.entities,
      ...NORMALIZED.COMMERCE.subSellers.entities,
    },
  });
  const target = RAW.COMMERCE.payments.data[0];

  return (
    <Provider store={mock}>
      <PurchaseItem
        purchaseId={target.id}
        status="created"
        currency="KRW"
        purchaseItem={target.purchaseItems[0]}
      />
    </Provider>
  );
});
