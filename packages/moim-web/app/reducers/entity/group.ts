import { produce } from "immer";
import { isEmpty } from "lodash";
import { AllActions } from "app/actions";
import { EntityTypes, GroupTypes, UserTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Group.INormalizedData = window.__bootData?.data
  ?.group
  ? {
      [window.__bootData.data.group.id]: window.__bootData.data.group,
    }
  : {};

export function reducer(
  state: Moim.Group.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        const groups = action.payload.groups;
        const newGroups: Record<Moim.Id, Moim.Group.INormalizedGroup> = {};
        if (groups) {
          const keys = Object.keys(groups);
          keys.forEach(key => {
            if (groups[key]) {
              if (
                action.payload.forceUpdate ||
                groups[key]?.tags !== draft[key]?.tags ||
                groups[key]?.joined !== draft[key]?.joined ||
                (!draft[key]?.user_mobile_top_tabs &&
                  groups[key]?.user_mobile_top_tabs) ||
                groups[key]?.updated_at > (draft[key]?.updated_at ?? 0)
              ) {
                newGroups[key] = {
                  ...groups[key],
                  user_mobile_top_tabs:
                    groups[key]?.user_mobile_top_tabs ??
                    draft[key]?.user_mobile_top_tabs,
                };
              }
            }
          });
        }

        if (!isEmpty(newGroups)) {
          Object.entries(newGroups).forEach(([key, value]) => {
            draft[key] = value;
          });
          return draft;
        }
        break;
      }

      case UserTypes.SUCCEED_POST_USER: {
        const { groupId } = action.payload;

        if (draft[groupId]) {
          draft[groupId].users_count += 1;
        }
        break;
      }

      case GroupTypes.SUCCESS_BOOT_STRAP: {
        const { group } = action.payload;

        if (group) {
          draft[group.id] = group;
        }
      }

      default: {
        break;
      }
    }
  });
}
