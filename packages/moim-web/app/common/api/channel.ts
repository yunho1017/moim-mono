import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class ChannelAPI extends MoimBaseAPI {
  public async getChannels(
    request: Moim.Channel.IGetChannelListRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IGetChannelListResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/channels`, request, {
        cancelToken,
      })
    ).data;
  }

  public async getChannel(
    request: Moim.Channel.IGetChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IGetChannelResponseBody> {
    return (
      await this.get(`/channels/${request.channelId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async deleteChannel(
    request: Moim.Channel.IDeleteChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IDeleteChannelResponseBody> {
    return (
      await this.delete(`/channels/${request.channelId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async editChannel(
    request: Moim.Channel.IEditChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IEditChannelResponseBody> {
    const { channelId, ...body } = request;

    return (
      await this.put(`/channels/${channelId}`, { ...body }, { cancelToken })
    ).data;
  }

  public async createChannel(
    request: Moim.Channel.ICreateChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IEditChannelResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(
        `/groups/${groupId}/channels`,
        { ...request },
        { cancelToken },
      )
    ).data;
  }

  public async getPinList<T>(
    request: Moim.Channel.IGetPinnedListRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IGetPinnedListResponseBody<T>> {
    const { channelId } = request;
    return (
      await this.get(`/channels/${channelId}/pins`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async arrangePinList(
    request: Moim.Channel.IArrangePinRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IArrangePinResponseBody> {
    const { channelId } = request;
    return (
      await this.post(
        `/channels/${channelId}/pins/arrange`,
        { ...request },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async deletePin(
    request: Moim.Channel.IDeletePinRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IDeletePinResponseBody> {
    const { channelId, pinId } = request;
    return (
      await this.delete(`/channels/${channelId}/pins/${pinId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async postPin(
    request: Moim.Channel.IPostPinRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IPostPinResponseBody> {
    const { channelId, ...params } = request;
    return (
      await this.post(
        `/channels/${channelId}/pins`,
        { ...params },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async batchChannel(
    request: { channels: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Channel.SimpleChannelType>> {
    return (
      await this.post(
        "/channels/_batch",
        {
          ...request,
        },
        { cancelToken },
      )
    ).data;
  }
}
