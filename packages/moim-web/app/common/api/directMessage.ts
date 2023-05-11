import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class DirectMessageAPI extends MoimBaseAPI {
  public async batchDirectMessages(
    request: { directMessages: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPaginatedListResponse<Moim.DirectMessage.INormalizedDirectMessage>
  > {
    return (
      await this.post(
        "/direct_messages/_batch",

        request,

        { cancelToken },
      )
    ).data;
  }

  public async getDirectMessages(
    request: Moim.DirectMessage.IGetDirectMessagesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.IGetDirectMessagesResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/direct_messages`,
        { ...request },
        { cancelToken },
      )
    ).data;
  }

  public async getDirectMessage(
    { direct_message_id }: Moim.DirectMessage.IGetDirectMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.IGetDirectMessageResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(
        `/groups/${groupId}/direct_messages/${direct_message_id}`,
        {},
        { cancelToken },
      )
    ).data;
  }

  public async createDirectMessage(
    request: Moim.DirectMessage.ICreateDirectMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.DirectMessage.ICreateDirectMessageResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/direct_messages`,
        { ...request },
        { cancelToken },
      )
    ).data;
  }
}
