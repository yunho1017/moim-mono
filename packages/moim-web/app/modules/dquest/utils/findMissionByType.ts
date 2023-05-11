import { memoize } from "lodash";

const findMissionByType = memoize(
  (
    startNode: Moim.DQuest.IMission,
    missionType: string,
  ): Moim.DQuest.IMissionEventOp | undefined => {
    switch (startNode.type) {
      case "AND":
      case "OR": {
        return startNode.children.find(child =>
          findMissionByType(child, missionType),
        ) as Moim.DQuest.IMissionEventOp | undefined;
      }
      case "EVENT": {
        if (startNode.schemeId.includes(`|${missionType}`)) {
          return startNode;
        }
        return undefined;
      }
    }
  },
);

export default findMissionByType;
