import { normalize } from "normalizr";
import { userEntity, userSingleItemEntity, userListEntity } from "./entity";

export const userNormalizer = (data: Moim.User.IOriginalUserDatum) =>
  normalize<Moim.User.IOriginalUserDatum, Moim.Entity.INormalizedData, Moim.Id>(
    data,
    userEntity,
  );

export const userSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<Moim.User.IOriginalUserDatum>,
) =>
  normalize<
    Moim.User.IOriginalUserDatum,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(datum, userSingleItemEntity);

export const userListNormalizer = <
  T extends Moim.IListResponse<Moim.User.IOriginalUserDatum>
>(
  data: T,
) =>
  normalize<
    Moim.User.IOriginalUserDatum,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, userListEntity);
