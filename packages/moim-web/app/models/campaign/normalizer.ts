import { normalize } from "normalizr";
import {
  campaignEntity,
  campaignListEntity,
  campaignExecutionEntity,
  campaignExecutionListEntity,
  executionVoteEntity,
  executionVoteListEntity,
} from "./entity";

export const campaignExecutionNormalizer = (
  data: Moim.Campaign.ICampaignExecution,
) =>
  normalize<
    Moim.Campaign.ICampaignExecution,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(data, campaignExecutionEntity);

export const campaignExecutionListNormalizer = (
  data:
    | Moim.IListResponse<Moim.Campaign.ICampaignExecution>
    | Moim.IPaginatedListResponse<Moim.Campaign.ICampaignExecution>,
) =>
  normalize<
    | Moim.IListResponse<Moim.Campaign.ICampaignExecution>
    | Moim.IPaginatedListResponse<Moim.Campaign.ICampaignExecution>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>
  >(data, campaignExecutionListEntity);

export const campaignNormalizer = (data: Moim.Campaign.ICampaign) =>
  normalize<Moim.Campaign.ICampaign, Moim.Entity.INormalizedData, Moim.Id>(
    data,
    campaignEntity,
  );

export const campaignListNormalizer = (
  data:
    | Moim.IListResponse<Moim.Campaign.ICampaign>
    | Moim.IPaginatedListResponse<Moim.Campaign.ICampaign>,
) =>
  normalize<
    | Moim.IListResponse<Moim.Campaign.ICampaign>
    | Moim.IPaginatedListResponse<Moim.Campaign.ICampaign>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>
  >(data, campaignListEntity);

export const executionVoteNormalizer = (data: Moim.Campaign.IExecutionVote) =>
  normalize<Moim.Campaign.IExecutionVote, Moim.Entity.INormalizedData, Moim.Id>(
    data,
    executionVoteEntity,
  );

export const executionVoteListNormalizer = (
  data:
    | Moim.IListResponse<Moim.Campaign.IExecutionVote>
    | Moim.IPaginatedListResponse<Moim.Campaign.IExecutionVote>,
) =>
  normalize<
    | Moim.IListResponse<Moim.Campaign.IExecutionVote>
    | Moim.IPaginatedListResponse<Moim.Campaign.IExecutionVote>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>
  >(data, executionVoteListEntity);
