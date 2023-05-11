import produce from "immer";
import { AllActions } from "app/actions";
import { ActionTypes } from "./actions";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";

export interface IMyInviteeListDialogState {
  open: boolean;

  referralInviteeListLoading: boolean;
  referralInviteeList: Moim.IPaginatedListResponse<
    Moim.Referral.IReferralInvitee
  >;

  credit: {
    loading: boolean;
    histories: Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem>;
  };
}

export const INITIAL_STATE: IMyInviteeListDialogState = {
  open: false,
  referralInviteeListLoading: false,
  referralInviteeList: { data: [], paging: {} },

  credit: {
    loading: false,
    histories: { data: [], paging: {} },
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.OPEN: {
        draft.open = true;
        break;
      }

      case ActionTypes.CLOSE: {
        draft.open = false;
        break;
      }

      case ActionTypes.START_FETCHING_REFERRAL_INVITEE_LIST: {
        draft.referralInviteeListLoading = true;
        break;
      }
      case ActionTypes.SUCCEED_FETCHING_REFERRAL_INVITEE_LIST: {
        draft.referralInviteeListLoading = false;

        const { fetchDirection, referralInviteeList } = action.payload;
        if (fetchDirection === null) {
          draft.referralInviteeList = referralInviteeList;
        } else if (fetchDirection === "before") {
          draft.referralInviteeList = mergePaginatedResponse(
            referralInviteeList,
            draft.referralInviteeList,
          );
        } else if (fetchDirection === "after") {
          draft.referralInviteeList = mergePaginatedResponse(
            draft.referralInviteeList,
            referralInviteeList,
          );
        }
        draft.referralInviteeList.paging = referralInviteeList.paging;
        break;
      }
      case ActionTypes.FAILED_FETCHING_REFERRAL_INVITEE_LIST: {
        draft.referralInviteeListLoading = false;
        break;
      }

      case ActionTypes.START_FETCHING_REFERRAL_CREDIT_HISTORIES: {
        draft.credit.loading = true;
        break;
      }
      case ActionTypes.SUCCEED_FETCHING_REFERRAL_CREDIT_HISTORIES: {
        draft.credit.loading = false;

        const { fetchDirection, response } = action.payload;

        if (fetchDirection === null) {
          draft.credit.histories = response;
        } else if (fetchDirection === "before") {
          draft.credit.histories = mergePaginatedResponse(
            response,
            draft.credit.histories,
          );
        } else if (fetchDirection === "after") {
          draft.credit.histories = mergePaginatedResponse(
            draft.credit.histories,
            response,
          );
        }
        draft.credit.histories.paging = response.paging;
        break;
      }
      case ActionTypes.FAILED_FETCHING_REFERRAL_CREDIT_HISTORIES: {
        draft.credit.loading = false;
        break;
      }
    }
  });
}
