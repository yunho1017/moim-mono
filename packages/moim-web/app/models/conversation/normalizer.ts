import { normalize } from "normalizr";
import {
  conversationEntity,
  conversationListEntity,
  conversationSingleItemEntity,
} from "./entity";

export const conversationNormalizer = (
  conversation: Moim.Conversations.INormalizedConversation,
) =>
  normalize<
    Moim.Conversations.INormalizedConversation,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(conversation, conversationEntity);

export const conversationSingleItemNormalizer = (
  channel: Moim.ISingleItemResponse<Moim.Conversations.INormalizedConversation>,
) =>
  normalize<
    Moim.Conversations.INormalizedConversation,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(channel, conversationSingleItemEntity);

export const conversationListNormalizer = <
  T extends Moim.IListResponse<Moim.Conversations.INormalizedConversation>
>(
  channels: T,
) =>
  normalize<
    Moim.Conversations.INormalizedConversation,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(channels, conversationListEntity);
