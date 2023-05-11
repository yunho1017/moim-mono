import { denormalize } from "..";
import {
  referenceBlockBlocksEntity,
  referenceBlockBlocksSimpleListEntity,
  referenceBlockBlocksListEntity,
  referenceBlockBlocksSingleItemEntity,
} from "./entity";

export const referenceBlockBlocksDenormalier = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Blockit.IBlocks>(
    input,
    referenceBlockBlocksEntity,
    entities,
  );

export const referenceBlockBlocksSimpleListDenormalizer = (
  input: Moim.Id[],
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id[], Moim.Blockit.IBlocks[]>(
    input,
    referenceBlockBlocksSimpleListEntity,
    entities,
  );

export const referenceBlockBlocksSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Blockit.IBlocks>
  >(input, referenceBlockBlocksSingleItemEntity, entities);

export const referenceBlockBlocksListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Blockit.IBlocks>>(
    input,
    referenceBlockBlocksListEntity,
    entities,
  );
