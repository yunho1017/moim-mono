import { schema } from "normalizr";

export const categoryDefinition = {};

export const categoryEntity = new schema.Entity<
  Moim.Category.INormalizedCategory
>("categories", categoryDefinition);

export const categorySimpleListEntity = new schema.Array(categoryEntity);

export const categorySingleItemEntity = new schema.Object<
  Moim.Category.INormalizedCategory
>({
  data: categoryEntity,
});

export const categoryListEntity = new schema.Object<
  Moim.Category.INormalizedCategory
>({ data: categorySimpleListEntity });
