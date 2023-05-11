import * as React from "react";
import QuestMissionary from "app/common/components/dquestMissionary";
// import QuestMissionaryComponent from "app/common/components/dquestMissionary/component";
// import useBlinkBehavior from "common/hooks/useBlinkBehavior";

const TestBed = ({}) => {
  // const { status, onSetAction } = useBlinkBehavior({ resolveTime: 3000 });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "800px",
          backgroundColor: "azure",
        }}
      >
        스크롤 늘리기용
      </div>
      <QuestMissionary questId="DQ:3A25LE9V" />
      <div
        style={{
          width: "100%",
          height: "800px",
          backgroundColor: "azure",
        }}
      >
        스크롤 늘리기용
      </div>
      {/* <QuestMissionaryComponent
        isLoading={false}
        isJoinLoading={false}
        isAchieveLoading={false}
        isLoadingHistory={status}
        quest={{
          communityId: "G05S47R5ZJ",
          id: "DQ:39FCJSID",
          title: "Showcase Badge Test ",
          description: "Showcase Badge Test ",
          status: "ACTIVE",
          joinType: "EXPLICIT",
          achieveType: "EXPLICIT",
          joinTitle: "퀘스트 시작하자!",
          achieveTitle: "보상 받기",
          displayStatus: "ACTIVE",
          mission: {
            type: "OR",
            children: [
              {
                id: "DM-39FCJS6N",
                type: "EVENT",
                schemeId: "yTcLTFVt9d0OX0GMaYeih9H3cxDrR5Ke|retweet",
                title: "Retweet a Tweet",
                verification: {
                  type: "FILTER",
                  filter: {
                    fieldName: "tweetId",
                    operation: {
                      operator: "EQ",
                      value: "1612793087935512577",
                    },
                  },
                },
                frequency: {
                  value: 1,
                  sampling: "EACH",
                },
                action: {
                  payloads: [
                    {
                      name: "tweetId",
                      value: "1612793087935512577",
                    },
                  ],
                },
              },
              {
                id: "DM-39FCJVXK",
                type: "EVENT",
                schemeId: "XF55p2ELsfOLxPU9sCEgzu9dhOaGAn5p|vote",
                title: "Take a quiz in Snapshot",
                verification: {
                  type: "FILTER",
                  filter: {
                    fieldName: "proposalId",
                    operation: {
                      operator: "EQ",
                      value:
                        "0x02c3fcd64e86157d07c88e5a715ac08f57655917f8bfd5be30a99092136511ec",
                    },
                  },
                },
                frequency: {
                  value: 1,
                  sampling: "EACH",
                },
                action: {
                  payloads: [
                    {
                      name: "proposalId",
                      value:
                        "0x02c3fcd64e86157d07c88e5a715ac08f57655917f8bfd5be30a99092136511ec",
                    },
                  ],
                },
              },
            ],
          },
          outcomes: [
            {
              title: "Issue Badge",
              schemeId: "bVNr9THd3NAnAqllTkbDJUUUD60JmiKb|claim-badge",
              contentVisible: false,
              propertyTemplates: [
                {
                  name: "badgeId",
                  type: "text",
                  value: "QmFkZ2U6MDAwMDAwMDAwMDAwMzE0MA==",
                },
              ],
            },
          ],
          action: {
            type: "NONE",
          },
          preview: {
            showCoverImage: false,
            showDetailButton: true,
            showActionButton: false,
            showOutcome: true,
            showProgress: true,
          },
          show: {
            imageUrls: [],
          },
          progressVisible: true,
          createdBy: {
            canId: "VXNlcjo0ZjJiYWEzOS1jNjE1LTQ2ODItYWQwYi1iNGE2ZDQ4Yzg3OTY=",
            userId: "VXNlcjo0ZjJiYWEzOS1jNjE1LTQ2ODItYWQwYi1iNGE2ZDQ4Yzg3OTY=",
            profileId:
              "VXNlcjo0ZjJiYWEzOS1jNjE1LTQ2ODItYWQwYi1iNGE2ZDQ4Yzg3OTY=",
            addresses: ["0xD8497540B4B5861C7354C670a76fB01b4756b73e"],
          } as any,
          createdAt: 1675682000513,
          updatedAt: 1675682000523,
          humanizedMissions: [
            {
              missionId: "DM-39FCJS6N",
              type: "SIMPLE",
              requiredCount: 1,
            },
            {
              missionId: "DM-39FCJVXK",
              type: "SIMPLE",
              requiredCount: 1,
            },
          ],
          attendedCount: 9,
          completedCount: 6,
          viewerCount: 0,
        }}
        history={{
          userId: "VXNlcjo0MjFmNjk3YS01ZGVkLTQ5NTAtOGYwZi0wMWY5ZTgzNmY3ZGY=",
          questId: "DQ:39FCJSID",
          status: "IN_PROGRESS",
          // status: "ACHIEVED_NOT_REWARDED",
          // status: "ACHIEVED",
          progressVisible: true,
          progressTotal: 2,
          progress: 1,
          missionProgress: [
            {
              missionId: "DM-39FCJS6N",
              missionTitle: "Retweet a Tweet",
              progress: 1,
              progressTotal: 1,
            },
            {
              missionId: "DM-39FCJVXK",
              missionTitle: "Take a quiz in Snapshot",
              progress: 0,
              progressTotal: 1,
            },
          ],
          actionable: true,
          reJoinable: false,
        }}
        onClickJoin={() => {
          console.log(">>>>> onClickJoin");
        }}
        onClickVerifyAll={() => {
          onSetAction();
          console.log(">>>>> onClickVerifyAll");
        }}
        onClickMission={id => {
          console.log(">>>>> onClickMissionClick", id);
        }}
        onClickAchieve={() => {
          console.log(">>>>> onClickAchieve");
        }}
      /> */}
    </div>
  );
};

export default TestBed;
