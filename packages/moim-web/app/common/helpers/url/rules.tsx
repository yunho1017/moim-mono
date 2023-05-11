import createURLDefinition from "./createDefinition";

// NOTE: 시어스랩 관련 external Community
export const ExternalCommunity = createURLDefinition("/communities");

export const ExternalMoimBlockitEditor = createURLDefinition(
  "/moim-blockit-editor",
);

export const BlockitEditor = createURLDefinition("/editor");

export const NotFound = createURLDefinition("/404");
export const ServerError = createURLDefinition("/500");
export const ServerMaintenance = createURLDefinition(
  "/feedback/server-maintenance",
);
export const ConnectionError = createURLDefinition(
  "/feedback/connection-error",
);
export const NoRight = createURLDefinition("/feedback/no-right");

export const HubHome = createURLDefinition("/hub");
export const HubSignIn = createURLDefinition("/hub/signin");
export const CreateGroup = createURLDefinition("/hub/create/group");
export const MoimAppHome = createURLDefinition("/");
export const MoimLogin = createURLDefinition("/login");
export const CoverPage = createURLDefinition("/cover");

export const PersonalSettingMoim = createURLDefinition("/personal-setting");
export const PersonalSettingSectionMoim = createURLDefinition(
  "/personal-setting/:section",
);
export const PersonalSettingNotificationMoim = createURLDefinition(
  "/personal-setting/notification",
);
export const PersonalSettingNotificationService = createURLDefinition(
  "/personal-setting/notification/service",
);
export const PersonalSettingNotificationMarketing = createURLDefinition(
  "/personal-setting/notification/marketing",
);
export const PersonalSettingProfile = createURLDefinition(
  "/personal-setting/profile",
);
export const PersonalSettingMoimLeave = createURLDefinition(
  "/personal-setting/leave",
);
export const PersonalSettingPrivacy = createURLDefinition(
  "/personal-setting/privacy",
);

export const SettingMoim = createURLDefinition("/setting");
export const SettingSectionMoim = createURLDefinition<{ section?: string }>(
  "/setting/:section",
);
export const SettingMoimCategoryAndChannel = createURLDefinition(
  "/setting/category-channel",
);

export const SettingMoimOverview = createURLDefinition("/setting/overview");
export const SettingMoimChannels = createURLDefinition("/setting/channels");
export const SettingMoimCategory = createURLDefinition<{ categoryId: string }>(
  "/setting/category",
);
export const SettingMoimChannel = createURLDefinition<{ channelId: string }>(
  "/setting/channel",
);

export const SettingMoimPosition = createURLDefinition("/setting/positions");
export const SettingMoimPositionEdit = createURLDefinition(
  "/setting/positions/edit",
);
export const SettingMoimPositionShow = createURLDefinition<{
  positionId: string;
}>("/setting/positions/:positionId");

export const SettingCreateSubMoim = createURLDefinition(
  "/setting/create/submoim",
);

export const SettingMoimAnalytics = createURLDefinition("/setting/analytics");

export const SecondaryViewUrl = createURLDefinition<{
  panelRouteUrl: string;
}>("/panel/:panelRouteUrl+");

export const MoimMembers = createURLDefinition("/members");
export const Members = createURLDefinition<{
  userId: Moim.Id;
}>("/members/:userId");

export const UserBookmark = createURLDefinition<{
  userId: Moim.Id;
}>("/bookmarks/:userId");
export const PositionMembers = createURLDefinition<{
  positionId: string;
}>("/positions/:positionId");
export const ConversationMembers = createURLDefinition<{
  conversationId: string;
}>("/conversations/:conversationId/members");
export const ForumMembers = createURLDefinition<{
  forumId: string;
}>("/forums/:forumId/members");

export const ProfileNftList = createURLDefinition<{
  userId: string;
}>("/users/:userId/userNfts");

export const ProfileBadgeList = createURLDefinition<{
  userId: string;
}>("/users/:userId/userBadges");

export const ProfileBadgeCardList = createURLDefinition<{
  userId: string;
}>("/users/:userId/userBadges/card");

export const ProfileShare = createURLDefinition<{ userId: Moim.Id }>(
  "/users/:userId",
);

export const Me = createURLDefinition("/me");

export const CreateChannel = createURLDefinition("/setting/create/channel");
export const CreateCategory = createURLDefinition("/setting/create/category");

export const Channel = createURLDefinition<{ channelId: string }>(
  "/channel/:channelId",
);

export const Forum = createURLDefinition<{ forumId: string }>(
  "/forums/:forumId",
);

