import { MoimBaseAPI } from "common/api/base";
import { CancelToken } from "axios";

export default class PermissionAPI extends MoimBaseAPI {
  public async getPermission(
    request: Moim.Permission.IMoimPermissionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Permission.IMoimPermissionResponseBody> {
    const { resource, ...params } = request;
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/permission`,
        { resource, version: "v2" },
        {
          params,
          cancelToken,
        },
      )
    ).data;
  }

  public async updatePermission(
    permissions: {
      resource: Moim.Id;
      right: Moim.Permission.PermissionType;
      target: Moim.Permission.APPLIED_TYPE;
      limited?: Moim.Id[];
    }[],
    cancelToken?: CancelToken,
  ): Promise<Moim.Permission.IMoimPermissionResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.put(
        `/groups/${groupId}/permission`,
        { permissions },
        {
          cancelToken,
        },
      )
    ).data;
  }
}
