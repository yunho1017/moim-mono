declare namespace Moim {
  declare namespace User {
    type UserPresenceType = "AWAY" | "ACTIVE";
    interface IOriginalUserDatum {
      id: Id;
      hubUserId: Id;
      group_id: Id;
      name: string;
      tz: string;
      is_deactivated: boolean;
      is_bot: boolean;
      positions: Moim.Id[];
      encrypted_email: string;
      config: INotificationConfig;
      updated_at: number;
      created_at: number;
      bio?: string;
      phoneNumber?: IUserPhone;
      email?: string;
      avatar_url?: string;
      canId?: Id;
      canUsername?: string;
      presence: UserPresenceType;
      status: Enums.UserStatusTypes;
      // marketing agreement V2
      adAgreementV2?: IUserAdAgreement;
      // metamask address
      metamask?: string;
      profiles?: IUserProfile[];
    }
    export type IUserProfile =
      | {
          groupId: string;
          parentUserId: string;
          id: string;
          status: 0 | 1 | 2;
          type: "USER";
        }
      | ICommunityAccount;

    export interface ICommunityAccount {
      groupId: string;
      id: string;
      status: 0 | 1 | 2;
      type: "COMMUNITY_ACCOUNT";
    }

    interface IUserPhone {
      countryCode: string;
      subscriberNumber: string;
    }
    interface INotificationDefaultSet {
      isFollowSet?: boolean;
      alarmNotification: INotificationItem<NotificationEnabled>;
      creatingNotification: INotificationItem<boolean>;
    }

    type IAdAgreementType = "accepted" | "refused" | "none";
    interface IAdAgreement {
      dayTime: {
        agreement: IAdAgreementType;
        updatedAt: number;
      };
      nightTime: {
        agreement: IAdAgreementType;
        updatedAt: number;
      };
    }

    interface IUserAdAgreement {
      appPush: IAdAgreement;
      email: IAdAgreement;
      sms: IAdAgreement;
      webPush: IAdAgreement;
    }

    interface IPartialNotificationDefaultSet {
      isFollowSet?: boolean;
      alarmNotification?: {
        allowed?: Partial<NotificationEnabled>;
        detailed?: Partial<
          INotificationDetailSetting<Partial<NotificationEnabled>>
        >;
      };
      creatingNotification?: {
        allowed?: boolean;
        detailed?: Partial<INotificationDetailSetting<boolean>>;
      };
    }

    interface INotificationConfig {
      blockDm: boolean;
      notification: {
        isFollowChannelSet: boolean;
        channelSet: Record<Moim.Id, INotificationDefaultSet>;
        defaultSet: INotificationDefaultSet;
      };
    }
    interface INormalizedCertification {
      node: Moim.Id;
      __typename: string;
    }
    interface ICertificationStatus {
      pageInfo: {
        hasNextPage: boolean | null;
        endCursor: string | null;
        __typename: "PageInfo";
      };
      totalCount: number;
    }
    type NormalizedCertificationList = IListResponse<INormalizedCertification>;

    interface IUser extends IOriginalUserDatum {
      positions: Moim.Position.IPosition[];
      avatar?: string;
      certifications?: NormalizedCertificationList;
      certificationStatus?: ICertificationStatus;
    }

    interface INormalizedUser extends IUser {
      positions: Moim.Id[];
      cachedAt?: number;
    }

    type INormalizedData = INormalizedEntities<INormalizedUser>;

    interface ISearchHistory {
      userId: Id;
      parentUserId: Id;
      groupId: Id;
      query: string;
      sortKey: string;
      ttl: number;
      createdAt: number;
    }

    interface IUsersRequestQuery extends IPaging {
      limit?: number; // default: 10
    }

    type IUsersRequest = IUsersRequestQuery;

    type IUsersResponseBody = IPaginatedListResponse<IOriginalUserDatum>;

    interface IAdAgreementConfig {
      dayTime: {
        agreement: IAdAgreementType;
      };
      nightTime?: {
        agreement: IAdAgreementType;
      };
    }

    interface IPostUserAdAgreementRequest {
      sms: IAdAgreementConfig;
      email: IAdAgreementConfig;
      appPush: IAdAgreementConfig;
      webPush: IAdAgreementConfig;
    }

    interface IPostUserRequestBody {
      groupId?: Id;
      useParentProfile?: boolean;
      user: {
        name: string;
        bio?: string;
        tz: string;
        locale: string;
        avatar_id?: string;
        authentication: IAuthentication;
        adAgreementV2?: IPostUserAdAgreementRequest;
      };
      referral?: {
        code: string;
        url?: string;
      };
    }

    type IPostUsersRequest = IPostUserRequestBody;

    type IPostUsersResponseBody = ISingleItemResponse<IOriginalUserDatum> & {
      token: IMoimOAuthResponseData;
    };

    interface IUpdatableAdAgreement {
      dayTime?: {
        agreement: "accepted" | "refused" | "none";
        updatedAt?: number;
      };
      nightTime?: {
        agreement: "accepted" | "refused" | "none";
        updatedAt?: number;
      };
    }

    interface IUpdatableInfo {
      name?: string | null;
      bio?: string | null;
      avatar_id?: Moim.Id;
      tz?: string;
      locale?: string;
      config?: {
        blockDm?: boolean;
        notification?: {
          channelSet?: Record<Moim.Id, IPartialNotificationDefaultSet>;
          defaultSet?: IPartialNotificationDefaultSet;
        };
      };
      signUpInfo?: {
        phoneNumber?: IUserPhone;
        others?: { [key: string]: string };
      };
      adAgreementV2?: {
        sms?: IUpdatableAdAgreement;
        email?: IUpdatableAdAgreement;
        appPush?: IUpdatableAdAgreement;
        webPush?: IUpdatableAdAgreement;
      };
    }

    interface IParentMoimUserInformation {
      name: string;
      locale: string;
      timezone: string;
      bio?: string;
      avatarId?: Moim.id;
    }

    interface IGetSearchUsersRequestQuery extends IPaging {
      sort?: "created_at" | "updated_at";
      order?: OrderType;
      query?: string;
      limit?: number; // default: 10
      positionIds?: Id[];
      isEnableCommand?: boolean;
    }

    type IGetSearchUsersRequest = IGetSearchUsersRequestQuery;
    type IProfileViewType = "show" | "preview";

    type IGetSearchUsersResponseBody = IPaginatedListResponse<
      IOriginalUserDatum & { isCommand?: boolean }
    >;

    // TODO: can Ids 필드 추가
    interface IUserBatchRequestBody {
      users?: Moim.Id[];
      canUsernames?: Moim.Id[];
      canIds?: Moim.Id[];
    }

    type IUserBatchRequest = IUserBatchRequestBody;

    type IUserBatchResponseBody = IPaginatedListResponse<
      User.IOriginalUserDatum
    >;

    interface IGetSearchPageSearchUsersRequest extends IPaging {
      query: string;
      limit?: number;
      filter?: ISearchFilterOption;
    }

    interface ISearchedUserBody {
      id: Id;
      moimName: string;
      username: string;
      url: string;
      avatar?: string;
      bio?: string;
      positions?: { name: string; color: string }[];
    }

    interface IPostPhoneNumberRequestBody {
      countryCode: string;
      subscriberNumber: string;
    }

    type IPostPhoneNumberRequest = IPostPhoneNumberRequestBody;

    type IPostPhoneNumberResponseBody = ISingleItemResponse<ISuccessResponse>;

    interface IVerifyPhoneNumberRequestBody {
      authCode: string;
    }

    type IVerifyPhoneNumberRequest = IVerifyPhoneNumberRequestBody;

    type IVerifyPhoneNumberResponseBody = ISingleItemResponse<ISuccessResponse>;
  }
}
