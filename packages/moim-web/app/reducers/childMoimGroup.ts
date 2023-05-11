import produce from "immer";
import { AllActions } from "app/actions";
import { ChildMoimGroupTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.ChildMoimGroup.IReduxState = {
  groupByMoims: {},
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ChildMoimGroupTypes.SUCCEED_FETCH_CHILD_MOIM_GROUP_MOIMS: {
        const { id, moims, loadType, isInitialFetch } = action.payload;
        if (draft.groupByMoims[id] && !isInitialFetch) {
          if (loadType === "scroll") {
            draft.groupByMoims[id].data = draft.groupByMoims[id].data.concat(
              moims.data,
            );
          } else {
            draft.groupByMoims[id].data = moims.data;
          }
          draft.groupByMoims[id].paging = moims.paging;
        } else {
          draft.groupByMoims[id] = moims;
        }
        break;
      }
    }
  });
}
