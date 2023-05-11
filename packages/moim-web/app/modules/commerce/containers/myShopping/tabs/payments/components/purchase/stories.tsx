import * as React from "react";
import { Provider } from "react-redux";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState } from "app/rootReducer";

import PurchaseList from ".";
import { NORMALIZED, RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Payments/components`,
  module,
).add("PurchaseList", () => {
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
      <PurchaseList
        purchaseId={target.id}
        status="paid"
        currency="KRW"
        purchaseList={target.items}
      />
    </Provider>
  );
});
