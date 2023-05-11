import * as CookieHandler from "common/helpers/cookieHandler";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import {
  CRYPTO_BADGE_TOKEN_KEY,
  MOIM_AUTO_SIGN_IN_KEY,
  CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP,
} from "common/constants/keys";

const OneHourMilliseconds = 60 * 60 * 1000;

// NOTE: All of CookieHandler use will delete after weekend.
// Write: 2020-04-09.

// TODO: MOIM_AUTO_SIGN_IN_KEY cookie will remove from cookies. but still need same purpose feature. migrate to other way for not using cookies;

export function setCryptoBadgeToken(token: string) {
  CookieHandler.remove(CRYPTO_BADGE_TOKEN_KEY);
  CookieHandler.remove(MOIM_AUTO_SIGN_IN_KEY);

  ExpiredInMemoryHelper.set(CRYPTO_BADGE_TOKEN_KEY, token, OneHourMilliseconds);
}

export function setOAuthTokenForGroup(authentication: Moim.IAuthentication) {
  CookieHandler.remove(CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP);

  ExpiredInMemoryHelper.set(
    CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP,
    authentication,
    OneHourMilliseconds,
  );
}

export function getCryptoBadgeToken() {
  return ExpiredInMemoryHelper.get<string>(CRYPTO_BADGE_TOKEN_KEY);
}

export function getOAuthTokenForGroup(): Moim.IAuthentication | null {
  return ExpiredInMemoryHelper.get<Moim.IAuthentication>(
    CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP,
  );
}

export function removeCryptoBadgeToken() {
  ExpiredInMemoryHelper.remove(CRYPTO_BADGE_TOKEN_KEY);
  CookieHandler.remove(MOIM_AUTO_SIGN_IN_KEY);
}
