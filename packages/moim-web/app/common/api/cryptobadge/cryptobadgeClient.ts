import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CryptoBadgeAPI {
  public static async getUserCryptoBadgeCertificates(params: {
    userId: string;
    issuers?: string[];
  }) {
    return (
      await CryptoBadgeClient.getCertificates({
        userId: params.userId,
        issuers: params.issuers,
      })
    ).data;
  }

  public static async getCertificateItems(params: {
    issuers: string[];
    name?: string;
  }) {
    return (
      await CryptoBadgeClient.getCertificates({
        issuers: params.issuers,
        name: params.name,
      })
    ).data;
  }

  public static async getBadgeItems(params: { name: string }) {
    return (
      await CryptoBadgeClient.getBadges({
        name: params.name,
      })
    ).data;
  }

  public static async getBadgeItem(params: { id: string }) {
    return (await CryptoBadgeClient.getBadge(params)).data;
  }

  public static async getCertificateItem(params: { id: string }) {
    return (await CryptoBadgeClient.getCertificate(params)).data;
  }

  public static async getMintRequests(params: {
    issuers: string[];
    count?: number;
    after?: string;
  }) {
    return (
      await CryptoBadgeClient.getBadgeMintRequests({
        issuers: params.issuers,
        first: params.count,
        after: params.after,
      })
    ).data;
  }

  public static async refreshBadgeMetadata(params: { badgeRefreshId: string }) {
    return (
      await CryptoBadgeClient.refreshBadgeMetadata({
        badgeRefreshId: params.badgeRefreshId,
      })
    ).data;
  }
}
