import { CancelToken } from "axios";
import { MoimCommunityAPI } from "../base/community";

export class CoinAPI extends MoimCommunityAPI {
  public async batchCoin(
    coinIds: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Community.Coin.ICoin>> {
    return (await this.post(`/coins/_batch`, { coinIds })).data;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCommunityCoins(
    params: {
      communityId: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.IGetCommunityCoins> {
    return (
      await this.get(`/coins/community/${params.communityId}`, undefined, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCoinGroup(
    params: {
      id: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.ICoinGroup> {
    return (
      await this.get(`/coin_groups/${params.id}`, undefined, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCoinGroupBalance(
    id: string,
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.ICoinGroupBalance> {
    return (
      await this.get(`/coin_groups/${id}/coins/balance`, undefined, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCoinGroupCoinList(
    params: {
      id: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Community.Coin.ICoin>> {
    return (
      await this.get(`/coin_groups/${params.id}/coins`, undefined, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCoin(
    params: {
      coinId: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.ICoin> {
    return (
      await this.get(`/coins/${params.coinId}`, undefined, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCoinBalance(
    params: {
      coinId: string;
      userId: string;
      walletAddress?: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.ICoinBalance> {
    return (
      await this.get(
        `/coins/balance?coinId=${params.coinId}&userId=${params.userId}&walletAddress=${params.walletAddress}`,
        undefined,
        {
          cancelToken,
        },
      )
    ).data;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getCommunityCoinHistories(
    params: {
      coinId: string;
      payload?: {
        includeTotalAmount?: boolean;
        limit?: number;
        after?: Moim.PagingValue;
      };
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.IGetCommunityCoinHistories> {
    return (
      await this.get(`/coins/${params.coinId}/histories`, params.payload, {
        cancelToken,
      })
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async getToBeExpiredCoins(
    params: {
      coinId: string;
      before: number;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.IGetToBeExpiredCoins> {
    return (
      await this.get(
        `/coins/${params.coinId}/transactions/expire?before=${params.before}`,
        undefined,
        {
          cancelToken,
        },
      )
    ).data;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public async transferCoin(
    params: {
      coinId: string;
      callbackUrl: string;
      to: Moim.Community.Coin.ICoinTransferUser;
      from: Moim.Community.Coin.ICoinTransferUser;
      amount: number;
      senderMessage?: string;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.Community.Coin.IPostTransferCommunityCoin> {
    return (
      await this.post(
        `/coins/${params.coinId}/transfer`,
        {
          to: params.to,
          callbackUrl: params.callbackUrl,
          from: params.from,
          amount: params.amount,
          senderMessage: params.senderMessage,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }
}
