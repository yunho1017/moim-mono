import { normalize } from "normalizr";
import {
  directMessageEntity,
  directMessageListEntity,
  directMessageSingleItemEntity,
} from "./entity";

export const directMessageNormalizer = (
  directMessage: Moim.DirectMessage.INormalizedDirectMessage,
) =>
  normalize<
    Moim.DirectMessage.INormalizedDirectMessage,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(directMessage, directMessageEntity);

export const directMessageSingleItemNormalizer = (
  directMessage: Moim.ISingleItemResponse<
    Moim.DirectMessage.INormalizedDirectMessage
  >,
) =>
  normalize<
    Moim.DirectMessage.INormalizedDirectMessage,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(directMessage, directMessageSingleItemEntity);

export const directMessageListNormalizer = <
  T extends Moim.IListResponse<Moim.DirectMessage.INormalizedDirectMessage>
>(
  directMessages: T,
) =>
  normalize<
    Moim.DirectMessage.INormalizedDirectMessage,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(directMessages, directMessageListEntity);
