import * as React from "react";
import jwt from "jsonwebtoken";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import popupWindow from "common/helpers/popupWindow";
import PopupWindowClass from "common/helpers/popupWindowClass";
import crytobadgeHandler from "./handlers/cryptobadge";
import moimHandler from "./handlers/moim";
import { IOptions } from "./handlers/cryptobadge/helpers";

import * as CookieHandler from "common/helpers/cookieHandler";
import { MOIM_AUTH_KEY } from "app/common/constants/keys";
import getWildDomainName from "common/helpers/getWildDomain";

const authenticationHandlers: Record<
  Moim.AuthenticationProvider,
  (
    option: any,
    authClient: PopupWindowClass,
    callback: (token: Moim.IMoimOAuthResponseData) => Promise<void>,
  ) => Promise<void>
> = {
  cryptobadge: crytobadgeHandler,
  moim: moimHandler,
};

// Overloading
interface IAuthenticationHookResult {
  token: Moim.IMoimOAuthResponseData | null;
  loading: boolean;
  error: Error | null;
  handler: () => Promise<void>;
}
export function useAuthentication(
  name: "cryptobadge",
  options: IOptions,
): IAuthenticationHookResult;

// Main Function
export function useAuthentication(
  name: Moim.AuthenticationProvider,
  options: any,
): IAuthenticationHookResult {
  const [token, setToken] = React.useState<null | Moim.IMoimOAuthResponseData>(
    null,
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const handleCallback = React.useCallback(
    async (access_token: Moim.IMoimOAuthResponseData) => {
      setToken(access_token);
    },
    [setToken],
  );

  const handler = React.useCallback(async () => {
    if (name in authenticationHandlers) {
      try {
        setLoading(true);
        await authenticationHandlers[name](
          options,
          popupWindow(CRYPTOBADGE_WINDOW_SIZE),
          handleCallback,
        );
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [name, options, handleCallback]);
  return {
    token,
    loading,
    error,
    handler,
  };
}

export const storeMoimTokenToCookie = (
  groupId: Moim.Id,
  data: Moim.IMoimOAuthResponseData,
) => {
  CookieHandler.set(
    `${groupId}_${MOIM_AUTH_KEY}`,
    window.btoa(JSON.stringify(data)),
    {
      domain: getWildDomainName(),
      expires: 365, // 365 days
      sameSite: "None",
    },
  );
};

export const removeMoimTokenCookie = (moimId: Moim.Id) => {
  CookieHandler.remove(`${moimId}_${MOIM_AUTH_KEY}`, {
    domain: getWildDomainName(),
    expires: 365,
  });
};

export const getMoimTokenToCookie = (
  moimId: Moim.Id,
): Moim.IMoimOAuthResponseData | undefined => {
  const text = CookieHandler.get(`${moimId}_${MOIM_AUTH_KEY}`, "");
  if (text) {
    return JSON.parse(window.atob(text));
  }
  return undefined;
};

export const getMoimAccessTokenToCookie = (moimId: Moim.Id) => {
  return getMoimTokenToCookie(moimId)?.access_token ?? null;
};

export const getCanTokenFromMoimToken = (token?: string) => {
  if (!token) {
    return;
  }
  const parsedToken = token ? jwt.decode(token) : undefined;
  const canToken =
    parsedToken && typeof parsedToken !== "string"
      ? parsedToken.auth?.token
      : undefined;

  return canToken;
};

export const getCanRefreshTokenFromMoimToken = (token?: string) => {
  if (!token) {
    return;
  }
  const parsedToken = token ? jwt.decode(token) : undefined;
  const canToken =
    parsedToken && typeof parsedToken !== "string"
      ? parsedToken.auth?.refreshToken
      : undefined;

  return canToken;
};
