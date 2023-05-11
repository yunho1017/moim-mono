import axios, { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";
import { getCommerceAPIDomain } from "common/helpers/domainMaker";

export default class CampaignAPI extends MoimBaseAPI {
  public async batchCampaignExecution(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Campaign.ICampaignExecution>> {
    return (
      await this.post(
        "/campaign_executions/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async getAllCampaign(
    gId?: Moim.Id,
  ): Promise<Moim.IPaginatedListResponse<Moim.Campaign.ICampaign>> {
    const groupId = gId ?? this.getCurrentGroupId();
    return (
      await this.get(`/campaigns?groupId=${groupId}`, undefined, {
        baseURL: getCommerceAPIDomain(),
      })
    ).data;
  }

  public async fetchCampaign(
    campaignId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Campaign.ICampaign> {
    return (
      await this.get(`/campaigns/${campaignId}`, undefined, {
        baseURL: getCommerceAPIDomain(),
        cancelToken,
      })
    ).data;
  }

  public async createCampaignExecution(
    campaignId: Moim.Id,
    data: {
      title: string;
      amount: number;
      transferCodeId: number;
      redirectUrl: string;
    },
  ): Promise<Moim.Campaign.ICampaignExecution> {
    return (
      await this.post(
        `/campaigns/${campaignId}/campaign_executions`,
        {
          campaignExecution: data,
        },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async voteCampaignExecution(
    executionId: Moim.Id,
    data: {
      status: Moim.Campaign.CampaignExecutionVoteStatus;
      redirectUrl: string;
    },
  ): Promise<Moim.Campaign.IExecutionVote> {
    return (
      await this.post(`/campaign_executions/${executionId}/votes`, data, {
        baseURL: getCommerceAPIDomain(),
      })
    ).data;
  }
  public async getExecutionVotes(
    executionId: Moim.Id,
    data: {
      status: Moim.Campaign.CampaignExecutionVoteStatus;
    } & Moim.IPaging,
  ): Promise<Moim.IPaginatedListResponse<Moim.Campaign.IExecutionVote>> {
    return (
      await this.get(`/campaign_executions/${executionId}/votes`, data, {
        baseURL: getCommerceAPIDomain(),
      })
    ).data;
  }

  public async postRemitExecution(
    executionId: Moim.Id,
    payload: {
      bankInformation: {
        bankName: string;
        accountNumber: string;
        accountName: string;
        recipientMessage: string;
      };
      redirectUrl: string;
    },
  ) {
    return (
      await this.post(`/campaign_executions/${executionId}/remit`, payload, {
        baseURL: getCommerceAPIDomain(),
      })
    ).data;
  }

  // #region external api

  public async fetchExecutionRules(
    communityId: Moim.Id,
  ): Promise<{
    rows: Moim.Campaign.IExecutionRule[];
    more: boolean;
    next_key: string;
  }> {
    return (
      await axios.post(
        "https://api.canfoundation.io/v1/chain/get_table_rows",
        {
          code: "governance",
          table: "v1.codevote",
          scope: communityId,
          json: true,
        },
        {
          headers: {
            "content-type": "text/plain",
          },
        },
      )
    ).data;
  }

  public async getWalletHistory(
    tokenId: Moim.Id,
    communityAccount: Moim.Id,
    before?: string,
  ): Promise<{
    total: { value: number; relation: string };
    simple_actions: Moim.Campaign.IWalletHistoryDatum[];
  }> {
    return (
      await axios.get(
        "https://explorer.canfoundation.io/v2/history/get_transfer",
        {
          params: {
            code: tokenId,
            account: communityAccount,
            before,
          },
          headers: {
            "content-type": "text/plain",
          },
        },
      )
    ).data;
  }

  // #endregion
}
