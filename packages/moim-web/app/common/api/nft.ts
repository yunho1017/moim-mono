import { MoimCommunityAPI } from "common/api/base/community";

export default class NftAPI extends MoimCommunityAPI {
  public async getTokenList(
    userId: Moim.Id,
  ): Promise<Moim.NFT.IGetUserTokenListResponseBody> {
    return (await this.get(`/nfts/tokens?userId=${userId}`)).data;
  }

  public async getItemsDetail(
    itemIds: Moim.Id[],
  ): Promise<Moim.NFT.IGetNftsDetailResponseBody> {
    return (
      await this.post("/nfts/_batch", {
        ids: itemIds,
      })
    ).data;
  }

  public async getItem(itemId: Moim.Id): Promise<Moim.NFT.INftDetail> {
    return (await this.get(`/nfts/${itemId}`)).data;
  }

  public async getToken(itemId: Moim.Id): Promise<Moim.NFT.INftToken> {
    return (await this.get(`/nfts/tokens/${itemId}`)).data;
  }

  public async getTransferList(
    itemId: Moim.Id,
  ): Promise<Moim.NFT.IGetTokenTransferListResponseBody> {
    return (await this.get(`/nfts/tokens/${itemId}/histories`)).data;
  }

  public async getNftSetList(
    setId: Moim.Id,
  ): Promise<Moim.NFT.IGetNftSetListResponseBody> {
    return (await this.get(`/nfts/sets/${setId}`)).data;
  }

  public async getNftSets(
    setId: Moim.Id,
    limit?: number,
    paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
    resourceFilter?: {
      tags?: string;
      statuses?: string;
    },
  ): Promise<Moim.NFT.IGetNftSetsResponseBody> {
    return (
      await this.get(`/nfts/sets/${setId}/entries`, {
        limit,
        ...paging,
        ...resourceFilter,
      })
    ).data;
  }

  public async getContractDetail(
    contractId: Moim.Id,
  ): Promise<Moim.NFT.IContract> {
    return (await this.get(`/nfts/contracts/${contractId}`)).data;
  }

  public async getContractStatistics(
    contractId: Moim.Id,
  ): Promise<Moim.NFT.IContractStatistics> {
    return (await this.get(`/nfts/contracts/${contractId}/statistics`)).data;
  }

  public async getSchedulesByContract(
    contractId: Moim.Id,
    paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
    order?: "ASC" | "DESC",
    limit?: number,
  ): Promise<Moim.NFT.IGetNftSchedulesResponseBody> {
    return (
      await this.get(`/nfts/contracts/${contractId}/schedules`, {
        limit,
        ...paging,
        order,
      })
    ).data;
  }

  public async getScheduleDetail(
    contractId: Moim.Id,
    scheduleId: Moim.Id,
  ): Promise<Moim.NFT.ISchedule> {
    return (
      await this.get(`/nfts/contracts/${contractId}/schedules/${scheduleId}`)
    ).data;
  }

  public async getContractsDetail(
    contractIds: Moim.Id[],
  ): Promise<Moim.NFT.IGetNftContractListResponseBody> {
    return (
      await this.post("/nfts/contracts/_batch", {
        ids: contractIds,
      })
    ).data;
  }

  public async getContractOwners(
    contractId: Moim.Id,
    paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
    order?: "ASC" | "DESC",
    limit?: number,
  ): Promise<Moim.NFT.IGetNftContractOwnersResponseBody> {
    return (
      await this.post(`/nfts/contracts/${contractId}/owners`, {
        ...paging,
        order,
        limit,
      })
    ).data;
  }

  public async getSchedulesDetail(
    contractIds: Moim.Id[],
  ): Promise<Moim.NFT.IGetNftSchedulesResponseBody> {
    return (
      await this.post("/nfts/schedules/_batch", {
        ids: contractIds,
      })
    ).data;
  }

  public async searchNftItems(
    paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
    order?: "ASC" | "DESC",
    limit?: number,
    searchOptions?: {
      contractIds?: Moim.Id[];
      scheduleIds?: Moim.Id[];
      statuses?: string[];
      attributes?: string[];
    },
  ): Promise<Moim.IPaginatedListResponse<Moim.NFT.INftDetail>> {
    return (
      await this.post("/nfts/search", {
        ...paging,
        order,
        limit,
        ...searchOptions,
      })
    ).data;
  }

  public async getNftSetTags(setId: Moim.Id): Promise<Moim.NFT.IGetNFTTags[]> {
    return (await this.get(`/nfts/sets/${setId}/tags`)).data;
  }

  public async searchNFTTags(
    paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
    order?: "ASC" | "DESC",
    limit?: number,
    searchOptions?: {
      contractIds?: Moim.Id[];
      scheduleIds?: Moim.Id[];
      statuses?: string[];
      attributes?: string[];
    },
  ): Promise<Moim.NFT.IGetNFTTags[]> {
    return (
      await this.post("/nfts/search/tags", {
        ...paging,
        order,
        limit,
        ...searchOptions,
      })
    ).data;
  }
}
