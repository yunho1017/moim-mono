import { MoimCommunityAPI } from "common/api/base/community";
import { getCoinbaseAPIDomain } from "app/common/helpers/domainMaker";

export default class TreasuryAPI extends MoimCommunityAPI {
  public async getTreasury(
    treasuryId: Moim.Id,
  ): Promise<Moim.Treasury.ITreasury> {
    return (await this.get(`/treasuries/${treasuryId}`)).data;
  }

  public async getTreasuryHistory(
    treasuryId: Moim.Id,
    paging?: Moim.IPaging,
    limit?: number,
  ): Promise<Moim.IPaginatedListResponse<Moim.Treasury.ITransaction>> {
    return (
      await this.get(`/treasuries/${treasuryId}/histories`, {
        limit,
        ...paging,
      })
    ).data;
  }
}

const coinbaseBaseURL = getCoinbaseAPIDomain();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchCoinbaseAPI = async (endpoint: string, config = {}) => {
  const result = (
    await fetch(`${coinbaseBaseURL}${endpoint}`, { headers, ...config })
  ).json();
  return result;
};