export const ShowForumThread = createURLDefinition<{
  forumId: string;
  threadId: string;
}>("/forums/:forumId/threads/:threadId");

export const FocusedShowForumThread = createURLDefinition<{
  forumId: string;
  threadId: string;
  focusedId: string;
}>("/forums/:forumId/threads/:threadId/replies/:focusedId");

export const CreateForumThread = createURLDefinition<{
  forumId: string;
}>("/forums/:forumId/new");

export const EditForumThread = createURLDefinition<{
  forumId: string;
  threadId: string;
}>("/forums/:forumId/threads/:threadId/edit");

export const ConversationShow = createURLDefinition<{
  conversationId: string;
}>("/conversations/:conversationId");
export const CreateConversation = createURLDefinition("/conversations/new");

export const ViewShow = createURLDefinition<{
  viewId: string;
}>("/views/:viewId");

export const SubMoimList = createURLDefinition<{ tag: string }>(
  "/submoims/tags/:tag",
);

export const DirectMessageShow = createURLDefinition<{
  directMessageId: string;
}>("/direct_messages/:directMessageId");

export const QuickJoinMoim = createURLDefinition("/quick-join");

export const About = createURLDefinition<{ section: string }>(
  "/about/:section",
);
export const AboutPolicy = createURLDefinition("/about/policy");
export const AboutTerms = createURLDefinition("/about/terms");

export const PluginRightPanel = createURLDefinition<{ hash: string }>(
  "/plugin-right/:hash",
);

export const Search = createURLDefinition<{ query: string }>("/search/:query");
export const SearchWithTab = createURLDefinition<{
  query: string;
  tab: string;
}>("/search/:query/:tab");

export const RedirectPlugin = createURLDefinition("/plugin-redirect");

export const MeetingHome = createURLDefinition<{ meetingId: Moim.Id }>(
  "/meetings/:meetingId",
);

export const myShopping = createURLDefinition("/commerce/my-shopping/");

// #region Commerce url
export const CommerceProductSets = createURLDefinition<{
  id: Moim.Id;
  section: "products" | "sellers";
}>("/commerce/productsets/:id/:section");

export const CommerceCategories = createURLDefinition<{
  id: Moim.Id;
  section: "products" | "sellers";
}>("/commerce/categories/:id/:section");

export const CommerceSellers = createURLDefinition<{
  id: Moim.Id;
  section: "products" | "sellers";
}>("/commerce/sellers/:id/:section");
export const CommerceDeliveryGroup = createURLDefinition<{
  id: Moim.Id;
}>("/commerce/delivery_groups/:id");

export const CommerceProductShow = createURLDefinition<{
  id: Moim.Id;
}>("/commerce/products/:id");

export const CommerceProductShowReview = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
}>("/commerce/products/:id/reviews/:threadId");

export const CommerceProductShowReviewReply = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
  replyId: Moim.Id;
}>("/commerce/products/:id/reviews/:threadId/replies/:replyId");

export const CommerceProductShowQnA = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
}>("/commerce/products/:id/questions/:threadId");

export const CommerceProductShowQnAReply = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
  replyId: Moim.Id;
}>("/commerce/products/:id/questions/:threadId/replies/:replyId");

export const CommerceProductShowComment = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
}>("/commerce/products/:id/comments/:threadId");

export const CommerceProductShowCommentReply = createURLDefinition<{
  id: Moim.Id;
  threadId: Moim.Id;
  replyId: Moim.Id;
}>("/commerce/products/:id/comments/:threadId/replies/:replyId");

export const CommerceSellerSets = createURLDefinition<{
  id: Moim.Id;
}>("/commerce/sellersets/:id");

export const CommerceMyCarts = createURLDefinition("/commerce/carts");
export const CommerceMyCartsWishlist = createURLDefinition(
  "/commerce/carts/wishlist",
);

export const CommerceCheckoutComplete = createURLDefinition(
  "/commerce/checkout_complete",
);

export const CommerceMyShopping = createURLDefinition<{ tab: string }>(
  "/commerce/my-shopping/:tab",
);
export const CommercePaymentsList = createURLDefinition(
  "/commerce/my-shopping/payments",
);

export const CommercePaymentsShow = createURLDefinition<{ id: Moim.Id }>(
  "/commerce/my-shopping/payments/:id",
);

export const CommerceMyBenefit = createURLDefinition(
  "/commerce/my-shopping/benefits",
);

export const CommerceMyBenefitCoupons = createURLDefinition(
  "/commerce/my-shopping/benefits/coupons",
);

