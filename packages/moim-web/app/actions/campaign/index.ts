import { CancelToken } from "axios";
import CampaignAPI from "common/api/campaign";
import { CampaignProjectTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { loadEntities } from "app/actions/entity";
import { ThunkPromiseResult } from "app/store";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { errorParseData } from "common/helpers/APIErrorParser";
import { threadSingleItemNormalizer } from "app/models";
import { CAMPAIGN_EXECUTION_FUND_REMIT_REQUESTED } from "app/common/constants/keys";
import * as CookieHandler from "common/helpers/cookieHandler";
import {
  campaignListNormalizer,
  campaignNormalizer,
  campaignExecutionNormalizer,
  executionVoteNormalizer,
  executionVoteListNormalizer,
} from "app/models/campaign";

function createAction<T extends { type: CampaignProjectTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetAllCampaigns: () =>
    createAction({
      type: CampaignProjectTypes.START_GET_ALL_CAMPAIGNS,
    }),
  succeedGetAllCampaigns: (payload: Moim.IPaginatedListResponse<Moim.Id>) =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_GET_ALL_CAMPAIGNS,
      payload,
    }),
  failedGetAllCampaigns: () =>
    createAction({
      type: CampaignProjectTypes.FAILED_GET_ALL_CAMPAIGNS,
    }),

  startFetchCampaign: () =>
    createAction({
      type: CampaignProjectTypes.START_FETCH_CAMPAIGN,
    }),
  succeedFetchCampaign: (campaignId: Moim.Id) =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_FETCH_CAMPAIGN,
      payload: {
        campaignId,
      },
    }),
  failedFetchCampaign: () =>
    createAction({
      type: CampaignProjectTypes.FAILED_FETCH_CAMPAIGN,
    }),

  startFetchExecution: () =>
    createAction({
      type: CampaignProjectTypes.START_FETCH_EXECUTION,
    }),
  succeedFetchExecution: () =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_FETCH_EXECUTION,
    }),
  failedFetchExecution: () =>
    createAction({
      type: CampaignProjectTypes.FAILED_FETCH_EXECUTION,
    }),

  startCreateExecution: () =>
    createAction({
      type: CampaignProjectTypes.START_CREATE_EXECUTION,
    }),
  succeedCreateExecution: (campaignId: Moim.Id, executionId: Moim.Id) =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_CREATE_EXECUTION,
      payload: {
        campaignId,
        executionId,
      },
    }),
  failedCreateExecution: () =>
    createAction({
      type: CampaignProjectTypes.FAILED_CREATE_EXECUTION,
    }),

  startVoteExecution: () =>
    createAction({
      type: CampaignProjectTypes.START_VOTE_EXECUTION,
    }),
  succeedVoteExecution: (
    campaignId: Moim.Id,
    executionId: Moim.Id,
    voteId: Moim.Id,
    status: Moim.Campaign.CampaignExecutionVoteStatus,
  ) =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_VOTE_EXECUTION,
      payload: {
        campaignId,
        executionId,
        status,
        voteId,
      },
    }),
  failedVoteExecution: () =>
    createAction({
      type: CampaignProjectTypes.FAILED_VOTE_EXECUTION,
    }),

  startGetExecutionVotes: () =>
    createAction({ type: CampaignProjectTypes.START_GET_EXECUTION_VOTES }),
  succeedGetExecutionVotes: (payload: {
    mode: "new" | "more";
    executionId: Moim.Id;
    status: Moim.Campaign.CampaignExecutionVoteStatus;
    votes: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      type: CampaignProjectTypes.SUCCEED_GET_EXECUTION_VOTES,
      payload,
    }),
  failedGetExecutionVotes: () =>
    createAction({ type: CampaignProjectTypes.FAILED_GET_EXECUTION_VOTES }),

  openExecutionCreateDialog: (payload: { campaignId: Moim.Id }) =>
    createAction({
      type: CampaignProjectTypes.OPEN_EXECUTION_CREATE_DIALOG,
      payload,
    }),
  closeExecutionCreateDialog: () =>
    createAction({ type: CampaignProjectTypes.CLOSE_EXECUTION_CREATE_DIALOG }),

  openExecutionVoteDialog: (payload: {
    campaignId: Moim.Id;
    executionId: Moim.Id;
    flag: "deny" | "agree";
  }) =>
    createAction({
      type: CampaignProjectTypes.OPEN_EXECUTION_VOTE_DIALOG,
      payload,
    }),
  closeExecutionVoteDialog: () =>
    createAction({ type: CampaignProjectTypes.CLOSE_EXECUTION_VOTE_DIALOG }),

  openExecutionVoteListDialog: (payload: {
    campaignId: Moim.Id;
    executionId: Moim.Id;
  }) =>
    createAction({
      type: CampaignProjectTypes.OPEN_EXECUTION_VOTE_LIST_DIALOG,
      payload,
    }),
  closeExecutionVoteListDialog: () =>
    createAction({
      type: CampaignProjectTypes.CLOSE_EXECUTION_VOTE_LIST_DIALOG,
    }),

  openExecutionViewDialog: (payload: {
    campaignId: Moim.Id;
    executionId: Moim.Id;
  }) =>
    createAction({
      type: CampaignProjectTypes.OPEN_EXECUTION_VIEW_DIALOG,
      payload,
    }),
  closeExecutionViewDialog: () =>
    createAction({ type: CampaignProjectTypes.CLOSE_EXECUTION_VIEW_DIALOG }),

  openRemitResultDialog: (
    campaignId: Moim.Id,
    executionId: Moim.Id,
    type: "failed" | "succeed",
  ) =>
    createAction({
      type: CampaignProjectTypes.OPEN_REMIT_RESULT_DIALOG,
      payload: {
        campaignId,
        executionId,
        type,
      },
    }),
  closeRemitResultDialog: () =>
    createAction({ type: CampaignProjectTypes.CLOSE_REMIT_RESULT_DIALOG }),

  startRemitExecutionFund: () =>
    createAction({ type: CampaignProjectTypes.START_REMIT_EXECUTION_FUND }),
  succeedRemitExecutionFund: () =>
    createAction({ type: CampaignProjectTypes.SUCCEED_REMIT_EXECUTION_FUND }),
  failedRemitExecutionFund: () =>
    createAction({ type: CampaignProjectTypes.FAILED_REMIT_EXECUTION_FUND }),

  clearExecutionEntity: () =>
    createAction({ type: CampaignProjectTypes.CLEAR_EXECUTION_ENTITY }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getAllCampaign(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetAllCampaigns());
    try {
      const result = campaignListNormalizer(
        await apiSelector(getState(), dispatch).campaign.getAllCampaign(),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedGetAllCampaigns(
          result.result as Moim.IPaginatedListResponse<Moim.Id>,
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
      dispatch(ActionCreators.failedGetAllCampaigns());
      throw err;
    }
  };
}

export function fetchCampaign(
  campaignId: Moim.Id,
): ThunkPromiseResult<Moim.Campaign.ICampaign> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchCampaign());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.fetchCampaign(campaignId);
      const result = campaignNormalizer(response);
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedFetchCampaign(result.result));
      return response;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchCampaign());
      throw err;
    }
  };
}

