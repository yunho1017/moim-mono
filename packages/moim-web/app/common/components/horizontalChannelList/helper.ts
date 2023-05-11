import { IAppState } from "app/rootReducer";
import {
  channelUnreadStatusSelector,
  unreadCountSelector,
} from "app/selectors/channel";

export function getTotalUnreadCountFromChannelList(
  state: IAppState,
  channelList?: Moim.Channel.SimpleChannelWithoutCategoryType[],
) {
  if (!channelList) {
    return 0;
  }

  return channelList?.reduce((total, current) => {
    return total + unreadCountSelector(state, current.id);
  }, 0);
}

export function gethasUnreadFromChannelList(
  state: IAppState,
  channelList?: Moim.Channel.SimpleChannelWithoutCategoryType[],
) {
  if (!channelList) {
    return false;
  }
  return channelList?.some(channel =>
    channelUnreadStatusSelector(state, channel),
  );
}
