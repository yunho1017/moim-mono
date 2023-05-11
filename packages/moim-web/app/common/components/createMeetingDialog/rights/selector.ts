import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { permissionSelector } from "app/selectors/permission";
import { CHANNEL_RIGHTS_TEXT_KEY, RIGHT_HOLDER_TYPE, IInfo } from "./constants";

const getHolder = (appliedType: Moim.Permission.APPLIED_TYPE) => {
  switch (appliedType) {
    case "ANYONE":
      return RIGHT_HOLDER_TYPE.ANYONE;
    case "MEMBERS":
      return RIGHT_HOLDER_TYPE.MEMBERS;
    case "LIMITED":
      return RIGHT_HOLDER_TYPE.LIMITED;
  }
};

export const channelRightsSelector = createSelector(
  permissionSelector,
  (_1: IAppState, _2: Moim.Id, channelType: Moim.Channel.Type) => channelType,
  (permissions, channelType) => {
    const permissionRights = permissions.reduce<{ [key: string]: {} }>(
      (acc, currentPermission) => ({
        ...acc,
        [currentPermission.right]: {
          defaultRightHolder: getHolder(currentPermission.applied_type),
          limited: currentPermission.limited,
        },
      }),
      {} as Record<string, IInfo>,
    );

    const rightArray = [
      {
        ...CHANNEL_RIGHTS_TEXT_KEY.COMMON.ACCESS,
        ...permissionRights.ACCESS,
      },
    ];
    switch (channelType) {
      case "forum": {
        Object.entries(CHANNEL_RIGHTS_TEXT_KEY.FORUM).forEach(item => {
          const data = {
            ...item[1],
            ...permissionRights[item[0]],
          };
          rightArray.push(data);
        });
        break;
      }
      case "conversation": {
        Object.entries(CHANNEL_RIGHTS_TEXT_KEY.CONVERSATION).forEach(item => {
          const data: IInfo = {
            ...item[1],
            ...permissionRights[item[0]],
          };
          rightArray.push(data);
        });
        break;
      }
    }
    return rightArray;
  },
);
