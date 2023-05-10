export const MarginSize: {
  ZERO: Moim.Enums.MarginSizeTypes.ZERO;
  FOUR: Moim.Enums.MarginSizeTypes.FOUR;
  EIGHT: Moim.Enums.MarginSizeTypes.EIGHT;
  TWELVE: Moim.Enums.MarginSizeTypes.TWELVE;
  SIXTEEN: Moim.Enums.MarginSizeTypes.SIXTEEN;
} = {
  ZERO: 0,
  FOUR: 4,
  EIGHT: 8,
  TWELVE: 12,
  SIXTEEN: 16,
};

export const VoteStatus: {
  POSITIVE: Moim.Enums.VoteStatus.POSITIVE;
  NEGATIVE: Moim.Enums.VoteStatus.NEGATIVE;
  NONE: Moim.Enums.VoteStatus.NONE;
} = {
  POSITIVE: "upvote",
  NEGATIVE: "downvote",
  NONE: null,
};

export const CreateMoimStep: {
  MOIM_NAME: Moim.Enums.CreateMoimStepTypes.MOIM_NAME;
  MOIM_DOMAIN: Moim.Enums.CreateMoimStepTypes.MOIM_DOMAIN;
  MOIM_ACCESS: Moim.Enums.CreateMoimStepTypes.MOIM_ACCESS;
  MOIM_ICON: Moim.Enums.CreateMoimStepTypes.MOIM_ICON;
  USER_NAME: Moim.Enums.CreateMoimStepTypes.USER_NAME;
  MOIM_RESULT: Moim.Enums.CreateMoimStepTypes.MOIM_RESULT;
} = {
  MOIM_NAME: 1,
  MOIM_DOMAIN: 2,
  MOIM_ACCESS: 3,
  MOIM_ICON: 4,
  USER_NAME: 5,
  MOIM_RESULT: 6,
};

export const MatchRouting: {
  FORUM: Moim.Route.MatchRoutingType.FORUM;
  FORUM_SHOW: Moim.Route.MatchRoutingType.FORUM_SHOW;
  CONVERSATION: Moim.Route.MatchRoutingType.CONVERSATION;
  SUBMOIM_LIST: Moim.Route.MatchRoutingType.SUBMOIM_LIST;
  VIEW: Moim.Route.MatchRoutingType.VIEW;
  DIRECT_MESSAGE: Moim.Route.MatchRoutingType.DIRECT_MESSAGE;
  COMMERCE: Moim.Route.MatchRoutingType.COMMERCE;
  NOT_MATCHED: Moim.Route.MatchRoutingType.NOT_MATCHED;
} = {
  FORUM: "FORUM",
  FORUM_SHOW: "FORUM_SHOW",
  CONVERSATION: "CONVERSATION",
  SUBMOIM_LIST: "SUBMOIM_LIST",
  VIEW: "VIEW",
  DIRECT_MESSAGE: "DIRECT_MESSAGE",
  COMMERCE: "COMMERCE",
  NOT_MATCHED: "NOT_MATCHED",
};

export const PermissionDeniedFallbackType: {
  FULLSCREEN_DIALOG: Moim.Enums.PermissionDeniedFallbackTypes.FULLSCREEN_DIALOG;
  SCREEN: Moim.Enums.PermissionDeniedFallbackTypes.SCREEN;
  ALERT: Moim.Enums.PermissionDeniedFallbackTypes.ALERT;
  CUSTOM: Moim.Enums.PermissionDeniedFallbackTypes.CUSTOM;
  NONE: Moim.Enums.PermissionDeniedFallbackTypes.NONE;
} = {
  FULLSCREEN_DIALOG: "FULLSCREEN_DIALOG",
  SCREEN: "SCREEN",
  ALERT: "ALERT",
  CUSTOM: "CUSTOM",
  NONE: "NONE",
};

export const NotificationType: {
  ALL: Moim.Enums.NotificationType;
  MENTION: Moim.Enums.NotificationType;
} = {
  ALL: "all",
  MENTION: "mention",
};

export const NotificationGroupKeyType: {
  TODAY: Moim.Enums.NotificationGroupKeyType;
  YESTERDAY: Moim.Enums.NotificationGroupKeyType;
  OLDER: Moim.Enums.NotificationGroupKeyType;
} = {
  TODAY: "TODAY",
  YESTERDAY: "YESTERDAY",
  OLDER: "OLDER",
};

export const ItemIdTypes: {
  MESSAGE: Moim.Enums.ItemIdType;
  THREAD: Moim.Enums.ItemIdType;
  COMMENT: Moim.Enums.ItemIdType;
  DRAFT: Moim.Enums.ItemIdType;
  PRODUCT: Moim.Enums.ItemIdType;
} = {
  MESSAGE: "M",
  THREAD: "T",
  COMMENT: "R",
  DRAFT: "X",
  PRODUCT: "CP",
};

export const ChannelIdTypes: {
  Forum: Moim.Enums.ChannelIdType;
  Conversation: Moim.Enums.ChannelIdType;
  DM: Moim.Enums.ChannelIdType;
  Block: Moim.Enums.ChannelIdType;
  SubMoim: Moim.Enums.ChannelIdType;
} = {
  Forum: "Q",
  Conversation: "C",
  DM: "D",
  Block: "I",
  SubMoim: "J",
};

