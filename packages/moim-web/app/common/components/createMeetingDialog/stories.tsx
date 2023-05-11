import * as React from "react";
import { Provider } from "react-redux";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { initialState } from "app/rootReducer";
import { generateMockStore } from "app/__mocks__/mockStore";
import CreateMeetingDialog from ".";
import { RAW } from "app/__mocks__";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/CreateMeetingDialog`,
  module,
).add("Default", () => {
  const MOCK_STORE = generateMockStore({
    ...initialState,
    entities: {
      ...initialState.entities,
      positions: {
        111: {
          ...RAW.POSITION,
          id: "111",
          name: "Position Name 111",
        },
        222: {
          ...RAW.POSITION,
          id: "222",
          name: "Position Name 222",
        },
        333: {
          ...RAW.POSITION,
          id: "333",
          name: "Position Name 333",
        },
        444: {
          ...RAW.POSITION,
          id: "444",
          name: "Position Name 444",
        },
        555: {
          ...RAW.POSITION,
          id: "555",
          name: "Position Name 555",
        },
        666: {
          ...RAW.POSITION,
          id: "666",
          name: "Position Name 666",
        },
        777: {
          ...RAW.POSITION,
          id: "777",
          name: "Position Name 777",
        },
        888: {
          ...RAW.POSITION,
          id: "888",
          name: "Position Name 888",
        },
        999: {
          ...RAW.POSITION,
          id: "999",
          name: "Position Name 999",
        },
      },
    },
    position: {
      ...initialState.position,
      positions: {
        data: ["111", "222", "333", "444", "555", "666", "777", "888", "999"],
        paging: {},
      },
    },
    createMeetingDialog: { open: true },
  });
  return (
    <Provider store={MOCK_STORE}>
      <CreateMeetingDialog />
    </Provider>
  );
});
