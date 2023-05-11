import { denormalize } from "..";
import {
  campaignEntity,
  campaignListEntity,
  campaignExecutionEntity,
  campaignExecutionListEntity,
  executionVoteEntity,
  executionVoteListEntity,
} from "./entity";

export const campaignExecutionDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Campaign.IDenormalizedCampaignExecution>(
    input,
    campaignExecutionEntity,
    entities,
  );

export const campaignExecutionListDenormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
    | Moim.IPaginatedListResponse<Moim.Campaign.IDenormalizedCampaignExecution>
    | Moim.IListResponse<Moim.Campaign.IDenormalizedCampaignExecution>
  >(input, campaignExecutionListEntity, entities);

export const campaignDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Campaign.IDenormalizedCampaign | undefined>(
    input,
    campaignEntity,
    entities,
  );

export const campaignListDenormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
    | Moim.IPaginatedListResponse<Moim.Campaign.IDenormalizedCampaign>
    | Moim.IListResponse<Moim.Campaign.IDenormalizedCampaign>
  >(input, campaignListEntity, entities);

export const executionVoteDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Campaign.IDenormalizedExecutionVote>(
    input,
    executionVoteEntity,
    entities,
  );

export const executionVoteListDenormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id> | Moim.IListResponse<Moim.Id>,
    | Moim.IPaginatedListResponse<Moim.Campaign.IDenormalizedExecutionVote>
    | Moim.IListResponse<Moim.Campaign.IDenormalizedExecutionVote>
  >(input, executionVoteListEntity, entities);
