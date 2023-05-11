import { AllActions } from "app/actions";
import produce from "immer";
import {
  ForumTypes,
  UserTypes,
  ConversationTypes,
  GroupTypes,
} from "app/actions/types";
export interface ISearchState {
  threads: {
    isLoading: boolean;
    isFailed: boolean;
    result: Moim.IPaginatedListResponse<Moim.Forum.ISearchedThreadBody>;
  };
  users: {
    isLoading: boolean;
    isFailed: boolean;
    result: Moim.IPaginatedListResponse<Moim.User.ISearchedUserBody>;
  };
  messages: {
    isLoading: boolean;
    isFailed: boolean;
    result: Moim.IPaginatedListResponse<
      Moim.Conversations.ISearchedMessageBody
    >;
  };
  moims: {
    isLoading: boolean;
    isFailed: boolean;
    result: Moim.IPaginatedListResponse<Moim.Group.ISearchedMoimBody>;
  };
}

export const INITIAL_STATE: ISearchState = {
  threads: {
    isLoading: false,
    isFailed: false,
    result: { data: [], paging: {} },
  },
  users: {
    isLoading: false,
    isFailed: false,
    result: { data: [], paging: {} },
  },
  messages: {
    isLoading: false,
    isFailed: false,
    result: { data: [], paging: {} },
  },
  moims: {
    isLoading: false,
    isFailed: false,
    result: { data: [], paging: {} },
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumTypes.START_SEARCH_THREADS: {
        draft.threads.isLoading = true;
        draft.threads.isFailed = false;
        break;
      }
      case ForumTypes.FAILED_SEARCH_THREADS: {
        draft.threads.isLoading = false;
        draft.threads.isFailed = true;
        break;
      }
      case ForumTypes.SUCCEED_SEARCH_THREADS: {
        draft.threads.isLoading = false;
        draft.threads.result = {
          data: [...draft.threads.result.data, ...action.payload.result.data],
          paging: action.payload.result.paging,
        };
        break;
      }

      case UserTypes.START_SEARCH_PAGE_SEARCH_USERS: {
        draft.users.isLoading = true;
        draft.users.isFailed = false;
        break;
      }
      case UserTypes.FAILED_SEARCH_PAGE_SEARCH_USERS: {
        draft.users.isLoading = false;
        draft.users.isFailed = true;
        break;
      }
      case UserTypes.SUCCEED_SEARCH_PAGE_SEARCH_USERS: {
        draft.users.isLoading = false;
        draft.users.result = {
          data: [...draft.users.result.data, ...action.payload.result.data],
          paging: {
            after: action.payload.result.after,
          },
        };
        break;
      }

      case ConversationTypes.START_SEARCH_MESSAGES: {
        draft.messages.isLoading = true;
        draft.messages.isFailed = false;
        break;
      }
      case ConversationTypes.FAILED_SEARCH_MESSAGES: {
        draft.messages.isLoading = false;
        draft.messages.isFailed = true;
        break;
      }
      case ConversationTypes.SUCCEED_SEARCH_MESSAGES: {
        draft.messages.isLoading = false;
        draft.messages.result = {
          data: [...draft.messages.result.data, ...action.payload.result.data],
          paging: {
            after: action.payload.result.after,
          },
        };
        break;
      }

      case GroupTypes.START_SEARCH_MOIMS: {
        draft.moims.isLoading = true;
        draft.moims.isFailed = false;
        break;
      }
      case GroupTypes.FAILED_SEARCH_MOIMS: {
        draft.moims.isLoading = false;
        draft.moims.isFailed = true;
        break;
      }
      case GroupTypes.SUCCEED_SEARCH_MOIMS: {
        draft.moims.isLoading = false;
        draft.moims.result = {
          data: [...draft.moims.result.data, ...action.payload.result.data],
          paging: {
            after: action.payload.result.after,
          },
        };
        break;
      }

      case ForumTypes.CLEAR_SEARCH_THREADS: {
        draft.threads.result = { data: [], paging: {} };
        break;
      }
      case UserTypes.CLEAR_SEARCH_PAGE_SEARCH_USERS: {
        draft.users.result = { data: [], paging: {} };
        break;
      }
      case ConversationTypes.CLEAR_SEARCH_MESSAGES: {
        draft.messages.result = { data: [], paging: {} };
        break;
      }
      case GroupTypes.CLEAR_SEARCH_MOIMS: {
        draft.moims.result = { data: [], paging: {} };
        break;
      }
    }
  });
}
