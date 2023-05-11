import produce from "immer";
import shortid from "shortid";
import { AllActions } from "app/actions";
import { SecondaryViewTypes, ReferenceBlockTypes } from "app/actions/types";

export interface IState {
  nativeOpenStatus: boolean;
  pluginOpenStatus: boolean;
  pluginHistory: Record<
    string,
    {
      title: string;
      blocks: Moim.Blockit.Blocks[];
      modalId?: Moim.Id;
      onClose?: Moim.Blockit.IOnCloseActionBehavior;
    }
  >;
  pluginCurrentLocationHash: string;
  pluginHashHistory: string[];
  botId?: Moim.Id;
  pluginContentRef?: any;
  nativeOpenFromProfile: boolean;
}

export const INITIAL_STATE: IState = {
  nativeOpenStatus: false,
  pluginOpenStatus: false,
  pluginCurrentLocationHash: "",
  pluginHashHistory: [],
  pluginHistory: {},
  nativeOpenFromProfile: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case SecondaryViewTypes.NATIVE_OPEN: {
        draft.nativeOpenStatus = true;
        break;
      }

      case SecondaryViewTypes.NATIVE_CLOSE: {
        draft.nativeOpenStatus = false;
        break;
      }

      case SecondaryViewTypes.PLUGIN_OPEN: {
        draft.pluginOpenStatus = true;
        const hash = shortid();
        draft.pluginCurrentLocationHash = hash;
        draft.pluginHistory[hash] = action.payload.actionData;
        draft.pluginHashHistory.push(hash);
        draft.botId = action.payload.botId;
        break;
      }

      case SecondaryViewTypes.PLUGIN_BACK: {
        const currentHash = draft.pluginHashHistory.pop();
        if (currentHash) {
          delete draft.pluginHistory[currentHash];
        }

        draft.pluginCurrentLocationHash =
          draft.pluginHashHistory[draft.pluginHashHistory.length - 1];
        break;
      }

      case SecondaryViewTypes.PLUGIN_CLOSE: {
        draft.pluginOpenStatus = false;
        draft.pluginCurrentLocationHash = "";
        draft.pluginHistory = INITIAL_STATE.pluginHistory;
        draft.pluginHashHistory = [];
        draft.botId = undefined;
        break;
      }

      case SecondaryViewTypes.PLUGIN_REDIRECTION_RESTORE: {
        draft.pluginOpenStatus = action.payload.storedState.pluginOpenStatus;
        draft.pluginCurrentLocationHash =
          action.payload.storedState.pluginCurrentLocationHash;
        draft.pluginHashHistory = action.payload.storedState.pluginHashHistory;
        draft.pluginHistory = action.payload.storedState.pluginHistory;
        break;
      }

      case SecondaryViewTypes.SET_PLUGIN_CONTENT_REF: {
        draft.pluginContentRef = action.payload.ref;
        break;
      }

      case SecondaryViewTypes.NATIVE_OPEN_FROM_PROFILE: {
        draft.nativeOpenFromProfile = action.payload;
        break;
      }

      case ReferenceBlockTypes.UPDATE_LIST_BLOCK: {
        if (!state.pluginOpenStatus) {
          break;
        }

        action.payload.update.actionData.forEach(data => {
          const oldBlocks =
            draft.pluginHistory[draft.pluginCurrentLocationHash].blocks;
          if (oldBlocks.length > 0 && data.properties.blocks.length > 0) {
            const newBlocks = oldBlocks.map(item => {
              const bId = (item as Moim.Blockit.Blocks & { blockId: Moim.Id })
                .blockId;

              if (item.hasOwnProperty("blocks")) {
                const newBlocks2 = (item as Moim.Blockit.Blocks & {
                  blocks: Moim.Blockit.Blocks[];
                }).blocks.map(datum => {
                  const bId2 = (datum as Moim.Blockit.Blocks & {
                    blockId: Moim.Id;
                  }).blockId;

                  if (bId2 === data.blockId) {
                    return data.properties.blocks[0];
                  }

                  return datum;
                });

                (item as Moim.Blockit.Blocks & {
                  blocks: Moim.Blockit.Blocks[];
                }).blocks = newBlocks2;
              }

              if (bId === data.blockId) {
                return data.properties.blocks[0] as Moim.Blockit.Blocks;
              }

              return item;
            });

            draft.pluginHistory[
              draft.pluginCurrentLocationHash
            ].blocks = newBlocks;
          }
        });

        break;
      }
    }
  });
}
