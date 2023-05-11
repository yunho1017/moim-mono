import { getCanPassAPIDomain } from "common/helpers/domainMaker";

export const CRYPTOBADGE_AUTHORIZATION_ENDPOINT_URL = `${getCanPassAPIDomain()}/oauth2/authorize`;
export const CRYPTOBADGE_TOKEN_ENDPOINT_URL = `${getCanPassAPIDomain()}/oauth2/token`;
export const CRYPTOBADGE_DEFAULT_SCOPE = ["email", "poll", "option", "vote"];
export const CRYPTOBADGE_DEV_CLIENT_ID = "932c13e21cf30f864a703ef404753ad1";
export const CRYPTOBADGE_HUB_CLIENT_ID = "1da0a16f3d3f46dfda92cfd2bf06d13a";
export const CRYPTOBADGE_CALLBACK_PATH = "/oauth/connect/cryptobadge/callback";

export const CRYPTOBADGE_WINDOW_SIZE = {
  width: 520,
  height: 710,
};
