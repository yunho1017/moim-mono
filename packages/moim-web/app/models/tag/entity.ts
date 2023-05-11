import { schema } from "normalizr";

export const tagDefinition = {};

export const tagEntity = new schema.Entity<Moim.Tag.ITag>(
  "tags",
  tagDefinition,
);

export const tagSingleItemEntity = new schema.Object<Moim.Tag.ITag>({
  data: tagEntity,
});

export const tagListEntity = new schema.Object<Moim.Tag.ITag>({
  data: new schema.Array(tagEntity),
});
