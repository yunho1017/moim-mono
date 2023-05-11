import { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";

export default class CampaignAPI {
  public async batchCampaignExecution(
    _ids: Moim.Id[],
  ): Promise<Moim.IListResponse<Moim.Campaign.ICampaignExecution>> {
    return RAW.COMMERCE.campaignExecutions;
  }

  public async getAllCampaign(
    _gId?: Moim.Id,
  ): Promise<Moim.IPaginatedListResponse<Moim.Campaign.ICampaign>> {
    return RAW.COMMERCE.campaigns;
  }

  public async fetchCampaign(
    _campaignId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Campaign.ICampaign> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.campaigns.data[0];
  }

  public async createCampaignExecution(
    _sellerId: Moim.Id,
    _campaignId: Moim.Id,
    _data: any,
  ): Promise<Moim.Campaign.ICampaignExecution> {
    return RAW.COMMERCE.campaignExecutions.data[0];
  }

  public async voteCampaignExecution(
    _executionId: Moim.Id,
    _data: {
      status: Moim.Campaign.CampaignExecutionVoteStatus;
      redirectUrl: string;
    },
  ): Promise<Moim.Campaign.IExecutionVote> {
    return RAW.COMMERCE.executionVotes.data[0];
  }

  public async getExecutionVotes(
    _executionId: Moim.Id,
    _data: {
      status: Moim.Campaign.CampaignExecutionVoteStatus;
    } & Moim.IPaging,
  ): Promise<Moim.IPaginatedListResponse<Moim.Campaign.IExecutionVote>> {
    return RAW.COMMERCE.executionVotes;
  }

  public async postRemitExecution(
    _executionId: Moim.Id,
    _payload: {
      bankInformation: {
        bankName: string;
        accountNumber: string;
        accountName: string;
        recipientMessage: string;
      };
      redirectUrl: string;
    },
  ) {
    return;
  }
}
