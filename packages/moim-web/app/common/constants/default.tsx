export const REM_STANDARD_WIDTH = 375;
export const PIXEL_TO_REM_RATIO = 0.1;

export const POST_MESSAGE_TYPE = {
  CRYPTO_SIGN_IN_DONE: "crypto_sign_in_done",
  CRYPTO_SIGN_IN_FAILED: "crypto_sign_in_failed",
  RECEIVE_OAUTH_DATA: "receive_oauth_data",
  READY_OAUTH_DATA: "ready_oauth_data",
};

export const POST_MESSAGE_SOURCE = "vingle_moim_co_IPC";

export const SECONDARY_VIEW_URL_REGEX = /\/panel\/[^ ?]+/g;

export const WITHOUT_TIME_DATE_FORMAT = "datetime_format_detail_text_date";

export const TEN_MINUTES = 10 * 60 * 1000;

export const DEFAULT_CURRENCY = "KRW";
export const DEFAULT_MAX_PRICE_STEP = "0.00000001";
export const DEFAULT_MAX_PRICE_DECIMALS_LIMIT =
  DEFAULT_MAX_PRICE_STEP.indexOf(".") >= 0
    ? DEFAULT_MAX_PRICE_STEP.substring(
        DEFAULT_MAX_PRICE_STEP.indexOf(".") + 1,
        DEFAULT_MAX_PRICE_STEP.length,
      ).length
    : undefined;
