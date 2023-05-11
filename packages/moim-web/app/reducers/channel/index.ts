import { combineReducers } from "redux";
import { produce } from "immer";
import { ChannelTypes } from "app/actions/types";
import { AllActions } from "app/actions";

const CHANNEL_INITIAL_STATE: Moim.Channel.IChannelState = {
  channels: window.__channelData
    ? {
        data: window.__channelData.data.map((channel: any) => channel.id),
        paging: {},
      }
    : {
        data: [],
        paging: {},
      },
  getChannelsLoading: false,
};

function channelReducers(
  state: Moim.Channel.IChannelState = CHANNEL_INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case ChannelTypes.START_FETCHING_CHANNEL_LIST: {
        draft.getChannelsLoading = true;
        break;
      }

      case ChannelTypes.SUCCEEDED_FETCHING_CHANNEL_LIST: {
        // NOTE: 페이지네이션이 생기면 mergePaginated... 기능을 활성화 하거나 append or replace 기능 분기 하기
        // ref, https://github.com/balmbees/moim-web/pull/1347
        draft.channels = action.payload.channels;
        draft.getChannelsLoading = false;
        break;
      }

      case ChannelTypes.FAILED_FETCHING_CHANNEL_LIST: {
        draft.getChannelsLoading = false;
        break;
      }

      case ChannelTypes.SUCCEEDED_EDIT_CHANNEL: {
        const { channel } = action.payload;

        if (channel.type === "category") {
          break;
        }

        const newChannels = draft.channels.data.filter(channelId =>
          channel.parent ? channelId !== channel.id : true,
        );

        if (!channel.parent && !draft.channels.data.includes(channel.id)) {
          newChannels.push(channel.id);
        }

        draft.channels.data = newChannels;

        break;
      }

      case ChannelTypes.SUCCEEDED_DELETE_CHANNEL: {
        const { channel } = action.payload;

        if (!channel) {
          break;
        }

        draft.channels.data = draft.channels.data.filter(
          target => target !== channel.id,
        );

        if (channel.type === "category") {
          draft.channels.data = [
            ...draft.channels.data,
            ...(channel.items || []),
          ];
        }

        break;
      }

      default: {
        break;
      }
    }
  });
}

export interface IChannelState {
  data: Moim.Channel.IChannelState;
}

export const INITIAL_STATE: IChannelState = {
  data: CHANNEL_INITIAL_STATE,
};
export const reducer = combineReducers<IChannelState>({
  data: channelReducers,
});
