import { schema } from "normalizr";
import { userEntity } from "../user";
import { groupEntity } from "../group";

export const forumDefinition = {
  creator: userEntity,
  group: groupEntity,
};

export const forumEntity = new schema.Entity<Moim.Forum.INormalizedForum>(
  "forums",
  forumDefinition,
);

export const forumSingleItemEntity = new schema.Object<
  Moim.Forum.INormalizedForum
>({
  data: forumEntity,
});

export const forumListEntity = new schema.Object<Moim.Forum.INormalizedForum>({
  data: new schema.Array(forumEntity),
});
