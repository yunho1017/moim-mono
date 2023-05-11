import axios from "axios";
import { openSnackbar } from "./snackbar";
import { ThunkPromiseResult } from "app/store";
import { NftTypes } from "./types";
import { ActionUnion } from "./helpers";
import { AddEntities, loadEntities } from "./entity";
import {
  nftItemListNormalizer,
  nftItemNormalizer,
  nftContractNormalizer,
  nftScheduleListNormalizer,
  nftScheduleNormalizer,
} from "app/models";
import _ from "lodash";
import { batchUsers } from "app/actions/user";
import { getScheduleStatus } from "common/helpers/nft";

function createAction<T extends { type: NftTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchingTokenList: () =>
    createAction({
      type: NftTypes.START_FETCHING_TOKEN_LIST,
    }),
  succeedFetchingTokenList: (
    id: Moim.Id,
    userTokens: Moim.NFT.IGetNftsDetailResponseBody,
  ) =>
    createAction({
      type: NftTypes.SUCCEEDED_FETCHING_TOKEN_LIST,
      payload: {
        id,
        userTokens,
      },
    }),
  failedFetchingTokenList: () =>
    createAction({
      type: NftTypes.FAILED_FETCHING_TOKEN_LIST,
    }),
  startFetchingNftSetList: () =>
    createAction({
      type: NftTypes.START_FETCHING_NFTSET_LIST,
    }),
  succeedFetchingNftSetList: (
    id: Moim.Id,
    nftSets: Moim.NFT.IGetNftSetsResponseBody,
  ) =>
    createAction({
      type: NftTypes.SUCCEEDED_FETCHING_NFTSET_LIST,
      payload: {
        id,
        nftSets,
      },
    }),

  failedFetchingNftSetList: () =>
    createAction({
      type: NftTypes.FAILED_FETCHING_NFTSET_LIST,
    }),
  openMintRedirectLoadingDialog: () =>
    createAction({
      type: NftTypes.OPEN_MINT_REDIRECT_LOADING_DIALOG,
    }),
  closeMintRedirectLoadingDialog: () =>
    createAction({
      type: NftTypes.CLOSE_MINT_REDIRECT_LOADING_DIALOG,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;
export function getItem(
  itemId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.INftDetail | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const nftSingleItem = await api.nft.getItem(itemId);
      const normalized = nftItemNormalizer(nftSingleItem ?? null);
      dispatch(loadEntities(normalized.entities));
      const userEntities = getState().entities.users;
      if (
        nftSingleItem.ownedBy?.userId &&
        !userEntities[nftSingleItem.ownedBy?.userId]
      ) {
        dispatch(batchUsers([nftSingleItem.ownedBy?.userId]));
      }
      return nftSingleItem;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getToken(
  itemId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.INftToken | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      return await api.nft.getToken(itemId);
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getUserTokensDetail(
  userId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.IGetUserTokenListResponseBody | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const userTokens = await api.nft.getTokenList(userId);
      dispatch(ActionCreators.startFetchingTokenList());
      if (userTokens.data.length) {
        const tokenDetails = await api.nft.getItemsDetail(
          userTokens.data.map(i => i.id),
        );
        const normalized = nftItemListNormalizer(tokenDetails);
        dispatch(loadEntities(normalized.entities));
        dispatch(ActionCreators.succeedFetchingTokenList(userId, tokenDetails));
      } else {
        dispatch(ActionCreators.succeedFetchingTokenList(userId, { data: [] }));
      }
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        if (rawError.response && rawError.response.status === 422) {
          return { data: [] };
        }
        dispatch(ActionCreators.failedFetchingTokenList());
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getTokenTransferList(
  itemId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.IGetTokenTransferListResponseBody | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      return await api.nft.getTransferList(itemId);
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getNftSetShow(
  itemId: Moim.Id,
  limit?: number,
  paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
  resourceFilter?: { tags?: string; statuses?: string },
): ThunkPromiseResult<{
  itemIds: string[];
  paging?: Readonly<{
    after?: Moim.PagingValue;
    before?: Moim.PagingValue;
    total?: number;
  }>;
}> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const sets = await api.nft.getNftSets(
        itemId,
        limit,
        paging,
        resourceFilter,
      );

      dispatch(ActionCreators.startFetchingNftSetList());
      dispatch(ActionCreators.succeedFetchingNftSetList(itemId, sets));

      if (sets.data.length) {
        const itemEntities = getState().entities.nftItems;
        const userEntities = getState().entities.users;

        const itemIds = sets.data.reduce<{
          allItemIds: string[];
          uniqItemIds: string[];
        }>(
          (acc, cur) => {
            acc.allItemIds.push(cur.itemId);
            if (!itemEntities[cur.itemId]) {
              acc.uniqItemIds.push(cur.itemId);
            }
            return acc;
          },
          { allItemIds: [], uniqItemIds: [] },
        );

        if (itemIds.uniqItemIds.length) {
          api.nft.getItemsDetail(itemIds.uniqItemIds).then(nftItems => {
            const userIds = _.uniq(
              nftItems.data.reduce<Moim.Id[]>((acc, current) => {
                if (current.ownedBy && !userEntities[current.ownedBy.userId]) {
                  acc.push(current.ownedBy.userId);
                }
                return acc;
              }, []),
            );
            if (userIds.length) {
              dispatch(batchUsers(userIds));
            }

            const normalized = nftItemListNormalizer(nftItems);
            dispatch(loadEntities(normalized.entities));
          });
        }

        return { itemIds: itemIds.allItemIds, paging: sets.paging };
      }
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(ActionCreators.failedFetchingNftSetList());
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }

    return { itemIds: [] };
  };
}

export function getNftSetList(
  setId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.IGetNftSetListResponseBody | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      return await api.nft.getNftSetList(setId);
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getContractDetail(
  contractId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.IContract | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const contract = await api.nft.getContractDetail(contractId);
      const normalizedContract = nftContractNormalizer(contract);

      dispatch(AddEntities(normalizedContract.entities));
      return contract;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getContractStatistics(
  contractId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.IContractStatistics | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const statistics = await api.nft.getContractStatistics(contractId);
      return statistics;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getContractOwners(
  contractId: Moim.Id,
  paging?: Moim.IPaging,
  order?: "ASC" | "DESC",
  limit?: number,
): ThunkPromiseResult<{
  owners: Moim.NFT.IContractOwner[];
  paging?: Moim.IPaging;
}> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const owners = await api.nft.getContractOwners(
        contractId,
        paging,
        order,
        limit,
      );

      const userEntities = getState().entities.users;
      const userIds = _.uniq(
        owners.data.reduce<Moim.Id[]>((acc, current) => {
          if (current.userId && !userEntities[current.userId]) {
            acc.push(current.userId);
          }
          return acc;
        }, []),
      );
      if (userIds.length) {
        dispatch(batchUsers(userIds));
      }

      return { owners: owners.data, paging: owners.paging };
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
    return { owners: [] };
  };
}

export function getSchedulesByContract(
  contractId: Moim.Id,
  paging?: Moim.IPaging,
  order?: "ASC" | "DESC",
  limit?: number,
): ThunkPromiseResult<{
  scheduleIds: Moim.Id[];
  availableScheduleIds: Moim.Id[];
  paging?: Moim.IPaging;
}> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const schedules = await api.nft.getSchedulesByContract(
        contractId,
        paging,
        order,
        limit,
      );
      const scheduleIds = schedules.data.reduce<{
        allScheduleIds: string[];
        availableScheduleIds: string[];
      }>(
        (acc, cur) => {
          // NOTE: has to filter schedules which are hidden
          if (!cur.isHidden) {
            acc.allScheduleIds.push(cur.id);
            // NOTE: has to filter schedules which are terminated
            if (
              getScheduleStatus(cur.mintingStartAt, cur.mintingEndAt) !==
              "TERMINATED"
            ) {
              acc.availableScheduleIds.push(cur.id);
            }
          }
          return acc;
        },
        { allScheduleIds: [], availableScheduleIds: [] },
      );
      const normalizedScheduleList = nftScheduleListNormalizer(schedules);
      dispatch(loadEntities(normalizedScheduleList.entities));
      return {
        scheduleIds: scheduleIds.allScheduleIds,
        availableScheduleIds: scheduleIds.availableScheduleIds,
        paging: schedules.paging,
      };
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
    return { scheduleIds: [], availableScheduleIds: [] };
  };
}

export function getScheduleDetail(
  contractId: Moim.Id,
  scheduleId: Moim.Id,
): ThunkPromiseResult<Moim.NFT.ISchedule | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const schedule = await api.nft.getScheduleDetail(contractId, scheduleId);
      const normalizedSchedule = nftScheduleNormalizer(schedule);
      dispatch(loadEntities(normalizedSchedule.entities));
      return schedule;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function searchNftItems(
  paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
  order?: "ASC" | "DESC",
  limit?: number,
  searchOptions?: {
    contractIds?: Moim.Id[];
    scheduleIds?: Moim.Id[];
    statuses?: string[];
    attributes?: string[];
  },
): ThunkPromiseResult<{
  items: Moim.NFT.INftDetail[];
  paging?: Readonly<{
    after?: Moim.PagingValue;
    before?: Moim.PagingValue;
    total?: number;
  }>;
}> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const nftItems = await api.nft.searchNftItems(
        paging,
        order,
        limit,
        searchOptions,
      );

      const userEntities = getState().entities.users;

      if (nftItems.data.length) {
        const userIds = _.uniq(
          nftItems.data.reduce<Moim.Id[]>((acc, current) => {
            if (current.ownedBy && !userEntities[current.ownedBy.userId]) {
              acc.push(current.ownedBy.userId);
            }
            return acc;
          }, []),
        );
        if (userIds.length) {
          dispatch(batchUsers(userIds));
        }
      }

      const normalized = nftItemListNormalizer(nftItems);
      dispatch(loadEntities(normalized.entities));

      return {
        items: nftItems.data,
        paging: nftItems.paging,
      };
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
    return { items: [] };
  };
}

export function getNetworkBlockConfig(
  network: Moim.Id,
): ThunkPromiseResult<Moim.Community.INetworkBlockConfig | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const block = await api.community.getNetworkBlockConfig(network);
      return block;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getNftSetTags(
  setId: Moim.Id,
): ThunkPromiseResult<Record<Moim.Id, string[]> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const data = await api.nft.getNftSetTags(setId);
      return data.reduce<Record<Moim.Id, string[]>>((acc, currentTagset) => {
        {
          return { ...acc, [currentTagset.name]: currentTagset.values };
        }
      }, {});
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
      throw rawError;
    }
  };
}

export function searchNftTags(
  paging?: { from?: Moim.PagingValue; after?: Moim.PagingValue },
  order?: "ASC" | "DESC",
  limit?: number,
  searchOptions?: {
    contractIds?: Moim.Id[];
    scheduleIds?: Moim.Id[];
    statuses?: string[];
    attributes?: string[];
  },
): ThunkPromiseResult<Record<Moim.Id, string[]> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const data = await api.nft.searchNFTTags(
        paging,
        order,
        limit,
        searchOptions,
      );
      return data.reduce<Record<Moim.Id, string[]>>((acc, currentTagset) => {
        {
          return { ...acc, [currentTagset.name]: currentTagset.values };
        }
      }, {});
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text: rawError.response?.data.error.message ?? "error !!",
            type: "error",
          }),
        );
      }
      throw rawError;
    }
  };
}
