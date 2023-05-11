import { normalize } from "normalizr";
import {
  referenceBlockBlocksEntity,
  referenceBlockBlocksSimpleListEntity,
  referenceBlockBlocksListEntity,
  referenceBlockBlocksSingleItemEntity,
} from "./entity";

export const referenceBlockBlocksNormalizer = (input: Moim.Blockit.IBlocks) =>
  normalize<Moim.Blockit.IBlocks, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    referenceBlockBlocksEntity,
  );

export const referenceBlockBlocksSimpleListNormalizer = (
  input: Moim.Blockit.IBlocks[],
) =>
  normalize<Moim.Blockit.IBlocks, Moim.Entity.INormalizedData, Moim.Id[]>(
    input,
    referenceBlockBlocksSimpleListEntity,
  );

export const referenceBlockBlocksSingleItemNormalizer = (
  input: Moim.ISingleItemResponse<Moim.Blockit.IBlocks>,
) =>
  normalize<
    Moim.Blockit.IBlocks,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(input, referenceBlockBlocksSingleItemEntity);

export const referenceBlockBlocksListNormalizer = <
  T extends Moim.IListResponse<Moim.Blockit.IBlocks>
>(
  input: T,
) =>
  normalize<
    Moim.Blockit.IBlocks,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(input, referenceBlockBlocksListEntity);
