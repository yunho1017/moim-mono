/* eslint-disable no-underscore-dangle */
import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, ChannelTypes } from "../../actions/types";
import { channelListNormalizer } from "app/models";
import { CURRENT_USER_KEY } from "common/constants/keys";
import { sentryDebugLog } from "common/helpers/errorLogger";

const WHITE_LIST_USER_IDS = ["UWHLMMN6P", "USXTXLK92", "UHACI77OV"];

export const INITIAL_STATE: Moim.Channel.INormalizedData = {
  ...(window.__homeChannel
    ? { [window.__homeChannel.data.id]: window.__homeChannel.data }
    : undefined),
  ...(window.__channelData
    ? channelListNormalizer(window.__channelData).entities.channels
    : undefined),
};

export function reducer(
  state: Moim.Channel.INormalizedData = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        Object.entries(action.payload.channels || {}).forEach(
          ([key, value]) => {
            if (
              action.payload.forceUpdate ||
              !value.hasOwnProperty("updated_at") ||
              value.updated_at >= (draft[key]?.updated_at ?? 0)
            ) {
              if (
                key === "AGLUTYXWI" &&
                WHITE_LIST_USER_IDS.includes(
                  sessionStorage.getItem(CURRENT_USER_KEY) ?? "",
                ) &&
                !(value as Moim.Channel.INormalizedCategory).items?.length
              ) {
                console.trace(">>> TRACE!!");
                sentryDebugLog(
                  `>>> channelItem:${
                    location.hostname
                  }:${sessionStorage.getItem(CURRENT_USER_KEY) ?? ""}`,
                  {
                    payload: JSON.stringify(value),
                  },
                );
              }

              draft[key] = value;
            }
          },
        );

        break;
      }

      case ChannelTypes.SUCCEEDED_DELETE_CHANNEL: {
        const { channel } = action.payload;

        if (!channel) {
          break;
        }

        if (channel.type === "category") {
          delete draft[channel.id];
          break;
        }

        const parent = channel.parent ? draft[channel.parent] : undefined;

        delete draft[channel.id];
        if (parent && parent.type === "category") {
          draft[parent.id] = {
            ...parent,
            items: parent.items?.filter(target => target !== channel.id),
          };
        }

        break;
      }

      case ChannelTypes.SUCCEEDED_CREATE_CHANNEL: {
        const { channel } = action.payload;

        if (channel.type === "category") {
          draft[channel.id] = {
            ...channel,
            items: channel.items?.map(item => item.id),
          };
          break;
        }
        draft[channel.id] = channel;

        const parent = draft[channel.parent || ""];
        if (parent && parent.type === "category") {
          draft[parent.id] = {
            ...parent,
            items: [...(parent.items || []), channel.id],
          };
        }

        break;
      }

      case ChannelTypes.SUCCEEDED_EDIT_CHANNEL: {
        const { channel } = action.payload;

        if (channel.type === "category") {
          draft[channel.id] = {
            ...channel,
            items: (draft[channel.id] as Moim.Channel.INormalizedCategory)
              .items,
          };
          break;
        }
        draft[channel.id] = channel;

        const categoryChanged = !(draft[channel.parent || ""] as
          | Moim.Channel.INormalizedCategory
          | undefined)?.items?.find(channelId => channelId === channel.id);

        if (categoryChanged) {
          Object.values(draft).forEach(entity => {
            if (entity.type === "category") {
              const items =
                entity.items?.filter(item => item !== channel.id) || [];

              if (channel.parent === entity.id) {
                items.push(channel.id);
              }

              draft[entity.id] = {
                ...entity,
                items,
              };
            }
          });
        }
        break;
      }
    }
  });
}
