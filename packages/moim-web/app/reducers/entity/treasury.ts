import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE_ITEM: Record<Moim.Id, Moim.Treasury.ITreasury> = {};
export const INITIAL_STATE_HISTORY: Record<
  Moim.Id,
  Moim.Treasury.ITransaction
> = {};

export function treasuryItemReducer(
  state = INITIAL_STATE_ITEM,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.treasuryItems) {
          Object.entries(action.payload.treasuryItems).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}
