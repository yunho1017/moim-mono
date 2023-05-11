import { denormalize } from "../";
import { forumEntity, forumSingleItemEntity, forumListEntity } from "./entity";

export const forumDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) => denormalize<Moim.Id, Moim.Forum.IForum>(input, forumEntity, entities);

export const forumSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Forum.IForum>
  >(input, forumSingleItemEntity, entities);

export const forumListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Forum.IForum>>(
    input,
    forumListEntity,
    entities,
  );
