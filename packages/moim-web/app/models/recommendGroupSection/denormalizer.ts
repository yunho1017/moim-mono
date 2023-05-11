import { denormalize } from "../";
import {
  recommendGroupSectionEntity,
  recommendGroupSectionListEntity,
  recommendGroupSectionEntitySingleItemEntity,
} from "./entity";

export const recommendGroupSectionDenormalizer = (
  moimId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Group.INormalizedRecommendGroupSection>(
    moimId,
    recommendGroupSectionEntity,
    entities,
  );

export const recommendGroupSectionSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Group.INormalizedRecommendGroupSection>
  >(input, recommendGroupSectionEntitySingleItemEntity, entities);

export const recommendGroupSectionListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    T,
    Moim.BetweenListResponse<T, Moim.Group.INormalizedRecommendGroupSection>
  >(input, recommendGroupSectionListEntity, entities);
