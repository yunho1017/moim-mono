declare namespace Moim {
  declare namespace Referral {
    type ReferralType = "signUp" | "payment";
    interface IPromotion {
      id: string;
      groupId: string;
      status: "active" | "inactive";
      title: string;
      referralType: ReferralType;
      // TBD
      requiredActionsCount?: number;
      maxRewardsCount?: number;
      reward?: {
        type: "credit";
        creditExpiration: number;
        amount: number;
        creditTitle: string;
        creditDescription: string;
      };
      myReferral: {
        title: { [key: string]: string };
        description?: { [key: string]: string };
        image?: string;
        policy?: string;
      };
      // TBD
      shareMessage?: string;
    }

    interface IGetShareUrlResponse {
      id: string;
      groupId: string;
      referralType: ReferralType;
      url: string;
    }

    interface IReferralStat {
      id: string;
      groupId: string;
      userId: string;
      referralType: ReferralType;
      actionsCount: number;
      lastRewardedActionsCount: number;
      rewardsCount: number;
      totalRewardAmount: number;
      createdAt: number;
      updatedAt: number;
    }

    interface IReferralInvitee {
      id: string;
      groupId: string;
      userId: string;
      parentGroupId: string;
      parentInviterId: string;
      inviterId: string;
      referralType: ReferralType;
      codeId: string;
      target?: {
        productId?: string;
      };
      status: Status;
      createdAt: number;
      updatedAt: number;
    }
  }
}
