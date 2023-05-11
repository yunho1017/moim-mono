import produce from "immer";
import { AllActions } from "app/actions";
import { ActionTypes } from "./actions";

export interface IMyReferralDialogState {
  open: boolean;
  referralStatLoading: boolean;
  referralStat: Moim.Referral.IReferralStat | null;

  promotionLoading: boolean;
  promotion: Moim.Referral.IPromotion | null;
}

export const INITIAL_STATE: IMyReferralDialogState = {
  open: false,
  referralStatLoading: false,
  referralStat: null,

  promotionLoading: false,
  promotion: null,
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

      case ActionTypes.START_FETCHING_REFERRAL_STAT: {
        draft.referralStatLoading = true;
        break;
      }
      case ActionTypes.SUCCEED_FETCHING_REFERRAL_STAT: {
        draft.referralStatLoading = false;
        draft.referralStat = action.payload.referralStat;
        break;
      }
      case ActionTypes.FAILED_FETCHING_REFERRAL_STAT: {
        draft.referralStatLoading = false;
        break;
      }

      case ActionTypes.START_FETCHING_REFERRAL_PROMOTION: {
        draft.promotionLoading = true;
        break;
      }
      case ActionTypes.SUCCEED_FETCHING_REFERRAL_PROMOTION: {
        draft.promotionLoading = false;
        draft.promotion = action.payload.referralPromotion;
        break;
      }
      case ActionTypes.FAILED_FETCHING_REFERRAL_PROMOTION: {
        draft.promotionLoading = false;
        break;
      }
    }
  });
}
