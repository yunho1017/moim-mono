import { CancelToken } from "axios";
import { MoimCommunityAPI } from "../base/community";

export class CommunityAPI extends MoimCommunityAPI {
  public async getCommunity(
    params: {
      communityId: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.ICommunity> {
    return (
      await this.get(`/communities/${params.communityId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async getNetworkBlockConfig(
    network: Moim.Id,
  ): Promise<Moim.Community.INetworkBlockConfig> {
    return (await this.get(`/communities/networks/${network}`)).data;
  }

  public async getUsersBatch(params: {
    ids?: string[];
    addresses?: string[];
  }): Promise<Moim.Community.ICommunityUser[] | undefined> {
    return (await this.post(`/communities/users/_batch`, params)).data;
  }
}
