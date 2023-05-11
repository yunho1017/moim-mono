import retry from "async-retry";
import jwt from "jsonwebtoken";
import { TEN_MINUTES } from "common/constants/default";

import {
  getMoimTokenToCookie,
  storeMoimTokenToCookie,
} from "../authentication";
import { getOriginDomain } from "../domainMaker";
import { setOAuthTokenForGroup } from "../cryptoBadgeHandlerWithInMemory";
import { refreshAccessToken as refreshToken } from "../authentication/handlers/moim/helpers";

export function getIsExpiredToken(token: string) {
  try {
    const parsedToken = jwt.decode(token.replace("Bearer ", ""));
    return (
      parsedToken &&
      typeof parsedToken !== "string" &&
      (parsedToken.expiresAt === 0 ||
        parsedToken.expiresAt - Date.now() <= TEN_MINUTES)
    );
  } catch (err) {
    throw err;
  }
}

export function getCanTokenExpiredAt(token: string) {
  const parsedToken = jwt.decode(token);
  return parsedToken && typeof parsedToken !== "string"
    ? parsedToken.exp
    : undefined;
}
export function getIsExpiredCanToken(token: string) {
  try {
    const expiredAt = getCanTokenExpiredAt(token.replace("Bearer ", ""));
    return expiredAt ? expiredAt - Date.now() <= TEN_MINUTES : true;
  } catch (err) {
    throw err;
  }
}

export const getHeaders = (groupId: string) => ({
  "x-moim-origin": getOriginDomain(),
  "Content-Type": "application/json",
  "x-moim-group-id": groupId,
});

export const refreshAccessToken = async ({
  groupId,
  hubMoimId,
}: {
  groupId: string | null;
  hubMoimId: string | null;
}): Promise<string> => {
  if (!groupId) {
    throw new Error("not exist group id !");
  }

  if (!hubMoimId) {
    throw new Error("not exist hubMoim id !");
  }

  const cookieCanPass = getMoimTokenToCookie(hubMoimId);
  if (!cookieCanPass) {
    throw new Error("not exist cookieCanPass ! ");
  }

  const response = await retry(
    async () => {
      const checkCookieCanPass = getMoimTokenToCookie(hubMoimId);

      if (
        cookieCanPass.refresh_token === checkCookieCanPass?.refresh_token &&
        getIsExpiredCanToken(cookieCanPass.access_token)
      ) {
        const result = await refreshToken({
          groupId: hubMoimId,
          refreshToken: cookieCanPass.refresh_token,
        });

        return result;
      } else {
        return cookieCanPass;
      }
    },
    {
      retries: 3,
      minTimeout: 2000,
      maxTimeout: 2000,
      factor: 1,
      randomize: true,
    },
  );

  if (!response) {
    throw new Error("not exist response ! ");
  }

  const authentication: Moim.IAuthentication = {
    // provider: "cryptobadge",
    token: response.access_token,
    group: hubMoimId,
  };
  storeMoimTokenToCookie(hubMoimId, response);
  setOAuthTokenForGroup(authentication);

  return response.access_token;
};
