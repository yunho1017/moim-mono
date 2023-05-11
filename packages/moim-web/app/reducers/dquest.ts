import produce from "immer";
import { AllActions } from "app/actions";
import { DQuestTypes } from "app/actions/types";

export interface IDQuestState {
  questList: Moim.IPaginatedListResponse<Moim.Id>;
  myQuestList: Record<
    Moim.DQuest.HISTORY_STATUS,
    Moim.IPaginatedListResponse<Moim.Id>
  >;
}

export const INITIAL_STATE: IDQuestState = {
  questList: { data: [], paging: {} },
  myQuestList: {
    IN_PROGRESS_NOT_JOINED: { data: [], paging: {} },
    IN_PROGRESS: { data: [], paging: {} },
    ACHIEVED_NOT_REWARDED: { data: [], paging: {} },
    ACHIEVED: { data: [], paging: {} },
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case DQuestTypes.SUCCEED_FETCH_QUEST_LIST: {
        const { list, loadMorePagingKey } = action.payload;
        if (!loadMorePagingKey) {
          draft.questList = list;
        } else if (loadMorePagingKey.after) {
          draft.questList.data = draft.questList.data.concat(list.data);
          draft.questList.paging = list.paging;
        } else if (loadMorePagingKey.before) {
          draft.questList.data = list.data.concat(draft.questList.data);
          draft.questList.paging = list.paging;
        }

        break;
      }

      case DQuestTypes.SUCCEED_FETCH_HISTORIES: {
        const { hasAfterKey, type, data } = action.payload;

        if (!hasAfterKey) {
          draft.myQuestList[type] = data;
        } else {
          draft.myQuestList[type].data = draft.myQuestList[type].data.concat(
            data.data,
          );
          draft.myQuestList[type].paging = data.paging;
        }
        break;
      }
    }
  });
}
