import {
  PLUGIN_REDIRECT_REQUESTED,
  OAUTH_REQUESTED_LAST_SEEN,
  PLUGIN_REDIRECT_STORED_DATA,
  MINT_REDIRECT_REQUESTED,
} from "common/constants/keys";
import * as CookieHandler from "common/helpers/cookieHandler";

export function setStoreRedirectRequest(flag: boolean) {
  CookieHandler.set(PLUGIN_REDIRECT_REQUESTED, flag);
}

export function getStoreRedirectRequest(defaultValue: boolean): boolean {
  const cookie =
    CookieHandler.get(PLUGIN_REDIRECT_REQUESTED, `${defaultValue}`) ??
    `${defaultValue}`;
  return cookie === "true" ? true : false;
}

export function setStoreRedirectBlocks(value: Record<string, any>) {
  CookieHandler.set(PLUGIN_REDIRECT_STORED_DATA, JSON.stringify(value));
}

export function getStoreRedirectBlocks(): Record<string, any> {
  const cookie = CookieHandler.get(PLUGIN_REDIRECT_STORED_DATA, "{}") ?? "{}";
  try {
    const value = JSON.parse(cookie);
    return value;
  } catch {
    return {};
  }
}

export function setStoreRedirectLastSeen() {
  CookieHandler.set(OAUTH_REQUESTED_LAST_SEEN, location.pathname);
}

export function getStoreRedirectLastSeen() {
  return CookieHandler.get(OAUTH_REQUESTED_LAST_SEEN, "/") ?? "/";
}

export function removeStoreRedirectRequest() {
  CookieHandler.remove(PLUGIN_REDIRECT_REQUESTED);
}

export function removeStoreRedirectLastSeen() {
  CookieHandler.remove(OAUTH_REQUESTED_LAST_SEEN);
}

export function removeStoreRedirectBlocks() {
  CookieHandler.remove(PLUGIN_REDIRECT_STORED_DATA);
}

export function setStoreRedirectMintRequest(flag: boolean) {
  CookieHandler.set(MINT_REDIRECT_REQUESTED, flag);
}

export function getStoreRedirectMintRequest(defaultValue: boolean): boolean {
  const cookie =
    CookieHandler.get(MINT_REDIRECT_REQUESTED, `${defaultValue}`) ??
    `${defaultValue}`;
  return cookie === "true" ? true : false;
}

export function removeStoreRedirectMintRequest() {
  CookieHandler.remove(MINT_REDIRECT_REQUESTED);
}
