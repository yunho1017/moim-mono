import { schema } from "normalizr";
import { userEntity } from "app/models/user";
import { groupEntity } from "app/models/group/entity";

/**
 * TagItem Entity
 */
export const tagItemDefinition = {
  user: userEntity,
  group: groupEntity,
};

export const tagItemEntity = new schema.Entity<Moim.TagSet.ITagItem>(
  "tagset",
  tagItemDefinition,
  {
    processStrategy: value => ({
      ...value,
      user: value.userId,
      group: value.groupId,
    }),
  },
);

export const tagItemSingleItemEntity = new schema.Object<Moim.TagSet.ITagSet>({
  data: tagItemEntity,
});

export const tagItemListEntity = new schema.Array(tagItemEntity);

/**
 * TagSet Entity
 */
export const tagSetDefinition = {
  user: userEntity,
  group: groupEntity,
  items: tagItemListEntity,
};

export const tagSetEntity = new schema.Entity<Moim.TagSet.ITagSet>(
  "tagset",
  tagSetDefinition,
  {
    processStrategy: value => ({
      ...value,
      user: value.userId,
      group: value.groupId,
    }),
  },
);

export const tagSetSingleItemEntity = new schema.Object<Moim.TagSet.ITagSet>({
  data: tagSetEntity,
});

export const tagSetListEntity = new schema.Object<Moim.TagSet.ITagSet>({
  data: new schema.Array(tagSetEntity),
});
