import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class UserAPI {
  public async getUsers(_options: any, cancelToken: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({
      data: [RAW.NORMALIZED_MEMBER],
      paging: {},
    });
  }

  public async postUser(
    _request: any,
    cancelToken?: CancelToken,
  ): Promise<Moim.User.IPostUsersResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_MEMBER,
      token: {
        access_token: "",
        expires_in: 0,
        refresh_token: "",
        token_type: "",
      },
    };
  }

  public async batchUsers(_users: string[], cancelToken: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({
      data: [RAW.NORMALIZED_MEMBER],
      paging: {},
    });
  }

  public async getParentMoimUserData(
    _params: {
      provider: Moim.AuthenticationProvider;
      token: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.User.IParentMoimUserInformation>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.PARENT_MOIM_USER_PROFILE;
  }

  public async getSearchUsers(_options: any, cancelToken: CancelToken) {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return Promise.resolve({
      data: [RAW.NORMALIZED_MEMBER],
      paging: {},
    });
  }

  public async checkValidateUsername(
    _query: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.ISuccessResponse>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return Promise.resolve({ data: { success: true } });
  }

  public async getProfileBlockit(
    _userId: Moim.Id,
    viewType: "show" | "preview",
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Moim.Blockit.Blocks>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return Promise.resolve(
      viewType === "show"
        ? { data: RAW.PROFILE_SHOW_BLOCKITS }
        : { data: RAW.PROFILE_PREVIEW_BLOCKITS },
    );
  }
}
