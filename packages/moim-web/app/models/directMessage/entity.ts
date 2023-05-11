import { schema } from "normalizr";
import { userEntity } from "../user";
import { statEntity } from "../stat";

export const directMessageDefinition = {
  members: new schema.Array(userEntity),
  creator: userEntity,
  stat: statEntity,
};

export const directMessageEntity = new schema.Entity<
  Moim.DirectMessage.INormalizedDirectMessage
>("directMessages", directMessageDefinition);

export const directMessageSingleItemEntity = new schema.Object<
  Moim.DirectMessage.INormalizedDirectMessage
>({
  data: directMessageEntity,
});
export const directMessageListEntity = new schema.Object<
  Moim.DirectMessage.INormalizedDirectMessage
>({
  data: new schema.Array(directMessageEntity),
});
