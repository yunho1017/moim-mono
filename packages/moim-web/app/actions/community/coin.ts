import _ from "lodash";
import { CancelToken } from "axios";
import { AddEntities } from "../entity";
import { ActionUnion } from "../helpers";
import { ThunkPromiseResult } from "app/store";
import { coinListNormalizer, coinNormalizer } from "app/models";
import { CommunityCoinTypes } from "../types";
import { batchUsers } from "../user";

function createAction<T extends { type: CommunityCoinTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  succeedGetToBeExpiredCoins: (payload: {
    coinId: string;
    response: Moim.IPaginatedListResponse<
      Moim.Community.Coin.IToBeExpiredCoinItem
    >;
    pagingKey?: keyof Moim.IPaging;
  }) =>
    createAction({
      type: CommunityCoinTypes.SUCCEED_GET_TO_BE_EXPIRED_COINS,
      payload,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getCommunityCoins(
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).coin.getCommunityCoins({ communityId: groupId }, cancelToken);

      dispatch(AddEntities(coinListNormalizer(result).entities));
    } catch (rawError) {}
  };
}
export function getCoinGroupCoinList(
  id: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<
  Moim.IPaginatedListResponse<Moim.Community.Coin.ICoin> | undefined | null
> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const coinList = await apiSelector(
        getState(),
        dispatch,
      ).coin.getCoinGroupCoinList({ id }, cancelToken);
      dispatch(AddEntities(coinListNormalizer(coinList).entities));

      return coinList;
    } catch (rawError) {
      return null;
    }
  };
}

export function getCoinGroup(
  id: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Community.Coin.ICoinGroup | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      return await apiSelector(getState(), dispatch).coin.getCoinGroup(
        { id },
        cancelToken,
      );
    } catch (rawError) {}
  };
}

export function getCoinGroupBalance(
  id: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Community.Coin.ICoinGroupBalance | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      return await apiSelector(getState(), dispatch).coin.getCoinGroupBalance(
        id,
        cancelToken,
      );
    } catch (rawError) {}
  };
}

export function getCoin(
  coinId: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const result = await apiSelector(getState(), dispatch).coin.getCoin(
        { coinId },
        cancelToken,
      );

      dispatch(AddEntities(coinNormalizer(result).entities));
    } catch (rawError) {}
  };
}

export function getCoinBalance(
  coinId: string,
  userId: string,
  walletAddress?: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Community.Coin.ICoinBalance | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).coin.getCoinBalance({ coinId, userId, walletAddress }, cancelToken);
      return result;
    } catch (rawError) {}
  };
}

export function transferCoin(
  coinId: string,
  callbackUrl: string,
  to: Moim.Community.Coin.ICoinTransferUser,
  from: Moim.Community.Coin.ICoinTransferUser,
  amount: number,
  senderMessage?: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<
  Moim.Community.Coin.IPostTransferCommunityCoin | undefined
> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const result = await apiSelector(getState(), dispatch).coin.transferCoin(
        {
          coinId,
          callbackUrl,
          to,
          from,
          amount,
          senderMessage,
        },
        cancelToken,
      );
      return result;
    } catch (rawError) {}
  };
}

export function getToBeExpiredCoins(
  params: {
    coinId: string;
    // default 3 month
    before?: number;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Community.Coin.IGetToBeExpiredCoins | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const now = new Date();
    now.setMonth(now.getMonth() + 3);
    now.setDate(1);
    now.setHours(0, 0, 0, 0);

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).coin.getToBeExpiredCoins(
        { ...params, before: params.before ?? now.getTime() },
        cancelToken,
      );

      dispatch(
        ActionCreators.succeedGetToBeExpiredCoins({
          coinId: params.coinId,
          response: result,
        }),
      );
      return result;
    } catch (rawError) {}
  };
}

export function getCommunityCoinHistories(
  coinId: string,
  payload?: {
    includeTotalAmount?: boolean;
    limit?: number;
    after?: Moim.PagingValue;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<
  Moim.Community.Coin.IGetCommunityCoinHistories | undefined
> {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const userEntities = getState().entities.users;
      const result = await apiSelector(
        getState(),
        dispatch,
      ).coin.getCommunityCoinHistories({ coinId, payload }, cancelToken);

      if (result.data.length) {
        const userIds = _.uniq(
          result.data.reduce<Moim.Id[]>((acc, current) => {
            if (
              current.to?.userId !== "SYSTEM" &&
              current.to?.userId &&
              !userEntities[current.to.userId]
            ) {
              acc.push(current.to.userId);
            }
            if (
              current.from?.userId !== "SYSTEM" &&
              current.from?.userId &&
              !userEntities[current.from.userId]
            ) {
              acc.push(current.from.userId);
            }
            return acc;
          }, []),
        );
        if (userIds.length) {
          dispatch(batchUsers(userIds));
        }
      }
      return result;
    } catch (rawError) {}
  };
}
