import * as CookieHandler from "common/helpers/cookieHandler";
import {
  PAYMENT_REDIRECT_REQUESTED,
  PAYMENT_REDIRECT_REQUESTED_LAST_SEEN,
} from "common/constants/keys";
export function setPaymentRedirectRequest(flag: boolean) {
  CookieHandler.set(PAYMENT_REDIRECT_REQUESTED, flag);
}

export function getPaymentRedirectRequest(defaultValue: boolean): boolean {
  const cookie =
    CookieHandler.get(PAYMENT_REDIRECT_REQUESTED, `${defaultValue}`) ??
    `${defaultValue}`;
  return cookie === "true" ? true : false;
}

export function removePaymentRedirectRequest() {
  CookieHandler.remove(PAYMENT_REDIRECT_REQUESTED);
}

export function setPaymentRedirectLastSeen() {
  CookieHandler.set(PAYMENT_REDIRECT_REQUESTED_LAST_SEEN, location.pathname);
}

export function getPaymentRedirectLastSeen() {
  return CookieHandler.get(PAYMENT_REDIRECT_REQUESTED_LAST_SEEN, "/") ?? "/";
}

export function removePaymentRedirectLastSeen() {
  CookieHandler.remove(PAYMENT_REDIRECT_REQUESTED_LAST_SEEN);
}
