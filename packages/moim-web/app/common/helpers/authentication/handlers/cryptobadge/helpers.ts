import shajs from "sha.js";
import * as qs from "query-string";
import axios from "axios";
import {
  CRYPTOBADGE_AUTHORIZATION_ENDPOINT_URL,
  CRYPTOBADGE_TOKEN_ENDPOINT_URL,
  CRYPTOBADGE_DEFAULT_SCOPE,
  CRYPTOBADGE_CALLBACK_PATH,
} from "common/constants/authentication";
import { isDev } from "common/helpers/envChecker";
import * as CookieHandler from "common/helpers/cookieHandler";
import PopupWindowClass from "common/helpers/popupWindowClass";
import {
  OAUTH_REQUESTED,
  OAUTH_REQUESTED_LAST_SEEN,
} from "common/constants/keys";

function randomBytes(size: number) {
  const buf =
    window.crypto?.getRandomValues?.(new Uint8Array(size)) ??
    Array.from(new Array(size), () => Math.floor(Math.random() * 255));
  return Array.from(buf, (b: number) => `00${b.toString(16)}`.slice(-2)).join(
    "",
  );
}
export function makeCryptobadgeRedirectUri() {
  const devSafeOrigin = isDev()
    ? location.origin.replace(/\/www./i, "/")
    : location.origin;
  return `${devSafeOrigin}${CRYPTOBADGE_CALLBACK_PATH}`;
}
export interface IOptions {
  groupId: string;
  redirectUrl: string;
  providers: {
    kakao: boolean;
  };
  isSignUp?: boolean;
  openJoinGroupDialogAfterGetParentUser?: boolean;
}
export function getAuthorizeEndPoint({
  groupId,
  redirectUrl,
  isSignUp,
  openJoinGroupDialogAfterGetParentUser,
  providers,
}: IOptions) {
  const verifier = randomBytes(32);
  const pkce = {
    verifier,
    challenge: shajs("sha256")
      .update(verifier)
      .digest("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_"),
    algorithm: "S256",
  };

  const providerString = Object.entries(providers)
    .map(([key, value]) => (value ? key : null))
    .filter(i => Boolean(i))
    .join(",");
  const params: Record<string, any> = {
    client_id: groupId,
    response_type: "code",
    redirect_uri: redirectUrl,
    scope: CRYPTOBADGE_DEFAULT_SCOPE.join(" "),
    state: JSON.stringify({
      openJoinGroupDialogAfterGetParentUser:
        openJoinGroupDialogAfterGetParentUser ?? false,
      search: location.search,
    }),
    code_challenge: pkce.challenge,
    code_challenge_method: "S256",
    platform: "web",
    action: isSignUp ? "signup" : "signin",
  };

  if (providerString) {
    params.social_logins = providerString;
  }

  const endpoint = {
    url: `${CRYPTOBADGE_AUTHORIZATION_ENDPOINT_URL}?${qs.stringify(params)}`,
    state: params.state,
    verifier,
  };
  return endpoint;
}
export async function getAuthorizeState(
  options: IOptions,
  _authClient: PopupWindowClass,
  _callback: (token: Moim.IMoimOAuthResponseData) => void,
  _errorCallback?: () => void,
) {
  const { url, verifier } = getAuthorizeEndPoint(options);
  CookieHandler.set(OAUTH_REQUESTED_LAST_SEEN, location.pathname);
  CookieHandler.set(
    OAUTH_REQUESTED,
    JSON.stringify({
      options,
      verifier,
    }),
  );
  location.href = url;
}
export async function getAccessToken({
  groupId,
  redirectUrl,
  code,
  verifier,
}: {
  code: string;
  verifier: string;
} & IOptions): Promise<Moim.IMoimOAuthResponseData> {
  const params = {
    client_id: groupId,
    redirect_uri: redirectUrl,
    grant_type: "authorization_code",
    code,
    code_verifier: verifier,
  };
  try {
    const res = await axios({
      method: "POST",
      url: CRYPTOBADGE_TOKEN_ENDPOINT_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(params),
    });
    const tokens = res.data;
    if (!tokens.access_token) {
      throw new Error("Failed to find access token from provider response");
    }
    return tokens;
  } catch (e) {
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("OAuth2 token exchange failure was detected: ", e.stack);
    }
    if (axios.isAxiosError(e) && e.response) {
      // eslint-disable-next-line no-console
      console.error(
        "Response from OAuth server (status: %d): ",
        e.response.status,
        e.response.headers,
        e.response.data,
      );
      const data = e.response.data;
      const error = ((data as any).error_description || data.error) as
        | string
        | undefined;
      if (error) {
        throw new Error(error);
      }
    }
    throw new Error("Authentication Failed");
  }
}

export async function refreshAccessToken({
  clientId,
  refreshToken,
}: {
  clientId: Moim.Id;
  refreshToken: string;
}): Promise<Moim.IMoimOAuthResponseData> {
  const params = {
    client_id: clientId,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  try {
    const res = await axios({
      method: "POST",
      url: CRYPTOBADGE_TOKEN_ENDPOINT_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(params),
    });
    const tokens = res.data;
    if (!tokens.access_token) {
      throw new Error("Failed to refresh access token from provider response");
    }
    return tokens;
  } catch (e) {
    // eslint-disable-next-line no-console
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("OAuth2 token refresh failure was detected: ", e.stack);
    }
    throw e;
    // NOTE: dont remove below comments
    // if (e.response) {
    //   // eslint-disable-next-line no-console
    //   console.error(
    //     "Response from OAuth server (status: %d): ",
    //     e.response.status,
    //     e.response.headers,
    //     e.response.data,
    //   );
    //   const data = e.response.data;
    //   const error = (data.error_description || data.error) as
    //     | string
    //     | undefined;
    //   if (error) {
    //     throw new Error(error);
    //   }
    // }
    // throw new Error("Authentication refresh Failed");
    // return new Promise<Moim.IMoimOAuthResponseData>(resolve => {
    //   getAuthorizeState(
    //     {
    //       clientId,
    //       redirectUrl: makeCryptobadgeRedirectUri(),
    //     },
    //     popupWindow(CRYPTOBADGE_WINDOW_SIZE),
    //     async data => resolve(data),
    //   );
    // });
  }
}
