import { schema } from "normalizr";

export const referenceBlockBlocksDefinition = {};

export const referenceBlockBlocksEntity = new schema.Entity<
  Moim.Blockit.IBlocks
>("referenceBlockBlocks", referenceBlockBlocksDefinition);

export const referenceBlockBlocksSimpleListEntity = new schema.Array(
  referenceBlockBlocksEntity,
);

export const referenceBlockBlocksSingleItemEntity = new schema.Object<
  Moim.Blockit.IBlocks
>({
  data: referenceBlockBlocksEntity,
});

export const referenceBlockBlocksListEntity = new schema.Object<
  Moim.Blockit.IBlocks
>({
  data: new schema.Array(referenceBlockBlocksEntity),
});
