import * as CookieHandler from "common/helpers/cookieHandler";
import {
  getMoimTokenToCookie,
  storeMoimTokenToCookie,
} from "common/helpers/authentication";
import { refreshAccessToken } from "common/helpers/authentication/handlers/moim/helpers";

const getCanpassToCookie = (
  moimId: Moim.Id,
):
  | { canPass: Moim.IMoimOAuthResponseData; canPassExpiredAt: number }
  | undefined => {
  const text = CookieHandler.get(`${moimId}_can_pass_auth`, "");
  if (text) {
    return JSON.parse(window.atob(text));
  }
  return undefined;
};

const getMoimTokenToCookie_v1 = (moimId: Moim.Id): string | undefined => {
  return CookieHandler.get(`${moimId}_moim_auth`, "");
};

const deleteV1Token = (moimId: string) => {
  CookieHandler.remove(`${moimId}_moim_auth`);
  CookieHandler.remove(`${moimId}_can_pass_auth`);
};
export const compatibleOAuthV2 = async (hubMoimId: string) => {
  const canpass = getCanpassToCookie(hubMoimId);
  const moimToken = getMoimTokenToCookie_v1(hubMoimId);
  const moimToken_v2 = getMoimTokenToCookie(hubMoimId);

  if (!moimToken_v2 && (canpass || moimToken)) {
    if (moimToken_v2) {
      deleteV1Token(hubMoimId);
      return;
    }

    if (canpass && moimToken) {
      try {
        const result = await refreshAccessToken({
          groupId: hubMoimId,
          refreshToken: canpass.canPass.refresh_token,
          moimToken,
        });

        storeMoimTokenToCookie(hubMoimId, result);

        deleteV1Token(hubMoimId);
      } catch {
        deleteV1Token(hubMoimId);
      }
    } else {
      deleteV1Token(hubMoimId);
    }
  }
};
