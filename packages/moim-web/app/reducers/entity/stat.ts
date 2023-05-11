import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, AppTypes } from "../../actions/types";

export const INITIAL_STATE: Moim.Channel.IStatNormalizedData = {};

export function reducer(
  state: Moim.Channel.IStatNormalizedData = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        Object.entries(action.payload.stats || {}).forEach(([key, value]) => {
          const current = draft[key];

          if (Object.keys(value).length === 0 && current) {
            delete draft[key];
          }

          if (
            !current ||
            current.updated_at === undefined ||
            current.updated_at < value.updated_at
          ) {
            draft[key] = {
              ...current,
              ...value,
            };
          }
        });
        break;
      }

      case AppTypes.USER_GLOBAL_MUTE_NOTIFICATION: {
        Object.keys(draft).forEach(key => {
          draft[key] = {
            count: 0,
          } as Moim.Channel.IChannelStat;
        });
        break;
      }
    }
  });
}
