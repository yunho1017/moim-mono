import * as React from "react";
import { Provider } from "react-redux";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
// const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

import PositionSearchForm from ".";
import { generateMockStore } from "app/__mocks__/mockStore";
import { NORMALIZED } from "app/__mocks__";
import { initialState } from "app/rootReducer";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/SearchForm/Position`, module)
  .addDecorator((story: any) => {
    const mockStore = generateMockStore({
      ...initialState,
      entities: {
        ...initialState.entities,
        positions: {
          P1: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#fab",
            id: "P1",
            name: "position-P1",
          },
          P2: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#abc",
            id: "P2",
            name: "position-P2",
          },
          P3: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#efa",
            id: "P3",
            name: "position-P3",
          },
          P4: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#aca",
            id: "P4",
            name: "position-P4",
          },
          P5: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#0df",
            id: "P5",
            name: "position-P5",
          },
          P6: {
            ...NORMALIZED.POSITION.entities.positions[0],
            color: "#cca",
            id: "P6",
            name: "position-P6",
          },
        },
      },
      position: {
        ...initialState.position,
        positions: {
          data: ["P1", "P2", "P3", "P4", "P5", "P6"],
          paging: {},
        },
      },
    });
    return <Provider store={mockStore}>{story()}</Provider>;
  })
  .add("Default", () => {
    return (
      <PositionSearchForm
        placeholder={textKnob("placeholder", "포지션을 검색하세요...")}
        chips={[]}
      />
    );
  });
