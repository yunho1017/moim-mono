import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {} = require("@storybook/addon-knobs");

import { DQuestPreviewComponent } from ".";
import QuestPreviewSkeleton from "./skeleton";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/DQuest preview`, module).add(
  "Default",
  () => {
    return (
      <div
        style={{
          width: 360,
          height: "100%",
          gap: "20px",
          paddingBottom: 30,
        }}
      >
        <h4>Normal</h4>
        <DQuestPreviewComponent
          key="1"
          quest={
            (RAW.QUEST_LIST.data[0] as unknown) as Moim.DQuest.INormalizedQuest
          }
          onClick={action("onClick")}
        />

        <h4>Closed</h4>
        <DQuestPreviewComponent
          key="2"
          quest={
            ({
              ...RAW.QUEST_LIST.data[0],
              status: "CLOSED",
              startAt: Date.now() - 864000000,
              endAt: Date.now(),
            } as unknown) as Moim.DQuest.INormalizedQuest
          }
          onClick={action("onClick")}
        />

        <h4>Scheduled</h4>
        <DQuestPreviewComponent
          key="3"
          quest={
            ({
              ...RAW.QUEST_LIST.data[0],
              status: "SCHEDULED",
              startAt: Date.now() + 864000000,
              endAt: Date.now() + 1864000000,
            } as unknown) as Moim.DQuest.INormalizedQuest
          }
          onClick={action("onClick")}
        />
        <h4>Exists Progressbar</h4>
        <DQuestPreviewComponent
          key="4"
          quest={
            ({
              ...RAW.QUEST_LIST.data[0],
              progressVisible: true,
              progressTotal: 31,
              completedCount: 21,
            } as unknown) as Moim.DQuest.INormalizedQuest
          }
          history={
            {
              userId: "testUid",
              questId: RAW.QUEST_LIST.data[0].id,
              status: "IN_PROGRESS",
              progressVisible: true,
              progressTotal: 31,
              progress: 21,
            } as Moim.DQuest.IHistory
          }
          onClick={action("onClick")}
        />

        <h4>Test</h4>
        <DQuestPreviewComponent
          key="6"
          quest={
            (RAW.QUEST_LIST.data[1] as unknown) as Moim.DQuest.INormalizedQuest
          }
          onClick={action("onClick")}
        />

        <h4>Skeleton</h4>
        <QuestPreviewSkeleton key="7" />
      </div>
    );
  },
);
