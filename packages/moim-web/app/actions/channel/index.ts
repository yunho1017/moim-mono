import { CancelToken } from "axios";
import { push } from "connected-react-router";
import { ThunkPromiseResult } from "app/store";
import { MoimURL } from "common/helpers/url";
import { ChannelTypes } from "app/actions/types";

import { ActionCreators as SnackbarActionCreators } from "../snackbar";
import {
  ActionCreators as EntityActionCreators,
  AddEntities,
  loadEntities,
} from "../entity";

import ChannelAPI from "common/api/channel";

import { channelListNormalizer, channelSingleItemNormalizer } from "app/models";
import { errorParseData } from "common/helpers/APIErrorParser";
import { ActionUnion } from "../helpers";
import { StatData } from "@balmbees/moim-proto/build/js/client/notification_pb";

function createAction<T extends { type: ChannelTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchingChannels: () =>
    createAction({ type: ChannelTypes.START_FETCHING_CHANNEL_LIST }),
  succeedFetchingChannels: (payload: {
    channels: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      type: ChannelTypes.SUCCEEDED_FETCHING_CHANNEL_LIST,
      payload,
    }),
  failedFetchingChannels: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ type: ChannelTypes.FAILED_FETCHING_CHANNEL_LIST, payload }),

  startCreateChannel: () =>
    createAction({ type: ChannelTypes.START_CREATE_CHANNEL }),
  succeedCreateChannel: (payload: {
    channel: Moim.Channel.SimpleChannelType;
  }) =>
    createAction({
      type: ChannelTypes.SUCCEEDED_CREATE_CHANNEL,
      payload,
    }),
  failedCreateChannel: () =>
    createAction({ type: ChannelTypes.FAILED_CREATE_CHANNEL }),

  startDeleteChannel: () =>
    createAction({ type: ChannelTypes.START_DELETE_CHANNEL }),
  succeedDeleteChannel: (payload: {
    channel?: Moim.Channel.NormalizedChannelType;
  }) =>
    createAction({
      type: ChannelTypes.SUCCEEDED_DELETE_CHANNEL,
      payload,
    }),
  failedDeleteChannel: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ type: ChannelTypes.FAILED_DELETE_CHANNEL, payload }),

  startEditChannel: () =>
    createAction({ type: ChannelTypes.START_EDIT_CHANNEL }),
  succeedEditChannel: (payload: { channel: Moim.Channel.SimpleChannelType }) =>
    createAction({
      type: ChannelTypes.SUCCEEDED_EDIT_CHANNEL,
      payload,
    }),
  failedEditChannel: () =>
    createAction({ type: ChannelTypes.FAILED_EDIT_CHANNEL }),

  startUpdateChannelStat: () =>
    createAction({ type: ChannelTypes.START_UPDATE_CHANNEL_STAT }),

  failedUpdateChannelStat: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ type: ChannelTypes.FAILED_UPDATE_CHANNEL_STAT, payload }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function updateChannelStat(statData: StatData[]): ThunkPromiseResult {
  return async (dispatch, getState) => {
    try {
      dispatch(ActionCreators.startUpdateChannelStat());

      const currentUserId = getState().app.currentUserId;
      const currentUser =
        currentUserId && getState().entities.users[currentUserId];
      if (
        currentUser &&
        !currentUser.config.notification.defaultSet.alarmNotification.allowed
          .web &&
        !currentUser.config.notification.defaultSet.creatingNotification.allowed
      ) {
        return;
      }

      const updatedEntities = statData.reduce<
        Partial<Moim.Entity.INormalizedData>
      >((result, current) => {
        const id = current.getId();
        const newStat: Moim.Channel.IChannelStat = {
          count: current.getCount(),
          has_new: current.getHasnew(),
          last_read: current.getLastread(),
          updated_at: current.getUpdatedat(),
          has_new_notification: current.getHasnewnotification(),
          list_count: current.getListcount(),
          root_list_count: current.getRootlistcount(),
        };

        return {
          ...result,
          stats: { ...result.stats, [id]: newStat },
        };
      }, {});

      dispatch(AddEntities(updatedEntities));
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;
      dispatch(ActionCreators.failedUpdateChannelStat({ error }));
    }
  };
}

export function updateChannelLatest(
  channelId: Moim.Id,
  itemId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const { entities } = getState();
    const channelEntity = entities.channels[
      channelId
    ] as Moim.Channel.SimpleChannelWithoutCategoryType;

    const directMessageEntity = entities.directMessages[channelId];

    if (Boolean(channelEntity)) {
      dispatch(
        EntityActionCreators.addEntity({
          channels: {
            [channelId]: { ...channelEntity, latest: itemId },
          },
        }),
      );
    } else if (Boolean(directMessageEntity)) {
      dispatch(
        EntityActionCreators.addEntity({
          directMessages: {
            [channelId]: { ...directMessageEntity, latest: itemId },
          },
        }),
      );
    }
  };
}

export function updateThreadLatest(
  threadId: Moim.Id,
  itemId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const { entities } = getState();
    const threadEntity = entities.threads[threadId];

    if (Boolean(threadEntity)) {
      dispatch(
        EntityActionCreators.addEntity({
          threads: {
            [threadId]: { ...threadEntity, latest: itemId },
          },
        }),
      );
    }
  };
}

