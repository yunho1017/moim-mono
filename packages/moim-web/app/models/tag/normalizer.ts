import { normalize } from "normalizr";
import { tagEntity, tagSingleItemEntity, tagListEntity } from "./entity";

export const tagNormalizer = (tag: Moim.Tag.ITag) =>
  normalize<Moim.Tag.ITag, Moim.Entity.INormalizedData, Moim.Id>(
    tag,
    tagEntity,
  );

export const tagSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Tag.ITag>,
) =>
  normalize<
    Moim.Tag.ITag,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, tagSingleItemEntity);

export const tagListNormalizer = <T extends Moim.IListResponse<Moim.Tag.ITag>>(
  data: T,
) =>
  normalize<
    Moim.Tag.ITag,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, tagListEntity);
