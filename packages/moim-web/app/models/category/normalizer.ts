import { normalize } from "normalizr";
import {
  categoryEntity,
  categoryListEntity,
  categorySimpleListEntity,
  categorySingleItemEntity,
} from "./entity";

export const categoryNormalizer = (
  category: Moim.Category.INormalizedCategory,
) =>
  normalize<
    Moim.Category.INormalizedCategory,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(category, categoryEntity);

export const categorySimpleListNormalizer = (
  categories: Moim.Category.INormalizedCategory[],
) =>
  normalize<
    Moim.Category.INormalizedCategory,
    Moim.Entity.INormalizedData,
    Moim.Id[]
  >(categories, categorySimpleListEntity);

export const categorySingleItemNormalizer = (
  categoryData: Moim.ISingleItemResponse<Moim.Category.INormalizedCategory>,
) =>
  normalize<
    Moim.Category.INormalizedCategory,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(categoryData, categorySingleItemEntity);

export const categoryListNormalizer = <
  T extends Moim.IListResponse<Moim.Category.INormalizedCategory>
>(
  categoryList: T,
) =>
  normalize<
    Moim.Category.INormalizedCategory,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(categoryList, categoryListEntity);
