import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class ChannelAPI {
  public async getChannels(
    _request: Moim.Channel.IGetChannelListRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Channel.SimpleChannelType>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [
        {
          id: "C1234",
          type: "category",
          name: "category1",
          items: [
            {
              id: "F1234",
              type: "forum",
              name: "forum 1",
              stat: { count: 0, has_new: false, last_read: "M289Q7MU0" },
            },
          ],
        },
        {
          id: "C1234666",
          type: "conversation",
          name: "conversation 1",
          stat: { count: 0, has_new: false, last_read: "M289Q7MU0" },
        },
      ],
    } as any;
  }

  public async deleteChannel(
    _request: Moim.Channel.IDeleteChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IDeleteChannelResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: {
        success: true,
      },
    };
  }

  public async editChannel(
    _request: Moim.Channel.IEditChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.IEditChannelResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.SIMPLE_CHANNEL,
    };
  }

  public async createChannel(
    _request: Moim.Channel.ICreateChannelRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Channel.ICreateChannelResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.SIMPLE_CHANNEL,
    };
  }

  public async batchChannel(
    _request: { channels: Moim.Id[] },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Channel.SimpleChannelType>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.SIMPLE_CHANNEL],
      paging: {},
    };
  }
}
