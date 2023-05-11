import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";

import MoimList from ".";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/MoimList`, module).add(
  "Default",
  () => (
    <MoimList
      tagName=""
      displayTagSelector={true}
      tags={{
        data: [],
        paging: {},
      }}
      moimList={{
        data: [
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
          RAW.GROUP,
        ],
        paging: {},
      }}
      recommendMoims={{ data: [], paging: {} }}
      isLoading={false}
      isRecommendMoimsLoading={false}
      sortOptions={[
        { sort: "sortKey", order: "desc" },
        { sort: "createdAt", order: "desc" },
        { sort: "createdAt", order: "asc" },
        { sort: "latestAt", order: "desc" },
      ]}
      selectedLabels={[]}
      handler={action("load more groups")}
      onJoinClick={action("onJoinClick")}
      onChangeSelectedTags={action("onChangeSelectedTags")}
      onChangeOption={action("onChangeOption")}
    />
  ),
);
