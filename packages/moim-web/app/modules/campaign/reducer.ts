import produce from "immer";
import { AllActions } from "app/actions";
import { CampaignProjectTypes } from "app/actions/types";

export interface IReduxState {
  openExecutionCreateDialog: boolean;
  openExecutionShow: boolean;
  openExecutionVoteListDialog: boolean;
  openExecutionVoteDialog: boolean;
  executionVoteDialogType: "deny" | "agree";
  openRemitResultDialog: {
    isOpen: boolean;
    type: "failed" | "succeed";
  };
  isCampaignLoading: boolean;
  currentCampaignId: Moim.Id | null;
  currentExecutionId: Moim.Id | null;
  votes: {
    accepted: Moim.IPaginatedListResponse<Moim.Id>;
    rejected: Moim.IPaginatedListResponse<Moim.Id>;
  };
}

export const INITIAL_STATE: IReduxState = {
  openExecutionCreateDialog: false,
  openExecutionShow: false,
  openExecutionVoteListDialog: false,
  openExecutionVoteDialog: false,
  executionVoteDialogType: "agree",
  openRemitResultDialog: {
    isOpen: false,
    type: "succeed",
  },
  isCampaignLoading: true,
  currentCampaignId: null,
  currentExecutionId: null,
  votes: {
    accepted: { data: [], paging: {} },
    rejected: { data: [], paging: {} },
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CampaignProjectTypes.START_GET_ALL_CAMPAIGNS:
      case CampaignProjectTypes.START_FETCH_CAMPAIGN: {
        draft.isCampaignLoading = true;
        break;
      }
      case CampaignProjectTypes.SUCCEED_GET_ALL_CAMPAIGNS:
      case CampaignProjectTypes.FAILED_GET_ALL_CAMPAIGNS:
      case CampaignProjectTypes.SUCCEED_FETCH_CAMPAIGN:
      case CampaignProjectTypes.FAILED_FETCH_CAMPAIGN: {
        draft.isCampaignLoading = false;
        break;
      }

      case CampaignProjectTypes.OPEN_EXECUTION_CREATE_DIALOG: {
        draft.openExecutionCreateDialog = true;
        draft.currentCampaignId = action.payload.campaignId;
        break;
      }
      case CampaignProjectTypes.CLOSE_EXECUTION_CREATE_DIALOG: {
        draft.openExecutionCreateDialog = false;
        draft.currentCampaignId = null;
        break;
      }

      case CampaignProjectTypes.OPEN_EXECUTION_VOTE_DIALOG: {
        draft.openExecutionVoteDialog = true;
        draft.currentCampaignId = action.payload.campaignId;
        draft.currentExecutionId = action.payload.executionId;
        draft.executionVoteDialogType = action.payload.flag;
        break;
      }
      case CampaignProjectTypes.CLOSE_EXECUTION_VOTE_DIALOG: {
        draft.openExecutionVoteDialog = false;
        if (!draft.openExecutionShow) {
          draft.currentCampaignId = null;
          draft.currentExecutionId = null;
        }
        draft.executionVoteDialogType = "agree";
        break;
      }

      case CampaignProjectTypes.OPEN_EXECUTION_VIEW_DIALOG: {
        draft.openExecutionShow = true;
        draft.currentCampaignId = action.payload.campaignId;
        draft.currentExecutionId = action.payload.executionId;
        break;
      }
      case CampaignProjectTypes.CLOSE_EXECUTION_VIEW_DIALOG: {
        draft.openExecutionShow = false;
        draft.currentCampaignId = null;
        draft.currentExecutionId = null;
        break;
      }

      case CampaignProjectTypes.OPEN_EXECUTION_VOTE_LIST_DIALOG: {
        draft.openExecutionVoteListDialog = true;
        draft.currentCampaignId = action.payload.campaignId;
        draft.currentExecutionId = action.payload.executionId;
        draft.votes = {
          accepted: { data: [], paging: {} },
          rejected: { data: [], paging: {} },
        };
        break;
      }

      case CampaignProjectTypes.CLOSE_EXECUTION_VOTE_LIST_DIALOG: {
        draft.openExecutionVoteListDialog = false;
        if (!draft.openExecutionShow) {
          draft.currentCampaignId = null;
          draft.currentExecutionId = null;
        }
        draft.votes = {
          accepted: { data: [], paging: {} },
          rejected: { data: [], paging: {} },
        };
        break;
      }

      case CampaignProjectTypes.OPEN_REMIT_RESULT_DIALOG: {
        draft.openRemitResultDialog.isOpen = true;
        draft.openRemitResultDialog.type = action.payload.type;
        draft.currentCampaignId = action.payload.campaignId;
        draft.currentExecutionId = action.payload.executionId;
        break;
      }
      case CampaignProjectTypes.CLOSE_REMIT_RESULT_DIALOG: {
        draft.openRemitResultDialog.isOpen = false;
        draft.openRemitResultDialog.type = "succeed";

        if (!draft.openExecutionShow) {
          draft.currentCampaignId = null;
          draft.currentExecutionId = null;
        }
        break;
      }

      case CampaignProjectTypes.SUCCEED_GET_EXECUTION_VOTES: {
        if (draft.currentExecutionId === action.payload.executionId) {
          if (action.payload.status === "rejected") {
            if (action.payload.mode === "new") {
              draft.votes.rejected = action.payload.votes;
            } else {
              draft.votes.rejected.data = draft.votes.rejected.data.concat(
                action.payload.votes.data,
              );
              draft.votes.rejected.paging = action.payload.votes.paging;
            }
          } else {
            if (action.payload.mode === "new") {
              draft.votes.accepted = action.payload.votes;
            } else {
              draft.votes.accepted.data = draft.votes.accepted.data.concat(
                action.payload.votes.data,
              );
              draft.votes.accepted.paging = action.payload.votes.paging;
            }
          }
        }
        break;
      }
    }
  });
}
