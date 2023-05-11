import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { entitiesSelector } from ".";
import {
  campaignDenormalizer,
  // campaignListDenormalizer,
  campaignExecutionDenormalizer,
  // campaignExecutionListDenormalizer,
  executionVoteListDenormalizer,
} from "app/models/campaign";

export const selectCampaignProject = createSelector(
  (_: IAppState, campaignId: Moim.Id) => campaignId,
  entitiesSelector,
  (campaignId, entities) => campaignDenormalizer(campaignId, entities),
);

export const selectCampaignExecution = createSelector(
  (_: IAppState, executionId: Moim.Id) => executionId,
  entitiesSelector,
  (executionId, entities) =>
    campaignExecutionDenormalizer(executionId, entities),
);

export const selectExecutionVotes = createSelector(
  (_: IAppState, votes: Moim.IPaginatedListResponse<Moim.Id>) => votes,
  entitiesSelector,
  (votes, entities) => executionVoteListDenormalizer(votes, entities),
);
