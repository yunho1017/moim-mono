import { ActionUnion } from "app/actions/helpers";
import { ThunkResult } from "app/store";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import ReferralAPI from "common/api/referral";
import { errorParseData } from "common/helpers/APIErrorParser";
import { loadEntitiesDirect } from "app/actions/entity";

export enum ActionTypes {
  OPEN = "MY_INVITEE_LIST_DIALOG.OPEN",
  CLOSE = "MY_INVITEE_LIST_DIALOG.CLOSE",

  START_FETCHING_REFERRAL_INVITEE_LIST = "MY_REFERRAL_DIALOG.START_FETCHING_REFERRAL_INVITEE_LIST",
  SUCCEED_FETCHING_REFERRAL_INVITEE_LIST = "MY_REFERRAL_DIALOG.SUCCEED_FETCHING_REFERRAL_INVITEE_LIST",
  FAILED_FETCHING_REFERRAL_INVITEE_LIST = "MY_REFERRAL_DIALOG.FAILED_FETCHING_REFERRAL_INVITEE_LIST",

  START_FETCHING_REFERRAL_CREDIT_HISTORIES = "MY_REFERRAL_DIALOG.START_FETCHING_REFERRAL_CREDIT_HISTORIES",
  SUCCEED_FETCHING_REFERRAL_CREDIT_HISTORIES = "MY_REFERRAL_DIALOG.SUCCEED_FETCHING_REFERRAL_CREDIT_HISTORIES",
  FAILED_FETCHING_REFERRAL_CREDIT_HISTORIES = "MY_REFERRAL_DIALOG.FAILED_FETCHING_REFERRAL_CREDIT_HISTORIES",
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

  startFetchReferralInviteeList: () =>
    createAction({ type: ActionTypes.START_FETCHING_REFERRAL_INVITEE_LIST }),
  succeedFetchReferralInviteeList: (
    referralInviteeList: Moim.IPaginatedListResponse<
      Moim.Referral.IReferralInvitee
    >,
    fetchDirection: "before" | "after" | null,
  ) =>
    createAction({
      type: ActionTypes.SUCCEED_FETCHING_REFERRAL_INVITEE_LIST,
      payload: {
        referralInviteeList,
        fetchDirection,
      },
    }),
  failedFetchReferralInviteeList: () =>
    createAction({ type: ActionTypes.FAILED_FETCHING_REFERRAL_INVITEE_LIST }),

  startFetchReferralCreditHistories: () =>
    createAction({
      type: ActionTypes.START_FETCHING_REFERRAL_CREDIT_HISTORIES,
    }),
  succeedFetchReferralCreditHistories: (payload: {
    response: Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem>;
    fetchDirection: "before" | "after" | null;
  }) =>
    createAction({
      type: ActionTypes.SUCCEED_FETCHING_REFERRAL_CREDIT_HISTORIES,
      payload,
    }),
  failedFetchReferralCreditHistories: () =>
    createAction({
      type: ActionTypes.FAILED_FETCHING_REFERRAL_CREDIT_HISTORIES,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getReferralInviteeList(
  ...args: Parameters<typeof ReferralAPI.prototype.getReferralInviteeList>
): ThunkResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchReferralInviteeList());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).referral.getReferralInviteeList(...args);
      dispatch(
        loadEntitiesDirect({
          users: response.data.map(invitee => invitee.userId),
        }),
      );
      dispatch(
        ActionCreators.succeedFetchReferralInviteeList(
          response,
          Boolean(args[0].after)
            ? "after"
            : Boolean(args[0].before)
            ? "before"
            : null,
        ),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchReferralInviteeList());
      throw err;
    }
  };
}

export function getReferralCreditHistories(
  hubSellerId: Moim.Id,
  params: {
    limit?: number;
    includeTotalAmount?: boolean;
  } & Moim.IPaging,
): ThunkResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchReferralCreditHistories());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getMyCreditHistory(hubSellerId, {
        ...params,
        sourceType: "referralReward-signUp",
      });
      dispatch(
        ActionCreators.succeedFetchReferralCreditHistories({
          fetchDirection: Boolean(params.after)
            ? "after"
            : Boolean(params.before)
            ? "before"
            : null,
          response,
        }),
      );
      return;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchReferralCreditHistories());
      throw err;
    }
  };
}
