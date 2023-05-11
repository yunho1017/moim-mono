import produce from "immer";
import { AllActions } from "app/actions";
import { GroupTypes } from "app/actions/types";

export interface IReduxState {
  isListLoading: boolean;
  list: Moim.IPaginatedListResponse<Moim.Plugin.IPlugin>;
}

export const INITIAL_STATE: IReduxState = {
  isListLoading: false,
  list: { data: [], paging: {} },
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case GroupTypes.START_GET_INSTALLED_PLUGINS: {
        draft.isListLoading = true;
        break;
      }
      case GroupTypes.FAILED_GET_INSTALLED_PLUGINS: {
        draft.isListLoading = false;
        break;
      }
      case GroupTypes.SUCCEED_GET_INSTALLED_PLUGINS: {
        draft.isListLoading = false;
        if (action.payload.isLoadMore) {
          draft.list = {
            data: [...draft.list.data, ...action.payload.list.data],
            paging: action.payload.list.paging,
          };
        } else {
          draft.list = action.payload.list;
        }
        break;
      }
    }
  });