export const PostShowTypes: {
  DEFAULT: Moim.Enums.PostShowType;
  MODAL: Moim.Enums.PostShowType;
  FULL_SCREEN: Moim.Enums.PostShowType;
} = {
  DEFAULT: "DEFAULT",
  MODAL: "MODAL",
  FULL_SCREEN: "FULL_SCREEN",
};

export const UserStatusTypes: {
  ACTIVE: Moim.Enums.UserStatusType;
  DEACTIVATED: Moim.Enums.UserStatusType;
  PENDING: Moim.Enums.UserStatusType;
} = {
  ACTIVE: 0,
  DEACTIVATED: 1,
  PENDING: 2,
};

export const ElementThemeColorValueTypes: {
  PRIMARY_MAIN: Moim.Enums.ElementThemeColorValueTypes.PRIMARY_MAIN;
  PRIMARY_DARK: Moim.Enums.ElementThemeColorValueTypes.PRIMARY_DARK;
  PRIMARY_LIGHT: Moim.Enums.ElementThemeColorValueTypes.PRIMARY_LIGHT;
  SECONDARY_MAIN: Moim.Enums.ElementThemeColorValueTypes.SECONDARY_MAIN;
  SECONDARY_DARK: Moim.Enums.ElementThemeColorValueTypes.SECONDARY_DARK;
  SECONDARY_LIGHT: Moim.Enums.ElementThemeColorValueTypes.SECONDARY_LIGHT;
  BLACK: Moim.Enums.ElementThemeColorValueTypes.BLACK;
  WHITE: Moim.Enums.ElementThemeColorValueTypes.WHITE;
} = {
  PRIMARY_MAIN: "PRIMARY_MAIN",
  PRIMARY_DARK: "PRIMARY_DARK",
  PRIMARY_LIGHT: "PRIMARY_LIGHT",
  SECONDARY_MAIN: "SECONDARY_MAIN",
  SECONDARY_DARK: "SECONDARY_DARK",
  SECONDARY_LIGHT: "SECONDARY_LIGHT",
  BLACK: "BLACK",
  WHITE: "WHITE",
};

export const ThemeColorScaleTypes: {
  BLACK: Moim.Enums.ThemeColorScaleTypes.BLACK;
  WHITE: Moim.Enums.ThemeColorScaleTypes.WHITE;
} = {
  BLACK: "BLACK",
  WHITE: "WHITE",
};

export const SearchResultTabTypes: {
  POST: Moim.Enums.SearchResultTabTypes.POST;
  MESSAGE: Moim.Enums.SearchResultTabTypes.MESSAGE;
  MEMBER: Moim.Enums.SearchResultTabTypes.MEMBER;
  GROUP: Moim.Enums.SearchResultTabTypes.GROUP;
  PRODUCT: Moim.Enums.SearchResultTabTypes.PRODUCT;
} = {
  POST: "post",
  MESSAGE: "message",
  MEMBER: "member",
  GROUP: "group",
  PRODUCT: "product",
};

export const CommerceCurrencyTypes: {
  USD: Moim.Enums.CommerceCurrencyTypes.USD;
  KRW: Moim.Enums.CommerceCurrencyTypes.KRW;
  SGD: Moim.Enums.CommerceCurrencyTypes.SGD;
} = {
  USD: "USD",
  KRW: "KRW",
  SGD: "SGD",
};

export const BlockchainCurrencyTypes: {
  MATIC: Moim.Enums.BlockchainCurrencyTypes.MATIC;
  ETH: Moim.Enums.BlockchainCurrencyTypes.ETH;
  LINK: Moim.Enums.BlockchainCurrencyTypes.LINK;
  USDT: Moim.Enums.BlockchainCurrencyTypes.USDT;
  USDC: Moim.Enums.BlockchainCurrencyTypes.USDC;
  APE: Moim.Enums.BlockchainCurrencyTypes.APE;
  SAND: Moim.Enums.BlockchainCurrencyTypes.SAND;
  SHIB: Moim.Enums.BlockchainCurrencyTypes.SHIB;
  NEAR: Moim.Enums.BlockchainCurrencyTypes.NEAR;
  AVAX: Moim.Enums.BlockchainCurrencyTypes.AVAX;
  MANA: Moim.Enums.BlockchainCurrencyTypes.MANA;
} = {
  MATIC: "MATIC",
  ETH: "ETH",
  LINK: "LINK",
  USDT: "USDT",
  USDC: "USDC",
  APE: "APE",
  SAND: "SAND",
  SHIB: "SHIB",
  NEAR: "NEAR",
  AVAX: "AVAX",
  MANA: "MANA",
};

export const ThemeMode: {
  LIGHT: Moim.Enums.ThemeModeTypes.LIGHT;
  DARK: Moim.Enums.ThemeModeTypes.DARK;
} = {
  LIGHT: "LIGHT",
  DARK: "DARK",
};

export const NetworkTypes: {
  POLYGON: Moim.Enums.BlockchainNetworkTypes.POLYGON;
  ETHEREUM: Moim.Enums.BlockchainNetworkTypes.ETHEREUM;
  MUMBAI: Moim.Enums.BlockchainNetworkTypes.MUMBAI;
} = {
  POLYGON: "POLYGON",
  ETHEREUM: "ETHEREUM",
  MUMBAI: "MUMBAI",
};
