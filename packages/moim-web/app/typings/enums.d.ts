declare namespace Moim {
  declare namespace Enums {
    namespace ThemeModeTypes {
      type LIGHT = "LIGHT";
      type DARK = "DARK";
    }

    namespace MarginSizeTypes {
      type ZERO = 0;
      type FOUR = 4;
      type EIGHT = 8;
      type TWELVE = 12;
      type SIXTEEN = 16;
    }

    namespace VoteStatus {
      type POSITIVE = "upvote";
      type NEGATIVE = "downvote";
      type NONE = null;
    }

    namespace CreateMoimStepTypes {
      type MOIM_NAME = 1;
      type MOIM_DOMAIN = 2;
      type MOIM_ACCESS = 3;
      type MOIM_ICON = 4;
      type USER_NAME = 5;
      type MOIM_RESULT = 6;
    }

    namespace PermissionDeniedFallbackTypes {
      type FULLSCREEN_DIALOG = "FULLSCREEN_DIALOG";
      type SCREEN = "SCREEN";
      type ALERT = "ALERT";
      type CUSTOM = "CUSTOM";
      type NONE = "NONE";
    }

    namespace NotificationTypes {
      type ALL = "all";
      type MENTION = "mention";
    }

    namespace NotificationGroupKeyTypes {
      type TODAY = "TODAY";
      type YESTERDAY = "YESTERDAY";
      type OLDER = "OLDER";
    }

    namespace ItemIdTypes {
      type MESSAGE = "M";
      type THREAD = "T";
      type COMMENT = "R";
      type DRAFT = "X";
      type PRODUCT = "CP";
    }

    namespace ChannelIdTypes {
      type Forum = "Q";
      type Conversation = "C";
      type DM = "D";
      type Block = "I";
      type SubMoim = "J";
    }

    namespace PostShowTypes {
      type DEFAULT = "DEFAULT";
      type MODAL = "MODAL";
      type FULL_SCREEN = "FULL_SCREEN";
    }

    namespace UserStatusTypes {
      type ACTIVE = 0;
      type DEACTIVATED = 1;
      type PENDING = 2;
    }

    namespace ElementThemeColorValueTypes {
      type PRIMARY_MAIN = "PRIMARY_MAIN";
      type PRIMARY_DARK = "PRIMARY_DARK";
      type PRIMARY_LIGHT = "PRIMARY_LIGHT";
      type SECONDARY_MAIN = "SECONDARY_MAIN";
      type SECONDARY_DARK = "SECONDARY_DARK";
      type SECONDARY_LIGHT = "SECONDARY_LIGHT";
      type BLACK = "BLACK";
      type WHITE = "WHITE";
    }
    namespace ThemeColorScaleTypes {
      type BLACK = "BLACK";
      type WHITE = "WHITE";
    }

    namespace SearchResultTabTypes {
      type POST = "post";
      type MESSAGE = "message";
      type MEMBER = "member";
      type GROUP = "group";
      type PRODUCT = "product";
    }

    namespace CommerceCurrencyTypes {
      type KRW = "KRW";
      type USD = "USD";
      type SGD = "SGD";
    }

    namespace BlockchainCurrencyTypes {
      type MATIC = "MATIC";
      type ETH = "ETH";
      type LINK = "LINK";
      type USDT = "USDT";
      type USDC = "USDC";
      type APE = "APE";
      type SAND = "SAND";
      type SHIB = "SHIB";
      type NEAR = "NEAR";
      type AVAX = "AVAX";
      type MANA = "MANA";
    }

    namespace BlockchainNetworkTypes {
      type POLYGON = "POLYGON";
      type ETHEREUM = "ETHEREUM";
      type MUMBAI = "MUMBAI";
    }

    type MarginSize =
      | MarginSizeTypes.ZERO
      | MarginSizeTypes.FOUR
      | MarginSizeTypes.EIGHT
      | MarginSizeTypes.TWELVE
      | MarginSizeTypes.SIXTEEN;

    type VoteStatus =
      | VoteStatus.POSITIVE
      | VoteStatus.NEGATIVE
      | VoteStatus.NONE;

    type CreateMoimStep =
      | CreateMoimStepTypes.MOIM_NAME
      | CreateMoimStepTypes.MOIM_DOMAIN
      | CreateMoimStepTypes.MOIM_ACCESS
      | CreateMoimStepTypes.MOIM_ICON
      | CreateMoimStepTypes.USER_NAME
      | CreateMoimStepTypes.MOIM_RESULT;

    type PermissionDeniedFallbackType =
      | PermissionDeniedFallbackTypes.FULLSCREEN_DIALOG
      | PermissionDeniedFallbackTypes.SCREEN
      | PermissionDeniedFallbackTypes.ALERT
      | PermissionDeniedFallbackTypes.CUSTOM
      | PermissionDeniedFallbackTypes.NONE;

    type NotificationType = NotificationTypes.ALL | NotificationTypes.MENTION;

    type NotificationGroupKeyType =
      | NotificationGroupKeyTypes.TODAY
      | NotificationGroupKeyTypes.YESTERDAY
      | NotificationGroupKeyTypes.OLDER;

    type ItemIdType =
      | ItemIdType.DRAFT
      | ItemIdType.MESSAGE
      | ItemIdType.THREAD
      | ItemIdType.COMMENT
      | ItemIdType.PRODUCT;

    type ChannelIdType =
      | ChannelIdType.Forum
      | ChannelIdType.Conversation
      | ChannelIdType.DM
      | ChannelIdType.Block
      | ChannelIdType.SubMoim;

    type PostShowType =
      | PostShowTypes.DEFAULT
      | PostShowTypes.MODAL
      | PostShowTypes.FULL_SCREEN;

    type UserStatusType =
      | UserStatusTypes.ACTIVE
      | UserStatusTypes.DEACTIVATED
      | UserStatusTypes.PENDING;

    type ElementThemeColorValueType =
      | ElementThemeColorValueTypes.PRIMARY_MAIN
      | ElementThemeColorValueTypes.PRIMARY_DARK
      | ElementThemeColorValueTypes.PRIMARY_LIGHT
      | ElementThemeColorValueTypes.SECONDARY_MAIN
      | ElementThemeColorValueTypes.SECONDARY_DARK
      | ElementThemeColorValueTypes.SECONDARY_LIGHT
      | ThemeColorScaleTypes.BLACK
      | ThemeColorScaleTypes.WHITE;

    type ThemeColorScaleType =
      | ThemeColorScaleTypes.BLACK
      | ThemeColorScaleTypes.WHITE;

    type SearchResultTabType =
      | SearchResultTabTypes.POST
      | SearchResultTabTypes.MESSAGE
      | SearchResultTabTypes.MEMBER
      | SearchResultTabTypes.GROUP
      | SearchResultTabTypes.PRODUCT;

    type CommerceCurrency =
      | CommerceCurrencyTypes.KRW
      | CommerceCurrencyTypes.USD;

    type BlockChainNativeCurrency =
      | BlockchainCurrencyTypes.MATIC
      | BlockchainCurrencyTypes.ETH;

    type BlockchainCommunityCurrency =
      | BlockchainCurrencyTypes.MATIC
      | BlockchainCurrencyTypes.ETH
      | BlockchainCurrencyTypes.LINK
      | BlockchainCurrencyTypes.USDT
      | BlockchainCurrencyTypes.USDC
      | BlockchainCurrencyTypes.APE
      | BlockchainCurrencyTypes.SAND
      | BlockchainCurrencyTypes.SHIB
      | BlockchainCurrencyTypes.NEAR
      | BlockchainCurrencyTypes.AVAX
      | BlockchainCurrencyTypes.MANA;

    type ThemeModeType = ThemeModeTypes.DARK | ThemeModeTypes.LIGHT;

    type BlockchainNetwork =
      | BlockchainNetworkTypes.ETHEREUM
      | BlockchainNetworkTypes.POLYGON
      | BlockchainNetworkTypes.MUMBAI;
  }
}
