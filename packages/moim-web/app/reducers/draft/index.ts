import { AllActions } from "app/actions";
import produce from "immer";
import { ForumDraftTypes, ForumTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";

export interface IDraftState {
  modalOpen: boolean;
  draftCount: number;
  currentDraftId: Moim.Id | null;
  isLoading: boolean;
  isListLoading: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  deleteStateRecord: Record<Moim.Id, { loading: boolean; failed: boolean }>;
  errorBy: "save" | "update" | "deleteAll" | "load" | null;
  drafts: Moim.IPaginatedListResponse<Moim.Id>;
}

export const INITIAL_STATE: IDraftState = {
  modalOpen: false,
  draftCount: 0,
  currentDraftId: null,
  isLoading: false,
  isListLoading: false,
  isDeleting: false,
  isSaving: false,
  errorBy: null,
  deleteStateRecord: {},
  drafts: {
    data: [],
    paging: {},
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ForumDraftTypes.OPEN_DRAFT_LIST_MODAL: {
        draft.modalOpen = true;
        break;
      }
      case ForumDraftTypes.CLOSE_DRAFT_LIST_MODAL: {
        draft.modalOpen = false;
        break;
      }

      case ForumDraftTypes.START_UPDATE_DRAFT:
      case ForumDraftTypes.START_SAVE_DRAFT: {
        draft.isSaving = true;
        draft.errorBy = null;
        break;
      }

      case ForumDraftTypes.FAILED_UPDATE_DRAFT: {
        draft.isSaving = false;
        draft.errorBy = "update";
        break;
      }
      case ForumDraftTypes.FAILED_SAVE_DRAFT: {
        draft.isSaving = false;
        draft.errorBy = "save";
        break;
      }

      case ForumDraftTypes.SUCCEEDED_UPDATE_DRAFT: {
        draft.isSaving = false;
        break;
      }

      case ForumDraftTypes.SUCCEEDED_SAVE_DRAFT: {
        draft.isSaving = false;
        draft.currentDraftId = action.payload.draftId;
        draft.draftCount++;
        draft.drafts.data = [action.payload.draftId, ...draft.drafts.data];
        break;
      }

      case ForumDraftTypes.SET_CURRENT_DRAFT: {
        draft.currentDraftId = action.payload.draftId;
        break;
      }

      case ForumDraftTypes.START_DELETE_DRAFT: {
        const { draftId } = action.payload;
        draft.deleteStateRecord[draftId] = {
          loading: true,
          failed: false,
        };
        break;
      }
      case ForumDraftTypes.FAILED_DELETE_DRAFT: {
        const { draftId } = action.payload;
        draft.deleteStateRecord[draftId] = {
          loading: false,
          failed: true,
        };
        break;
      }
      case ForumDraftTypes.SUCCEEDED_DELETE_DRAFT: {
        const { draftId } = action.payload;
        draft.draftCount--;
        delete draft.deleteStateRecord[draftId];
        draft.drafts.data = draft.drafts.data.filter(id => id !== draftId);
        if (draft.currentDraftId === draftId) {
          draft.currentDraftId = null;
        }
        break;
      }

      case ForumDraftTypes.START_GET_DRAFT_LIST: {
        draft.isListLoading = true;
        draft.errorBy = null;
        break;
      }
      case ForumDraftTypes.FAILED_GET_DRAFT_LIST: {
        draft.isListLoading = false;
        draft.errorBy = "load";
        break;
      }
      case ForumDraftTypes.SUCCEEDED_GET_DRAFT_LIST: {
        draft.isListLoading = false;
        draft.drafts = mergePaginatedResponse(draft.drafts, action.payload);
        break;
      }

      case ForumDraftTypes.START_DELETE_ALL_DRAFT: {
        draft.isDeleting = true;
        draft.errorBy = null;
        break;
      }
      case ForumDraftTypes.FAILED_DELETE_ALL_DRAFT: {
        draft.isDeleting = false;
        draft.errorBy = "deleteAll";
        break;
      }
      case ForumDraftTypes.SUCCEEDED_DELETE_ALL_DRAFT: {
        draft.isDeleting = false;
        draft.draftCount = 0;
        draft.drafts = INITIAL_STATE.drafts;
        break;
      }

      case ForumTypes.CLEAR_CURRENT_THREAD: {
        draft.currentDraftId = null;
        break;
      }

      case ForumDraftTypes.START_GET_DRAFT: {
        draft.isLoading = true;
        break;
      }

      case ForumDraftTypes.SUCCEEDED_GET_DRAFT: {
        draft.isLoading = false;
        draft.currentDraftId = action.payload.threadId;
        break;
      }

      case ForumDraftTypes.FAILED_GET_DRAFT: {
        draft.isLoading = false;
        draft.errorBy = "load";
        break;
      }

      case ForumDraftTypes.SUCCEEDED_GET_DRAFT_COUNT: {
        draft.draftCount = action.payload.count;
        break;
      }

      case ForumDraftTypes.SOFT_DELETE_DRAFT: {
        draft.draftCount--;
        draft.drafts.data = draft.drafts.data.filter(
          id => id !== action.payload.draftId,
        );
        break;
      }
    }
  });
}
