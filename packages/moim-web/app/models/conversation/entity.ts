import { schema } from "normalizr";
import { userEntity } from "../user";
import { groupEntity } from "../group";

export const conversationDefinition = {
  creator: userEntity,
  group: groupEntity,
};

export const conversationEntity = new schema.Entity<
  Moim.Conversations.INormalizedConversation
>("conversations", conversationDefinition);

export const conversationSingleItemEntity = new schema.Object<
  Moim.Conversations.INormalizedConversation
>({
  data: conversationEntity,
});
export const conversationListEntity = new schema.Object<
  Moim.Conversations.INormalizedConversation
>({
  data: new schema.Array(conversationEntity),
});
