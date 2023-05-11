import { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";

export default class AgreementAPI {
  public async getAgreement(
    _type: Moim.Agreement.AgreementType,
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Agreement.IAgreement>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.AGREEMENT_TERM;
  }

  public async putAgreement(
    _type: Moim.Agreement.AgreementType,
    _content: Moim.Blockit.Blocks[],
    cancelToken: CancelToken,
  ): Promise<Moim.ISingleItemResponse<Moim.Agreement.IAgreement>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return RAW.AGREEMENT_TERM;
  }
}
