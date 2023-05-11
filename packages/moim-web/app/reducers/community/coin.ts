import produce from "immer";
import { AllActions } from "app/actions";
import { CommunityCoinTypes } from "app/actions/types";
import { mergeArrayUniq } from "common/helpers/mergeWithArrayConcatUniq";

export interface ICoinState {
  toBeExpiredCoin: Record<
    string,
    Moim.IPaginatedListResponse<Moim.Community.Coin.IToBeExpiredCoinItem>
  >;
}

export const INITIAL_STATE: ICoinState = {
  toBeExpiredCoin: {},
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CommunityCoinTypes.SUCCEED_GET_TO_BE_EXPIRED_COINS: {
        const { coinId, response, pagingKey } = action.payload;
        if (pagingKey) {
          const base = draft.toBeExpiredCoin[coinId];
          draft.toBeExpiredCoin[coinId] = {
            data:
              (pagingKey === "after"
                ? mergeArrayUniq<Moim.Community.Coin.IToBeExpiredCoinItem>(
                    base.data ?? [],
                    response.data,
                  )
                : mergeArrayUniq<Moim.Community.Coin.IToBeExpiredCoinItem>(
                    response.data,
                    base.data ?? [],
                  )) ?? [],
            paging: {
              ...base.paging,
              [pagingKey]: response.paging[pagingKey],
            },
          };
        } else {
          draft.toBeExpiredCoin[coinId] = response;
        }
        break;
      }
    }
  });
}
