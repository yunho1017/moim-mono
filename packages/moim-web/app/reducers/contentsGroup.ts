import produce from "immer";
import { AllActions } from "app/actions";
import { ContentsGroupTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.ContentsGroup.IReduxState = {
  groupByThreads: {},
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ContentsGroupTypes.SUCCEED_FETCH_CONTENTS_GROUP_THREADS: {
        const { id, threads, loadType } = action.payload;
        if (draft.groupByThreads[id]) {
          if (loadType === "scroll") {
            draft.groupByThreads[id].data = draft.groupByThreads[
              id
            ].data.concat(threads.data);
          } else {
            draft.groupByThreads[id].data = threads.data;
          }
          draft.groupByThreads[id].paging = threads.paging;
        } else {
          draft.groupByThreads[id] = threads;
        }
        break;
      }
    }
  });
}
