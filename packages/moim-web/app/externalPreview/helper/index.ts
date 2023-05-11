import axios from "axios";
import Cookies from "js-cookie";

const external_user_token = "external_user_token";

export function searchParam(key: string) {
  return new URLSearchParams(location.search).get(key);
}

export const uploadFile = async (
  file: File,
  session: {
    data: { upload: { url: string; fields: { [key: string]: string } } };
  },
) => {
  const formData = new FormData();
  // eslint-disable-next-line guard-for-in
  for (const key in session.data.upload.fields) {
    formData.append(key, session.data.upload.fields[key]);
  }

  formData.append("file", file);

  await axios.post(session.data.upload.url, formData);
  return;
};

export function getCommunityId() {
  return window.location.pathname.split("/")[2];
}

export function getUserToken() {
  return searchParam("token");
}

export function setExternalCookieToken(communityId: string, tokenId: string) {
  Cookies.set(`${communityId}_${external_user_token}`, tokenId);
}

export function getExternalCookieToken(communityId: string) {
  const tokenId = Cookies.get(`${communityId}_${external_user_token}`);
  return tokenId;
}

export function clearExternalCookieToken(communityId: string) {
  Cookies.remove(`${communityId}_${external_user_token}`);
}
