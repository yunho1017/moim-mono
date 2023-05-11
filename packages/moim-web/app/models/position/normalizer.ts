import { normalize } from "normalizr";
import {
  positionEntity,
  positionSimpleListEntity,
  positionListEntity,
  positionSingleItemEntity,
} from "./entity";

export const positionNormalizer = (
  position: Moim.Position.INormalizePosition,
) =>
  normalize<
    Moim.Position.INormalizePosition,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(position, positionEntity);

export const positionSimpleListNormalizer = (
  positions: Moim.Position.INormalizePosition[],
) =>
  normalize<
    Moim.Position.INormalizePosition,
    Moim.Entity.INormalizedData,
    Moim.Id[]
  >(positions, positionSimpleListEntity);

export const positionSingleItemNormalizer = (
  positionData: Moim.ISingleItemResponse<Moim.Position.INormalizePosition>,
) =>
  normalize<
    Moim.Position.INormalizePosition,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(positionData, positionSingleItemEntity);

export const positionListNormalizer = <
  T extends Moim.IListResponse<Moim.Position.INormalizePosition>
>(
  positionList: T,
) =>
  normalize<
    Moim.Position.INormalizePosition,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(positionList, positionListEntity);
