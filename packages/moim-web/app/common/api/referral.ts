import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";
export default class ReferralAPI extends MoimBaseAPI {
  public async postReferralCode(
    params: {
      code: string;
      url: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Referral.IGetShareUrlResponse>> {
    return (
      await this.post(`/groups​/referrals​`, { ...params }, { cancelToken })
    ).data;
  }

  public async getSharedUrl(
    params: {
      referralType: Moim.Referral.ReferralType;
      // product Id
      target?: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Referral.IGetShareUrlResponse>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/referrals/codes`,
        { referralCode: params },
        { cancelToken },
      )
    ).data;
  }

  public async getReferralStat(
    params: { referralType: Moim.Referral.ReferralType },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Referral.IReferralStat>> {
    return (
      await this.get(`/referrals/stat`, params, {
        cancelToken,
      })
    ).data;
  }

  public async getReferralInviteeList(
    params: { referralType: Moim.Referral.ReferralType } & Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Referral.IReferralInvitee>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/referrals`, params, {
        cancelToken,
      })
    ).data;
  }

  public async getReferralPromotion(
    id: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Referral.IPromotion[]>> {
    return (
      await this.post(
        `/referral_promotions/_batch`,
        { promotions: [id] },
        {
          cancelToken,
        },
      )
    ).data;
  }
}
