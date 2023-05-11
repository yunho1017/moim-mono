// import { CancelToken } from "axios";
import axios from "axios";
import { DirectMessageTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { AddEntities, loadEntities } from "app/actions/entity";
import DirectMessageAPI from "common/api/directMessage";
import {
  directMessageListNormalizer,
  directMessageSingleItemNormalizer,
} from "app/models/directMessage";
import { updateChannelLatest, updateThreadLatest } from "../channel";
import { ItemIdTypes } from "app/enums";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { ActionCreators as DMActionCreators } from "../directMessage";
import {
  batchDirectMessagesHandler,
  batchUserData,
} from "common/helpers/batchService";

function createAction<T extends { type: DirectMessageTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openNewDirectMessageDialog: () =>
    createAction({
      type: DirectMessageTypes.OPEN_NEW_DIRECT_MESSAGE_DIALOG,
    }),
  closeNewDirectMessageDialog: () =>
    createAction({
      type: DirectMessageTypes.CLOSE_NEW_DIRECT_MESSAGE_DIALOG,
    }),

  clearDirectMessages: () =>
    createAction({ type: DirectMessageTypes.CLEAR_DIRECT_MESSAGE }),

  startGetDirectMessages: () =>
    createAction({ type: DirectMessageTypes.START_GET_DIRECT_MESSAGES }),
  succeededGetDirectMessages: (
    directMessages: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGES,
      payload: { directMessages },
    }),
  failedGetDirectMessages: () =>
    createAction({ type: DirectMessageTypes.FAILED_GET_DIRECT_MESSAGE }),

  startGetDirectMessage: () =>
    createAction({ type: DirectMessageTypes.START_GET_DIRECT_MESSAGE }),
  succeededGetDirectMessage: (
    directMessage: Moim.ISingleItemResponse<Moim.Id>,
    fetchDirection?: "before" | "after",
  ) =>
    createAction({
      type: DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGE,
      payload: { directMessage, fetchDirection },
    }),
  failedGetDirectMessage: () =>
    createAction({ type: DirectMessageTypes.FAILED_GET_DIRECT_MESSAGES }),

  startCreateDirectMessage: () =>
    createAction({ type: DirectMessageTypes.START_CREATE_DIRECT_MESSAGE }),
  succeededCreateDirectMessage: (
    directMessage: Moim.ISingleItemResponse<Moim.Id>,
  ) =>
    createAction({
      type: DirectMessageTypes.SUCCEEDED_CREATE_DIRECT_MESSAGE,
      payload: { directMessage },
    }),
  failedCreateDirectMessage: () =>
    createAction({ type: DirectMessageTypes.FAILED_CREATE_DIRECT_MESSAGE }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getDirectMessages(
  ...params: Parameters<typeof DirectMessageAPI.prototype.getDirectMessages>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startGetDirectMessages());
    try {
      const directMessages = directMessageListNormalizer(
        await apiSelector(getStore(), dispatch).directMessage.getDirectMessages(
          ...params,
        ),
      );
      dispatch(loadEntities(directMessages.entities));
      dispatch(
        ActionCreators.succeededGetDirectMessages(directMessages.result),
      );
    } catch (err) {
      dispatch(ActionCreators.failedGetDirectMessages());
    }
  };
}

export function getDirectMessage(
  ...params: Parameters<typeof DirectMessageAPI.prototype.getDirectMessage>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startGetDirectMessage());
    try {
      const directMessage = directMessageSingleItemNormalizer(
        await apiSelector(getStore(), dispatch).directMessage.getDirectMessage(
          ...params,
        ),
      );
      dispatch(loadEntities(directMessage.entities));
      dispatch(ActionCreators.succeededGetDirectMessage(directMessage.result));
    } catch (err) {
      dispatch(ActionCreators.failedGetDirectMessage());
    }
  };
}

export function createDirectMessage(
  ...params: Parameters<typeof DirectMessageAPI.prototype.createDirectMessage>
): ThunkPromiseResult<Moim.Id | undefined> {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startCreateDirectMessage());
    try {
      const directMessage = directMessageSingleItemNormalizer(
        await apiSelector(
          getStore(),
          dispatch,
        ).directMessage.createDirectMessage(...params),
      );
      dispatch(loadEntities(directMessage.entities));
      dispatch(
        ActionCreators.succeededCreateDirectMessage(directMessage.result),
      );
      return directMessage.result.data;
    } catch (err) {
      if (err instanceof Error && axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 422:
            if (err.response.data.error.code === "BLOCKED") {
              dispatch(
                SnackbarActionCreators.openSnackbar({
                  textKey: "toast_message_dm_not_allowed",
                  type: "error",
                }),
              );
            } else {
              dispatch(
                SnackbarActionCreators.openSnackbar({
                  textKey: "dialog_block_create_dm_body",
                  type: "error",
                }),
              );
            }
          default:
            throw err;
        }
      }
      dispatch(ActionCreators.failedCreateDirectMessage());
    }
  };
}

export function notCurrentChannelNewMessageHandler(
  channelType: string,
  channelId: Moim.Id,
  parentId: Moim.Id,
  itemId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getStore) => {
    const state = getStore();
    if (
      channelType === "direct_message" &&
      !state.entities.directMessages[channelId]
    ) {
      const currentUserId = state.app.currentUserId;
      const directMessage = (
        await batchDirectMessagesHandler([channelId])
      )?.find(data => data.id === channelId);
      const targetUserIds = directMessage?.members.filter(
        member => member !== currentUserId || !state.entities.users[member],
      );
      const targetUserEntities = targetUserIds
        ? await batchUserData(targetUserIds)
        : undefined;

      if (directMessage) {
        await dispatch(
          AddEntities({
            directMessages: { [directMessage.id]: directMessage },
            ...targetUserEntities,
          }),
        );
        await dispatch(
          DMActionCreators.succeededGetDirectMessage(
            { data: channelId },
            "before",
          ),
        );
      }
    }

    const isMessageEvent = itemId.startsWith(ItemIdTypes.MESSAGE);
    const isNewThreadEvent = itemId.startsWith(ItemIdTypes.THREAD);
    const isNewCommentEvent = itemId.startsWith(ItemIdTypes.COMMENT);

    if (isMessageEvent || isNewThreadEvent) {
      dispatch(updateChannelLatest(channelId, itemId));
    } else if (isNewCommentEvent) {
      dispatch(updateThreadLatest(parentId, itemId));
    }
  };
}
