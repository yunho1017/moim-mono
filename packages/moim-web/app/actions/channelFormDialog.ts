import { ChannelFormDialogTypes } from "./types";
import { ActionUnion } from "./helpers";
import { FORM_TYPE } from "common/constants/form";

function createAction<T extends { type: ChannelFormDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openForCreate: ({ type = FORM_TYPE.CHANNEL }: { type?: FORM_TYPE }) =>
    createAction({
      type: ChannelFormDialogTypes.OPEN_FOR_CREATE,
      payload: { type },
    }),

  openForEdit: ({
    channelId,
    type = FORM_TYPE.CHANNEL,
    useRedirectAfter = true,
  }: {
    channelId: Moim.Id;
    type?: FORM_TYPE;
    useRedirectAfter?: boolean;
  }) =>
    createAction({
      type: ChannelFormDialogTypes.OPEN_FOR_EDIT,
      payload: { channelId, type, useRedirectAfter },
    }),

  close: () =>
    createAction({
      type: ChannelFormDialogTypes.CLOSE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
