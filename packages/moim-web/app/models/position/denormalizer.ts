import { denormalize } from "../";
import {
  positionEntity,
  positionSimpleListEntity,
  positionListEntity,
  positionSingleItemEntity,
} from "./entity";

export const positionDenormalier = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Position.IPosition>(
    input,
    positionEntity,
    entities,
  );

export const positionSimpleListDenormalizer = (
  input: Moim.Id[],
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id[], Moim.Position.IPosition[]>(
    input,
    positionSimpleListEntity,
    entities,
  );

export const positionSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Position.IPosition>
  >(input, positionSingleItemEntity, entities);

export const positionListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Position.IPosition>>(
    input,
    positionListEntity,
    entities,
  );
