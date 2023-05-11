import produce from "immer";
import { AllActions } from "app/actions";
import { ReferenceBlockTypes } from "app/actions/types";

export interface IReduxState {
  open: boolean;
  title: string;
  blocks: Moim.Blockit.Blocks[];
  isLoading: boolean;
  botId?: Moim.Id;
  modalId?: Moim.Id;
  onCloseBehavior?: Moim.Blockit.IOnCloseActionBehavior;
  modalContentRef?: any;
}

export const INITIAL_STATE: IReduxState = {
  open: false,
  title: "",
  blocks: [],
  isLoading: false,
};

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case ReferenceBlockTypes.START_CLICK_REFERENCE_ACTION: {
        draft.isLoading = draft.open && true;
        break;
      }

      case ReferenceBlockTypes.SUCCEED_CLICK_REFERENCE_ACTION:
      case ReferenceBlockTypes.FAILED_CLICK_REFERENCE_ACTION: {
        draft.isLoading = false;
        break;
      }

      case ReferenceBlockTypes.OPEN_BLOCKIT_MODAL: {
        const botId = action.payload.botId;
        const { blocks, title, modalId, onClose } = action.payload.actionData;
        draft.open = true;
        draft.title = title;
        draft.blocks = blocks;
        draft.modalId = modalId;
        draft.onCloseBehavior = onClose;
        draft.botId = botId;
        break;
      }

      case ReferenceBlockTypes.CLOSE_BLOCKIT_MODAL: {
        draft.open = false;
        draft.title = "";
        draft.blocks = [];
        draft.modalId = undefined;
        draft.onCloseBehavior = undefined;
        draft.botId = undefined;
        break;
      }

      case ReferenceBlockTypes.SET_BLOCKIT_MODAL_REF: {
        draft.modalContentRef = action.payload.ref;
        break;
      }
    }
  });
