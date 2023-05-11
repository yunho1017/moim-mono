import produce from "immer";
import { AllActions } from "app/actions";
import { CryptoBadgeTypes } from "app/actions/types";

export interface ICryptobadgeState {
  cryptobadges_list: Moim.Cryptobadge.NormalizedBadgeListItem[];
  cryptobadge_group_badge_list: Moim.Cryptobadge.ICryptobadge[];
  certificates_list: Moim.Cryptobadge.NormalizedCertificateItem[];
  mint_request_list: Moim.Cryptobadge.NormalizedMintRequestListItem[];
}

export const INITIAL_STATE: ICryptobadgeState = {
  cryptobadges_list: [],
  cryptobadge_group_badge_list: [],
  certificates_list: [],
  mint_request_list: [],
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CryptoBadgeTypes.SUCCEED_FETCHING_BADGES: {
        const { badges } = action.payload;
        draft.cryptobadges_list = badges;
        break;
      }

      case CryptoBadgeTypes.SUCCEED_FETCHING_CERTIFICATES_BY_ISSUERS: {
        const { certificates } = action.payload;
        draft.certificates_list = certificates;
        break;
      }

      case CryptoBadgeTypes.SUCCEED_FETCHING_BADGE_GROUP: {
        const { badges } = action.payload;
        draft.cryptobadge_group_badge_list = badges;
        break;
      }

      case CryptoBadgeTypes.SUCCEED_FETCHING_MINT_REQUESTS: {
        const { mintRequests } = action.payload;
        draft.mint_request_list = mintRequests;
        break;
      }
    }
  });
}
