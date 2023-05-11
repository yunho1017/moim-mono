import { schema } from "normalizr";
import { userEntity } from "../user";
import { arrayFileBlockKitEntity } from "../file";

export const messageDefinition = {
  user: userEntity,
  blockit: arrayFileBlockKitEntity,
};

export const messageEntity = new schema.Entity<
  Moim.Conversations.INormalizedMessage
>("messages", messageDefinition, {
  idAttribute: entity => `${entity.parent_id}_${entity.id}`,
  processStrategy: entity => ({
    ...entity,
    blockit: entity.blocks || [],
  }),
});
export const messageSingleItemEntity = new schema.Object<
  Moim.Conversations.INormalizedMessage
>({
  data: messageEntity,
});
export const messageListEntity = new schema.Object<
  Moim.Conversations.INormalizedMessage
>({
  data: new schema.Array(messageEntity),
});
