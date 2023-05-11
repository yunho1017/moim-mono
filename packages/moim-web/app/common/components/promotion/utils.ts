import moment from "moment";
import * as CookieHandler from "common/helpers/cookieHandler";
import SessionHandler from "common/helpers/sessionHandler";

const APP_DOWNLOAD_PROMOTE_BOTTOM_SHEET = "app_download_bottom_sheet_24h";
const APP_DOWNLOAD_PROMOTE_BANNER = "app_download_banner_24h";
const APP_DOWNLOAD_PROMOTE_BANNER_IN_VIEWED = "app_download_banner_in_viewed";

export function closeAppDownloadPromoteBottomSheet() {
  const expiredDate = moment().endOf("day");

  CookieHandler.set(APP_DOWNLOAD_PROMOTE_BOTTOM_SHEET, expiredDate.unix());
}

export function isAppDownloadPromoteBottomSheetUntilHide() {
  const expiredDateUnix = CookieHandler.get(
    APP_DOWNLOAD_PROMOTE_BOTTOM_SHEET,
    moment()
      .add(-1, "days")
      .endOf("day")
      .unix(),
  );
  return !moment().isAfter(moment(expiredDateUnix));
}

export function closeAppDownloadPromoteBanner() {
  const expiredDate = moment().endOf("day");

  CookieHandler.set(APP_DOWNLOAD_PROMOTE_BANNER, expiredDate.unix());
}

export function isAppDownloadPromoteBannerUntilHide() {
  const expiredDateUnix = CookieHandler.get(
    APP_DOWNLOAD_PROMOTE_BANNER,
    moment()
      .add(-1, "days")
      .endOf("day")
      .unix(),
  );
  return !moment().isAfter(moment(expiredDateUnix));
}

export function getAppDownloadPromoteBannerIsInViewed() {
  const inViewed = SessionHandler.get(
    APP_DOWNLOAD_PROMOTE_BANNER_IN_VIEWED,
    "false",
  );
  return inViewed === "true" ? true : false;
}

export function setAppDownloadPromoteBannerIsInViewed() {
  SessionHandler.set(APP_DOWNLOAD_PROMOTE_BANNER_IN_VIEWED, "true");
}
