import axios from "axios";
import { getCommunityServiceAPIDomain } from "app/common/helpers/domainMaker";
import { openSnackbar } from "app/actions/snackbar";
import { getCommunityId, getUserToken } from "../helper";

export async function getNFTItem(
  itemId: Moim.Id,
): Promise<Moim.NFT.INftDetail | undefined> {
  try {
    const result = await axios.get(`/nfts/${itemId}`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function getCollection(
  contractId: Moim.Id,
): Promise<Moim.NFT.IContract | undefined> {
  try {
    const result = await axios.get(`/nfts/contracts/${contractId}`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function getSchedule(
  contractId: Moim.Id,
  scheduleId: Moim.Id,
): Promise<Moim.NFT.ISchedule | undefined> {
  try {
    const result = await axios.get(
      `/nfts/contracts/${contractId}/schedules/${scheduleId}`,
      {
        headers: {
          "x-can-community-id": getCommunityId(),
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

export async function getTransferList(
  itemId: Moim.Id,
): Promise<Moim.NFT.IGetTokenTransferListResponseBody | undefined> {
  try {
    const result = await axios.get(`/nfts/tokens/${itemId}/histories`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function getUserTokens(
  userId: Moim.Id,
): Promise<Moim.NFT.IGetUserTokenListResponseBody | undefined> {
  try {
    const result = await axios.get(`/nfts/tokens?userId=${userId}`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function getNFTItemsBatch(
  ids: Moim.Id[],
): Promise<Moim.NFT.IGetNftsDetailResponseBody | undefined> {
  try {
    const result = await axios.post(
      `/nfts/_batch`,
      {
        ids,
      },
      {
        headers: {
          "x-can-community-id": getCommunityId(),
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

export async function getUserInfo(
  userId: string,
): Promise<Moim.Community.ICommunityUser | undefined> {
  try {
    const tokenId = getUserToken();
    const result = await axios.get(`/communities/users/${userId}`, {
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

export async function createFileUpload(
  name: string,
): Promise<
  | {
      id: string;
      communityId: string;
      status: "WAITING_FOR_UPLOAD" | "READY";
      createdAt: number;
      updatedAt: number;
      upload: { url: string; fields: { [key: string]: string } };
    }
  | undefined
> {
  try {
    const tokenId = getUserToken();
    const result = await axios.post(
      `/file`,
      {
        name,
      },
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

export async function getUploadFileUrl(
  fileId: string,
): Promise<
  | {
      id: string;
      communityId: string;
      status: "WAITING_FOR_UPLOAD" | "READY";
      createdAt: number;
      updatedAt: number;
      url: string;
    }
  | undefined
> {
  try {
    const tokenId = getUserToken();
    const result = await axios.put(
      `/file/${fileId}/status`,
      {
        status: "READY",
      },
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

export async function getContractsList(): Promise<
  { data: Moim.NFT.IContract[] } | undefined
> {
  try {
    const result = await axios.get(`/nfts/contracts?limit=100`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function getSchedulesList(
  contractId: string,
): Promise<{ data: Moim.NFT.ISchedule[] } | undefined> {
  try {
    const result = await axios.get(`/nfts/contracts/${contractId}/schedules`, {
      headers: {
        "x-can-community-id": getCommunityId(),
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

export async function connetWithMetamask(
  callbackUrl: string,
): Promise<
  | {
      location: string;
    }
  | undefined
> {
  try {
    const tokenId = getUserToken();
    const result = await axios.post(
      `/communities/users/connect`,
      { callbackUrl },
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

export async function mint(data: {
  contractId: string;
  scheduleId: string;
  communityId: string;
  originCommunityId: string;
  token: string;
  callbackUrl: string;
  cancelCallbackUrl: string;
  customItem: {
    name: string;
    description?: string;
    itemUrl: string;
  };
}): Promise<
  | {
      location: string;
    }
  | undefined
> {
  try {
    const tokenId = getUserToken();
    const result = await axios.post(
      `/nfts/minting`,
      {
        ...data,
      },
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
