import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class DirectMessageAPI {
  public async getDirectMessages(
    _request: Moim.DirectMessage.IGetDirectMessagesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.IGetDirectMessagesResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: [RAW.DIRECT_MESSAGE],
      paging: {},
    };
  }

  public async getDirectMessage(
    _request: Moim.DirectMessage.IGetDirectMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.IGetDirectMessageResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.DIRECT_MESSAGE,
    };
  }

  public async createDirectMessage(
    _request: Moim.DirectMessage.ICreateDirectMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.ICreateDirectMessageResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.DIRECT_MESSAGE,
    };
  }
}
