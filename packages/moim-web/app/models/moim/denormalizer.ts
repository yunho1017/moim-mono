import { denormalize } from "../";
import { moimEntity, moimListEntity, moimSingleItemEntity } from "./entity";

export const moimDenormalizer = (
  moimId: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Group.IGroupWithUser>(moimId, moimEntity, entities);

export const moimSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Group.IGroupWithUser>
  >(input, moimSingleItemEntity, entities);

export const moimListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Group.IGroupWithUser>>(
    input,
    moimListEntity,
    entities,
  );
