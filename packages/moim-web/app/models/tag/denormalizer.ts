import { denormalize } from "../";
import { tagEntity, tagSingleItemEntity, tagListEntity } from "./entity";

export const tagDenormalizer = (
  tagId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Tag.IDenormalizedTag>(tagId, tagEntity, entities);

export const tagSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Tag.IDenormalizedTag>
  >(input, tagSingleItemEntity, entities);

export const tagListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Tag.IDenormalizedTag>>(
    input,
    tagListEntity,
    entities,
  );
