import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ThreadList from "./index";
import { RAW } from "app/__mocks__";

const { storiesOf } = require("@storybook/react");
const { actions } = require("@storybook/addon-actions");

const MOCK_THREAD = (RAW.THREAD as unknown) as Moim.Forum.IDenormalizedThread;

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/ThreadList`, module).add(
  "Default",
  () => (
    <div>
      <ThreadList
        selectedThreadId=""
        threadList={[
          MOCK_THREAD,
          { ...MOCK_THREAD, id: "2323" },
          { ...MOCK_THREAD, id: "24424" },
        ]}
        isLoading={false}
        paging={{}}
        onLoadMoreThread={actions("onLoadMoreThread")}
      />
    </div>
  ),
);
