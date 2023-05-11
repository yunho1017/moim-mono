import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, CampaignProjectTypes } from "app/actions/types";

export const INITIAL_STATE_CAMPAIGN: Record<
  Moim.Id,
  Moim.Campaign.ICampaign
> = {};
export const INITIAL_STATE_EXECUTION: Record<
  Moim.Id,
  Moim.Campaign.ICampaignExecution
> = {};
export const INITIAL_STATE_EXECUTION_VOTE: Record<
  Moim.Id,
  Moim.Campaign.IExecutionVote
> = {};

export function executionReducer(
  state = INITIAL_STATE_EXECUTION,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.campaign_campaign_execution) {
          Object.entries(action.payload.campaign_campaign_execution).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }

      case CampaignProjectTypes.CLEAR_EXECUTION_ENTITY: {
        return INITIAL_STATE_EXECUTION;
      }
    }
  });
}

export function campaignReducer(
  state = INITIAL_STATE_CAMPAIGN,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.campaign_campaign) {
          Object.entries(action.payload.campaign_campaign).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }

      case CampaignProjectTypes.SUCCEED_CREATE_EXECUTION: {
        const targetCampaign = draft[action.payload.campaignId];
        if (targetCampaign) {
          targetCampaign.executionIds = targetCampaign.executionIds.concat(
            action.payload.executionId,
          );
        }
        break;
      }
    }
  });
}

export function executionVoteReducer(
  state = INITIAL_STATE_EXECUTION_VOTE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.campaign_execution_vote) {
          Object.entries(action.payload.campaign_execution_vote).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }

      case CampaignProjectTypes.CLEAR_EXECUTION_ENTITY: {
        return INITIAL_STATE_EXECUTION_VOTE;
      }
    }
  });
}
