import { normalize } from "normalizr";
import {
  recommendGroupSectionEntity,
  recommendGroupSectionListEntity,
  recommendGroupSectionEntitySingleItemEntity,
} from "./entity";

export const recommendGroupSectionNormalizer = (
  moim: Moim.Group.IRecommendGroupSection,
) =>
  normalize<
    Moim.Group.IRecommendGroupSection,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(moim, recommendGroupSectionEntity);

export const recommendGroupSectionSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Group.IRecommendGroupSection>,
) =>
  normalize<
    Moim.Group.IRecommendGroupSection,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, recommendGroupSectionEntitySingleItemEntity);

export const recommendGroupSectionListNormalizer = <
  T extends Moim.IListResponse<Moim.Group.IRecommendGroupSection>
>(
  data: T,
) =>
  normalize<
    Moim.Group.IRecommendGroupSection,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, recommendGroupSectionListEntity);
