import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");

import { STORY_BOOK_PATH } from "../..";
import SummaryPreview from "./summaryPreview";
import RequestFundItem from "./requestFundItem";
import { RAW } from "app/__mocks__/index";

storiesOf(`${STORY_BOOK_PATH}/Components/Campaign`, module)
  .add("SummaryPreview", () => {
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <SummaryPreview
          campaignId="TEST"
          sectionWidth={numberKnob("sectionWidth", 100)}
          contentWidth={numberKnob("contentWidth", 100)}
        />
      </div>
    );
  })
  .add("RequestFundItem", () => (
    <RequestFundItem
      id="1234"
      title="타이틀 타이틀"
      campaignId=""
      communityAccount=""
      creatorId=""
      profileId=""
      currency="KRW"
      creator={RAW.GROUP_WITH_USER.user}
      canAccount=""
      proposalName=""
      requestId=""
      transferCodeId=""
      passRule=""
      voteDuration={1}
      status="proposed"
      amount={100000}
      bankInformation=""
      executedAt={Date.now()}
      voters={[]}
      startAt={Date.now() - 3600000}
      endAt={Date.now() + 3600000}
      redirectUrl=""
      signUrl=""
      acceptedCount={0}
      rejectedCount={0}
      voterPositions={[]}
    />
  ));
