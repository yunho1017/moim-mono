import shortid from "shortid";
import { ActionUnion } from "app/actions/helpers";
import { DQuestCompleteDialogTypes } from "app/actions/types";
import { ThunkPromiseResult } from "app/store";

function createAction<T extends { type: DQuestCompleteDialogTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  openDQuestCompleteDialog: (
    message: Moim.DQuest.IDQuestCompleteDialogMessage,
  ) =>
    createAction({
      type: DQuestCompleteDialogTypes.OPEN_DQUEST_COMPLETE_DIALOG,
      payload: message,
    }),
  closeDQuestCompleteDialog: (messageId: Moim.Id) =>
    createAction({
      type: DQuestCompleteDialogTypes.CLOSE_DQUEST_COMPLETE_DIALOG,
      payload: {
        messageId,
      },
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function openDQuestCompleteDialog(
  message: Omit<Moim.DQuest.IDQuestCompleteDialogMessage, "id"> & {
    questId: string;
  },
): ThunkPromiseResult<Moim.Id> {
  return async dispatch => {
    const newMessageId = message.questId ?? shortid();
    dispatch(
      ActionCreators.openDQuestCompleteDialog({
        id: newMessageId,
        ...message,
      }),
    );

    return newMessageId;
  };
}

export function closeDQuestCompleteDialog(id: Moim.Id): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.closeDQuestCompleteDialog(id));
  };
}
