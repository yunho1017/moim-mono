import { MoimBaseAPI } from "common/api/base";
import { CancelToken } from "axios";

export default class AuthAPI extends MoimBaseAPI {
  public async getAuth(
    payload: {
      authentication: Moim.IAuthentication;
      fallbackWithParent?: boolean;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.ITokenAndUserResponse>> {
    return (
      await this.post(
        `/auth/cryptobadge${
          payload.fallbackWithParent ? "?fallbackWithParent=true" : ""
        }`,
        { authentication: payload.authentication },
        {
          cancelToken,
          passthrough: true,
        },
      )
    ).data;
  }
}
