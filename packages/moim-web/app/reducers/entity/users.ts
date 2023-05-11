import _ from "lodash";
import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, MeTypes, CryptoBadgeTypes } from "app/actions/types";
import deepMerge from "common/helpers/merge/deepMerge";
import { UserStatusTypes } from "app/enums";

export function reducer(
  state: Moim.User.INormalizedData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        const users = action.payload.users;
        if (users) {
          const keys = Object.keys(users);
          keys.forEach(key => {
            if (users[key]) {
              if ((users[key] as any).type === "COMMAND") {
                // NOTE: case for searched user(mention) command.
                draft[key] = users[key];
              }

              if (
                users[key].updated_at > (draft[key]?.updated_at ?? 0) ||
                users[key].presence !== draft[key]?.presence
              ) {
                draft[key] = {
                  ...draft[key],
                  ...users[key],
                  cachedAt: Date.now(),
                };
              } else {
                if (draft[key]) {
                  if (users[key].email && !draft[key].email) {
                    draft[key].email = users[key].email;
                  }

                  if (users[key].phoneNumber && !draft[key].phoneNumber) {
                    draft[key].phoneNumber = users[key].phoneNumber;
                  }

                  if (users[key].canId && !draft[key].canId) {
                    draft[key].canId = users[key].canId;
                  }

                  if (
                    draft[key].status === UserStatusTypes.PENDING &&
                    (users[key].status === UserStatusTypes.ACTIVE ||
                      users[key].status === UserStatusTypes.DEACTIVATED)
                  ) {
                    draft[key].status = users[key].status;
                  }
                }
              }
            }
          });
        }

        break;
      }

      case CryptoBadgeTypes.SUCCEED_FETCHING_CERTIFICATIONS: {
        const targetUser = draft[action.payload.userId];
        targetUser.certifications = {
          data: _.uniqBy(
            [
              ...action.payload.certificationIds.data,
              ...(targetUser.certifications?.data ?? []),
            ],
            item => item.node,
          ),
        };

        if (action.payload.certifications) {
          targetUser.certificationStatus = action.payload.certifications;
        }
        targetUser.cachedAt = Date.now();
        break;
      }

      case MeTypes.SUCCEEDED_CHANGE_MY_PROFILE: {
        const targetUser = draft[action.payload.newUserData.id];
        if (targetUser) {
          draft[action.payload.newUserData.id] = deepMerge(targetUser, {
            ...action.payload.newUserData,
            avatar: action.payload.newUserData.avatar_url,
          });
          targetUser.cachedAt = Date.now();
        }
        break;
      }
    }
  });
}
