import { AllActions } from "app/actions";
import { ForumEditorTypes } from "app/actions/types";

export interface IForumEditorPage {
  isLoading: boolean;
  hasFailed: boolean;
  isPosted: boolean;
}

export const INITIAL_STATE: IForumEditorPage = {
  isLoading: false,
  hasFailed: false,
  isPosted: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  switch (action.type) {
    case ForumEditorTypes.START_POSTING_THREAD:
    case ForumEditorTypes.START_UPDATE_THREAD: {
      return {
        isLoading: true,
        hasFailed: false,
        isPosted: false,
      };
    }

    case ForumEditorTypes.FAILED_POSTING_THREAD:
    case ForumEditorTypes.FAILED_UPDATE_THREAD: {
      return {
        isLoading: false,
        hasFailed: true,
        isPosted: false,
      };
    }

    case ForumEditorTypes.SUCCEEDED_POSTING_THREAD:
    case ForumEditorTypes.SUCCEEDED_UPDATE_THREAD: {
      return {
        isLoading: false,
        hasFailed: false,
        isPosted: true,
      };
    }

    default: {
      return state;
    }
  }
}
