import { createSelector } from "reselect";

import { channelListDenormalizer } from "app/models";

import { IAppState } from "../rootReducer";
import getIsUnread from "common/helpers/getIsUnread";

const channelSelectorById = (
  channelEntities: Moim.Channel.INormalizedData,
  statEntities: Moim.Channel.IStatNormalizedData,
  id: Moim.Id,
) => {
  const ch = {
    ...channelEntities[id],
  };

  if ((ch as any).items) {
    (ch as any).items = (ch as any).items.map((childId: Moim.Id) =>
      channelSelectorById(channelEntities, statEntities, childId),
    );
  }

  if ((ch as any).stat) {
    (ch as any).stat = statEntities[(ch as any).stat];
  }

  return ch as Moim.Channel.SimpleChannelType;
};

const DENVER_2023_CHANNEL_BLACK_LIST = [
  "A50I64N6G",
  "QJE5W97X6",
  "QG0I4DV2Z",
  "QWWA550TM",
  "QJNAV7EBH",
];

export const channelWithCategorySelector = createSelector(
  (state: IAppState) => state.channelData.data.channels,
  (state: IAppState) => state.entities.channels,
  (state: IAppState) => state.entities.stats,
  (channels, channelEntities, statEntities) => {
    const channelData = channels.data
      .map(id =>
        !DENVER_2023_CHANNEL_BLACK_LIST.includes(id)
          ? channelSelectorById(channelEntities, statEntities, id)
          : undefined,
      )
      .filter(i => Boolean(i));

    return {
      data: channelData,
      paging: channels.paging,
    } as Moim.IPaginatedListResponse<Moim.Channel.SimpleChannelType>;
  },
);

export const channelWithoutCategorySelector = createSelector(
  (state: IAppState) => state.channelData.data.channels,
  (state: IAppState) => state.entities,
  (channelIds, entities) =>
    channelListDenormalizer(channelIds, entities)?.data.reduce<
      Moim.Channel.SimpleChannelWithoutCategoryType[]
    >((result, current) => {
      if (current.type === "category") {
        return result.concat(current.items ?? []);
      }
      result.push(current);

      return result;
    }, []),
);

export const filteredChannelSelector = createSelector(
  (
    state: IAppState,
    _channelTypes: Moim.Channel.TypeWithCategory[] | undefined,
  ) => state.channelData.data.channels,
  (
    state: IAppState,
    _channelTypes: Moim.Channel.TypeWithCategory[] | undefined,
  ) => state.entities.channels,
  (_: IAppState, channelTypes: Moim.Channel.TypeWithCategory[] | undefined) =>
    channelTypes,
  (
    channelIds,
    channelsEntities,
    channelTypes = [
      "conversation",
      "forum",
      "link",
      "dm",
      "tag",
      "subgroups",
      "view",
      "category",
    ] as Moim.Channel.TypeWithCategory[],
  ) => {
    const denormalizedChannels: Moim.Channel.NormalizedChannelType[] = channelIds.data.map(
      id => channelsEntities[id],
    );
    const filteredChannels = denormalizedChannels.filter(ch =>
      channelTypes.includes(ch.type),
    );

    denormalizedChannels.forEach(ch => {
      if (ch.type === "category" && ch.items && Boolean(ch.items.length)) {
        ch.items
          ?.map(id => channelsEntities[id])
          .filter(ch2 => channelTypes.includes(ch2.type))
          .forEach(ch2 => filteredChannels.push(ch2));
      }
    });

    return filteredChannels;
  },
);

export const filteredChannelByIdSelector = createSelector(
  (
    _state: IAppState,
    ids: Moim.Id[],
    _channelTypes: Moim.Channel.TypeWithCategory[] | undefined,
  ) => ids,
  (
    state: IAppState,
    _ids: Moim.Id[],
    _channelTypes: Moim.Channel.TypeWithCategory[] | undefined,
  ) => state.entities.channels,
  (
    _: IAppState,
    _ids: Moim.Id[],
    channelTypes: Moim.Channel.TypeWithCategory[] | undefined,
  ) => channelTypes,
  (
    channelIds,
    channelsEntities,
    channelTypes = [
      "conversation",
      "forum",
      "link",
      "dm",
      "tag",
      "subgroups",
      "view",
      "category",
    ] as Moim.Channel.TypeWithCategory[],
  ) => {
    const denormalizedChannels: Moim.Channel.NormalizedChannelType[] = channelIds.map(
      id => channelsEntities[id],
    );
    const channels: Moim.Channel.NormalizedChannelType[] = [];

    denormalizedChannels.forEach(ch => {
      if (!ch) return;
      if (channelTypes.includes(ch.type)) {
        channels.push(ch);
      }
      if (ch.type === "category" && ch.items && Boolean(ch.items.length)) {
        ch.items
          ?.map(id => channelsEntities[id])
          .filter(ch2 => channelTypes.includes(ch2.type))
          .forEach(ch2 => channels.push(ch2));
      }
    });

    return channels;
  },
);

export const channelByIdSelector = (store: IAppState, channelId: Moim.Id) =>
  store.entities.channels[channelId] as
    | Moim.Channel.SimpleChannelWithoutCategoryType
    | undefined;

export const unreadCountSelector = createSelector(
  (state: IAppState) => state.entities.stats,
  (_state: IAppState, channelId: string) => channelId,
  (stats, channelId) => stats[channelId]?.count || 0,
);

export const channelUnreadStatusSelector = createSelector(
  (state: IAppState) => state,
  (
    _state: IAppState,
    channel: Moim.Channel.SimpleChannelType | Moim.Channel.IChannel,
  ) => channel,
  (state, channel) => {
    const stat = state.entities.stats[channel.id];

    if (!stat) {
      return false;
    }

    switch (channel.type) {
      case "forum":
        return Boolean(stat?.has_new);
      case "conversation": {
        return getIsUnread({
          lastRead: stat.last_read,
          latest: channel.latest,
          statCount: stat.count,
        });
      }
      case "link":
      case "subgroups":
      case "tag":
      default:
        return false;
    }
  },
);

export const directMessageUnreadStatusSelector = (
  channel: Moim.DirectMessage.IDirectMessage,
  stat?: Moim.Channel.IChannelStat,
) => {
  if (!stat) {
    return false;
  }

  return getIsUnread({
    lastRead: stat.last_read,
    latest: channel.latest,
    statCount: stat.count,
  });
};

export const categorySelector = createSelector(
  (state: IAppState) => state.entities,
  (entities: Moim.Entity.INormalizedData) =>
    Object.values(entities.channels).filter(
      channel => channel.type === "category",
    ) as Moim.Channel.INormalizedCategory[],
);
