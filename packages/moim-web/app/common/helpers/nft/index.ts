import moment from "moment";
import { getMoimTokenToCookie } from "common/helpers/authentication";
import { getCommunityServiceAPIDomain } from "app/common/helpers/domainMaker";
import { setStoreRedirectMintRequest } from "app/actions/referenceBlock/cookieHelper";

const VIDEO_EXTENSION = [
  "WEBM",
  "MPG",
  "MP2",
  "MPEG",
  "MPE",
  "MPV",
  "OGG",
  "MP4",
  "M4P",
  "M4V",
  "AVI",
  "WMV",
  "MOV",
  "QT",
  "FLV",
  "SWF",
  "AVCHD",
];

export function shaveWalletAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(-4);
}

export function mintNft(
  hubGroupId: Moim.Id,
  groupId: Moim.Id,
  callbackUrl: string,
  itemId?: Moim.Id,
  contractId?: Moim.Id,
  scheduleId?: Moim.Id,
  quantity?: number,
) {
  const token = getMoimTokenToCookie(groupId)?.access_token;
  const baseURL = getCommunityServiceAPIDomain();
  const callbackUrlCleaned = callbackUrl.split("?")[0];
  
  if (token) {
    if (itemId) {
      setStoreRedirectMintRequest(true);
      window.location.href = `${baseURL}/nfts/minting?itemId=${itemId}&communityId=${groupId}&originCommunityId=${hubGroupId}&token=${token}&callbackUrl=${callbackUrlCleaned}`;
    } else if (contractId && scheduleId && quantity) {
      setStoreRedirectMintRequest(true);
      window.location.href = `${baseURL}/nfts/minting?contractId=${contractId}&scheduleId=${scheduleId}&quantity=${quantity}&communityId=${groupId}&originCommunityId=${hubGroupId}&token=${token}&callbackUrl=${callbackUrlCleaned}`;
    }
  }
}

export function checkVideo(url: string) {
  if (url.length < 1) return false;
  const extension = url
    .split(/[#?]/)[0]
    ?.split(".")
    .pop()
    ?.trim();

  if (!extension) return false;

  return Boolean(VIDEO_EXTENSION.includes(extension.toUpperCase()));
}

export function getScheduleStatus(
  mintingStartAt: number,
  mintingEndAt: number,
) {
  const now = new Date().getTime();
  if (now < mintingStartAt) {
    return "UPCOMING";
  } else if (now > mintingEndAt) {
    return "TERMINATED";
  } else {
    return "MINTING";
  }
}

export function getScheduleDateByGMT(time: number) {
  const momentTime = moment(time);
  const timeZone = moment.tz.guess();

  return `${momentTime.format("YY. M. D A hh:mm:ss")} (${momentTime
    .tz(timeZone)
    .format("z Z")})`;
}
