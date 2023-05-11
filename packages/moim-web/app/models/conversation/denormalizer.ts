import { denormalize } from "../";
import {
  conversationSingleItemEntity,
  conversationListEntity,
  conversationEntity,
} from "./entity";

export const conversationDenormalizer = (
  input: string,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Conversations.IConversation>(
    input,
    conversationEntity,
    entities,
  );

export const conversationSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Conversations.IConversation>
  >(input, conversationSingleItemEntity, entities);

export const conversationListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Conversations.IConversation>>(
    input,
    conversationListEntity,
    entities,
  );
