import { schema } from "normalizr";

export const positionDefinition = {};

export const positionEntity = new schema.Entity<
  Moim.Position.INormalizePosition
>("positions", positionDefinition);

export const positionSimpleListEntity = new schema.Array(positionEntity);

export const positionSingleItemEntity = new schema.Object<
  Moim.Position.INormalizePosition
>({
  data: positionEntity,
});

export const positionListEntity = new schema.Object<
  Moim.Position.INormalizePosition
>({
  data: new schema.Array(positionEntity),
});
