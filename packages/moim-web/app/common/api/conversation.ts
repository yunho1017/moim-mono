import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class ConversationAPI extends MoimBaseAPI {
  public async getConversation(
    request: Moim.Conversations.IConversationInformationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationInformationResponseBody> {
    const { channel_id, ...params } = request;
    return (
      await this.get(`/conversations/${channel_id}`, params, {
        cancelToken,
      })
    ).data;
  }

  public async getConversationMembers(
    request: Moim.Conversations.IConversationMembersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationMembersResponseBody> {
    const { channel_id, ...params } = request;
    return (
      await this.get(`/conversations/${channel_id}/members`, params, {
        cancelToken,
      })
    ).data;
  }

  public async joinConversation(
    request: Moim.Conversations.IJoinConversationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IJoinConversationResponseBody> {
    const { channel_id, ...params } = request;
    return (
      await this.post(`/conversations/${channel_id}/relation`, null, {
        cancelToken,
        params,
      })
    ).data;
  }

  public async getConversationMessages(
    request: Moim.Conversations.IConversationMessagesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationMessagesResponseBody> {
    const { channel_id, ...params } = request;
    return (
      await this.get(`/conversations/${channel_id}/messages`, params, {
        cancelToken,
      })
    ).data;
  }

  public async createConversationMessage(
    request: Moim.Conversations.ICreateConversationMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.ICreateConversationMessageResponseBody> {
    const { channel_id, ...body } = request;
    const { message, ...params } = body;
    return (
      await this.post(
        `/conversations/${channel_id}/messages`,
        { message },
        { params, cancelToken },
      )
    ).data;
  }

  public async editConversationMessage(
    request: Moim.Conversations.IEditConversationMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IEditConversationMessageResponseBody> {
    const { channel_id, message_id, ...body } = request;
    const { message, ...params } = body;
    return (
      await this.put(
        `/conversations/${channel_id}/messages/${message_id}`,
        { message },
        { params, cancelToken },
      )
    ).data;
  }

  public async deleteConversationMessage(
    request: {
      channelId: Moim.Id;
      messageId: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    const { channelId, messageId } = request;
    return (
      await this.delete(
        `/conversations/${channelId}/messages/${messageId}`,
        undefined,
        { cancelToken },
      )
    ).data;
  }

  public async getSearchMessages(
    params: Moim.Conversations.IGetSearchMessagesRequest,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPlainPagingListResponse<Moim.Conversations.ISearchedMessageBody>
  > {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        "/search/messages",
        {
          query: {
            groupId,
            limit: 30,
            contentTypes: ["text"],
            ...params,
          },
        },
        { cancelToken },
      )
    ).data;
  }
}
