import { MoimBaseAPI } from "common/api/base";
import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

class PermissionAPI extends MoimBaseAPI {
  public async getPermission(
    _request: Moim.Permission.IMoimPermissionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Permission.IMoimPermissionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.PERMISSIONS;
  }
}

export default PermissionAPI;
