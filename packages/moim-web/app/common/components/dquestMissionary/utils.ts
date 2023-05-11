export const searchMission = (
  startMissionNode: Moim.DQuest.IMission,
  missionId: Moim.Id,
): Moim.DQuest.IMissionEventOp | undefined => {
  switch (startMissionNode.type) {
    case "AND":
    case "OR": {
      const typedCurrentNode = startMissionNode as
        | Moim.DQuest.IMissionAndOp
        | Moim.DQuest.IMissionOrOp;
      let returnNode: Moim.DQuest.IMissionEventOp | undefined;
      typedCurrentNode.children.forEach(childNode => {
        const findItem = searchMission(childNode, missionId);
        if (findItem) {
          returnNode = findItem;
          return;
        }
      });

      return returnNode;
    }

    case "EVENT": {
      const typedCurrentNode = startMissionNode as Moim.DQuest.IMissionEventOp;
      if (typedCurrentNode.id === missionId) {
        return typedCurrentNode;
      }

      return undefined;
    }
  }
};
