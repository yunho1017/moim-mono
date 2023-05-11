import { normalize } from "normalizr";
import {
  tagItemEntity,
  tagItemSingleItemEntity,
  tagItemListEntity,
  tagSetEntity,
  tagSetSingleItemEntity,
  tagSetListEntity,
} from "./entity";

/**
 * TagItem
 */
export const tagItemNormalizer = (tag: Moim.TagSet.ITagItem) =>
  normalize<Moim.TagSet.ITagItem, Moim.Entity.INormalizedData, Moim.Id>(
    tag,
    tagItemEntity,
  );

export const tagItemSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.TagSet.ITagItem>,
) =>
  normalize<
    Moim.TagSet.ITagItem,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, tagItemSingleItemEntity);

export const tagItemListNormalizer = <T extends Moim.TagSet.ITagItem[]>(
  data: T,
) =>
  normalize<Moim.TagSet.ITagItem, Moim.Entity.INormalizedData, T>(
    data,
    tagItemListEntity,
  );

/**
 * TagSet
 */
export const tagSetNormalizer = (tag: Moim.TagSet.ITagSet) =>
  normalize<Moim.TagSet.ITagSet, Moim.Entity.INormalizedData, Moim.Id>(
    tag,
    tagSetEntity,
  );

export const tagSetSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.TagSet.ITagSet>,
) =>
  normalize<
    Moim.TagSet.ITagSet,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, tagSetSingleItemEntity);

export const tagSetListNormalizer = <
  T extends Moim.IListResponse<Moim.TagSet.ITagSet>
>(
  data: T,
) =>
  normalize<
    Moim.TagSet.ITagSet,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, tagSetListEntity);
