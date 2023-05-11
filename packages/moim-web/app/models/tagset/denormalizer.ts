import { denormalize } from "../";
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
export const tagItemDenormalizer = (
  tagItemId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.TagSet.ITagItem>(
    tagItemId,
    tagItemEntity,
    entities,
  );

export const tagItemSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.TagSet.ITagItem>
  >(input, tagItemSingleItemEntity, entities);

export const tagItemListDenormalizer = <T extends Moim.Id[]>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) => denormalize<T, Moim.TagSet.ITagItem[]>(input, tagItemListEntity, entities);

/**
 * TagSet
 */
export const tagSetDenormalizer = (
  tagSetId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.TagSet.ITagSet>(tagSetId, tagSetEntity, entities);

export const tagSetSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.TagSet.ITagSet>
  >(input, tagSetSingleItemEntity, entities);

export const tagSetListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.TagSet.ITagSet>>(
    input,
    tagSetListEntity,
    entities,
  );
