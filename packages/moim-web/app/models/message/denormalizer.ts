import { denormalize } from "../";
import {
  messageSingleItemEntity,
  messageListEntity,
  messageEntity,
} from "./entity";

export const messageDenormalizer = <T = Moim.Id>(
  input: T,
  entities: Moim.Entity.INormalizedData,
): Moim.Conversations.IMessage =>
  denormalize<T, Moim.Conversations.IMessage>(input, messageEntity, entities);

export const messageSingleItemDenormalizer = <
  T = Moim.ISingleItemResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.ISingleItemResponse<Moim.Conversations.IMessage>>(
    input,
    messageSingleItemEntity,
    entities,
  );

export const messageListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Conversations.IMessage>>(
    input,
    messageListEntity,
    entities,
  );
