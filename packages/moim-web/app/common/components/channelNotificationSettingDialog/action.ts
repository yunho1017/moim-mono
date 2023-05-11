import { ChannelNotificationSettingDialogTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";

function createAction<
  T extends { type: ChannelNotificationSettingDialogTypes }
>(d: T): T {
  return d;
}

export const ActionCreators = {
  open: (payload: {
    type: Exclude<Moim.Channel.Type, "link" | "tag" | "subgroups" | "view">;
    channelId: Moim.Id;
  }) =>
    createAction({
      type: ChannelNotificationSettingDialogTypes.OPEN,
      payload,
    }),

  close: () =>
    createAction({
      type: ChannelNotificationSettingDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
