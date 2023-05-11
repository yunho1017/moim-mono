import axios from "axios";
import { getCommunityServiceAPIDomain } from "app/common/helpers/domainMaker";
import { openSnackbar } from "app/actions/snackbar";
import { getCommunityId, getUserToken } from "../helper";

export async function getCoin(
  coinId: Moim.Id,
): Promise<Moim.Community.Coin.ICoin | undefined> {
  try {
    const tokenId = getUserToken();
    const result = await axios.get(`/coins/${coinId}`, {
      headers: {
        "x-can-community-id": getCommunityId(),
        Authorization: `Bearer ${tokenId}`,
      },
      baseURL: getCommunityServiceAPIDomain(),
    });
    return result.data;
  } catch (rawError) {
    if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
      openSnackbar({
        text: rawError.response?.data.error.message ?? "error !!",
        type: "error",
      });
    }
  }
}

export async function getCommunityCoinHistories(
  coinId: string,
  payload?: {
    includeTotalAmount?: boolean;
    limit?: number;
    after?: Moim.PagingValue;
  },
): Promise<Moim.Community.Coin.IGetCommunityCoinHistories | undefined> {
  try {
    const tokenId = getUserToken();
    const result = await axios.get(`/coins/${coinId}/histories`, {
      params: payload,
      headers: {
        "x-can-community-id": getCommunityId(),
        Authorization: `Bearer ${tokenId}`,
      },
      baseURL: getCommunityServiceAPIDomain(),
    });
    return result.data;
  } catch (rawError) {
    if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
      openSnackbar({
        text: rawError.response?.data.error.message ?? "error !!",
        type: "error",
      });
    }
  }
}

export async function getCoinGroupsOfCommunity(): Promise<
  Moim.IPaginatedListResponse<Moim.Community.Coin.ICoinGroup> | undefined
> {
  try {
    const communityId = getCommunityId();
    const tokenId = getUserToken();
    const result = await axios.get(`/coin_groups/community/${communityId}`, {
      headers: {
        "x-can-community-id": communityId,
        Authorization: `Bearer ${tokenId}`,
      },
      baseURL: getCommunityServiceAPIDomain(),
    });
    return result.data;
  } catch (rawError) {
    if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
      openSnackbar({
        text: rawError.response?.data.error.message ?? "error !!",
        type: "error",
      });
    }
  }
}

export async function getCoinsOfCoinGroup(
  coinGroupId: string,
): Promise<Moim.IPaginatedListResponse<Moim.Community.Coin.ICoin> | undefined> {
  try {
    const tokenId = getUserToken();
    const result = await axios.get(`/coin_groups/${coinGroupId}/coins`, {
      headers: {
        "x-can-community-id": getCommunityId(),
        Authorization: `Bearer ${tokenId}`,
      },
      baseURL: getCommunityServiceAPIDomain(),
    });
    return result.data;
  } catch (rawError) {
    if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
      openSnackbar({
        text: rawError.response?.data.error.message ?? "error !!",
        type: "error",
      });
    }
  }
}

export async function getCoinGroupBalance(
  coinGroupId: string,
): Promise<Moim.Community.Coin.ICoinGroupBalance | undefined> {
  try {
    const tokenId = getUserToken();
    const result = await axios.get(
      `/coin_groups/${coinGroupId}/coins/balance`,
      {
        headers: {
          "x-can-community-id": getCommunityId(),
          Authorization: `Bearer ${tokenId}`,
        },
        baseURL: getCommunityServiceAPIDomain(),
      },
    );
    return result.data;
  } catch (rawError) {
    if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
      openSnackbar({
        text: rawError.response?.data.error.message ?? "error !!",
        type: "error",
      });
    }
  }
}
