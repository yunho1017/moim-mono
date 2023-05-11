import * as normalizr from "normalizr";
import { groupDefinition } from "./group";
import { userDefinition } from "./user";
import { moimDefinition } from "./moim";
import { conversationDefinition } from "./conversation";
import { threadDefinition } from "./thread";
import { messageDefinition } from "./message";
import { fileDefinition } from "./file";
import { forumDefinition } from "./forum";
import { positionDefinition } from "./position";
import { categoryDefinition } from "./category/entity";
import { linkDefinition, channelDefinition } from "./channel";
import { tagDefinition } from "./tag";
import { directMessageDefinition } from "./directMessage";
import {
  cryptobadgeCertificationDefinition,
  cryptobadgeBadgeDefinition,
  cryptobadgeCertificateDefinition,
} from "./cryptobadge";
import { notificationsDefinition } from "./notification";
import { referenceBlockBlocksDefinition } from "./referenceBlock";
import { recommendGroupSectionDefinition } from "./recommendGroupSection";
import { bookmarkDefinition } from "./bookmark";
import { postTemplateDefinition } from "./postTemplate";
import {
  productVariantDefinition,
  sellerDefinition,
  productDefinition,
  productSetDefinition,
  commerceCategoryDefinition,
  cartResponseDefinition,
  purchaseItemDefinition,
  purchaseDefinition,
  paymentDefinition,
  shippingAddressDefinition,
  deliveryGroupDefinition,
  couponDefinition,
} from "./commerce";
import {
  campaignDefinition,
  campaignExecutionDefinition,
  executionVoteDefinition,
} from "./campaign";
import {
  nftItemDefinition,
  nftContractDefinition,
  nftScheduleDefinition,
} from "./nft";
import { treasuryItemDefinition } from "./treasury";
import { DQuestHistoryDefinition, DQuestQuestDefinition } from "./dquest";
import { communityDefinition } from "./community";
import { coinDefinition } from "./community/coin";

export * from "./group";
export * from "./user";
export * from "./moim";
export * from "./conversation";
export * from "./thread";
export * from "./message";
export * from "./file";
export * from "./channel";
export * from "./tag";
export * from "./cryptobadge";
export * from "./directMessage";
export * from "./stat";
export * from "./postTemplate";
export * from "./commerce";
export * from "./campaign";
export * from "./nft";
export * from "./treasury";
export * from "./dquest";
export * from "./community";
export * from "./community/coin";

export const definitions: Record<
  keyof Moim.Entity.INormalizedData,
  null | Record<Moim.Id, normalizr.schema.Entity | normalizr.schema.Array>
> = {
  conversations: conversationDefinition,
  links: linkDefinition,
  threads: threadDefinition,
  messages: messageDefinition,
  users: userDefinition,
  groups: groupDefinition,
  moims: moimDefinition,
  files: fileDefinition,
  forums: forumDefinition,
  blockits: {},
  referenceBlockBlocks: referenceBlockBlocksDefinition,
  positions: positionDefinition,
  categories: categoryDefinition,
  tags: tagDefinition,
  certifications: cryptobadgeCertificationDefinition,
  directMessages: directMessageDefinition,
  channels: channelDefinition,
  stats: {},
  tagset: {},
  notifications: notificationsDefinition,
  recommendGroupSection: recommendGroupSectionDefinition,
  bookmarks: bookmarkDefinition,
  postTemplates: postTemplateDefinition,
  commerce_seller: sellerDefinition,
  commerce_product: productDefinition,
  commerce_productSet: productSetDefinition,
  commerce_category: commerceCategoryDefinition,
  commerce_carts: cartResponseDefinition,
  commerce_purchaseItems: purchaseItemDefinition,
  commerce_payments: paymentDefinition,
  commerce_purchases: purchaseDefinition,
  commerce_variants: productVariantDefinition,
  commerce_shipping_address: shippingAddressDefinition,
  commerce_delivery_group: deliveryGroupDefinition,
  commerce_coupons: couponDefinition,
  campaign_campaign: campaignDefinition,
  campaign_campaign_execution: campaignExecutionDefinition,
  campaign_execution_vote: executionVoteDefinition,
  nftItems: nftItemDefinition,
  nftContracts: nftContractDefinition,
  nftSchedules: nftScheduleDefinition,
  treasuryItems: treasuryItemDefinition,
  community_communities: communityDefinition,
  community_coins: coinDefinition,
  dquest_histories: DQuestHistoryDefinition,
  dquest_quests: DQuestQuestDefinition,
  cryptobadges_list: cryptobadgeBadgeDefinition,
  certificates_list: cryptobadgeCertificateDefinition,
};

// export function denormalize(input: any, schema: any, entities: any): undefined;
export function denormalize<TNormalizedData, TOriginalData>(
  input: TNormalizedData,
  schema: normalizr.Schema,
  entities: Moim.Entity.INormalizedData,
): TOriginalData;
// eslint-disable-next-line no-redeclare
export function denormalize<TNormalizedData, TOriginalData>(
  input: TNormalizedData | any,
  schema: normalizr.Schema | any,
  entities: Moim.Entity.INormalizedData | any,
): TOriginalData {
  return normalizr.denormalize(input, schema, entities) as TOriginalData;
}
