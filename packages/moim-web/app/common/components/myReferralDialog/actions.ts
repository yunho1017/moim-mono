import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult, ThunkResult } from "app/store";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import ReferralAPI from "common/api/referral";
import { errorParseData } from "common/helpers/APIErrorParser";

export enum ActionTypes {
  OPEN = "MY_REFERRAL_DIALOG.OPEN",
  CLOSE = "MY_REFERRAL_DIALOG.CLOSE",

  START_FETCHING_REFERRAL_STAT = "MY_REFERRAL_DIALOG.START_FETCHING_REFERRAL_STAT",
  SUCCEED_FETCHING_REFERRAL_STAT = "MY_REFERRAL_DIALOG.SUCCEED_FETCHING_REFERRAL_STAT",
  FAILED_FETCHING_REFERRAL_STAT = "MY_REFERRAL_DIALOG.FAILED_FETCHING_REFERRAL_STAT",

  START_FETCHING_REFERRAL_PROMOTION = "MY_REFERRAL_DIALOG.START_FETCHING_REFERRAL_PROMOTION",
  SUCCEED_FETCHING_REFERRAL_PROMOTION = "MY_REFERRAL_DIALOG.SUCCEED_FETCHING_REFERRAL_PROMOTION",
  FAILED_FETCHING_REFERRAL_PROMOTION = "MY_REFERRAL_DIALOG.FAILED_FETCHING_REFERRAL_PROMOTION",
}

function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: () =>
    createAction({
      type: ActionTypes.OPEN,
    }),

  close: () =>
    createAction({
      type: ActionTypes.CLOSE,
    }),

  startFetchReferralStat: () =>
    createAction({ type: ActionTypes.START_FETCHING_REFERRAL_STAT }),
  succeedFetchReferralStat: (referralStat: Moim.Referral.IReferralStat) =>
    createAction({
      type: ActionTypes.SUCCEED_FETCHING_REFERRAL_STAT,
      payload: { referralStat },
    }),
  failedFetchReferralStat: () =>
    createAction({ type: ActionTypes.FAILED_FETCHING_REFERRAL_STAT }),

  startFetchReferralPromotion: () =>
    createAction({ type: ActionTypes.START_FETCHING_REFERRAL_PROMOTION }),
  succeedFetchReferralPromotion: (
    referralPromotion: Moim.Referral.IPromotion,
  ) =>
    createAction({
      type: ActionTypes.SUCCEED_FETCHING_REFERRAL_PROMOTION,
      payload: { referralPromotion },
    }),
  failedFetchReferralPromotion: () =>
    createAction({ type: ActionTypes.FAILED_FETCHING_REFERRAL_PROMOTION }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getSharedUrl(
  ...args: Parameters<typeof ReferralAPI.prototype.getSharedUrl>
): ThunkPromiseResult<
  Moim.ISingleItemResponse<Moim.Referral.IGetShareUrlResponse> | undefined
> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).referral.getSharedUrl(...args);

      return result;
    } catch (err) {}
    return undefined;
  };
}

export function getReferralStat(
  ...args: Parameters<typeof ReferralAPI.prototype.getReferralStat>
): ThunkResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchReferralStat());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).referral.getReferralStat(...args);

      dispatch(ActionCreators.succeedFetchReferralStat(response.data));
    } catch (err) {
      dispatch(ActionCreators.failedFetchReferralStat());
    }
  };
}

export function getReferralPromotion(
  ...args: Parameters<typeof ReferralAPI.prototype.getReferralPromotion>
): ThunkResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchReferralPromotion());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).referral.getReferralPromotion(...args);
      dispatch(ActionCreators.succeedFetchReferralPromotion(response.data[0]));
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchReferralPromotion());
      throw err;
    }
  };
}
