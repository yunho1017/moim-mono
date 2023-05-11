export const GROUP_APP_SCHEMA: string = "moim://";

export const WHITE_LIST_HOSTS = [
  "vingle\\.network",
  ".*\\.vingle\\.network",
  "moim\\.co",
  ".*\\.moim\\.co",
  "lvh\\.me",
  ".*\\.lvh\\.me",
];
export const WHITE_LIST_OF_POST_MESSAGE_ORIGIN_REGEX = new RegExp(
  `(http|https):\\/\\/(|\\w+.)(${WHITE_LIST_HOSTS.join("|")})($|:\\d+)*`,
);

export const PRODUCTION_HOST = "moim.co";
export const STAGE_HOST = "vingle.network";
export const DEV_HOST = "lvh.me";

export const PRODUCTION_ANALYTICS_HOST = "report.moim.co";
export const STAGE_ANALYTICS_HOST = "report.vingle.network";
export const DEV_ANALYTICS_HOST = "report.vingle.network";
export const CAN_ADMIN_PRODUCTION_HOST = "https://can-admin.moim.co";
export const CAN_ADMIN_STAGE_HOST = "https://can-admin.vingle.network";
