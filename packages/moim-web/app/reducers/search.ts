import produce from "immer";

import { AllActions } from "app/actions";
import { UserTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";

export interface ISearchState {
  users: Moim.IPaginatedListResponse<Moim.Id>;
  searchUsersLoading: boolean;
}

export const INITIAL_STATE: ISearchState = {
  users: {
    data: [],
    paging: {},
  },
  searchUsersLoading: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case UserTypes.START_GET_SEARCH_USERS: {
        draft.searchUsersLoading = true;
        break;
      }

      case UserTypes.SUCCEED_GET_SEARCH_USERS: {
        const { users, isLoadMore } = action.payload;
        if (isLoadMore) {
          draft.users = mergePaginatedResponse(draft.users, users);
        } else {
          draft.users = users;
        }

        draft.searchUsersLoading = false;
        break;
      }

      case UserTypes.FAILED_GET_SEARCH_USERS: {
        draft.searchUsersLoading = false;
        break;
      }

      case UserTypes.CLEAR_SEARCHED_USERS: {
        draft.users = INITIAL_STATE.users;
        break;
      }
    }
  });
}
