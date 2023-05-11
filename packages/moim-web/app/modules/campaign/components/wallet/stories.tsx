import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import LogItem from "./components/logItem";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Campaign/Wallet/Components`,
  module,
).add("Default", () => {
  return (
    <LogItem
      currency="KRW"
      canUsername=""
      createAt={Date.now()}
      amount={12}
      token={{
        code: "test.c",
        symbol: "ACT",
        price: 1000,
        decimal: "6",
      }}
      transactionType="transfer"
      message="파이팅!!!"
    />
  );
});