export function createExecution(
  campaignId: Moim.Id,
  data: {
    title: string;
    amount: number;
    transferCodeId: number;
    redirectUrl: string;
  },
  content: Moim.Blockit.Blocks[],
  cancelToken: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateExecution());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.createCampaignExecution(campaignId, data);

      const threadResponse = await apiSelector(
        getState(),
        dispatch,
      ).forum.postReply(
        {
          type: "campaignExecution",
          channelId: campaignId,
          threadId: campaignId,
          id: response.id,
          content,
        },
        cancelToken,
      );

      const result = campaignExecutionNormalizer(response);
      const normalizedThread = threadSingleItemNormalizer(threadResponse);
      dispatch(
        loadEntities({ ...result.entities, ...normalizedThread.entities }),
      );

      dispatch(
        ActionCreators.succeedCreateExecution(campaignId, result.result),
      );

      location.href = response.signUrl;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedCreateExecution());
      throw err;
    }
  };
}

export function voteExecution(
  campaignId: Moim.Id,
  executionId: Moim.Id,
  data: {
    status: Moim.Campaign.CampaignExecutionVoteStatus;
    redirectUrl: string;
  },
  content: Moim.Blockit.Blocks[] | null,
  cancelToken: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startVoteExecution());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.voteCampaignExecution(executionId, data);

      const result = executionVoteNormalizer(response);

      if (content) {
        const threadResponse = await apiSelector(
          getState(),
          dispatch,
        ).forum.postReply(
          {
            type: "campaignExecutionVote",
            channelId: campaignId,
            threadId: executionId,
            id: response.id,
            content,
          },
          cancelToken,
        );
        const normalizedThread = threadSingleItemNormalizer(threadResponse);
        dispatch(
          loadEntities({ ...result.entities, ...normalizedThread.entities }),
        );
      } else {
        dispatch(loadEntities(result.entities));
      }

      dispatch(
        ActionCreators.succeedVoteExecution(
          campaignId,
          executionId,
          response.id,
          data.status,
        ),
      );
      location.href = response.signUrl;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedVoteExecution());
      throw err;
    }
  };
}

