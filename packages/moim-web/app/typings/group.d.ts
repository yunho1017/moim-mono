declare namespace Moim {
  namespace Group {
    interface IMyMoim {
      id: string;
      domain: string;
      name: string;
    }
    interface IDefaultChannel {
      type: Channel.Type;
      id: Moim.Id;
    }

    interface ITopTabMenu {
      type: "home" | "channel";
      channelId?: Moim.Id;
      items?: { type: "home" | "channel"; channelId: Moim.Id }[];
    }

    type SortOptionSortType = "sortKey" | "createdAt" | "latestAt";
    type SortOptionOrderType = "desc" | "asc";
    interface IGroupSortingOption {
      sort: SortOptionSortType;
      order: SortOptionOrderType;
    }

    interface IFooter {
      content: {
        title: string;
        link?: string;
      }[];
      socialMedia: {
        icon: string;
        link: string;
      }[];
      contact?: string;
      bottomContact?: string;
      copyright?: string;
    }

    interface InternalizeObject {
      countryCode: string;
      emoji: string;
      emojiU: string;
      languages: string[];
      name: string;
      native: string;
      regionCode: string;
    }

    interface IRecentHistoriesBlock extends Blockit.BaseBlock {
      type: "search-histories";
    }
    interface ISearchKeywordsBlock extends Blockit.BaseBlock {
      type: "search-keywords";
      contents: string[];
    }
    interface INormalizedGroup {
      id: Id; // TU0012345
      domain: string; // acme.vingle.group
      name: string; // Acme Corp
      description?: string; // This is Group of Acme Corp. You must be Acme Corp to join this group
      icon: IIcon; // { type: "text", data: { text: "A", color: "#ff0000ff", bg_color: "#ff0000ff" } }
      banner: Moim.IBanner;
      config: IGroupConfig;
      analytics?: IGroupAnalytics;
      favicon?: {
        android: Moim.IFavicon[];
        ios: Moim.IFavicon[];
        common: Moim.IFavicon[];
      };
      cover?: {
        groupId: Id;
        content: IImageCover | IRedirectCover;
      };
      is_public: boolean; // false
      is_hub: boolean; // false
      created_at: number;
      updated_at: number;
      users_count: number;
      sub_groups_count: number;
      url: string;
      joined: boolean;
      tags?: Moim.Id[];
      domain_prefix?: string;
      parent?: Id;
      seller_id?: Id;
      stat?: Channel.IChannelStat;
      sorting_options?: IGroupSortingOption[];
      footer?: IFooter;
      navigation_config?: {
        showTopTabOnWeb?: boolean;
      };
      navigation_structure: {
        web: {
          topNavi: INavigationConfig;
          topSubNavi: INavigationConfig;
          sideNavi: INavigationConfig;
        };
        app: {
          topNavi: INavigationConfig;
          sideNavi: INavigationConfig;
        };
      };
      sign_up_config: {
        phone?: ISignUpConfig;
        adAgreement?: {
          dayTime: {
            sms: ISignUpConfig;
            email: ISignUpConfig;
            app: ISignUpConfig;
          };
          nightTime: {
            sms: ISignUpConfig;
            email: ISignUpConfig;
            app: ISignUpConfig;
          };
        };
        others: { [key: string]: ISignUpConfig };
      };
      sign_up_config_v2: {
        phone?: ISignUpConfig;
        adAgreement: {
          appPush: ISignUpAdAgreementConfig;
          email: ISignUpAdAgreementConfig;
          sms: ISignUpAdAgreementConfig;
          webPush: ISignUpAdAgreementConfig;
        };
        others: { [key: string]: ISignUpConfig };
      };
      text_sets: Record<GroupTextSetKey, IGroupTextSet>;
      status: GroupPeriodType;
      period?: IGroupPeriod;
      status_config?: IMoimStatusConfig;
      global_banner?: {
        message: string;
        href?: string;
      };
      internationalizations?: InternalizeObject[];
      active_referral_promotions?: {
        signUp?: string;
      };

      home: {
        web:
          | {
              type: "channel";
              ref: IDefaultChannel;
            }
          | {
              type: "cover";
            }
          | {
              type: "link";
            };
      };

      search_tabs: Enums.SearchResultTabType[];
      user_mobile_top_tabs?: ITopTabMenu[];
      mobile_top_tabs?: ITopTabMenu[];
      event_noti_config?: {
        phoneAuthentication?: {
          kakaoTalk?: {
            active: boolean;
          };
        };
      };

      search_blocks_config?: (
        | IRecentHistoriesBlock
        | ISearchKeywordsBlock
        | Blockit.Blocks
      )[];
    }

    interface INavigationConfig {
      showNavigation: boolean;
      elements?: Layout.Navigation.ElementType[];
    }
    interface ISignUpConfig {
      isPrivate: boolean;
      state: "deactivated" | "optional" | "required";
    }
    interface ISignUpAdAgreementConfig {
      dayTime: ISignUpConfig;
      nightTime: ISignUpConfig;
    }

    interface IGroupPeriod {
      startTime?: number;
      endTime?: number;
    }

    type GroupPeriodType = "ready" | "activated" | "terminated";

    type GroupTextSetKey =
      | "anonymous_member"
      | "join_button"
      | "child_moim"
      | "member"
      | "non_joined_child_feedback_full"
      | "non_joined_child_feedback_input_chat"
      | "non_joined_child_feedback_input_comment"
      | "non_signed_up_parent_feedback_full"
      | "non_signed_up_parent_feedback_input_chat"
      | "non_signed_up_parent_feedback_input_comment"
      | "non_signed_up_parent_feedback_profile"
      | "moim_card_explore"
      | "moim_card_joined"
      | "child_moim_active"
      | "child_moim_coming_soon"
      | "child_moim_terminated"
      | "button_buy_now"
      | "button_mint_nft_upcoming"
      | "button_mint_nft"
      | "button_mint_nft_terminated"
      | "button_minted_nft"
      | "button_login"
      | "button_signup"
      | "sale_status_finished"
      | "sale_status_for_sale"
      | "sale_status_scheduled"
      | "sale_status_sold_out"
      | "back_this_project"
      | "funding_status_scheduled"
      | "funding_status_completed"
      | "funding_status_sold_out"
      | "my_shopping_menu_title"
      | "my_shopping_orders_menu_title"
      | "my_shopping_orders_empty_title"
      | "my_shopping_orders_id_title"
      | "my_shopping_orders_details_title"
      | "my_shopping_orders_details_payment_title"
      | "my_shopping_orders_total_product_title"
      | "my_shopping_orders_buyer_info"
      | "my_shopping_coupon_credit_menu_title"
      | "my_shopping_wishlist_menu_title"
      | "search_result_menu_products"
      | "product_engagement_contents_1depth_thread_types"
      | "product_engagement_contents_2depth_thread_types"
      | "button_seller_updates"
      | "quest_list_title"
      | "status_quest_scheduled"
      | "status_quest_ongoing"
      | "status_quest_finished"
      | "quest_progress"
      | "quest_outcome"
      | "my_quest"
      | "my_quest_ongoing"
      | "my_quest_finished"
      | "my_quest_view_all"
      | "my_quest_ongoing_none"
      | "my_quest_finished_none"
      | "dialog_signup_name_setting_title"
      | "dialog_signup_name_setting_description"
      | "dialog_signup_name_setting_placeholder"
      | "button_badge_show_claim_user_mint_badge"
      | "leave_parent_moim_notice";

    interface IGroupTextSet {
      en: { singular: string; plural: string };
      ko: { singular: string; plural: string };
    }
    interface IGroup extends INormalizedGroup {
      tags?: Moim.Tag.ITag[];
    }

    type INormalizedData = INormalizedEntities<INormalizedGroup>;

    // GET /api/groups
    interface INormalizedGroupWithUser {
      group: INormalizedGroup;
      user: User.IOriginalUserDatum;
    }

    interface IGroupWithUser {
      group: IGroup;
      user: User.IUser;
    }

    type IGroupConfigLandingType = "channel" | "cover" | "url";
    interface IGroupLandingConfig {
      type: IGroupConfigLandingType;
      url?: "string";
    }

    interface IGroupConfig {
      showMemberCount: boolean;
      landing?: IGroupLandingConfig;
      useOnlyParentProfile: boolean;
      contracts?: {
        id: string;
        network: string;
        symbol: string;
      }[];
      enableNFT: boolean;
      enableDquest?: boolean;
      enableCoin?: boolean;
      enableMobileTopInMobileWeb: boolean;
      theme: Enums.ThemeModeType;
      theme_web: Enums.ThemeModeType;
    }

    interface IGroupAnalytics {
      google?: string;
      tagManager?: string;
      amplitude?: string;
    }

    type IGroupBatchResponseBody = IPaginatedListResponse<INormalizedGroup>;

    // GET /api/groups/validate
    type IValidateGroupResponse = ISingleItemResponse<ISuccessResponse>;

    interface IUnavailableDomainError {
      code: "UNAVAILABLE_DOMAIN";
      message: "acme is not unavailable";
      metadata: { domain: string };
    }

    interface IValidateGroupErrorResponse extends IErrorResponse {
      error: IUnavailableDomainError;
    }

    // POST /api/groups
    interface ICreateGroupRequestBody {
      name: string;
      description?: string;
      domain: string; // do not append ".vingle.group"
      is_public: boolean;
      icon?: {
        type: "image";
        data: { id: Id };
      };
      creator: {
        name: string;
        bio?: string;
        tz: string;
        locale: string;
        authentication: Moim.IAuthentication;
      };
    }

    type ICreateGroupResponseBody = ISingleItemResponse<{
      group: INormalizedGroup;
      account?: User.IOriginalUserDatum;
    }>;

    interface IGroupImagePreview {
      id: Id;
      url: string;
      width: number;
      height: number;
    }

    type IGroupStatus = Readonly<{
      codeInForce: number;
      member: number;
      coin: number;
    }>;

    type JoinGroupDialogStepType = "main" | "username" | "phone";
    type JoinGroupDialogType = "current" | "parent";

    interface IJoinGroupDialogState {
      open: boolean;
      type: Group.JoinGroupDialogType | null;
      isLoading: boolean;
      isGetParentMoimUserLoading: boolean;
      isGetParentGroupLoading: boolean;
      isPostPhoneNumberLoading: boolean;
      isCheckPhoneNumberLoading: boolean;
      initialStep?: JoinGroupDialogStepType;
      options?: {
        token?: string;
        refreshToken?: string;
      };
    }

    type IGroupData = Readonly<{
      status: IGroupStatus | null;
      members: IPaginatedListResponse<Moim.Id>;
      getMembersLoading: boolean;
      myJoinedMoims: IPaginatedListResponse<Moim.Id>;
      isGetMyJoinedMoimsLoading: boolean;
      isCreateMoimLoading: boolean;
      isCreateSubMoimLoading: boolean;
      moimRename: Moim.CommonActionState;
      moimSetDescription: Moim.CommonActionState;
      moimUpdateIcon: Moim.CommonActionState;
      theme: ITheme;
      parentTheme?: ITheme;
      cover: IMoimCover | null;
      getMoimCoverLoading: boolean;
    }>;

    interface ICreateMoimStepData {
      title: React.ReactNode;
      buttonText: React.ReactNode;
      subTitle?: React.ReactNode;
      description?: React.ReactNode;
      buttonDescription?: React.ReactNode;
    }

    interface IPreference {
      locale: string;
    }

    interface IAppConfig extends Record<string, any> {
      dynamicLinkUrl?: string;
      forcePaymentExternalBrowser?: boolean;
    }

    interface IBootstrap {
      appConfig?: IAppConfig;
      appPromotions?: Promote.IAppDownload[];
      group: Group.INormalizedGroup;
      client: {
        client_id: Id;
        theme: string;
        issuers: string[];
        community_account?: Id;
        providers: Record<
          string,
          { web: boolean; android: boolean; ios: boolean }
        >;
      };
      self?: User.IOriginalUserDatum;
      preference?: IPreference;
      banned_users?: string[];
      popupBanner?: Promote.IPopupBanner;
    }

    interface ITheme {
      logo?: string;
      element: IElementTheme;
      palette: IThemePalette;
      darkPalette: IThemePalette;
      componentLayout?: Component.ILayoutConfig;
    }

    interface IElementTheme {
      topArea: ITopAreaElementTheme;
      topSubArea: ITopSubAreaElementTheme;
      sideArea: ISideAreaElementTheme;
      alert: IAlertElementTheme;
      buttons: IButtonElementTheme;
      reactionButtons: IReactionButtonElementTheme;
    }

    interface ITopAreaElementTheme {
      background: IElementThemeValue;
      moimNameText: IElementThemeValue;
      menuText: IElementThemeValue;
      others: IElementThemeValue;
    }

    interface ITopSubAreaElementTheme {
      background: IElementThemeValue;
      childMoimNameText: IElementThemeValue;
      menuText: IElementThemeValue;
    }

    interface ISideAreaElementTheme {
      background: IElementThemeValue;
      childMoimNameText: IElementThemeValue;
      categoryTitleText: IElementThemeValue;
      menuText: IElementThemeValue;
      others: IElementThemeValue;
    }

    interface IAlertElementTheme {
      alertBadge: IElementThemeValue;
    }
    interface IButtonElementTheme {
      button: IElementThemeValue;
    }
    interface IReactionButtonElementTheme {
      like: IElementThemeValue;
      dislike: IElementThemeValue;
    }

    interface IThemePalette {
      primary: IThemePaletteColor;
      secondary: IThemePaletteColor;
      accent: Moim.Enums.ElementThemeColorValueType | string;
      colorSetV2: IColorSet;
      accentFogType: Moim.Enums.ThemeColorScaleType;
      primaryFogType: Moim.Enums.ThemeColorScaleType;
      secondaryFogType: Moim.Enums.ThemeColorScaleType;
    }

    interface IThemePaletteColor {
      main: string;
      light: string;
      dark: string;
    }

    interface IColorSetWithColor extends IColorSet {
      color?: string;
    }
    interface IColorSet {
      fog10: string;
      fog50: string;
      fog100: string;
      fog200: string;
      fog300: string;
      fog400: string;
      fog500: string;
      fog600: string;
      fog700: string;
      fog800: string;
      fog900: string;
      fog1000: string;

      grey10: string;
      grey50: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey900: string;
      grey1000: string;

      white10: string;
      white50: string;
      white100: string;
      white200: string;
      white300: string;
      white400: string;
      white500: string;
      white600: string;
      white700: string;
      white800: string;
      white900: string;
      white1000: string;

      text: string;
    }

    interface IElementThemeValue {
      color?: Moim.Enums.ElementThemeColorValueType | string;
      scale: Moim.Enums.ThemeColorScaleType;
    }

    // PUT /api/groups/{group_id}/icon
    interface IUpdateGroupIconRequestPath {
      groupId: Moim.Id;
    }

    interface IUpdateGroupIconRequestBody {
      group: {
        icon: {
          type: "image";
          data: {
            id: Moim.Id;
          };
        };
      };
    }

    type IUpdateGroupIconRequest = IUpdateGroupIconRequestPath &
      IUpdateGroupIconRequestBody;

    type IUpdateGroupIconResponse = Moim.ISingleItemResponse<IGroup>;

    // PUT /api/groups/{group_id}/banner
    interface IUpdateGroupBannerRequestPath {
      groupId: Moim.Id;
    }

    interface IUpdateGroupBannerRequestBody {
      group: {
        banner: {
          type: "image";
          data: {
            id: Moim.Id;
          };
        };
      };
    }

    type IUpdateGroupBannerRequest = IUpdateGroupBannerRequestPath &
      IUpdateGroupBannerRequestBody;

    type IUpdateGroupBannerResponse = Moim.ISingleItemResponse<
      INormalizedGroup
    >;

    // GET: /api/groups/{groupId}/theme
    interface IGetGroupThemeRequestPath {
      groupId: Moim.Id;
    }

    type IGetGroupThemeRequest = IGetGroupThemeRequestPath;
    type IGetGroupThemeResponse = Moim.ISingleItemResponse<ITheme>;

    // PUT: /api/groups/{groupId}/theme
    interface IUpdateGroupThemeRequestPath {
      groupId: Moim.Id;
    }

    interface IUpdateGroupThemeRequestBody {
      theme: {
        element: IElementTheme;
        palette: IThemePalette;
      };
    }

    type IUpdateGroupThemeRequest = IUpdateGroupThemeRequestPath &
      IUpdateGroupThemeRequestBody;
    type IUpdateGroupThemeResponse = Moim.ISingleItemResponse<ITheme>;

    // POST: /api/groups/{groupId}/theme/logo
    interface ICreateGroupThemeLogoUploadSessionRequestPath {
      groupId: Moim.Id;
    }

    type ICreateGroupThemeLogoUploadSessionRequest = ICreateGroupThemeLogoUploadSessionRequestPath;
    type ICreateGroupThemeLogoUploadSessionResponse = Moim.ISingleItemResponse<
      Moim.Upload.IQueueInfo
    >;

    // PUT: /api/groups/{groupId}/theme/logo
    interface IUpdateGroupThemeLogoRequestPath {
      groupId: Moim.Id;
    }

    interface IUpdateGroupThemeLogoRequestBody {
      theme: {
        logo: string;
      };
    }

    type IUpdateGroupThemeLogoRequest = IUpdateGroupThemeLogoRequestPath &
      IUpdateGroupThemeLogoRequestBody;
    type IUpdateGroupThemeLogoResponse = Moim.ISingleItemResponse<ITheme>;

    // POST: /api/groups/groupId/subgroups

    interface ICreateSubGroupRequestBody {
      group: {
        name: string;
        is_public: boolean;
        icon?: {
          type: "image";
          data: { id: Id };
        };
        description?: string;
        domain: string;
        is_public: boolean;
        tags?: Moim.Id[];
      };
    }

    type ICreateSubGroupRequest = ICreateSubGroupRequestBody;
    type ICreateSubGroupResponse = Moim.ISingleItemResponse<IGroup>;

    interface IImageCover {
      type: "image";
      data: {
        url: string;
      };
    }

    interface IURLCover {
      type: "url";
      data: {
        newWindow?: boolean;
        url: string;
      };
    }

    interface IHTMLCover {
      type: "html";
      data: {
        html: string;
        css: string;
      };
    }

    interface IBlockCover {
      type: "block";
      data: {
        // To Do : should be handled
        blocks: Blockit.Blocks[];
      };
    }

    interface IMoimCover {
      id: Id;
      group_id: Id;
      content: IImageCover | IRedirectCover | IHTMLCover | IBlockCover;
      created_at: number;
      updated_at: number;
    }

    // PUT: /api/groups/{groupId}/theme/logo

    interface IUpdateHomeChannelRequestBody {
      group: {
        defaultChannel: Moim.Id;
      };
    }

    type IUpdateHomeChannelRequest = IUpdateHomeChannelRequestBody;
    type IUpdateHomeChannelResponse = Moim.ISingleItemResponse<
      INormalizedGroup
    >;

    type SearchContentType = "files" | "text" | "all";
    interface ISearchFilterOption {
      groups?: Id[];
      channels?: Id[];
    }

    interface IGetSearchMoimsRequest extends IPaging {
      query: string;
      limit?: number;
    }

    interface ISearchedMoimBody {
      name: string;
      icon: IIcon;
      url: string;
      description?: string;
    }

    interface IRecommendGroupSection {
      childGroupIds: Moim.Id[];
      createdAt: number;
      groupId: Moim.Id;
      groupsCount: number;
      id: Moim.Id;
      name: string;
      sortKey: string;
      updatedAt: number;
    }

    interface INormalizedRecommendGroupSection extends IRecommendGroupSection {
      childGroups: IGroup[];
    }
    type INormalizedRecommendGroupSectionData = INormalizedEntities<
      IRecommendGroupSection
    >;
  }
}
