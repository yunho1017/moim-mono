import * as React from "react";
import { Provider } from "react-redux";

const { storiesOf } = require("@storybook/react");
import { generateMockStore } from "app/__mocks__/mockStore";
import { RAW } from "app/__mocks__";
import { initialState as appInitialState } from "app/rootReducer";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ProfileEditor from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile Editor/container`,
  module,
).add("Default", () => {
  const mockStore = generateMockStore({
    ...appInitialState,
    app: {
      ...appInitialState.app,
      currentUserId: RAW.NORMALIZED_MEMBER.id,
    },
    entities: {
      ...appInitialState.entities,
      users: {
        [RAW.NORMALIZED_MEMBER.id]: RAW.NORMALIZED_MEMBER,
      },
    },
    profileEditorPage: {
      ...appInitialState.profileEditorPage,
      open: true,
    },
  });
  return (
    <Provider store={mockStore}>
      <ProfileEditor />
    </Provider>
  );
});
