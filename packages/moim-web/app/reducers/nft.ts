import { AllActions } from "../actions";
import { NftTypes } from "../actions/types";
import produce from "immer";

export interface INftState {
  userTokens: Record<string, Moim.NFT.IGetNftsDetailResponseBody>;
  nftSets: Record<string, Moim.NFT.INftSetReduxState>;
  mintPage: {
    openMintRedirectLoadingDialog: boolean;
  };
}

export const INITIAL_STATE: INftState = {
  userTokens: {},
  nftSets: {},
  mintPage: {
    openMintRedirectLoadingDialog: false,
  },
};

export function reducer(state: INftState = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case NftTypes.SUCCEEDED_FETCHING_TOKEN_LIST: {
        const { id, userTokens } = action.payload;

        if (!draft.userTokens[id]) {
          draft.userTokens = {
            [id]: {
              data: userTokens.data,
            },
            ...draft.userTokens,
          };
        } else {
          draft.userTokens[id].data = userTokens.data;
        }

        break;
      }

      case NftTypes.SUCCEEDED_FETCHING_NFTSET_LIST: {
        const { id, nftSets } = action.payload;

        if (!draft.nftSets[id]) {
          draft.nftSets = {
            [id]: {
              data: nftSets.data.map(item => item.itemId),
              paging: nftSets.paging,
            },
            ...draft.nftSets,
          };
        } else {
          draft.nftSets[id].paging = nftSets.paging;
        }

        break;
      }

      case NftTypes.OPEN_MINT_REDIRECT_LOADING_DIALOG: {
        draft.mintPage.openMintRedirectLoadingDialog = true;
        break;
      }

      case NftTypes.CLOSE_MINT_REDIRECT_LOADING_DIALOG: {
        draft.mintPage.openMintRedirectLoadingDialog = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
}
