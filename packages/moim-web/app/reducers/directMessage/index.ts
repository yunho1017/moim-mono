import { AllActions } from "app/actions";
import produce from "immer";
import { DirectMessageTypes } from "app/actions/types";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";

export interface IDirectMessageState {
  directMessages: Moim.IPaginatedListResponse<Moim.Id>;
  getDirectMessagesLoading: boolean;
  createDirectMessageLoading: boolean;
}

export const INITIAL_STATE: IDirectMessageState = {
  directMessages: { data: [], paging: {} },
  getDirectMessagesLoading: false,
  createDirectMessageLoading: false,
};

export const reducer = (
  state: IDirectMessageState = INITIAL_STATE,
  action: AllActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case DirectMessageTypes.START_GET_DIRECT_MESSAGES: {
        draft.getDirectMessagesLoading = true;
        break;
      }

      case DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGES: {
        draft.directMessages = action.payload.directMessages;
        draft.getDirectMessagesLoading = false;
        break;
      }

      case DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGE: {
        const { directMessage, fetchDirection = "after" } = action.payload;
        const newDirectMessages =
          fetchDirection === "before"
            ? mergeArrayUniq(
                [directMessage.data],
                [...draft.directMessages.data],
              )
            : mergeArrayUniq(
                [...draft.directMessages.data],
                [directMessage.data],
              );

        if (newDirectMessages) {
          draft.directMessages.data = newDirectMessages;
        }

        break;
      }

      case DirectMessageTypes.FAILED_GET_DIRECT_MESSAGES: {
        draft.getDirectMessagesLoading = false;
        break;
      }

      case DirectMessageTypes.START_CREATE_DIRECT_MESSAGE: {
        draft.createDirectMessageLoading = true;
        break;
      }

      case DirectMessageTypes.SUCCEEDED_CREATE_DIRECT_MESSAGE: {
        const newDirectMessage = action.payload.directMessage.data;
        if (!draft.directMessages.data.includes(newDirectMessage)) {
          draft.directMessages = {
            ...draft.directMessages,
            data: [...draft.directMessages.data, newDirectMessage],
          };
        }
        draft.createDirectMessageLoading = false;
        break;
      }

      case DirectMessageTypes.FAILED_CREATE_DIRECT_MESSAGE: {
        draft.createDirectMessageLoading = false;
        break;
      }
    }
  });
