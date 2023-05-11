import { NOT_MORE_SHOWING_TODAY } from "./constants";
import * as CookieHandler from "common/helpers/cookieHandler";

export function setPopupBannerNotShowingToday(id: string, flag: boolean) {
  const date = new Date();
  date.setHours(24, 0, 0, 0);

  CookieHandler.set(`${id}_${NOT_MORE_SHOWING_TODAY}`, flag, { expires: date });
}

export function getPopupBannerNotShowingToday(
  id: string,
  defaultValue: boolean,
): boolean {
  const cookie =
    CookieHandler.get(`${id}_${NOT_MORE_SHOWING_TODAY}`, `${defaultValue}`) ??
    `${defaultValue}`;
  return cookie === "true" ? true : false;
}
