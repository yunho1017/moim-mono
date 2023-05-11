import produce from "immer";
import { AllActions } from "app/actions";
import { ChannelNotificationSettingDialogTypes } from "app/actions/types";

export interface IChannelNotificationSettingDialogState {
  open: boolean;
  type: Exclude<
    Moim.Channel.Type,
    "link" | "tag" | "subgroups" | "view"
  > | null;
  channelId: Moim.Id | null;
}

export const INITIAL_STATE: IChannelNotificationSettingDialogState = {
  open: false,
  type: null,
  channelId: null,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ChannelNotificationSettingDialogTypes.OPEN: {
        draft.open = true;
        draft.type = action.payload.type;
        draft.channelId = action.payload.channelId;
        break;
      }

      case ChannelNotificationSettingDialogTypes.CLOSE: {
        draft.open = false;
        draft.type = null;
        draft.channelId = null;
        break;
      }
    }
  });
}
