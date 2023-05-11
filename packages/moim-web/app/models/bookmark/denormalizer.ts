import { denormalize } from "../";
import {
  bookmarkEntity,
  bookmarkListEntity,
  bookmarkSingleItemEntity,
} from "./entity";

export const bookmarkDenormalizer = (
  threadId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Bookmark.IBookmark>(
    threadId,
    bookmarkEntity,
    entities,
  );

export const bookmarkSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Bookmark.IBookmark>
  >(input, bookmarkSingleItemEntity, entities);

export const bookmarkListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Bookmark.IBookmark>>(
    input,
    bookmarkListEntity,
    entities,
  );
