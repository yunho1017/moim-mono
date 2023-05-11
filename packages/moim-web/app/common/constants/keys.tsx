export const MY_MOIM_LIST_KEY = "MY_MOIM_LIST";
export const MAXIMUM_COOKIE_EXPIRED_TIME = new Date("Wed Jan 16 2030");

export const CRYPTO_BADGE_TOKEN_KEY = "vgroup.oauth";
export const CRYPTO_BADGE_TOKEN_KEY_FOR_GROUP = "cryptoOauth";
export const MOIM_AUTO_SIGN_IN_KEY = "autosignin";

export const MOIM_AUTH_KEY = "moim_auth_v2";
export const VISITED_MOIM_IDS = "visited_moim";

export const GROUP_ID = "current_group_id";
export const HUB_GROUP_ID = "current_hub_group_id";

export const OAUTH_REQUESTED = "oauth_requested";
export const OAUTH_REQUESTED_LAST_SEEN = "oauth_requested_last_seen";

export const PLUGIN_REDIRECT_REQUESTED = "plugin_requested";
export const PLUGIN_REDIRECT_REQUESTED_LAST_SEEN = "plugin_requested_last_seen";
export const PLUGIN_REDIRECT_STORED_DATA = "plugin_restore_data";
export const PAYMENT_REDIRECT_REQUESTED = "payment_redirect_requested";
export const PAYMENT_REDIRECT_REQUESTED_LAST_SEEN =
  "payment_redirect_requested_last_seen";
export const SECONDARY_PANEL_LAST_SEEN = "secondary_panel_last_seen";
export const SECONDARY_PANEL_TYPE = "secondary_panel_type";

export const CURRENT_USER_KEY = "current_user_key";

export const MINT_REDIRECT_REQUESTED = "mint_requested";
export const CAMPAIGN_EXECUTION_FUND_REMIT_REQUESTED =
  "remit_execution_fund_requested";

export const DQUEST_SERVICE_ID_STAGE = process.env.DQUEST_SERVICE_ID_STAGE;
export const DQUEST_SERVICE_ID_PROD = process.env.DQUEST_SERVICE_ID_PROD;

export const GROUP_INVITE_CODE = (groupId: string) => `${groupId}_invite_code`;

export const BADGE_PREVIEW_KEY_STORE_KEY = "BADGE_PREVIEW_KEY_STORE_KEY";
export const CLAIM_TRIED_BADGE_ID = "claim_tried_badge_id";
