import { normalize } from "normalizr";
import {
  messageEntity,
  messageListEntity,
  messageSingleItemEntity,
} from "./entity";

export const messageNormalizer = (
  message: Moim.Conversations.INormalizedMessage,
) =>
  normalize<
    Moim.Conversations.INormalizedMessage,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(message, messageEntity);

export const messageSingleItemNormalizer = (
  message: Moim.ISingleItemResponse<Moim.Conversations.INormalizedMessage>,
) =>
  normalize<
    Moim.Conversations.INormalizedMessage,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(message, messageSingleItemEntity);

export const messageListNormalizer = <
  T extends Moim.IListResponse<Moim.Conversations.INormalizedMessage>
>(
  messages: T,
) =>
  normalize<
    Moim.Conversations.INormalizedMessage,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(messages, messageListEntity);
