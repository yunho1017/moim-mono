import produce from "immer";
import { AllActions } from "app/actions";
import { ReferenceBlockTypes } from "app/actions/types";

export const INITIAL_STATE: Moim.Blockit.INormalizedReferenceBlockBlocks = {};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ReferenceBlockTypes.START_FETCH_REFERENCE_BLOCK: {
        action.payload.data.forEach(data => {
          if (!draft[data.blockId] || !draft[data.blockId].blocks.length) {
            draft[data.blockId] = {
              blocks: [
                {
                  type: "loading",
                },
              ],
              isLoading: true,
            };
          } else {
            draft[data.blockId].isLoading = true;
          }
        });
        break;
      }

      case ReferenceBlockTypes.FAILED_FETCH_REFERENCE_BLOCK: {
        action.payload.data.forEach(data => {
          draft[data.blockId] = {
            blocks: [],
            isLoading: false,
          };
        });
        break;
      }

      case ReferenceBlockTypes.REPLACE_REFERENCE_BLOCK: {
        action.payload.replace.actionData.forEach(data => {
          draft[data.blockId] = {
            blocks: data.blocks,
            isLoading: false,
          };
        });
        break;
      }

      case ReferenceBlockTypes.START_FETCH_MORE_LIST_BLOCKS: {
        const targetBlockId = action.payload.data.blockId;
        if (targetBlockId) {
          if (draft[targetBlockId]) {
            draft[targetBlockId].isLoading = true;
          } else {
            draft[targetBlockId] = {
              blocks: [],
              isLoading: true,
            };
          }
        }
        break;
      }

      case ReferenceBlockTypes.FAILED_FETCH_MORE_LIST_BLOCKS: {
        const targetBlockId = action.payload.data.blockId;
        if (targetBlockId) {
          draft[targetBlockId].isLoading = true;
        }
        break;
      }

      case ReferenceBlockTypes.APPEND_LIST_BLOCKS: {
        action.payload.append.actionData.forEach(data => {
          if (draft[data.blockId]) {
            draft[data.blockId].blocks = draft[data.blockId].blocks
              .filter(block => !(block.type === "loading"))
              .concat(data.blocks);
            draft[data.blockId].isLoading = false;
          }
        });
        break;
      }

      case ReferenceBlockTypes.UPDATE_LIST_BLOCK: {
        action.payload.update.actionData.forEach(data => {
          if (draft[data.blockId]) {
            draft[data.blockId].paging = data.properties.paging;
            draft[data.blockId].params = data.properties.params;

            if (
              draft[data.blockId].blocks.length > 0 &&
              data.properties.blocks.length > 0
            ) {
              let isChanged = false;

              const oldBlocks = draft[data.blockId].blocks;
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
                      isChanged = true;
                      return data.properties.blocks[0];
                    }

                    return datum;
                  });

                  (item as Moim.Blockit.Blocks & {
                    blocks: Moim.Blockit.Blocks[];
                  }).blocks = newBlocks2;
                }

                if (bId === data.blockId) {
                  isChanged = true;
                  return data.properties.blocks[0] as Moim.Blockit.Blocks;
                }

                return item;
              });

              draft[data.blockId].blocks = isChanged
                ? newBlocks
                : data.properties.blocks;
            }
          }
        });
        break;
      }
    }
  });
}