export function getExecutionVotes(
  mode: "new" | "more",
  ...params: Parameters<typeof CampaignAPI.prototype.getExecutionVotes>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetExecutionVotes());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.getExecutionVotes(...params);
      const result = executionVoteListNormalizer(response);
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedGetExecutionVotes({
          mode,
          executionId: params[0],
          status: params[1].status,
          votes: result.result as Moim.IPaginatedListResponse<Moim.Id>,
        }),
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
      dispatch(ActionCreators.failedGetExecutionVotes());
      throw err;
    }
  };
}

export function fetchExecutionRules(
  communityId: Moim.Id,
): ThunkPromiseResult<Moim.Campaign.IExecutionRule[]> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.fetchExecutionRules(communityId);
      return response.rows;
    } catch (err) {
      throw err;
    }
  };
}

export function getWalletHistory(
  tokenId: string,
  communityAccount: string,
  before?: string,
): ThunkPromiseResult<{
  total: { value: number; relation: string };
  simple_actions: Moim.Campaign.IWalletHistoryDatum[];
}> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.getWalletHistory(tokenId, communityAccount, before);

      return response;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      throw err;
    }
  };
}
export const setRemitExecutionFundRequest = (
  campaignId: Moim.Id,
  executionId: Moim.Id,
) => {
  CookieHandler.set(
    CAMPAIGN_EXECUTION_FUND_REMIT_REQUESTED,
    JSON.stringify({ campaignId, executionId }),
  );
};

interface ISimpleCookiePayload {
  executionId: Moim.Id;
  campaignId: Moim.Id;
}

export function getRemitExecutionFundRequest() {
  const rawString = CookieHandler.get<string>(
    CAMPAIGN_EXECUTION_FUND_REMIT_REQUESTED,
    "",
  );

  try {
    if (rawString) {
      const obj = JSON.parse(rawString);
      return obj as ISimpleCookiePayload;
    }
    return null;
  } catch {
    return null;
  }
}

export const removeRemitExecutionFundRequest = () => {
  CookieHandler.remove(CAMPAIGN_EXECUTION_FUND_REMIT_REQUESTED);
};

export function remitExecutionFund(
  campaignId: Moim.Id,
  ...params: Parameters<typeof CampaignAPI.prototype.postRemitExecution>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startRemitExecutionFund());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).campaign.postRemitExecution(...params);

      setRemitExecutionFundRequest(campaignId, params[0]);

      dispatch(ActionCreators.succeedRemitExecutionFund());

      if (response) {
        location.href = response.remitSignUrl;
      }
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedRemitExecutionFund());
      throw err;
    }
  };
}