export const CommerceMyBenefitCouponsFocus = createURLDefinition<{
  id: Moim.Id;
}>("/commerce/my-shopping/benefits/coupons/:id");

export const CommerceMyBenefitCredits_Legacy = createURLDefinition(
  "/commerce/my-shopping/benefits/credits",
);

export const CommerceMyPreference = createURLDefinition<{
  tab: "address-manage" | "my-reviews";
}>("/commerce/my-shopping/information/:tab");

export const CommerceMyPreferenceAddressManage = createURLDefinition(
  "/commerce/my-shopping/information/address-manage",
);

export const CommerceMyPreferencePaymentManage = createURLDefinition(
  "/commerce/my-shopping/information/payment-manage",
);

export const CommerceMyWishlist = createURLDefinition(
  "/commerce/my-shopping/wishlist",
);

// #endregion

export const Test = createURLDefinition("/test");

export const PostTemplate = createURLDefinition("/post_templates");
export const PostTemplateShow = createURLDefinition<{
  postTemplateId: Moim.Id;
}>("/post_templates/:postTemplateId");
export const PostTemplateEditor = createURLDefinition("/post_templates/new");

export const CampaignParticipants = createURLDefinition<{
  campaignId: Moim.Id;
}>("/campaign/:campaignId/participants");
export const CampaignWallet = createURLDefinition<{ campaignId: Moim.Id }>(
  "/campaign/:campaignId/wallet",
);
export const CampaignFunds = createURLDefinition<{ campaignId: Moim.Id }>(
  "/campaign/:campaignId/funds",
);
export const CampaignExecutions = createURLDefinition<{ campaignId: Moim.Id }>(
  "/campaign/:campaignId/executions",
);
export const CampaignExecutionView = createURLDefinition<{
  campaignId: Moim.Id;
  executionId: Moim.Id;
}>("/campaign/:campaignId/executions/:executionId");

export const CampaignExecutionVoteResult = createURLDefinition<{
  campaignId: Moim.Id;
  executionId: Moim.Id;
}>("/campaign/:campaignId/executions/:executionId/result");

export const Plugins = createURLDefinition("/plugins");
export const PluginShow = createURLDefinition<{ id: Moim.Id }>("/plugins/:id");

export const ContentsGroupThreads = createURLDefinition<{ id: Moim.Id }>(
  "/contents_groups/:id/threads",
);

export const NftShow = createURLDefinition<{
  nftItemId: string;
}>("/nft/:nftItemId");

export const NftSetShow = createURLDefinition<{ id: Moim.Id }>("/nft_sets/:id");

export const NftScheduleShow = createURLDefinition<{
  contractId: Moim.Id;
  scheduleId: Moim.Id;
}>("/collection/:contractId/schedule/:scheduleId");

export const NftCollectionShow = createURLDefinition<{
  contractId: Moim.Id;
}>("/collection/:contractId");

export const NftCollectionShowTabs = createURLDefinition<{
  contractId: Moim.Id;
  tab: string;
}>("/collection/:contractId/:tab");

export const ChildMoimGroupMoims = createURLDefinition<{ id: Moim.Id }>(
  "/child_moim_group/:id/moims",
);

export const QuestList = createURLDefinition("/quests");
export const QuestShow = createURLDefinition<{ id: Moim.Id }>("/quests/:id");
export const MyQuestList = createURLDefinition("/quests/my");
export const MyQuestListInActive = createURLDefinition("/quests/my/in_active");
export const MyQuestListAchieved = createURLDefinition("/quests/my/achieved");
export const QuestGroupQuests = createURLDefinition<{ id: Moim.Id }>(
  "/quest-group/:id",
);

export const TreasuryShow = createURLDefinition<{ treasuryId: Moim.Id }>(
  "/treasury/:treasuryId/wallet",
);

export const CoinShow = createURLDefinition<{ coinId: Moim.Id }>(
  "/coins/:coinId",
);

export const CoinToBeExpired = createURLDefinition<{ coinId: Moim.Id }>(
  "/coins/:coinId/to-be-expired",
);

export const CryptobadgeShow = createURLDefinition<{ badgeId: string }>(
  "/cryptobadge/badge/:badgeId",
);

export const CertificateShow = createURLDefinition<{ certificateId: string }>(
  "/cryptobadge/certificate/:certificateId",
);

export const CertificateMetadataShow = createURLDefinition<{
  badgeId: string;
}>("/cryptobadge/certificate_metadata/:badgeId");

export const CryptobadgeGroupShow = createURLDefinition<{
  groupId: string;
}>("/cryptobadge/group/:groupId");
