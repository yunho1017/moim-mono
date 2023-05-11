import { normalize } from "normalizr";
import { forumEntity, forumSingleItemEntity, forumListEntity } from "./entity";

export const forumNormalizer = (forum: Moim.Forum.INormalizedForum) =>
  normalize<Moim.Forum.INormalizedForum, Moim.Entity.INormalizedData, Moim.Id>(
    forum,
    forumEntity,
  );

export const forumSingleItemNormalizer = (
  forumData: Moim.ISingleItemResponse<Moim.Forum.INormalizedForum>,
) =>
  normalize<
    Moim.Forum.INormalizedForum,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(forumData, forumSingleItemEntity);

export const forumListNormalizer = <
  T extends Moim.IListResponse<Moim.Forum.INormalizedForum>
>(
  forumList: T,
) =>
  normalize<
    Moim.Forum.INormalizedForum,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(forumList, forumListEntity);
