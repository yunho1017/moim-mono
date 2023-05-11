import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, PositionTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Position.INormalizedPositionEntities = {};

export function reducer(
  state: Moim.Position.INormalizedPositionEntities = {},
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.positions) {
          Object.entries(action.payload.positions).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }

      case PositionTypes.SUCCEED_DELETE_POSITION: {
        const positionId = action.payload.position.data;
        delete draft[positionId];
        break;
      }

      case PositionTypes.SUCCEED_UPDATE_POSITION_PRIORITY: {
        const { position } = action.payload;
        const id = position.id;
        if (draft[id]) {
          draft[id].priority = position.priority;
        }

        break;
      }
    }
  });
}
