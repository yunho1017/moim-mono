import { CancelToken } from "axios";
import buffer from "common/helpers/buffer";
import { MoimBaseAPI } from "common/api/base";
import mergeWithArrayConcatUniq from "common/helpers/mergeWithArrayConcatUniq";

export default class UserAPI extends MoimBaseAPI {
  private bufferedGetBatchUsers = buffer({
    ms: 300,
    subscribedFn: async (request: Moim.User.IUserBatchRequest[]) => {
      const reqs = mergeWithArrayConcatUniq({}, ...request);
      const groupId = this.getCurrentGroupId();
      return (await this.post("/users/_batch", { ...reqs, groupId })).data;
    },
  });

  public async batchUsers(
    request: Moim.User.IUserBatchRequest,
    _?: CancelToken,
    options?: {
      notUsedBuffer?: boolean;
    },
  ): Promise<Moim.User.IUserBatchResponseBody> {
    if (options?.notUsedBuffer) {
      const groupId = this.getCurrentGroupId();
      return (await this.post("/users/_batch", { ...request, groupId })).data;
    }
    return await this.bufferedGetBatchUsers(request);
  }

  public async getUsers(
    request: Moim.User.IUsersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IUsersResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/users`,
        { ...request },
        { cancelToken },
      )
    ).data;
  }

  public async postUser(
    request: Moim.User.IPostUserRequestBody,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IPostUsersResponseBody> {
    const {
      user,
      groupId: groupIdParams,
      useParentProfile,
      referral,
    } = request;
    const groupId = groupIdParams ?? this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/users`,
        { user, useParentProfile, referral },
        { cancelToken },
      )
    ).data;
  }

  public async getParentMoimUserData(
    params: {
      provider: Moim.AuthenticationProvider;
      token: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.User.IOriginalUserDatum>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/users/parent_profile`,
        {
          authentication: params,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getSearchUsers(
    request: Moim.User.IGetSearchUsersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IGetSearchUsersResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/search/users`,
        { query: { ...request } },
        { cancelToken },
      )
    ).data;
  }

  // ERROR Response
  // CODE: INVALID_USERNAME_LENGTH | DUPLICATED_USERNAME | INVALID_USERNAME | FORBIDDEN_USERNAME
  public async checkValidateUsername(
    query: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    let groupId;
    try {
      groupId = this.getCurrentGroupId();
      // eslint-disable-next-line no-empty
    } catch {}

    return (
      await this.get(
        "/users/validate_name",
        {
          group_id: groupId,
          name: query,
        },
        { cancelToken },
      )
    ).data;
  }

  public async postPhoneNumber(
    request: Moim.User.IPostPhoneNumberRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IPostPhoneNumberResponseBody> {
    return (
      await this.post(
        `/auth/phone`,
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }

  public async verifyPhoneNumber(
    request: Moim.User.IVerifyPhoneNumberRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IVerifyPhoneNumberResponseBody> {
    return (
      await this.post(
        `/auth/phone/check`,
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }

  public async getProfileBlockit(
    userId: Moim.Id,
    viewType: Moim.User.IProfileViewType,
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Moim.Blockit.Blocks>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/users/${userId}`,
        { viewType, version: viewType === "show" ? "v3" : "v2" },
        { cancelToken },
      )
    ).data;
  }

  public async getSearchPageSearchUsers(
    params: Moim.User.IGetSearchPageSearchUsersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPlainPagingListResponse<Moim.User.ISearchedUserBody>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        "/search/users",
        { query: { groupId, limit: 30, ...params } },
        { cancelToken },
      )
    ).data;
  }

  public async userBlock(
    userId: string,
    cancelToken?: CancelToken,
  ): Promise<void> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/banned_users`,
        { bannedUser: { targetId: userId } },
        { cancelToken },
      )
    ).data;
  }

  public async userUnblock(
    userId: string,
    cancelToken?: CancelToken,
  ): Promise<void> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.delete(
        `/groups/${groupId}/banned_users/${userId}`,
        undefined,
        {
          cancelToken,
        },
      )
    ).data;
  }
}
