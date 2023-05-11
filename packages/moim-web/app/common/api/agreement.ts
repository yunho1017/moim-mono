import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class AgreementAPI extends MoimBaseAPI {
  public async getAgreement(
    type: Moim.Agreement.AgreementType,
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Agreement.IAgreement>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/agreement/${type}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async putAgreement(
    type: Moim.Agreement.AgreementType,
    content: Moim.Blockit.Blocks[],
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Agreement.IAgreement>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.put(
        `/groups/${groupId}/agreement/${type}`,
        {
          agreement: {
            content,
          },
        },
        {
          cancelToken,
        },
      )
    ).data;
  }
}
