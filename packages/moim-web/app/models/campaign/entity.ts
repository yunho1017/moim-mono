import { schema } from "normalizr";
import { productEntity } from "app/models/commerce/entity";
import { userEntity } from "app/models/user/entity";
import { positionEntity } from "app/models/position/entity";
import { threadEntity } from "app/models/thread/entity";

export const campaignExecutionDefinition = {
  creator: userEntity,
  thread: threadEntity,
};
export const campaignExecutionEntity = new schema.Entity<
  Moim.Campaign.ICampaignExecution
>("campaign_campaign_execution", campaignExecutionDefinition, {
  processStrategy: value => ({
    ...value,
    creator: value.creatorId,
    thread: value.id,
  }),
});
export const campaignExecutionListEntity = new schema.Object<
  | Moim.IListResponse<Moim.Campaign.ICampaignExecution>
  | Moim.IPaginatedListResponse<Moim.Campaign.ICampaignExecution>
>({
  data: [campaignExecutionEntity],
});

export const campaignDefinition = {
  products: new schema.Array(productEntity),
  executions: new schema.Array(campaignExecutionEntity),
  positions: new schema.Object({
    donor: {
      moimPosition: positionEntity,
    },
    executor: {
      moimPosition: positionEntity,
    },
    decisionMaker: {
      moimPosition: positionEntity,
    },
  }),
};
export const campaignEntity = new schema.Entity<Moim.Campaign.ICampaign>(
  "campaign_campaign",
  campaignDefinition,
  {
    processStrategy: (value: Moim.Campaign.ICampaign) => {
      const tmpPosition = value.positions
        ? {
            donor: value.positions.donor
              ? {
                  ...value.positions.donor,
                  moimPosition: value.positions.donor.moim,
                }
              : undefined,
            executor: value.positions.executor
              ? {
                  ...value.positions.executor,
                  moimPosition: value.positions.executor.moim,
                }
              : undefined,
            decisionMaker: value.positions.decisionMaker
              ? {
                  ...value.positions.decisionMaker,
                  moimPosition: value.positions.decisionMaker.moim,
                }
              : undefined,
          }
        : undefined;
      return {
        ...value,
        products: value.productIds,
        executions: value.executionIds,
        positions: tmpPosition,
      };
    },
  },
);
export const campaignListEntity = new schema.Object<
  | Moim.IListResponse<Moim.Campaign.ICampaign>
  | Moim.IPaginatedListResponse<Moim.Campaign.ICampaign>
>({
  data: [campaignEntity],
});

export const executionVoteDefinition = {
  execution: campaignExecutionEntity,
  user: userEntity,
  thread: threadEntity,
};

export const executionVoteEntity = new schema.Entity<
  Moim.Campaign.IExecutionVote
>("campaign_execution_vote", executionVoteDefinition, {
  processStrategy: value => ({
    ...value,
    user: value.profileId,
    execution: value.campaignExecutionId,
    thread: value.id,
  }),
});

export const executionVoteListEntity = new schema.Object<
  | Moim.IListResponse<Moim.Campaign.IExecutionVote>
  | Moim.IPaginatedListResponse<Moim.Campaign.IExecutionVote>
>({
  data: [executionVoteEntity],
});