export function createChannel(
  channelData: Moim.Channel.ChannelEditAndCreateDataType | undefined,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken: CancelToken,
  useRedirect: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;
    let redirectChannelUrl = "";

    dispatch(ActionCreators.startCreateChannel());
    try {
      if (!channelData) {
        throw new Error();
      }

      const result = await apiSelector(
        getState(),
        dispatch,
      ).channel.createChannel({ channel: channelData }, cancelToken);
      const channelId = result.data.id;

      switch (channelData.type) {
        case "conversation": {
          redirectChannelUrl = new MoimURL.ConversationShow({
            conversationId: channelId,
          }).toString();
          break;
        }

        case "forum": {
          redirectChannelUrl = new MoimURL.Forum({
            forumId: channelId,
          }).toString();
          break;
        }
      }
      dispatch(ActionCreators.succeedCreateChannel({ channel: result.data }));
    } catch {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedCreateChannel());
    }

    dispatch(
      SnackbarActionCreators.openSnackbar({
        text: snackbarMessage,
      }),
    );

    if (useRedirect && redirectChannelUrl) {
      dispatch(push(redirectChannelUrl));
    }
  };
}

export function editChannel(
  channelId: Moim.Id,
  channelData: Moim.Channel.ChannelEditAndCreateDataType | undefined,
  message: {
    succeed: string;
    failed: string;
  },
  useRedirect: boolean,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;
    let redirectChannelUrl = "";

    dispatch(ActionCreators.startEditChannel());
    try {
      if (!channelData) {
        throw new Error();
      }

      const result = await apiSelector(
        getState(),
        dispatch,
      ).channel.editChannel({ channelId, channel: channelData }, cancelToken);

      switch (channelData.type) {
        case "conversation": {
          redirectChannelUrl = new MoimURL.ConversationShow({
            conversationId: result.data.id,
          }).toString();
          break;
        }

        case "forum": {
          redirectChannelUrl = new MoimURL.Forum({
            forumId: result.data.id,
          }).toString();
          break;
        }
      }

      dispatch(ActionCreators.succeedEditChannel({ channel: result.data }));
    } catch {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedEditChannel());
    }

    dispatch(
      SnackbarActionCreators.openSnackbar({
        text: snackbarMessage,
      }),
    );

    if (useRedirect && redirectChannelUrl) {
      dispatch(push(redirectChannelUrl));
    }
  };
}

export function getChannels(
  ...args: Parameters<typeof ChannelAPI.prototype.getChannels>
): ThunkPromiseResult<Moim.Id[] | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startFetchingChannels());
      const storeState = getState();
      const api = apiSelector(storeState, dispatch);
      const channels = channelListNormalizer(
        await api.channel.getChannels(...args),
      );
      dispatch(loadEntities(channels.entities));
      dispatch(
        ActionCreators.succeedFetchingChannels({
          channels: channels.result,
        }),
      );

      return channels.result.data;
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;
      dispatch(ActionCreators.failedFetchingChannels({ error }));
    }
  };
}

export function getWriteableChannels(): ThunkPromiseResult<
  Moim.Id[] | undefined
> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const storeState = getState();
      const api = apiSelector(storeState, dispatch);
      const channels = channelListNormalizer(
        await api.channel.getChannels({
          target: "WRITE_POST",
        }),
      );

      const tmpEntity: Moim.Channel.INormalizedData = {};
      Object.entries(channels.entities.channels).forEach(([key, channel]) => {
        if (channel.type !== "category") {
          tmpEntity[key] = channel;
        }
      });

      dispatch(
        loadEntities({ channels: tmpEntity } as Moim.Entity.INormalizedData),
      );

      return channels.result.data;
    } catch {}
  };
}

export function getChannel(
  ...args: Parameters<typeof ChannelAPI.prototype.getChannel>
): ThunkPromiseResult<Moim.Channel.IGetChannelResponseBody | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const storeState = getState();
      const api = apiSelector(storeState, dispatch);
      const channel = await api.channel.getChannel(...args);
      const normalized = channelSingleItemNormalizer(channel);

      dispatch(loadEntities(normalized.entities));

      return channel;
    } catch (rawError) {
      console.error(rawError);
    }
  };
}

export function deleteChannel(
  request: Moim.Channel.IDeleteChannelRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<{ success: boolean; error?: Moim.IErrorResponse }> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startDeleteChannel());
      const storeState = getState();
      const api = apiSelector(storeState, dispatch);
      const result = await api.channel.deleteChannel(request, cancelToken);

      dispatch(
        ActionCreators.succeedDeleteChannel({
          channel: storeState.entities.channels[request.channelId],
        }),
      );

      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: message.succeed,
        }),
      );

      return { success: result.data.success };
    } catch (rawError) {
      const error =
        rawError instanceof Error ? errorParseData(rawError) : undefined;
      dispatch(ActionCreators.failedDeleteChannel({ error }));

      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: message.failed,
        }),
      );
      return { error, success: false };
    }
  };
}
