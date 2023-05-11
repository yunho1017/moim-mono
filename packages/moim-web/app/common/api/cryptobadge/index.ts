import { MoimCommunityAPI } from "common/api/base/community";

export default class CryptobadgeCommunityAPI extends MoimCommunityAPI {
  public async getCryptobadgeItemsByBadgeGroupId(
    badgeGroupId: Moim.Id,
  ): Promise<Moim.Cryptobadge.ICryptobadge[]> {
    return (
      await this.get(`/cryptobadge_groups/${badgeGroupId}/cryptobadge/badges`)
    ).data;
  }

  public async getCryptobadgeGroup(
    badgeGroupId: Moim.Id,
  ): Promise<Moim.Cryptobadge.ICryptobadgeGroup> {
    return (await this.get(`/cryptobadge_groups/${badgeGroupId}`)).data;
  }

  public async getCryptobadges(
    ids: Moim.Id[],
  ): Promise<Moim.Cryptobadge.ICryptobadge[]> {
    return (
      await this.post(`/cryptobadge/badges/_batch`, {
        ids,
      })
    ).data;
  }

  public async getCertificateIdByTx(
    transactionHash: string,
  ): Promise<{ id: string }> {
    return (
      await this.get(`/cryptobadge/badges/certifications/id`, {
        transactionHash,
      })
    ).data;
  }

  public async claimCertificate(data: {
    network: string;
    badgeName: string;
    address: string;
    callbackUrl: string;
  }): Promise<{ location: string }> {
    return (await this.post(`/cryptobadge/badges/certifications/claim`, data))
      .data;
  }
}
