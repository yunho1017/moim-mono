import { normalize } from "normalizr";
import {
  bookmarkEntity,
  bookmarkListEntity,
  bookmarkSingleItemEntity,
} from "./entity";

export const bookmarkNormalizer = (
  bookmark: Moim.Bookmark.INormalizedBookmark,
) =>
  normalize<
    Moim.Bookmark.INormalizedBookmark,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(bookmark, bookmarkEntity);

export const bookmarkSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Bookmark.INormalizedBookmark>,
) =>
  normalize<
    Moim.Bookmark.INormalizedBookmark,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, bookmarkSingleItemEntity);

export const bookmarkListNormalizer = <
  T extends Moim.IListResponse<Moim.Bookmark.INormalizedBookmark>
>(
  data: T,
) =>
  normalize<
    Moim.Bookmark.INormalizedBookmark,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, bookmarkListEntity);
