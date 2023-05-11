import * as React from "react";
import { Provider } from "react-redux";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { boolean: booleanKnob } = require("@storybook/addon-knobs");
import { RAW, NORMALIZED } from "app/__mocks__";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState } from "app/rootReducer";

import AddressCard, { AddressCardSkeleton } from "./addressCard";
import AddressCreateDialog from "./createDialog";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/MyShopping/AddressManage`,
  module,
)
  .add("AddressCard", () => {
    return (
      <div style={{ width: "375px" }}>
        <AddressCard
          isDefault={booleanKnob("isDefault", true)}
          data={RAW.COMMERCE.shippingAddress}
          onModifyButtonClick={action("onModifyButtonClick")}
        />
        <AddressCard
          isDefault={false}
          data={RAW.COMMERCE.shippingAddress}
          onModifyButtonClick={action("onModifyButtonClick")}
        />
        <AddressCardSkeleton />
        <AddressCardSkeleton />
      </div>
    );
  })
  .add("AddressCreateDialog", () => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | undefined>();
    const handleEditClick = React.useCallback(() => {
      setOpen(true);
      setSelected("CSA:2ODP8AUD");
    }, []);
    const handleNewClick = React.useCallback(() => {
      setOpen(true);
    }, []);
    const mockStore = generateMockStore({
      ...initialState,
      entities: {
        ...initialState.entities,
        ...NORMALIZED.COMMERCE.shippingAddressList.entities,
      },
    });
    return (
      <Provider store={mockStore}>
        <button onClick={handleEditClick}>수정 다이알로그 열기</button>
        <button onClick={handleNewClick}>새 배송지 다이알로그 열기</button>
        <AddressCreateDialog
          open={open}
          shippingAddressId={selected}
          onClose={() => {
            setOpen(false);
            setSelected(undefined);
          }}
        />
      </Provider>
    );
  });
