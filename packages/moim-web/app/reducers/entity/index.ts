import { combineReducers } from "redux";
import * as ThreadsReducer from "./threads";
import { reducer as conversationReducer } from "./conversation";
import { reducer as usersReducer } from "./users";
import * as groupsReducer from "./group";
import { reducer as messagesReducer } from "./messages";
import { reducer as moimReducer } from "./moim";
import * as ForumReducer from "./forum";
import * as FileReducer from "./files";
import * as PositionReducer from "./position";
import * as CategoryReducer from "./category";
import * as LinkReducer from "./link";
import * as TagReducer from "./tag";
import * as TagSetReducer from "./tagSet";
import * as DirectMessageReducer from "./directMessage";
import * as ChannelReducer from "./channel";
import * as StatReducer from "./stat";
import * as NotificationReducer from "./notification";
import * as ReferenceBlockReducer from "./referenceBlock";
import * as RecommendGroupSectionReducer from "./recommendGroupSection";
import * as BookmarkReducer from "./bookmark";
import * as PostTemplateReducer from "./postTemplate";
import * as CommerceReducers from "./commerce";
import * as CampaignReducers from "./campaign";
import * as NftReducer from "./nft";
import * as TreasuryReducer from "./treasury";
import * as DQuestReducer from "./dquest";
import * as CommunityReducer from "./community";
import * as CoinReducer from "./community/coin";
import * as CryptobadgeReducer from "./cryptobadge";

export const INITIAL_DATA: Moim.Entity.INormalizedData = {
  users: {},
  threads: ThreadsReducer.INITIAL_STATE,
  conversations: {},
  moims: {},
  messages: {},
  groups: groupsReducer.INITIAL_STATE,
  files: FileReducer.INITIAL_STATE,
  forums: ForumReducer.INITIAL_STATE,
  blockits: {},
  referenceBlockBlocks: ReferenceBlockReducer.INITIAL_STATE,
  positions: PositionReducer.INITIAL_STATE,
  categories: CategoryReducer.INITIAL_STATE,
  links: LinkReducer.INITIAL_STATE,
  tags: TagReducer.INITIAL_STATE,
  directMessages: DirectMessageReducer.INITIAL_STATE,
  channels: ChannelReducer.INITIAL_STATE,
  stats: StatReducer.INITIAL_STATE,
  tagset: TagSetReducer.INITIAL_STATE,
  notifications: NotificationReducer.INITIAL_STATE,
  recommendGroupSection: RecommendGroupSectionReducer.INITIAL_STATE,
  bookmarks: BookmarkReducer.INITIAL_STATE,
  postTemplates: PostTemplateReducer.INITIAL_STATE,
  commerce_seller: CommerceReducers.INITIAL_STATE_SELLER,
  commerce_product: CommerceReducers.INITIAL_STATE_PRODUCT,
  commerce_productSet: CommerceReducers.INITIAL_STATE_PRODUCT_SET,
  commerce_category: CommerceReducers.INITIAL_STATE_CATEGORY,
  commerce_carts: CommerceReducers.INITIAL_STATE_CART,
  commerce_purchaseItems: CommerceReducers.INITIAL_STATE_PURCHASE_ITEM,
  commerce_payments: CommerceReducers.INITIAL_STATE_PAYMENT,
  commerce_purchases: CommerceReducers.INITIAL_STATE_PURCHASE,
  commerce_variants: CommerceReducers.INITIAL_STATE_VARIANT,
  commerce_shipping_address: CommerceReducers.INITIAL_STATE_SHIPPING_ADDRESS,
  commerce_delivery_group: CommerceReducers.INITIAL_STATE_DELIVERY_GROUP,
  commerce_coupons: CommerceReducers.INITIAL_STATE_COUPON,
  campaign_campaign_execution: CampaignReducers.INITIAL_STATE_EXECUTION,
  campaign_execution_vote: CampaignReducers.INITIAL_STATE_EXECUTION_VOTE,
  campaign_campaign: CampaignReducers.INITIAL_STATE_CAMPAIGN,
  nftItems: {},
  nftContracts: {},
  nftSchedules: {},
  treasuryItems: TreasuryReducer.INITIAL_STATE_ITEM,
  community_communities: CommunityReducer.INITIAL_STATE,
  community_coins: CoinReducer.INITIAL_STATE,
  dquest_histories: DQuestReducer.INITIAL_STATE_HISTORY,
  dquest_quests: DQuestReducer.INITIAL_STATE_QUEST,
  certifications: CryptobadgeReducer.INITIAL_CERTIFICATIONS_STATE,
  cryptobadges_list: CryptobadgeReducer.INITIAL_BADGES_STATE,
  certificates_list: CryptobadgeReducer.INITIAL_CERTIFICATES_STATE,
};

export const reducer = combineReducers<Moim.Entity.INormalizedData>({
  users: usersReducer,
  threads: ThreadsReducer.reducer,
  conversations: conversationReducer,
  moims: moimReducer,
  messages: messagesReducer,
  groups: groupsReducer.reducer,
  files: FileReducer.reducer,
  forums: ForumReducer.reducer,
  blockits: () => ({}),
  referenceBlockBlocks: ReferenceBlockReducer.reducer,
  positions: PositionReducer.reducer,
  categories: CategoryReducer.reducer,
  links: LinkReducer.reducer,
  tags: TagReducer.reducer,
  directMessages: DirectMessageReducer.reducer,
  channels: ChannelReducer.reducer,
  stats: StatReducer.reducer,
  tagset: TagSetReducer.reducer,
  notifications: NotificationReducer.reducer,
  recommendGroupSection: RecommendGroupSectionReducer.reducer,
  bookmarks: BookmarkReducer.reducer,
  postTemplates: PostTemplateReducer.reducer,
  commerce_seller: CommerceReducers.sellerReducer,
  commerce_product: CommerceReducers.productReducer,
  commerce_productSet: CommerceReducers.productSetReducer,
  commerce_category: CommerceReducers.commerceCategoryReducer,
  commerce_carts: CommerceReducers.cartResponseReducer,
  commerce_purchaseItems: CommerceReducers.commercePurchaseItemReducer,
  commerce_payments: CommerceReducers.paymentReducer,
  commerce_purchases: CommerceReducers.purchaseReducer,
  commerce_variants: CommerceReducers.variantReducer,
  commerce_shipping_address: CommerceReducers.shippingAddressReducer,
  commerce_delivery_group: CommerceReducers.deliveryGroupReducer,
  commerce_coupons: CommerceReducers.couponReducer,
  campaign_campaign_execution: CampaignReducers.executionReducer,
  campaign_execution_vote: CampaignReducers.executionVoteReducer,
  campaign_campaign: CampaignReducers.campaignReducer,
  nftItems: NftReducer.nftItemReducer,
  nftContracts: NftReducer.nftContractReducer,
  nftSchedules: NftReducer.nftScheduleReducer,
  treasuryItems: TreasuryReducer.treasuryItemReducer,
  community_communities: CommunityReducer.reducer,
  community_coins: CoinReducer.reducer,
  dquest_histories: DQuestReducer.historyReducer,
  dquest_quests: DQuestReducer.questReducer,
  certifications: CryptobadgeReducer.certificationsReducer,
  cryptobadges_list: CryptobadgeReducer.badgesReducer,
  certificates_list: CryptobadgeReducer.certificatesReducer,
});
