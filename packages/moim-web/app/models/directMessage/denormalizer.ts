import { denormalize } from "../";
import {
  directMessageEntity,
  directMessageListEntity,
  directMessageSingleItemEntity,
} from "./entity";

export const directMessageDenormalizer = (
  input: string,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.DirectMessage.IDirectMessage>(
    input,
    directMessageEntity,
    entities,
  );

export const directMessageSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.DirectMessage.IDirectMessage>
  >(input, directMessageSingleItemEntity, entities);

export const directMessageListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    T,
    Moim.BetweenListResponse<T, Moim.DirectMessage.IDirectMessage>
  >(input, directMessageListEntity, entities);
