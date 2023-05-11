import { normalize } from "normalizr";
import { moimEntity, moimListEntity, moimSingleItemEntity } from "./entity";

export const moimNormalizer = (moim: Moim.Group.INormalizedGroupWithUser) =>
  normalize<Moim.Group.IGroupWithUser, Moim.Entity.INormalizedData, Moim.Id>(
    moim,
    moimEntity,
  );

export const moimSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.Group.INormalizedGroupWithUser>,
) =>
  normalize<
    Moim.Group.IGroupWithUser,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, moimSingleItemEntity);

export const moimListNormalizer = <
  T extends Moim.IListResponse<Moim.Group.INormalizedGroupWithUser>
>(
  data: T,
) =>
  normalize<
    Moim.Group.IGroupWithUser,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, moimListEntity);
