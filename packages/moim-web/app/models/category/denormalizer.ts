import { denormalize } from "../";
import {
  categoryEntity,
  categoryListEntity,
  categorySimpleListEntity,
  categorySingleItemEntity,
} from "./entity";

export const categoryDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Category.ICategory>(
    input,
    categoryEntity,
    entities,
  );

export const categorySimpleListDenormalizer = (
  input: Moim.Id[],
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id[], Moim.Category.ICategory[]>(
    input,
    categorySimpleListEntity,
    entities,
  );

export const categorySingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Category.ICategory>
  >(input, categorySingleItemEntity, entities);

export const categoryListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Category.ICategory>>(
    input,
    categoryListEntity,
    entities,
  );
